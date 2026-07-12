import Team from "@/pages/team";

/* Dedicated, SEO-friendly route for the "Global Leadership" pillar (the
   diaspora chapters). Renders the shared Team page pre-set to the
   "global" screen so this URL is directly linkable and crawlable. */
export default function GlobalLeadership() {
  return <Team initialScreen="global" />;
}
