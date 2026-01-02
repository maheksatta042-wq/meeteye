import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { TopBanner } from './components/TopBanner';
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
import { PaymentGatewayPage } from './components/PaymentGatewayPage';
import { PartnerDashboard } from './components/PartnerDashboard';
import { AdminDashboard } from './components/AdminDashboard';

type ViewState = 'landing' | 'checkout' | 'payment' | 'dashboard';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: string;
    period: string;
  } | null>(null);
  const [currentUser, setCurrentUser] = useState<{
    type: 'partner' | 'admin' | null;
    name: string;
  } | null>(null);

  const handlePlanSelect = (plan: { name: string; price: string; period: string }) => {
    setSelectedPlan(plan);
    setIsLoginModalOpen(true);
  };

  const handleLogin = (type: 'partner' | 'admin', name: string) => {
    setIsLoginModalOpen(false);
    
    // If a plan was selected, show checkout page
    if (selectedPlan) {
      setCurrentView('checkout');
    } else {
      // Otherwise go directly to dashboard
      setCurrentUser({ type, name });
      setCurrentView('dashboard');
    }
  };

  const handlePaymentComplete = () => {
    setCurrentView('payment');
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

  // Show checkout page
  if (currentView === 'checkout' && selectedPlan) {
    return (
      <CheckoutPage
        selectedPlan={selectedPlan}
        onPaymentComplete={handlePaymentComplete}
        onBack={handleBackToPricing}
      />
    );
  }

  // Show payment gateway page
  if (currentView === 'payment' && selectedPlan) {
    return (
      <PaymentGatewayPage
        selectedPlan={selectedPlan}
        onSuccess={handlePaymentSuccess}
      />
    );
  }

  // Show dashboards
  if (currentView === 'dashboard') {
    if (currentUser?.type === 'partner') {
      return <PartnerDashboard userName={currentUser.name} onLogout={handleLogout} />;
    }

    if (currentUser?.type === 'admin') {
      return <AdminDashboard userName={currentUser.name} onLogout={handleLogout} />;
    }
  }

  // Show landing page
  return (
    <div className="min-h-screen bg-white">
      <Navbar onLoginClick={() => setIsLoginModalOpen(true)} />
      <TopBanner />
      <HeroSection onLoginClick={() => setIsLoginModalOpen(true)} />
      <FeaturesSection />
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
  );
}