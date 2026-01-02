import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { CreditCard, ArrowLeft } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Logo } from './Logo';
import { createOrder, verifyPayment } from "../api/payment";
import { checkCustomerExists, syncCustomer } from "../api/customerSync";
import { loadRazorpay } from "../utils/loadRazorpay";
import { purchaseLicense } from "../api/license";

const LICENSE_MAP: Record<string, string> = {
  starter: "693fdcc6e8eccaec24c2d8e2",
  professional: "693fdd3ee8eccaec24c2d8f3",
  business: "69425580df050441331fd44d",
};

interface CheckoutPageProps {
  selectedPlan: {
    name: string;
    price: string;
    period: string;
  };
  onPaymentComplete: (email: string) => void;
  onBack: () => void;
}

export function CheckoutPage({ selectedPlan, onPaymentComplete, onBack }: CheckoutPageProps) {
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const loggedInUser: {
    name?: string;
    email?: string;
  } = JSON.parse(localStorage.getItem("user") || "{}");

  const calculateSubtotal = () => {
    if (selectedPlan.price === 'Custom') return 0;
    const basePrice = parseFloat(selectedPlan.price);
    const months = billingCycle === 'annual' ? 12 : 1;
    return basePrice * months;
  };

  const calculateDiscount = () => {
    if (billingCycle === 'annual') {
      return calculateSubtotal() * 0.2; // 20% discount for annual
    }
    return 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (isSubmitting) return; // 🔒 prevent double API call
  setIsSubmitting(true);


    console.log("logged in user email, ", loggedInUser.email);
    console.log("logged in user name, ", loggedInUser.name);

    try {
      if (!loggedInUser?.email || !loggedInUser?.name ) {
        alert("Session expired. Please login again.");
        return;
      }

      // 1️⃣ Resolve plan → licenseId
      const planKey =
        selectedPlan.name.toLowerCase().includes("starter")
          ? "starter"
          : selectedPlan.name.toLowerCase().includes("professional")
          ? "professional"
          : selectedPlan.name.toLowerCase().includes("business")
          ? "business"
          : null;

      if (!planKey) {
        alert("Invalid plan selected");
        return;
      }

      const licenseId = LICENSE_MAP[planKey];

      const backendBillingCycle =
        billingCycle === "annual" ? "yearly" : "monthly";

      const amountInPaise = Math.round(calculateTotal() * 100);

      // 2️⃣ Ensure customer exists
      const exists = await checkCustomerExists(loggedInUser.email);
      if (!exists) {
        await syncCustomer({
          name: loggedInUser.name,
          email: loggedInUser.email,
          source: "WorkEye",
        });
      }

      const isStarterPlan = planKey === "starter" && calculateTotal() === 0;

      if (isStarterPlan) {
        await purchaseLicense({
          name: loggedInUser.name,
          email: loggedInUser.email,
          licenseId,
          billingCycle: "monthly",
          amount: 0,
          currency: "INR",
        });

        // ✅ SAVE STATE
        const updatedUser = {
          ...loggedInUser,
          starterUsed: true,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        alert("Free plan activated successfully 🎉");
        window.location.replace("https://frontend-8x7e.onrender.com/");
        return;
      }

      // 3️⃣ CREATE PENDING TRANSACTION (orderId = null)
      const purchaseRes = await purchaseLicense({
        name: loggedInUser.name,
        email: loggedInUser.email,
        licenseId,
        billingCycle: backendBillingCycle,
        amount: amountInPaise,
        currency: "INR",
      });

      if (!purchaseRes?.transactionId) {
        alert("Failed to create transaction");
        return;
      }

      // 4️⃣ CREATE RAZORPAY ORDER (attaches orderId)
      const order = await createOrder(
        purchaseRes.userId,
        licenseId,
        amountInPaise,
        // transactionId: purchaseRes.transactionId
      );

      if (!order?.orderId) {
        alert("Failed to create Razorpay order");
        return;
      }

      // 5️⃣ LOAD RAZORPAY SDK
      const loaded = await loadRazorpay();
      if (!loaded) {
        alert("Failed to load Razorpay");
        return;
      }

      // 6️⃣ OPEN RAZORPAY
      const rzp = new (window as any).Razorpay({
        key: order.key,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "WorkEye",
        handler: async (response: any) => {
          await verifyPayment({
            transactionId: purchaseRes.transactionId,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });

          onPaymentComplete(loggedInUser.email!);
          window.location.replace("https://frontend-8x7e.onrender.com/");
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

  // 🔒 HANDLE BACKEND FREE-PLAN BLOCK
  const message =
    err?.response?.data?.message ||
    "Action not allowed. Please contact support.";

  alert(message);
  setIsSubmitting(false);
}

  };
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <Button
              variant="ghost"
              className="text-gray-400 hover:text-white"
              onClick={onBack}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Pricing
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="border-b border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Upgrade type &gt;</span>
            <span className="text-white">Seats & payment information</span>
            <span className="text-gray-500">&gt; Review</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl mb-4">Enter your payment details.</h1>
          <p className="text-gray-400">
            Seat types have been suggested based on previous Figma use.{' '}
            <a href="#" className="text-blue-400 hover:underline">
              Learn more about seats
            </a>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Payment Form */}
           

            {/* Right Column - Plan Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-lg p-8 sticky top-8">
                <h3 className="text-2xl mb-6">Your {selectedPlan.name} plan</h3>
                
                <RadioGroup value={billingCycle} onValueChange={(v: 'annual' | 'monthly') => setBillingCycle(v)}>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="annual" id="annual" className="border-gray-600" />
                        <Label htmlFor="annual" className="text-gray-300 cursor-pointer">
                          Annual <span className="text-green-400 text-sm ml-2">Save up to 20%</span>
                        </Label>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="monthly" id="monthly" className="border-gray-600" />
                      <Label htmlFor="monthly" className="text-gray-300 cursor-pointer">
                        Monthly
                      </Label>
                    </div>
                  </div>
                </RadioGroup>

                <div className="space-y-4 border-t border-gray-700 pt-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">1 Full seat</span>
                    <span>${selectedPlan.price}/yr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">× ${selectedPlan.price}/mo × {billingCycle === 'annual' ? '12 months' : '1 month'}</span>
                    <span>${calculateSubtotal()}/yr</span>
                  </div>
                  {billingCycle === 'annual' && (
                    <div className="flex justify-between text-green-400">
                      <span>Annual discount (20%)</span>
                      <span>-${calculateDiscount().toFixed(0)}/yr</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-4 border-t border-gray-700 text-xl">
                    <span>Subtotal</span>
                    <span>${calculateTotal()}/yr</span>
                  </div>
                  <p className="text-xs text-gray-500">See your total (including taxes) in Review</p>
                </div>

                <Button
                  type="submit"
                  className="w-full mt-8 bg-white text-gray-900 hover:bg-gray-100 h-12 text-base"
                >
                  Next: Review
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
