import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect } from "react";
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
import { SchemaMarkup } from "./components/SchemaMarkup";
import { OpenGraphTags } from "./components/OpenGraphTags";
import { ThemeProvider } from "./components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import { HrefLangTags } from "@/components/HrefLangTags";
import { 
  SUPPORTED_LANGUAGES, 
  DEFAULT_LANGUAGE, 
  LanguageCode,
  getLanguageFromPath
} from "@/utils/languageUtils";

// Your GTM ID
const GTM_ID = 'GTM-PFH5MKLB';

// Your GA ID
const GA_MEASUREMENT_ID = 'G-N2MZSTTKB4';

// Your GSC verification code
const GSC_VERIFICATION = '8-rQ4_lnC31bCaMY4LvanL05kMfaL7uI6gmpmFqEpEo';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Add the verification meta tag directly to the document head
const addVerificationTag = () => {
  const meta = document.createElement('meta');
  meta.name = 'google-site-verification';
  meta.content = GSC_VERIFICATION;
  document.head.appendChild(meta);
};

// Remove unwanted scripts
const removeUnwantedScripts = () => {
  // Remove the GPT Engineer script from both head and body
  const removeScriptFromElement = (element: HTMLElement) => {
    const scripts = element.querySelectorAll('script');
    scripts.forEach(script => {
      if (script.src && script.src.includes('cdn.gpteng.co/gptengineer.js')) {
        script.remove();
        console.log(`Removed GPT Engineer script from ${element === document.head ? 'head' : 'body'}`);
      }
    });
  };
  
  // Check both head and body
  removeScriptFromElement(document.head);
  removeScriptFromElement(document.body);
  
  // Override appendChild for both head and body
  const overrideAppendChild = (element: HTMLElement) => {
    const originalAppendChild = element.appendChild;
    element.appendChild = function(node) {
      if (node.nodeName === 'SCRIPT' && 
          node instanceof HTMLScriptElement && 
          node.src && 
          node.src.includes('cdn.gpteng.co/gptengineer.js')) {
        console.log(`Blocked GPT Engineer script injection in ${element === document.head ? 'head' : 'body'}`);
        return document.createElement('script'); // Return a dummy script
      }
      return originalAppendChild.call(this, node);
    } as any;
  };
  
  // Override for both head and body
  overrideAppendChild(document.head);
  overrideAppendChild(document.body);
};

// Call these functions when the app loads
if (typeof document !== 'undefined') {
  addVerificationTag();
  removeUnwantedScripts();
}

const App = () => {
  // Also run the removal on component mount to ensure it happens after React hydration
  useEffect(() => {
    removeUnwantedScripts();
    
    // Set up a MutationObserver to detect and remove the script if it gets added later
    const observeElement = (element: HTMLElement) => {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeName === 'SCRIPT' && 
                  node instanceof HTMLScriptElement && 
                  node.src && 
                  node.src.includes('cdn.gpteng.co/gptengineer.js')) {
                node.remove();
                console.log(`Removed dynamically added GPT Engineer script from ${element === document.head ? 'head' : 'body'}`);
              }
            });
          }
        });
      });
      
      // Start observing the element for script additions
      observer.observe(element, { childList: true, subtree: true });
      return observer;
    };
    
    // Observe both head and body
    const headObserver = observeElement(document.head);
    const bodyObserver = observeElement(document.body);
    
    // Clean up the observers when component unmounts
    return () => {
      headObserver.disconnect();
      bodyObserver.disconnect();
    };
  }, []);

  return (
    <ThemeProvider defaultTheme="system" storageKey="convertify-theme">
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
          <Router>
            <GoogleTagManager gtmId={GTM_ID} />
            <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
            <SchemaMarkup />
            <OpenGraphTags />
            <LanguageProvider>
              <HrefLangTags />
        <Routes>
                {/* Redirect root to default language */}
          <Route path="/" element={<Index />} />
                
                {/* Language-specific routes */}
                {SUPPORTED_LANGUAGES.map(lang => (
                  <Route key={lang.code} path={`/${lang.code}`} element={<Index />} />
                ))}
                
                {/* Format conversion routes with language prefix */}
          <Route path="/:slug" element={<Index />} />
                {SUPPORTED_LANGUAGES.map(lang => (
                  <Route key={`${lang.code}-slug`} path={`/${lang.code}/:slug`} element={<Index />} />
                ))}
                
                {/* Static pages with language prefix */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
                
                {SUPPORTED_LANGUAGES.map(lang => (
                  <React.Fragment key={`${lang.code}-static`}>
                    <Route path={`/${lang.code}/about`} element={<About />} />
                    <Route path={`/${lang.code}/contact`} element={<Contact />} />
                    <Route path={`/${lang.code}/privacy`} element={<Privacy />} />
                    <Route path={`/${lang.code}/terms`} element={<Terms />} />
                  </React.Fragment>
                ))}
                
                {/* 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
            </LanguageProvider>
            <BackToTop />
          </Router>
    </TooltipProvider>
  </QueryClientProvider>
    </ThemeProvider>
);
};

export default App;
