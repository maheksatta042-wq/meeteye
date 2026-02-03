import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { TopBanner } from "./components/TopBanner";
import { useNavigate } from "react-router-dom";
import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { ProductSection } from "./components/ProductSection";
import { PricingSection } from "./components/PricingSection";
import { WhyChooseUsSection } from "./components/WhyChooseUsSection";
import { PartnersPage } from "./components/PartnersPage.tsx";
import { FAQSection } from "./components/FAQSection";
import { Footer } from "./components/Footer";
import { LoginModal } from "./components/LoginModal";
import { CheckoutPage } from "./components/CheckoutPage";
import { HowItWorksSection } from "./components/HowitWorks";
import { Routes, Route, Navigate } from "react-router-dom";
import { PaymentSuccess } from "./components/PaymentSuccess";
import Tutorial_Page from "./components/Tutorial_Page";
import { PartnerDashboard } from "./components/PartnerDashboard";
import { AdminDashboard } from "./components/AdminDashboard";
import { BecomePartnerPage } from "./components/BecomePartnerPage";

type ViewState = "landing" | "checkout" | "dashboard";

type BillingCycle = "monthly" | "quarterly" | "half-yearly" | "yearly";

export default function App() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<ViewState>("landing");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginTriggeredFromPlan, setLoginTriggeredFromPlan] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    licenseId: string;
    name: string;
    price: string;
    period: string;
    billingCycle: BillingCycle;
  } | null>(null);
  const [currentUser, setCurrentUser] = useState<{
    type: "partner" | "admin" | null;
    name: string;
  } | null>(null);

  const handlePlanSelect = (plan: {
    licenseId: string;
    name: string;
    price: string;
    period: string;
    billingCycle: BillingCycle;
  }) => {
    setSelectedPlan(plan);
    
    // Check if user is already logged in
    const userStr = localStorage.getItem("user");
    if (userStr) {
      // User is logged in, go directly to checkout
      navigate("/checkout");
    } else {
      // User not logged in, show login modal
      setLoginTriggeredFromPlan(true);
      setIsLoginModalOpen(true);
    }
  };

  const handleLogin = (type: "partner" | "admin", name: string) => {
    setIsLoginModalOpen(false);
    setCurrentUser({ type, name });

    // If login was triggered from plan selection, navigate to checkout
    if (loginTriggeredFromPlan && selectedPlan) {
      setLoginTriggeredFromPlan(false);
      navigate("/checkout");
    }
  };

  const handlePaymentComplete = (_email: string) => {
    setCurrentView("dashboard");
  };

  const handlePaymentSuccess = () => {
    setCurrentUser({ type: "admin", name: "User" });
    setCurrentView("dashboard");
    setSelectedPlan(null);
  };

  const handleBackToPricing = () => {
    navigate("/");
    setSelectedPlan(null);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView("landing");
    setSelectedPlan(null);
  };

  // // Show dashboards
  // if (currentView === 'dashboard') {
  //   if (currentUser?.type === 'partner') {
  //     return <PartnerDashboard userName={currentUser.name} onLogout={handleLogout} />;
  //   }

  //   if (currentUser?.type === 'admin') {
  //     return <AdminDashboard userName={currentUser.name} onLogout={handleLogout} />;
  //   }
  // }

  // Show landing page
  return (
    <Routes>
      {/* Landing */}
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-white">
            <Navbar 
              onLoginClick={() => {
                setLoginTriggeredFromPlan(false);
                setIsLoginModalOpen(true);
              }} 
            />
            <TopBanner />
            <HeroSection 
              onLoginClick={() => {
                setLoginTriggeredFromPlan(false);
                setIsLoginModalOpen(true);
              }} 
            />
            <FeaturesSection />
            <HowItWorksSection />
            <ProductSection />
            <WhyChooseUsSection />
            <PricingSection onPlanSelect={handlePlanSelect} />
            <FAQSection />
            <Footer />

            <LoginModal
              isOpen={isLoginModalOpen}
              onClose={() => {
                setIsLoginModalOpen(false);
                setSelectedPlan(null);
                setLoginTriggeredFromPlan(false);
              }}
              onLogin={handleLogin}
              fromPlanSelection={loginTriggeredFromPlan}
            />
          </div>
        }
      />

      {/* Tutorial */}
      <Route path="/tutorial" element={<Tutorial_Page />} />

      {/* Checkout */}
      <Route
        path="/checkout"
        element={
          selectedPlan ? (
            <CheckoutPage
              selectedPlan={selectedPlan}
              onPaymentComplete={handlePaymentComplete}
              onBack={handleBackToPricing}
            />
          ) : (
            <div className="p-10 text-center">No plan selected</div>
          )
        }
      />

      {/* Payment Success */}
      <Route path="/payment-success" element={<PaymentSuccess />} />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-3xl font-bold">Welcome to WorkEye Dashboard</h1>
          </div>
        }
      />

      {/* Partners Page */}
      <Route
        path="/partners"
        element={
          <PartnersPage
            onBecomePartnerClick={() => navigate("/become-partner")}
            onPartnerLoginClick={() => {
              setLoginTriggeredFromPlan(false);
              setIsLoginModalOpen(true);
            }}
            onBackToHome={() => navigate("/")}
            onNavigateToSection={(section) => {
              navigate("/");
              setTimeout(() => {
                const element = document.querySelector(`#${section}`);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }, 100);
            }}
          />
        }
      />

      {/* Become Partner Page */}
      <Route
        path="/become-partner"
        element={
          <BecomePartnerPage
            onBackToPartners={() => navigate("/partners")}
            onPartnerLoginClick={() => {
              setLoginTriggeredFromPlan(false);
              setIsLoginModalOpen(true);
            }}
            onBackToHome={() => navigate("/")}
            onNavigateToSection={(section) => {
              navigate("/");
              setTimeout(() => {
                const element = document.querySelector(`#${section}`);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }, 100);
            }}
          />
        }
      />
    </Routes>
  );
}