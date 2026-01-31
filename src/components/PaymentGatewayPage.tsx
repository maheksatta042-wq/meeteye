import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { CheckCircle2, Loader2, CreditCard, Shield, Lock } from 'lucide-react';
import { Logo } from './Logo';

interface PaymentGatewayPageProps {
  selectedPlan: {
    name: string;
    price: string;
    period: string;
  };
  onSuccess: () => void;
}

export function PaymentGatewayPage({ selectedPlan, onSuccess }: PaymentGatewayPageProps) {
  const [isProcessing, setIsProcessing] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setIsProcessing(true);
    setIsSuccess(false);
    
    // Simulate payment processing
    const timer = setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleComplete = () => {
    onSuccess();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Logo />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          {isProcessing ? (
            <div className="bg-white rounded-2xl shadow-2xl p-12">
              <div className="flex flex-col items-center justify-center space-y-8">
                <div className="relative">
                  <Loader2 className="h-24 w-24 text-blue-600 animate-spin" />
                  <CreditCard className="h-12 w-12 text-blue-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div className="text-center space-y-3">
                  <h1 className="text-3xl">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Processing Payment
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600">Please wait while we process your payment...</p>
                  <p className="text-sm text-gray-500">This may take a few moments</p>
                </div>
                <div className="flex items-center gap-3 text-gray-600 bg-gray-50 px-6 py-3 rounded-lg">
                  <Shield className="h-5 w-5" />
                  <span>Secure payment powered by Stripe</span>
                </div>
                
                {/* Progress Animation */}
                <div className="w-full max-w-md">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          ) : isSuccess ? (
            <div className="bg-white rounded-2xl shadow-2xl p-12">
              <div className="flex flex-col items-center justify-center space-y-8">
                <div className="relative">
                  <div className="h-28 w-28 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-16 w-16 text-green-600" />
                  </div>
                </div>
                <div className="text-center space-y-3">
                  <h1 className="text-4xl">
                    <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      Payment Successful!
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600">
                    Your {selectedPlan.name} plan is now active
                  </p>
                  <p className="text-gray-500">
                    Welcome to WorkEye! You're all set to start tracking.
                  </p>
                </div>

                {/* Payment Summary */}
                <div className="w-full max-w-md bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 space-y-4 border border-gray-200">
                  <h3 className="text-center text-gray-600 mb-4">Payment Summary</h3>
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Plan</span>
                    <span className="font-semibold text-gray-900">{selectedPlan.name}</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Amount</span>
                    <span className="font-semibold text-gray-900">${selectedPlan.price}/{selectedPlan.period.split('/')[1]}</span>
                  </div>
                  <div className="flex justify-between text-base pt-3 border-t border-gray-200">
                    <span className="text-gray-600">Status</span>
                    <span className="font-semibold text-green-600 flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-600 rounded-full animate-pulse"></div>
                      Active
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
                  <Lock className="h-4 w-4" />
                  <span>Your payment information is encrypted and secure</span>
                </div>

                <Button
                  onClick={handleComplete}
                  size="lg"
                  className="w-full max-w-md bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-14 text-lg"
                >
                  Continue to Dashboard
                </Button>

                <p className="text-xs text-gray-500 text-center max-w-md">
                  A confirmation email has been sent to your registered email address with your receipt and subscription details.
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}