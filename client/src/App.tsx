import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";

function Router() {
  return (
    <Switch>
      <Route path="/:rest*" component={Home} />
    </Switch>
  );
}


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>

        <div
          style={{
            position: "fixed",
            bottom: 0,
            right: 0,
            background: "red",
            color: "white",
            padding: "6px",
            zIndex: 9999,
          }}
        >
          FRONTEND NUEVO
        </div>

        <Toaster />
        <h1 style={{ color: "green" }}>ANTES DEL ROUTER</h1>
        <Home />
        <h1 style={{ color: "purple" }}>DESPUÉS DEL ROUTER</h1>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
export default App;
