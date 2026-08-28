import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { SiteSettingsProvider } from "./contexts/SiteSettingsContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import About from "./pages/About";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import BlogDetail from "./pages/BlogDetail";
import BlogList from "./pages/BlogList";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import CaseStudies from "./pages/CaseStudies";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import IndustryLanding from "./pages/IndustryLanding";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ServiceDetail from "./pages/ServiceDetail";
import ServicesOverview from "./pages/ServicesOverview";
import ThankYou from "./pages/ThankYou";

function RouteScrollReset() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  return null;
}

function UnauthorizedSessionRedirect() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const redirectToLogin = () => setLocation("/admin/login");
    window.addEventListener("boostvertex:unauthorized", redirectToLogin);
    return () => window.removeEventListener("boostvertex:unauthorized", redirectToLogin);
  }, [setLocation]);

  return null;
}

function Router() {
  return (
    <>
      <RouteScrollReset />
      <UnauthorizedSessionRedirect />
      <Switch>
        <Route path="/admin" component={AdminLogin} />
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin/forgot-password" component={AdminLogin} />
        <Route path="/admin/reset-password" component={AdminLogin} />
        <Route path="/admin/dashboard" component={AdminDashboard} />
        <Route path="/admin/:module" component={AdminDashboard} />
        <Route path={"/"} component={Home} />
        <Route path={"/about"} component={About} />
        <Route path={"/services"} component={ServicesOverview} />
        <Route path={"/services/:slug"} component={ServiceDetail} />
        <Route path={"/case-studies"} component={CaseStudies} />
        <Route path={"/case-studies/:slug"} component={CaseStudyDetail} />
        <Route path={"/blog"} component={BlogList} />
        <Route path={"/blog/:slug"} component={BlogDetail} />
        <Route path={"/industries"} component={IndustryLanding} />
        <Route path={"/industries/:slug"} component={IndustryLanding} />
        <Route path={"/contact"} component={Contact} />
        <Route path={"/privacy-policy"} component={PrivacyPolicy} />
        <Route path={"/thank-you"} component={ThankYou} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <SiteSettingsProvider><Router /></SiteSettingsProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
