import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowLeft, Lock, Users } from 'lucide-react';
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
    price: string; // This is the price per user per month from pricing page
    period: string;
    billingCycle: "monthly" | "quarterly" | "half-yearly" | "yearly";
  };
  onPaymentComplete: (email: string) => void;
  onBack: () => void;
}

export function CheckoutPage({ selectedPlan, onPaymentComplete, onBack }: CheckoutPageProps) {
  const navigate = useNavigate();
  type BillingCycle = "monthly" | "quarterly" | "half-yearly" | "yearly";
  
  // Initialize with the billing cycle that was selected on the pricing page
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(selectedPlan.billingCycle || "yearly");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [planDetails, setPlanDetails] = useState<{
    pricePerUser: number;
    includedUsers: number;
    planName: string;
  } | null>(null);

  const loggedInUser: {
    name?: string;
    email?: string;
  } = JSON.parse(localStorage.getItem("user") || "{}");

  // Fetch plan details including user count
  useEffect(() => {
    const fetchPlanDetails = async () => {
      try {
        const res = await fetch(
          "https://lisence-system.onrender.com/api/license/public/licenses-by-product/69589e3fe70228ef3c25f26c",
          {
            headers: {
              "x-api-key": "my-secret-key-123",
            },
          }
        );

        const data = await res.json();

        const matched = data.licenses.find(
          (lic: any) => lic?._id === selectedPlan.licenseId
        );

        if (!matched) {
          throw new Error("Selected plan not found");
        }

        console.log("📦 Matched License:", matched);
        console.log("🎯 License Type:", matched.licenseType);
        console.log("✨ Raw Features:", matched.licenseType.features);

        // Extract user count from features
        let userCount = 1; // Default fallback
        const rawFeatures = matched.licenseType.features || [];

        console.log("🔍 Features type:", typeof rawFeatures, "isArray:", Array.isArray(rawFeatures));
        
        // Handle array format (feature registry)
        if (Array.isArray(rawFeatures)) {
          const userFeatures = [];
          
          for (const feature of rawFeatures) {
            if (typeof feature === "object") {
              const label = (feature.uiLabel || feature.displayName || "").toLowerCase();
              const key = (feature.featureKey || "").toLowerCase();
              const slug = (feature.featureSlug || "").toLowerCase();
              const value = feature.limitValue ?? feature.value;
              
              console.log("🔍 Checking feature:", { 
                label, 
                key, 
                slug, 
                type: feature.featureType, 
                value: value,
                displayName: feature.displayName 
              });
              
              if (feature.featureType === "limit" && typeof value === "number") {
                const isUserFeature = 
                  slug === "user-limit" || 
                  key === "user-limit" ||
                  slug.includes("user") || 
                  key.includes("user") || 
                  label.includes("user");
                
                if (isUserFeature) {
                  userFeatures.push({
                    key: slug || key || label,
                    value: value,
                    priority: (slug === "user-limit" || key === "user-limit") ? 1 : 2
                  });
                  console.log("✅ Found potential user feature:", { key: slug || key, value: value });
                }
              }
            } else if (typeof feature === "string") {
              const match = feature.match(/(\d+)\s*users?/i);
              if (match) {
                userFeatures.push({
                  key: "string-match",
                  value: parseInt(match[1]),
                  priority: 1
                });
                console.log("✅ Found users in string feature:", match[1]);
              }
            }
          }
          
          if (userFeatures.length > 0) {
            userFeatures.sort((a, b) => {
              if (a.priority !== b.priority) return a.priority - b.priority;
              return b.value - a.value;
            });
            userCount = userFeatures[0].value;
            console.log("✅ Selected user count:", userCount, "from:", userFeatures[0].key);
          }
        } 
        // Handle object format (validatedFeatureMap)
        else if (typeof rawFeatures === "object" && rawFeatures !== null) {
          console.log("🔍 Processing features as object/map");
          const userFeatures = [];
          
          for (const [slug, value] of Object.entries(rawFeatures)) {
            const slugLower = slug.toLowerCase();
            
            console.log("🔍 Checking feature key:", slug, "value:", value, "type:", typeof value);
            
            const isUserFeature = 
              slugLower === "user-limit" || 
              slugLower === "users" || 
              slugLower.includes("user-limit") ||
              (slugLower.includes("user") && !slugLower.includes("admin"));
            
            if (isUserFeature && typeof value === "number" && value > 0) {
              userFeatures.push({
                key: slug,
                value: value,
                priority: (slugLower === "user-limit" || slugLower === "users") ? 1 : 2
              });
              console.log("✅ Found potential user feature:", slug, "=", value);
            }
          }
          
          if (userFeatures.length > 0) {
            userFeatures.sort((a, b) => {
              if (a.priority !== b.priority) return a.priority - b.priority;
              return b.value - a.value;
            });
            userCount = userFeatures[0].value;
            console.log("✅ Selected user count:", userCount, "from key:", userFeatures[0].key);
          }
        }

        console.log("🎯 Final user count:", userCount);

        setPlanDetails({
          pricePerUser: Number(selectedPlan.price),
          includedUsers: userCount,
          planName: selectedPlan.name,
        });
      } catch (err) {
        console.error("Failed to load plan details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanDetails();
  }, [selectedPlan.licenseId, selectedPlan.price, selectedPlan.name]);

  // Calculate base monthly cost (price per user × number of users)
  const getMonthlyBaseCost = () => {
    if (!planDetails) return 0;
    return planDetails.pricePerUser * planDetails.includedUsers;
  };

  // Calculate subtotal based on billing cycle BEFORE discount
  const calculateSubtotal = () => {
    const monthlyBase = getMonthlyBaseCost();
    
    if (billingCycle === "monthly") return monthlyBase;
    if (billingCycle === "quarterly") return monthlyBase * 3;
    if (billingCycle === "half-yearly") return monthlyBase * 6;
    return monthlyBase * 12;
  };

  const calculateDiscount = () => {
    const subtotal = calculateSubtotal();
    if (billingCycle === "quarterly") {
      return subtotal * 0.05; // 5% discount for quarterly
    } else if (billingCycle === "half-yearly") {
      return subtotal * 0.10; // 10% discount for half-yearly
    } else if (billingCycle === "yearly") {
      return subtotal * 0.20; // 20% discount for yearly
    }
    return 0;
  };

  const calculateTax = () => {
    const subtotalAfterDiscount = calculateSubtotal() - calculateDiscount();
    return Math.round(subtotalAfterDiscount * 0.18); // 18% GST
  };

  const calculateTotal = () => {
    return Math.round(calculateSubtotal() - calculateDiscount() + calculateTax());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !planDetails) return;
    setIsSubmitting(true);

    try {
      if (!loggedInUser?.email || !loggedInUser?.name) {
        alert("Session expired. Please login again.");
        setIsSubmitting(false);
        return;
      }

      const licenseId = selectedPlan.licenseId;
      if (!licenseId) {
        alert("Invalid license selected");
        setIsSubmitting(false);
        return;
      }

      // Map UI billing cycles to backend billing cycles
      const backendBillingCycle = 
        billingCycle === "quarterly" || billingCycle === "half-yearly" 
          ? "monthly" 
          : billingCycle;

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

      const isStarterPlan = planDetails.pricePerUser === 0;

      if (isStarterPlan) {
        await purchaseLicense({
          name: loggedInUser.name,
          email: loggedInUser.email,
          licenseId,
          billingCycle: "monthly",
          amount: 0,
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
        billingCycle,
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

  const getDurationText = () => {
    if (billingCycle === "monthly") return "1 month";
    if (billingCycle === "quarterly") return "3 months";
    if (billingCycle === "half-yearly") return "6 months";
    return "12 months";
  };

  const getPeriodText = () => {
    return "month";
  };

  const getDiscountText = () => {
    if (billingCycle === "quarterly") return "5%";
    if (billingCycle === "half-yearly") return "10%";
    if (billingCycle === "yearly") return "20%";
    return "";
  };

  const getBillingLabel = () => {
    if (billingCycle === "quarterly") return "Quarterly";
    if (billingCycle === "half-yearly") return "Half-Yearly";
    if (billingCycle === "yearly") return "Annual";
    return "Monthly";
  };

  if (loading || !planDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

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
            <p className="text-lg font-semibold text-gray-900 mb-2">{planDetails.planName}</p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="h-4 w-4" />
              <span>Includes {planDetails.includedUsers} users</span>
            </div>
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
              onClick={() => setBillingCycle('half-yearly')}
              className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                billingCycle === 'half-yearly' 
                  ? 'border-green-600 bg-green-50 shadow-sm' 
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  billingCycle === 'half-yearly' 
                    ? 'border-green-600 bg-white' 
                    : 'border-gray-300'
                }`}>
                  {billingCycle === 'half-yearly' && (
                    <div className="h-2.5 w-2.5 rounded-full bg-green-600" />
                  )}
                </div>
                <span className={`font-medium ${
                  billingCycle === 'half-yearly' ? 'text-gray-900' : 'text-gray-700'
                }`}>
                  Half-Yearly Billing
                </span>
              </div>
              <span className="text-xs font-medium text-green-700 bg-green-100 px-2.5 py-1 rounded">
                Save 10%
              </span>
            </div>

            <div 
              onClick={() => setBillingCycle('quarterly')}
              className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                billingCycle === 'quarterly' 
                  ? 'border-green-600 bg-green-50 shadow-sm' 
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  billingCycle === 'quarterly' 
                    ? 'border-green-600 bg-white' 
                    : 'border-gray-300'
                }`}>
                  {billingCycle === 'quarterly' && (
                    <div className="h-2.5 w-2.5 rounded-full bg-green-600" />
                  )}
                </div>
                <span className={`font-medium ${
                  billingCycle === 'quarterly' ? 'text-gray-900' : 'text-gray-700'
                }`}>
                  Quarterly Billing
                </span>
              </div>
              <span className="text-xs font-medium text-green-700 bg-green-100 px-2.5 py-1 rounded">
                Save 5%
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
              <span>Price per user/month</span>
              <span>₹{planDetails.pricePerUser.toFixed(0)}</span>
            </div>
            
            <div className="flex justify-between text-gray-700">
              <span>Number of users</span>
              <span>×{planDetails.includedUsers}</span>
            </div>
            
            <div className="flex justify-between text-gray-600 text-sm">
              <span>Billing period</span>
              <span>{getDurationText()}</span>
            </div>
            
            <div className="border-t border-gray-200 pt-3 mt-3" />
            
            <div className="flex justify-between text-gray-700 font-medium">
              <span>Subtotal</span>
              <span>₹{calculateSubtotal().toFixed(0)}</span>
            </div>
            
            {getDiscountText() && (
              <div className="flex justify-between text-green-700 font-medium">
                <span>{getBillingLabel()} Discount ({getDiscountText()})</span>
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