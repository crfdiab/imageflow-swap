import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import DataProtection from "./pages/DataProtection";
import Terms from "./pages/Terms";
import { BackToTop } from "./components/BackToTop";
import { GoogleTagManager } from "./components/GoogleTagManager";
import { GoogleAnalytics } from "./components/GoogleAnalytics";

// Your GTM ID
const GTM_ID = 'GTM-PFH5MKLB';

// Your GA ID
const GA_MEASUREMENT_ID = 'G-N2MZSTTKB4';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <GoogleTagManager gtmId={GTM_ID} />
        <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/data-protection" element={<DataProtection />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/" element={<Index />} />
          <Route path="/:slug" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BackToTop />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
