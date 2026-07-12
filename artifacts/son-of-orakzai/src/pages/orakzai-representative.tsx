import Team from "@/pages/team";

/* Dedicated, SEO-friendly route for the "Orakzai Representatives" pillar
   (the 19 tribal qoum councils). Renders the shared Team page pre-set to
   the "representatives" screen so this URL is directly linkable. */
export default function OrakzaiRepresentative() {
  return <Team initialScreen="representatives" />;
}
