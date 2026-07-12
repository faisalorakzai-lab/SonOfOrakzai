import Team from "@/pages/team";

/* Dedicated, SEO-friendly route for the "Board & Advisors" institutional
   pillar. Renders the shared Team page pre-set to the "board" screen so
   this URL is directly linkable and crawlable on its own. */
export default function BoardAdvisor() {
  return <Team initialScreen="board" />;
}
