import { useState, useEffect } from "react";
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

  // Load selected plan from sessionStorage on mount
  useEffect(() => {
    const savedPlan = sessionStorage.getItem("selectedPlan");
    if (savedPlan) {
      try {
        setSelectedPlan(JSON.parse(savedPlan));
      } catch (e) {
        console.error("Failed to parse saved plan", e);
      }
    }
  }, []);

  const handlePlanSelect = (plan: {
    licenseId: string;
    name: string;
    price: string;
    period: string;
    billingCycle: BillingCycle;
  }) => {
    setSelectedPlan(plan);
    
    // Save plan to sessionStorage so it persists across login
    sessionStorage.setItem("selectedPlan", JSON.stringify(plan));
    
    // Check if user is already logged in
    const userStr = localStorage.getItem("user");
    if (userStr) {
      // User is logged in, go directly to checkout with user ID
      const user = JSON.parse(userStr);
      const userId = user.customerId;
      navigate(`/checkout/${userId}`);
    } else {
      // User not logged in, show login modal
      setLoginTriggeredFromPlan(true);
      setIsLoginModalOpen(true);
    }
  };

  const handleLogin = (type: "partner" | "admin", name: string) => {
    setIsLoginModalOpen(false);
    setCurrentUser({ type, name });

    // If login was triggered from plan selection, navigate to checkout with user ID
    if (loginTriggeredFromPlan) {
      setLoginTriggeredFromPlan(false);
      
      // Get user from localStorage to extract ID
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        const userId = user.customerId;
        navigate(`/checkout/${userId}`);
      }
    }
  };

  const handlePaymentComplete = (_email: string) => {
    // Clear selected plan from sessionStorage after payment
    sessionStorage.removeItem("selectedPlan");
    setCurrentView("dashboard");
  };

  const handlePaymentSuccess = () => {
    setCurrentUser({ type: "admin", name: "User" });
    setCurrentView("dashboard");
    setSelectedPlan(null);
    sessionStorage.removeItem("selectedPlan");
  };

  const handleBackToPricing = () => {
    navigate("/");
    // Don't clear the plan here, in case user wants to come back
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView("landing");
    setSelectedPlan(null);
    sessionStorage.removeItem("selectedPlan");
  };

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

      {/* Checkout with User ID in URL */}
      <Route
        path="/checkout/:userId"
        element={
          selectedPlan ? (
            <CheckoutPage
              selectedPlan={selectedPlan}
              onPaymentComplete={handlePaymentComplete}
              onBack={handleBackToPricing}
            />
          ) : (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No plan selected</h2>
                <p className="text-gray-600 mb-4">Please select a plan from our pricing page</p>
                <button
                  onClick={() => navigate("/")}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Go to Pricing
                </button>
              </div>
            </div>
          )
        }
      />

      {/* Fallback redirect for old /checkout route */}
      <Route
        path="/checkout"
        element={
          (() => {
            const userStr = localStorage.getItem("user");
            if (userStr) {
              const user = JSON.parse(userStr);
              const userId = user.customerId;
              return <Navigate to={`/checkout/${userId}`} replace />;
            }
            return <Navigate to="/" replace />;
          })()
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