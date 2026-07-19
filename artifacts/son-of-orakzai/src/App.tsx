import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import Services from "@/pages/services";
import Community from "@/pages/community";
import Join from "@/pages/join";
import Impact from "@/pages/impact";
import Donate from "@/pages/donate";
import Blog from "@/pages/blog";
import Contact from "@/pages/contact";
import Dashboard from "@/pages/dashboard";
import Team from "@/pages/team";
import TeamProfile from "@/pages/team-profile";
import BoardAdvisor from "@/pages/board-advisor";
import OrakzaiRepresentative from "@/pages/orakzai-representative";
import BeneficiaryMember from "@/pages/beneficiary-member";
import GlobalLeadership from "@/pages/global-leadership";
import MigrantWelfare from "@/pages/migrant-welfare";
import RightsRepresentation from "@/pages/rights-representation";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/community" component={Community} />
      <Route path="/team" component={Team} />
      <Route path="/board-advisor" component={BoardAdvisor} />
      <Route path="/orakzai-representative" component={OrakzaiRepresentative} />
      <Route path="/beneficiary-member" component={BeneficiaryMember} />
      <Route path="/global-leadership" component={GlobalLeadership} />
      <Route path="/migrant-welfare" component={MigrantWelfare} />
      <Route path="/rights-representation" component={RightsRepresentation} />
      <Route path="/team/:slug" component={TeamProfile} />
      <Route path="/board-advisor/:slug" component={TeamProfile} />
      <Route path="/orakzai-representative/:slug" component={TeamProfile} />
      <Route path="/beneficiary-member/:slug" component={TeamProfile} />
      <Route path="/global-leadership/:slug" component={TeamProfile} />
      <Route path="/join" component={Join} />
      <Route path="/impact" component={Impact} />
      <Route path="/donate" component={Donate} />
      <Route path="/blog" component={Blog} />
      <Route path="/contact" component={Contact} />
      <Route path="/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
