import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "@/hooks/useLanguage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import Features from "./pages/Features";
import HowItWorks from "./pages/HowItWorks";
import Pricing from "./pages/Pricing";
import PricingNew from "./pages/PricingNew";
import PricingDetailed from "./pages/PricingDetailed";
import ServicesOverview from "./pages/ServicesOverview";
import Integrations from "./pages/Integrations";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import Tutorials from "./pages/Tutorials";
import Support from "./pages/Support";
import Contact from "./pages/Contact";
import GetStarted from "./pages/GetStarted";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Subscription from "./pages/Subscription";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Help from "./pages/Help";
import Dashboard from "./pages/dashboard/Dashboard";
import Analytics from "./pages/dashboard/Analytics";
import AIContent from "./pages/dashboard/AIContent";
import WhatsApp from "./pages/dashboard/WhatsApp";
import Ads from "./pages/dashboard/Ads";
import Festivals from "./pages/dashboard/Festivals";
import FestivalsModern from "./pages/dashboard/FestivalsModern";
import BusinessProfile from "./pages/dashboard/BusinessProfile";
import SEO from "./pages/dashboard/SEO";
import SocialMedia from "./pages/dashboard/SocialMedia";
import EmailMarketing from "./pages/dashboard/EmailMarketing";
import LeadManagement from "./pages/dashboard/LeadManagement";
import ReferralProgram from "./pages/dashboard/ReferralProgram";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/features" element={<Features />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/pricing" element={<Subscription />} />
            <Route path="/pricing-new" element={<PricingNew />} />
            <Route path="/pricing-detailed" element={<PricingDetailed />} />
            <Route path="/services" element={<ServicesOverview />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/support" element={<Support />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/help" element={<Help />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/analytics" element={<Analytics />} />
            <Route path="/dashboard/ai-content" element={<AIContent />} />
            <Route path="/dashboard/whatsapp" element={<WhatsApp />} />
            <Route path="/dashboard/ads" element={<Ads />} />
            <Route path="/dashboard/festivals" element={<Festivals />} />
            <Route path="/dashboard/festivals-modern" element={<FestivalsModern />} />
            <Route
              path="/dashboard/business-profile"
              element={<BusinessProfile />}
            />
            <Route path="/dashboard/seo" element={<SEO />} />
            <Route path="/dashboard/social-media" element={<SocialMedia />} />
            <Route
              path="/dashboard/email-marketing"
              element={<EmailMarketing />}
            />
            <Route
              path="/dashboard/lead-management"
              element={<LeadManagement />}
            />
            <Route
              path="/dashboard/referral-program"
              element={<ReferralProgram />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
