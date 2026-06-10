import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import NotFound from "@/pages/not-found";

import Home from "@/pages/home";
import School from "@/pages/school";
import Canteen from "@/pages/canteen";
import FoodOptions from "@/pages/food-options";
import QuadCafe from "@/pages/quad-cafe";
import LetsGo from "@/pages/lets-go";
import AndesParty from "@/pages/andes-party";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch location={location} key={location}>
        <Route path="/" component={Home} />
        <Route path="/school" component={School} />
        <Route path="/ntu-canteens" component={Canteen} />
        <Route path="/north-spine" component={FoodOptions} />
        <Route path="/quad-cafe" component={QuadCafe} />
        <Route path="/lets-go" component={LetsGo} />
        <Route path="/andes-party" component={AndesParty} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <div className="min-h-[100dvh] w-full overflow-hidden relative font-sans">
            <AnimatedRoutes />
          </div>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
