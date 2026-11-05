-- Migrant Welfare Portal: fresh-project schema and secure access migration.
-- Run in the Supabase SQL Editor as the project owner (postgres role).
-- Do NOT put a Supabase service/secret key in the browser.

begin;

create sequence if not exists public.migrant_application_seq start 1;
create sequence if not exists public.migrant_payment_seq start 1;

create table if not exists public.migrant_applications (
  id uuid primary key default gen_random_uuid(),
  application_number text not null unique default (
    'ORK-MW-' || extract(year from current_date)::text || '-' || lpad(nextval('public.migrant_application_seq')::text, 6, '0')
  ),
  tracking_token uuid not null unique default gen_random_uuid(),
  full_name text not null,
  parent_name text not null,
  dob date not null,
  gender text not null,
  nationality text not null,
  identity_number text,
  current_country text not null,
  current_city text not null,
  origin_district text not null,
  employment_status text not null,
  occupation text not null,
  emergency_contact text not null,
  family_info text,
  package_id text not null,
  payment_method text not null,
  crypto_network text,
  transaction_reference text not null,
  profile_photo_path text,
  receipt_path text,
  status text not null default 'submitted'
    check (status in ('submitted','under_review','payment_verification','approved','rejected')),
  payment_status text not null default 'verification_pending'
    check (payment_status in ('not_submitted','verification_pending','verified','rejected')),
  membership_valid_until date,
  internal_notes text,
  requested_documents text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  reviewed_at timestamptz
);

-- Existing installations can apply the same migration without replacing records.
alter table public.migrant_applications add column if not exists crypto_network text;
alter table public.migrant_applications add column if not exists membership_valid_until date;

create table if not exists public.migrant_payments (
  id uuid primary key default gen_random_uuid(),
  payment_number text not null unique default (
    'ORK-MWP-' || extract(year from current_date)::text || '-' || lpad(nextval('public.migrant_payment_seq')::text, 6, '0')
  ),
  application_id uuid not null references public.migrant_applications(id) on delete restrict,
  billing_period_start date not null,
  billing_period_end date not null,
  payment_method text not null,
  crypto_network text,
  transaction_reference text not null,
  receipt_path text,
  payment_status text not null default 'verification_pending'
    check (payment_status in ('verification_pending','verified','rejected')),
  internal_notes text,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  constraint migrant_payments_valid_period check (billing_period_end >= billing_period_start)
);

-- Rejected attempts remain in history, while only one pending or verified payment
-- may occupy a given membership period. This permits a corrected retry after rejection.
alter table public.migrant_payments drop constraint if exists migrant_payments_one_per_period;
create unique index if not exists migrant_payments_one_open_period_idx
  on public.migrant_payments (application_id, billing_period_start)
  where payment_status <> 'rejected';

create index if not exists migrant_applications_created_at_idx on public.migrant_applications (created_at desc);
create index if not exists migrant_payments_application_period_idx on public.migrant_payments (application_id, billing_period_start desc);

-- The only admin authority is an authenticated Supabase user with app_metadata.role=migrant_admin.
-- app_metadata is server-controlled; do not grant the applicant control of this claim.
create or replace function public.is_migrant_admin()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'migrant_admin', false);
$$;
revoke all on function public.is_migrant_admin() from public;
grant execute on function public.is_migrant_admin() to authenticated;

alter table public.migrant_applications enable row level security;
alter table public.migrant_payments enable row level security;

-- Remove the insecure broad policies from earlier setup scripts, if present.
drop policy if exists "Public can submit migrant applications" on public.migrant_applications;
drop policy if exists "Admin dashboard can view migrant applications" on public.migrant_applications;
drop policy if exists "Admin dashboard can update migrant applications" on public.migrant_applications;
drop policy if exists "Migrant admins can manage applications" on public.migrant_applications;
create policy "Migrant admins can manage applications"
  on public.migrant_applications for all to authenticated
  using (public.is_migrant_admin()) with check (public.is_migrant_admin());

drop policy if exists "Migrant admins can manage payments" on public.migrant_payments;
create policy "Migrant admins can manage payments"
  on public.migrant_payments for all to authenticated
  using (public.is_migrant_admin()) with check (public.is_migrant_admin());

revoke all on public.migrant_applications from anon, authenticated;
revoke all on public.migrant_payments from anon, authenticated;
grant select, update on public.migrant_applications to authenticated;
grant select, update on public.migrant_payments to authenticated;

-- Public application intake. Personal information is written server-side by a constrained definer RPC.
create or replace function public.submit_migrant_application(application_payload jsonb)
returns table(application_number text, tracking_token uuid, status text, payment_status text)
language plpgsql
security definer
set search_path = ''
as $$
declare
  created public.migrant_applications;
begin
  if coalesce(application_payload->>'fullName','') = ''
     or coalesce(application_payload->>'parentName','') = ''
     or coalesce(application_payload->>'dob','') = ''
     or coalesce(application_payload->>'currentCountry','') = ''
     or coalesce(application_payload->>'currentCity','') = ''
     or coalesce(application_payload->>'originDistrict','') = ''
     or coalesce(application_payload->>'emergencyContact','') = ''
     or coalesce(application_payload->>'packageId','') = ''
     or coalesce(application_payload->>'paymentMethod','') = ''
     or coalesce(application_payload->>'transactionReference','') = '' then
    raise exception 'Required application fields are missing.' using errcode = '22023';
  end if;

  insert into public.migrant_applications (
    full_name, parent_name, dob, gender, nationality, identity_number,
    current_country, current_city, origin_district, employment_status, occupation,
    emergency_contact, family_info, package_id, payment_method, crypto_network,
    transaction_reference, profile_photo_path, receipt_path, status, payment_status
  ) values (
    application_payload->>'fullName', application_payload->>'parentName', (application_payload->>'dob')::date,
    application_payload->>'gender', application_payload->>'nationality', nullif(application_payload->>'identityNumber',''),
    application_payload->>'currentCountry', application_payload->>'currentCity', application_payload->>'originDistrict',
    application_payload->>'employmentStatus', application_payload->>'occupation', application_payload->>'emergencyContact',
    nullif(application_payload->>'familyInfo',''), application_payload->>'packageId', application_payload->>'paymentMethod',
    nullif(application_payload->>'cryptoNetwork',''), application_payload->>'transactionReference',
    nullif(application_payload->>'profilePhotoPath',''), nullif(application_payload->>'receiptPath',''),
    'submitted', 'verification_pending'
  ) returning * into created;

  return query select created.application_number, created.tracking_token, created.status, created.payment_status;
end;
$$;
revoke all on function public.submit_migrant_application(jsonb) from public;
grant execute on function public.submit_migrant_application(jsonb) to anon, authenticated;

-- Limited status lookup. The private tracking token is required; no PII or admin notes are returned.
drop function if exists public.track_migrant_application(text, uuid);
create or replace function public.track_migrant_application(p_application_number text, p_tracking_token uuid)
returns table(
  application_number text,
  status text,
  payment_status text,
  created_at timestamptz,
  membership_valid_until date,
  renewal_open boolean,
  latest_renewal_payment_number text,
  latest_renewal_payment_status text
)
language sql
stable
security definer
set search_path = ''
as $$
  select a.application_number, a.status, a.payment_status, a.created_at, a.membership_valid_until,
    (a.status = 'approved' and not exists (
      select 1 from public.migrant_payments p
      where p.application_id = a.id
        and p.billing_period_start = greatest(current_date, coalesce(a.membership_valid_until + 1, current_date))
        and p.payment_status = 'verification_pending'
    )) as renewal_open,
    latest.payment_number,
    latest.payment_status
  from public.migrant_applications a
  left join lateral (
    select p.payment_number, p.payment_status
    from public.migrant_payments p
    where p.application_id = a.id
    order by p.created_at desc
    limit 1
  ) latest on true
  where a.application_number = p_application_number
    and a.tracking_token = p_tracking_token;
$$;
revoke all on function public.track_migrant_application(text, uuid) from public;
grant execute on function public.track_migrant_application(text, uuid) to anon, authenticated;

-- Monthly renewal uses the existing application number+secret token and stores a new payment row.
-- Applicant details are not re-entered and historic payments are never overwritten.
create or replace function public.submit_migrant_renewal(
  p_application_number text,
  p_tracking_token uuid,
  renewal_payload jsonb
)
returns table(payment_number text, billing_period_start date, billing_period_end date, payment_status text)
language plpgsql
security definer
set search_path = ''
as $$
declare
  a public.migrant_applications;
  period_start date;
  period_end date;
  created public.migrant_payments;
begin
  select * into a from public.migrant_applications
  where application_number = p_application_number and tracking_token = p_tracking_token
  for update;
  if not found then raise exception 'Application was not found.' using errcode = 'P0002'; end if;
  if a.status <> 'approved' then raise exception 'Monthly renewal is available only after application approval.' using errcode = '22023'; end if;
  if coalesce(renewal_payload->>'paymentMethod','') = '' or coalesce(renewal_payload->>'transactionReference','') = '' then
    raise exception 'Payment method and transaction reference are required.' using errcode = '22023';
  end if;

  period_start := greatest(current_date, coalesce(a.membership_valid_until + 1, current_date));
  period_end := (period_start + interval '1 month' - interval '1 day')::date;

  insert into public.migrant_payments (
    application_id, billing_period_start, billing_period_end, payment_method,
    crypto_network, transaction_reference, receipt_path, payment_status
  ) values (
    a.id, period_start, period_end, renewal_payload->>'paymentMethod',
    nullif(renewal_payload->>'cryptoNetwork',''), renewal_payload->>'transactionReference',
    nullif(renewal_payload->>'receiptPath',''), 'verification_pending'
  ) returning * into created;

  return query select created.payment_number, created.billing_period_start, created.billing_period_end, created.payment_status;
exception
  when unique_violation then
    raise exception 'A renewal payment is already on file for the current due period.' using errcode = '23505';
end;
$$;
revoke all on function public.submit_migrant_renewal(text, uuid, jsonb) from public;
grant execute on function public.submit_migrant_renewal(text, uuid, jsonb) to anon, authenticated;

-- Admin-only review functions. The client cannot approve an application or payment directly.
create or replace function public.admin_review_migrant_application(
  p_application_id uuid,
  p_status text,
  p_payment_status text default null,
  p_internal_notes text default null
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.is_migrant_admin() then raise exception 'Admin access required.' using errcode = '42501'; end if;
  if p_status not in ('submitted','under_review','payment_verification','approved','rejected') then
    raise exception 'Invalid application status.' using errcode = '22023';
  end if;
  if p_payment_status is not null and p_payment_status not in ('not_submitted','verification_pending','verified','rejected') then
    raise exception 'Invalid payment status.' using errcode = '22023';
  end if;
  update public.migrant_applications
  set status = p_status,
      payment_status = coalesce(p_payment_status, payment_status),
      internal_notes = coalesce(p_internal_notes, internal_notes),
      reviewed_at = now(), updated_at = now(),
      membership_valid_until = case
        when p_status = 'approved' and coalesce(p_payment_status, payment_status) = 'verified'
          then coalesce(membership_valid_until, (current_date + interval '1 month')::date)
        when p_status = 'rejected' then null
        else membership_valid_until
      end
  where id = p_application_id;
  if not found then raise exception 'Application not found.' using errcode = 'P0002'; end if;
end;
$$;
revoke all on function public.admin_review_migrant_application(uuid, text, text, text) from public;
grant execute on function public.admin_review_migrant_application(uuid, text, text, text) to authenticated;

create or replace function public.admin_review_migrant_payment(
  p_payment_id uuid,
  p_status text,
  p_internal_notes text default null
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  pay public.migrant_payments;
begin
  if not public.is_migrant_admin() then raise exception 'Admin access required.' using errcode = '42501'; end if;
  if p_status not in ('verification_pending','verified','rejected') then raise exception 'Invalid payment status.' using errcode = '22023'; end if;
  update public.migrant_payments
  set payment_status = p_status, internal_notes = coalesce(p_internal_notes, internal_notes), reviewed_at = now()
  where id = p_payment_id
  returning * into pay;
  if not found then raise exception 'Renewal payment not found.' using errcode = 'P0002'; end if;
  if p_status = 'verified' then
    update public.migrant_applications
    set membership_valid_until = greatest(coalesce(membership_valid_until, pay.billing_period_start - 1), pay.billing_period_end),
        payment_status = 'verified', updated_at = now()
    where id = pay.application_id and status = 'approved';
  end if;
end;
$$;
revoke all on function public.admin_review_migrant_payment(uuid, text, text) from public;
grant execute on function public.admin_review_migrant_payment(uuid, text, text) to authenticated;

-- Private documents: applicants may upload only their own random-path files through the public flow;
-- only a role-claim admin can list/download them. Set bucket limits even if an older bucket exists.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('migrant-documents','migrant-documents',false,5242880,array['image/jpeg','image/png','image/webp','application/pdf'])
on conflict (id) do update set public = false, file_size_limit = 5242880,
  allowed_mime_types = array['image/jpeg','image/png','image/webp','application/pdf'];

drop policy if exists "Applicants can upload migrant documents" on storage.objects;
drop policy if exists "Migrant applicants can upload documents" on storage.objects;
create policy "Migrant applicants can upload documents"
  on storage.objects for insert to anon, authenticated
  with check (
    bucket_id = 'migrant-documents'
    and (storage.foldername(name))[1] in ('profiles','receipts','renewals')
  );
drop policy if exists "Migrant admins can read documents" on storage.objects;
create policy "Migrant admins can read documents"
  on storage.objects for select to authenticated
  using (bucket_id = 'migrant-documents' and public.is_migrant_admin());

commit;

-- ADMIN SETUP (run after creating an admin account in Supabase Authentication):
-- update auth.users
-- set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"migrant_admin"}'::jsonb
-- where email = 'YOUR-ADMIN-EMAIL';
-- Then sign in at /admin using that Supabase Auth email/password.
