# Supabase setup — Migrant Welfare

Naye Supabase project mein application RPC abhi maujood nahi. Is setup ke baad application submit, status tracking, admin review aur monthly renewal database se kaam kareinge.

## 1. Migration run karein

1. [Supabase project dashboard](https://supabase.com/dashboard/project/plqpbuzfebqtxoqcxlcr) kholen.
2. **SQL Editor → New query** par jayein.
3. [Migration SQL file](./supabase_migrant_welfare_migration.sql) ka poora content copy karke editor mein paste karein.
4. **Run** dabayein. SQL Editor mein success/green result aane tak page band na karein.

Migration public application submission aur token-protected status lookup deti hai. Applicant personal details dobara enter kiye baghair application number + secure tracking token se monthly payment/receipt jama kar sakta hai. Har payment alag ledger record hoti hai.

## 2. Admin account banayein

1. Supabase mein **Authentication → Users → Add user** se apna admin email aur naya strong password wala user banayein.
2. SQL Editor mein neeche wala command chalayein. `YOUR-ADMIN-EMAIL` ki jagah wohi email likhein jo abhi banayi hai:

```sql
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"migrant_admin"}'::jsonb
where email = 'YOUR-ADMIN-EMAIL';
```

3. Website ke `/admin` par us Supabase Auth account se login karein. Purana hardcoded admin password ab istemal nahi hota.

## 3. Payment review

Admin dashboard mein nayi applications ko review/approve/reject karein. Monthly renewal ki har payment alag **Migrant Renewal Payments** section mein aayegi. Verified payment se membership ki valid-through date update hogi; rejected attempt history mein rahegi aur user usi due period ke liye dobara payment submit kar sakega.

## Security

Chat mein Supabase `sb_secret_…`, GitHub token aur Vercel token expose hue hain. Supabase secret key ko revoke/rotate karein. GitHub Personal Access Token aur Vercel token ko bhi rotate karke purane tokens revoke karein. Browser app mein sirf publishable/anon key rehni chahiye—service-role/secret key kabhi nahi.
