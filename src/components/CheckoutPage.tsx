import { useState } from 'react';
import { Button } from './ui/button';
import { ArrowLeft, Lock } from 'lucide-react';
import { Logo } from './Logo';
import { createOrder, verifyPayment } from "../api/payment";
import { checkCustomerExists, syncCustomer } from "../api/customerSync";
import { loadRazorpay } from "../utils/loadRazorpay";
import { purchaseLicense } from "../api/license";
import { useNavigate } from "react-router-dom";

interface CheckoutPageProps {
  selectedPlan: {
    licenseId: string;
    name: string;
    price: string;
    period: string;
  };
  onPaymentComplete: (email: string) => void;
  onBack: () => void;
}

export function CheckoutPage({ selectedPlan, onPaymentComplete, onBack }: CheckoutPageProps) {
  const navigate = useNavigate();
  type BillingCycle = "monthly" | "yearly";
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("yearly");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Extract userId from URL path (e.g., /checkout/{userId})
  const userId = window.location.pathname.split('/').pop() || '';

  const loggedInUser: {
    name?: string;
    email?: string;
  } = JSON.parse(localStorage.getItem("user") || "{}");

  const calculateSubtotal = () => {
    const basePrice = Number(selectedPlan.price);
    if (isNaN(basePrice)) return 0;
    const months = billingCycle === "yearly" ? 12 : 1;
    return basePrice * months;
  };

  const calculateDiscount = () => {
    if (billingCycle === "yearly") {
      return calculateSubtotal() * 0.2;
    }
    return 0;
  };

  const calculateTax = () => {
    const subtotalAfterDiscount = calculateSubtotal() - calculateDiscount();
    return subtotalAfterDiscount * 0.18; // 18% GST
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount() + calculateTax();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      if (!loggedInUser?.email || !loggedInUser?.name) {
        alert("Session expired. Please login again.");
        return;
      }

      const licenseId = selectedPlan.licenseId;
      if (!licenseId) {
        alert("Invalid license selected");
        setIsSubmitting(false);
        return;
      }

      const backendBillingCycle: BillingCycle = billingCycle;
      const totalAmount = calculateTotal();
      const amountInPaise = totalAmount * 100;

      const exists = await checkCustomerExists(loggedInUser.email);
      if (!exists) {
        await syncCustomer({
          name: loggedInUser.name,
          email: loggedInUser.email,
          source: "WorkEye",
        });
      }

      const isStarterPlan = selectedPlan.price === "0";

      if (isStarterPlan) {
        await purchaseLicense({
          name: loggedInUser.name,
          email: loggedInUser.email,
          licenseId,
          billingCycle: backendBillingCycle,
          amount: calculateTotal(),
          currency: "INR",
        });

        const updatedUser = {
          ...loggedInUser,
          starterUsed: true,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        alert("Free plan activated successfully 🎉");
        window.location.replace("https://frontend-8x7e.onrender.com/");
        return;
      }

      const purchaseRes = await purchaseLicense({
        name: loggedInUser.name,
        email: loggedInUser.email,
        licenseId,
        billingCycle: backendBillingCycle,
        amount: calculateTotal(),
        currency: "INR",
      });

      if (!purchaseRes?.transactionId) {
        alert("Failed to create transaction");
        setIsSubmitting(false);
        return;
      }

      const order = await createOrder({
        userId: purchaseRes.userId,
        licenseId,
        billingCycle: backendBillingCycle,
        amount: amountInPaise,
      });

      if (!order?.orderId) {
        alert("Failed to create Razorpay order");
        setIsSubmitting(false);
        return;
      }

      const loaded = await loadRazorpay();
      if (!loaded) {
        alert("Failed to load Razorpay");
        setIsSubmitting(false);
        return;
      }

      const rzp = new (window as any).Razorpay({
        key: order.key,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "WorkEye",
        handler: async (response: any) => {
          try {
            await verifyPayment({
              transactionId: purchaseRes.transactionId,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });
            navigate(`/payment-success?txn=${purchaseRes.transactionId}`);
          } catch (err) {
            alert("Payment verification failed. Contact support.");
          }
        },
        prefill: {
          name: loggedInUser.name,
          email: loggedInUser.email,
        },
        theme: { color: "#0f172a" },
      });

      rzp.open();
    } catch (err: any) {
      console.error("Payment error:", err);
      const message = err?.response?.data?.message || "Action not allowed. Please contact support.";
      alert(message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-gray-900"
              onClick={onBack}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center">
              <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Checkout</h2>
          </div>

          <div className="mb-6 pb-6 border-b border-gray-200">
            <p className="text-sm text-gray-600 mb-3">Selected Plan</p>
            <p className="text-lg font-semibold text-gray-900">{selectedPlan.name}</p>
          </div>

          <div className="space-y-3 mb-6">
            <div 
              onClick={() => setBillingCycle('yearly')}
              className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                billingCycle === 'yearly' 
                  ? 'border-green-600 bg-green-50 shadow-sm' 
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  billingCycle === 'yearly' 
                    ? 'border-green-600 bg-white' 
                    : 'border-gray-300'
                }`}>
                  {billingCycle === 'yearly' && (
                    <div className="h-2.5 w-2.5 rounded-full bg-green-600" />
                  )}
                </div>
                <span className={`font-medium ${
                  billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-700'
                }`}>
                  Annual Billing
                </span>
              </div>
              <span className="text-xs font-medium text-green-700 bg-green-100 px-2.5 py-1 rounded">
                Save 20%
              </span>
            </div>
            
            <div 
              onClick={() => setBillingCycle('monthly')}
              className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                billingCycle === 'monthly' 
                  ? 'border-green-600 bg-green-50 shadow-sm' 
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  billingCycle === 'monthly' 
                    ? 'border-green-600 bg-white' 
                    : 'border-gray-300'
                }`}>
                  {billingCycle === 'monthly' && (
                    <div className="h-2.5 w-2.5 rounded-full bg-green-600" />
                  )}
                </div>
                <span className={`font-medium ${
                  billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-700'
                }`}>
                  Monthly Billing
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
            <div className="flex justify-between text-gray-700">
              <span>Base Price</span>
              <span>₹{selectedPlan.price}/{billingCycle === "yearly" ? "year" : "month"}</span>
            </div>
            
            <div className="flex justify-between text-gray-600 text-sm">
              <span>Duration</span>
              <span>{billingCycle === "yearly" ? "12 months" : "1 month"}</span>
            </div>
            
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>₹{calculateSubtotal()}</span>
            </div>
            
            {billingCycle === 'yearly' && (
              <div className="flex justify-between text-green-700 font-medium">
                <span>Annual Discount (20%)</span>
                <span>-₹{calculateDiscount().toFixed(0)}</span>
              </div>
            )}
            
            <div className="flex justify-between text-gray-700">
              <span>Tax (18% GST)</span>
              <span>₹{calculateTax().toFixed(0)}</span>
            </div>
          </div>

          <div className="flex justify-between mb-6">
            <span className="text-xl font-semibold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-gray-900">₹{calculateTotal().toFixed(0)}</span>
          </div>
          
          <p className="text-xs text-gray-500 text-center mb-6">
            Including all applicable taxes
          </p>

          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium h-12 text-base rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Lock className="h-4 w-4" />
                Proceed to Payment
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}