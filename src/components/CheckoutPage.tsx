import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowLeft, Lock, Users, Building, Mail, Phone, MapPin, FileText, CheckCircle } from 'lucide-react';
import { Logo } from './Logo';
import { createOrder, verifyPayment } from "../api/payment";
import { checkCustomerExists, syncCustomer } from "../api/customerSync";
import { loadRazorpay } from "../utils/loadRazorpay";
import { purchaseLicense } from "../api/license";
import { useNavigate, useParams } from "react-router-dom";

interface CheckoutPageProps {
  selectedPlan: {
    licenseId: string;
    name: string;
    price: string;
    period: string;
    billingCycle: "monthly" | "quarterly" | "half-yearly" | "yearly";
  };
  onPaymentComplete: (email: string) => void;
  onBack: () => void;
}

export function CheckoutPage({ selectedPlan, onPaymentComplete, onBack }: CheckoutPageProps) {
  const navigate = useNavigate();

  // Get user from localStorage (single declaration)
  const loggedInUser: {
    name?: string;
    email?: string;
    customerId?: string;
  } = JSON.parse(localStorage.getItem("user") || "{}");

  // Redirect to login if no user found
  useEffect(() => {
    if (!loggedInUser?.email || !loggedInUser?.customerId) {
      alert("Please login to continue.");
      navigate("/");
    }
  }, [navigate]);
  
  type BillingCycle = "monthly" | "quarterly" | "half-yearly" | "yearly";
  
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(selectedPlan.billingCycle || "yearly");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [planDetails, setPlanDetails] = useState<{
    pricePerUser: number;
    includedUsers: number;
    planName: string;
  } | null>(null);

  // Billing form state
  const [billingForm, setBillingForm] = useState({
    companyName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    gstNumber: '',
  });

  // Pre-fill email from logged in user
  useEffect(() => {
    if (loggedInUser?.email) {
      setBillingForm(prev => ({
        ...prev,
        email: loggedInUser.email || '',
      }));
    }
  }, [loggedInUser?.email]);

  // Fetch plan details
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

        let userCount = 1;
        const rawFeatures = matched.licenseType.features || [];

        if (Array.isArray(rawFeatures)) {
          const userFeatures = [];
          
          for (const feature of rawFeatures) {
            if (typeof feature === "object") {
              const label = (feature.uiLabel || feature.displayName || "").toLowerCase();
              const key = (feature.featureKey || "").toLowerCase();
              const slug = (feature.featureSlug || "").toLowerCase();
              const value = feature.limitValue ?? feature.value;
              
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
                }
              }
            }
          }
          
          if (userFeatures.length > 0) {
            userFeatures.sort((a, b) => {
              if (a.priority !== b.priority) return a.priority - b.priority;
              return b.value - a.value;
            });
            userCount = userFeatures[0].value;
          }
        } else if (typeof rawFeatures === "object" && rawFeatures !== null) {
          const userFeatures = [];
          
          for (const [slug, value] of Object.entries(rawFeatures)) {
            const slugLower = slug.toLowerCase();
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
            }
          }
          
          if (userFeatures.length > 0) {
            userFeatures.sort((a, b) => {
              if (a.priority !== b.priority) return a.priority - b.priority;
              return b.value - a.value;
            });
            userCount = userFeatures[0].value;
          }
        }

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

  const getMonthlyBaseCost = () => {
    if (!planDetails) return 0;
    return planDetails.pricePerUser * planDetails.includedUsers;
  };

  const calculateSubtotal = () => {
    const monthlyBase = getMonthlyBaseCost();
    if (billingCycle === "monthly") return monthlyBase;
    if (billingCycle === "quarterly") return monthlyBase * 3;
    if (billingCycle === "half-yearly") return monthlyBase * 6;
    return monthlyBase * 12;
  };

  const calculateDiscount = () => {
    const subtotal = calculateSubtotal();
    if (billingCycle === "quarterly") return subtotal * 0.05;
    if (billingCycle === "half-yearly") return subtotal * 0.10;
    if (billingCycle === "yearly") return subtotal * 0.20;
    return 0;
  };

  const calculateTax = () => {
    const subtotalAfterDiscount = calculateSubtotal() - calculateDiscount();
    return Math.round(subtotalAfterDiscount * 0.18);
  };

  const calculateTotal = () => {
    return Math.round(calculateSubtotal() - calculateDiscount() + calculateTax());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillingForm({
      ...billingForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !planDetails) return;

    // Validate required fields
    if (!billingForm.companyName || !billingForm.email || !billingForm.phone) {
      alert("Please fill in all required fields (Company Name, Email, Phone)");
      return;
    }

    setIsSubmitting(true);

    try {
      if (!loggedInUser?.email || !loggedInUser?.name || !loggedInUser?.customerId) {
        alert("Session expired. Please login again.");
        setIsSubmitting(false);
        navigate("/");
        return;
      }

      const licenseId = selectedPlan.licenseId;
      if (!licenseId) {
        alert("Invalid license selected");
        setIsSubmitting(false);
        return;
      }

      const totalAmount = calculateTotal();
      const amountInPaise = totalAmount * 100;
      const isStarterPlan = planDetails.pricePerUser === 0;

      if (isStarterPlan) {
        await purchaseLicense({
          name: loggedInUser.name,
          email: loggedInUser.email,
          licenseId,
          billingCycle: billingCycle,
          amount: 0,
          currency: "INR",
        });

        const updatedUser = {
          ...loggedInUser,
          starterUsed: true,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        
        // Clear selected plan from sessionStorage
        sessionStorage.removeItem("selectedPlan");
        
        alert("Free plan activated successfully 🎉");
        window.location.replace("https://frontend-8x7e.onrender.com/");
        return;
      }

      const purchaseRes = await purchaseLicense({
        name: loggedInUser.name,
        email: loggedInUser.email,
        licenseId,
        billingCycle: billingCycle,
        amount: calculateTotal(),
        currency: "INR",
      });

      if (!purchaseRes?.transactionId) {
        alert("Failed to create transaction");
        setIsSubmitting(false);
        return;
      }

      const order = await createOrder({
        userId: loggedInUser.customerId,
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
            
            // Clear selected plan from sessionStorage
            sessionStorage.removeItem("selectedPlan");
            
            navigate(`/payment-success?txn=${purchaseRes.transactionId}`);
          } catch (err) {
            alert("Payment verification failed. Contact support.");
          }
        },
        prefill: {
          name: billingForm.companyName,
          email: billingForm.email,
          contact: billingForm.phone,
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

  const getDiscountText = () => {
    if (billingCycle === "quarterly") return "5%";
    if (billingCycle === "half-yearly") return "10%";
    if (billingCycle === "yearly") return "20%";
    return "";
  };

  const getBillingLabel = () => {
    if (billingCycle === "quarterly") return "Quarterly";
    if (billingCycle === "half-yearly") return "Half-Yearly";
    if (billingCycle === "yearly") return "Yearly";
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            className="text-gray-600 hover:text-gray-900 -ml-2"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Order</h1>
          <p className="text-gray-600">Just one step away from transforming your business</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Billing Information */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Billing Information</h2>
                <p className="text-sm text-gray-600 mb-6">Enter your company and billing details</p>

                <div className="space-y-4">
                  {/* Company Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="companyName"
                        value={billingForm.companyName}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter company name"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Email and Phone */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={billingForm.email}
                          onChange={handleInputChange}
                          required
                          readOnly
                          placeholder="your@email.com"
                          className="w-full px-4 py-2.5 border border-gray-300 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          value={billingForm.phone}
                          onChange={handleInputChange}
                          required
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Address
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="address"
                        value={billingForm.address}
                        onChange={handleInputChange}
                        placeholder="Street address"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* City and State */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={billingForm.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={billingForm.state}
                        onChange={handleInputChange}
                        placeholder="State"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Pincode and GST */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Pincode
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={billingForm.pincode}
                        onChange={handleInputChange}
                        placeholder="400001"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        GST Number (Optional)
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="gstNumber"
                          value={billingForm.gstNumber}
                          onChange={handleInputChange}
                          placeholder="22AAAAA0000A1Z5"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Proceed Button (Mobile) */}
                <div className="lg:hidden mt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#003366] hover:bg-[#002244] text-white font-medium h-12 text-base rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
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

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

                {/* Selected Plan */}
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Selected Plan</p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">{planDetails.planName}</span>
                    <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1 rounded">
                      {getBillingLabel()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                    <Users className="h-4 w-4" />
                    <span>Includes {planDetails.includedUsers} users</span>
                  </div>
                </div>

                {/* Billing Cycle */}
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-3">Billing Cycle</p>
                  <div className="space-y-2">
                    {[
                      { value: 'monthly', label: 'Monthly', discount: '' },
                      { value: 'quarterly', label: 'Quarterly', discount: '-5%' },
                      { value: 'half-yearly', label: 'Half-Yearly', discount: '-10%' },
                      { value: 'yearly', label: 'Yearly', discount: '-20%' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setBillingCycle(option.value as BillingCycle)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg border transition-all ${
                          billingCycle === option.value
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="font-medium">{option.label}</span>
                        {option.discount && (
                          <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                            {option.discount}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Price per user/month</span>
                    <span>₹{planDetails.pricePerUser}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Number of users</span>
                    <span>×{planDetails.includedUsers}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Billing period</span>
                    <span>{getDurationText()}</span>
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">₹{calculateSubtotal().toFixed(0)}</span>
                  </div>
                  {getDiscountText() && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">GST (18%)</span>
                      <span className="font-medium text-green-600">₹{calculateTax().toFixed(0)}</span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="pt-4 border-t-2 border-gray-200 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                    <span className="text-2xl font-bold text-gray-900">₹{calculateTotal().toLocaleString()}</span>
                  </div>
                </div>

                {/* Security Icons */}
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Secure payment processing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Money-back guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Cancel anytime</span>
                  </div>
                </div>

                {/* Proceed Button (Desktop) */}
                <div className="hidden lg:block mt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#003366] hover:bg-[#002244] text-white font-medium h-12 text-base rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
          </div>
        </form>
      </div>
    </div>
  );
}