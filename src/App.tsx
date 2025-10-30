import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ComingSoon from "./pages/ComingSoon";
// Temporarily disabled routes during migration
// import Index from "./pages/Index";
// import Checkout from "./pages/Checkout";
// import PaymentSuccess from "./pages/PaymentSuccess";
// import NotFound from "./pages/NotFound";
// import FamilyLyfeFix from "./pages/FamilyLyfeFix";
// import EstatePlanningChecklist from "./pages/EstatePlanningChecklist";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* All routes show Coming Soon page during domain migration */}
            <Route path="*" element={<ComingSoon />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
