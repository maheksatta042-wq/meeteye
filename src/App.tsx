import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { TopBanner } from './components/TopBanner';
import { useNavigate } from "react-router-dom";
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { ProductSection } from './components/ProductSection';
import { PricingSection } from './components/PricingSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { PartnerProgramSection } from './components/PartnerProgramSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { LoginModal } from './components/LoginModal';
import { CheckoutPage } from './components/CheckoutPage';
import { HowItWorksSection } from './components/HowitWorks';
import { Routes, Route, Navigate } from "react-router-dom";
import { PaymentSuccess } from "./components/PaymentSuccess";
<<<<<<< HEAD
import Tutorial_Page from "./components/Tutorial_Page";
=======
>>>>>>> 64a457dd1ee076ecc0ae57344bbbee613276fe0d
import { PartnerDashboard } from "./components/PartnerDashboard";
import { AdminDashboard } from "./components/AdminDashboard";

type ViewState = 'landing' | 'checkout' | 'dashboard';

export default function App() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
  licenseId: string;
  name: string;
  price: string;
  period: string;
} | null>(null);
  const [currentUser, setCurrentUser] = useState<{
    type: 'partner' | 'admin' | null;
    name: string;
  } | null>(null);

  const handlePlanSelect = (plan: {
    licenseId: string;
    name: string;
    price: string;
    period: string;
  }) => {
    setSelectedPlan(plan);
    setIsLoginModalOpen(true);
  };

  const handleLogin = (type: 'partner' | 'admin', name: string) => {
    setIsLoginModalOpen(false);
    
    // If a plan was selected, show checkout page
    if (selectedPlan) {
      navigate("/checkout");
    } else {
      // Otherwise go directly to dashboard
      setCurrentUser({ type, name });
      setCurrentView('dashboard');
    }
  };

  const handlePaymentComplete = (_email: string) => {
    setCurrentView('dashboard');
  };

  const handlePaymentSuccess = () => {
    setCurrentUser({ type: 'admin', name: 'User' });
    setCurrentView('dashboard');
    setSelectedPlan(null);
  };

  const handleBackToPricing = () => {
    setCurrentView('landing');
    setSelectedPlan(null);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('landing');
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
            <Navbar onLoginClick={() => setIsLoginModalOpen(true)} />
            <TopBanner />
            <HeroSection onLoginClick={() => setIsLoginModalOpen(true)} />
            <FeaturesSection />
            <HowItWorksSection />
            <ProductSection />
            <PricingSection onPlanSelect={handlePlanSelect} />
            <WhyChooseUsSection />
            <PartnerProgramSection />
            <FAQSection />
            <Footer />

            <LoginModal
              isOpen={isLoginModalOpen}
              onClose={() => {
                setIsLoginModalOpen(false);
                setSelectedPlan(null);
              }}
              onLogin={handleLogin}
            />
          </div>
        }
      />

<<<<<<< HEAD
      {/* Tutorial */}
    <Route
     path="/tutorial"
     element={<Tutorial_Page />}
    />

=======
>>>>>>> 64a457dd1ee076ecc0ae57344bbbee613276fe0d
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
      <Route
        path="/payment-success"
        element={<PaymentSuccess />}
      />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-3xl font-bold">Welcome to WorkEye Dashboard</h1>
          </div>
        }
      />
    </Routes>
  );
}