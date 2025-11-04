import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import ComingSoon from "./pages/ComingSoon";
import WaitlistAdmin from "./pages/WaitlistAdmin";
import AnalyticsAdmin from "./pages/AnalyticsAdmin";
import Quiz from "./pages/Quiz";
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
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ComingSoon />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/admin/waitlist" element={<WaitlistAdmin />} />
            <Route path="/admin/analytics" element={<AnalyticsAdmin />} />
            {/* All other routes show Coming Soon page during domain migration */}
            <Route path="*" element={<ComingSoon />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
