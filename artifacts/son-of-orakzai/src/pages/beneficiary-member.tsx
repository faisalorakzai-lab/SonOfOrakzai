import Team from "@/pages/team";

/* Dedicated, SEO-friendly route for the "Beneficiary Members" pillar.
   Renders the shared Team page pre-set to the "beneficiaries" screen so
   this URL is directly linkable and crawlable on its own. */
export default function BeneficiaryMember() {
  return <Team initialScreen="beneficiaries" />;
}
