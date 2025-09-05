import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import { setupPWA } from "@/lib/pwa";
import Landing from "@/pages/landing";
import Dashboard from "@/pages/dashboard";
import NotFound from "@/pages/not-found";
import "@/lib/i18n";

function Router() {
  const [farmer, setFarmer] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored farmer data
    const storedFarmer = localStorage.getItem('farmwise-farmer');
    if (storedFarmer) {
      try {
        setFarmer(JSON.parse(storedFarmer));
      } catch (error) {
        console.error('Error parsing stored farmer data:', error);
        localStorage.removeItem('farmwise-farmer');
      }
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading FarmWise...</p>
        </div>
      </div>
    );
  }

  return (
    <Switch>
      <Route path="/">
        {farmer ? (
          <Dashboard farmer={farmer} onLogout={() => setFarmer(null)} />
        ) : (
          <Landing onLogin={setFarmer} />
        )}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    setupPWA();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
