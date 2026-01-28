import { Check, X, Star, Zap, Crown, Building2, LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { useEffect, useState } from "react";

interface PricingSectionProps {
  onPlanSelect?: (plan: {
    licenseId: string;
    name: string;
    price: string;
    period: string;
    billingCycle: "monthly" | "quarterly" | "half-yearly" | "yearly";
  }) => void;
}

type BillingCycle = "monthly" | "quarterly" | "half-yearly" | "yearly";

interface UIPlan {
  id: string;
  name: string;
  icon: LucideIcon;
  basePrice: number;
  period: string;
  description: string;
  popular: boolean;
  gradient: string;
  features: Record<string, number | boolean>;
  isFree: boolean;
  isEnterprise: boolean;
}

/* ------------------------------------
UI META
------------------------------------ */

const PLAN_ORDER: Record<string, number> = {
  starter: 1,
  professional: 2,
  business: 3,
  enterprise: 4,
};

const PLAN_UI_META: Record<
  string,
  { icon: LucideIcon; gradient: string; popular?: boolean }
> = {
  starter: {
    icon: Star,
    gradient: "from-blue-500 to-blue-600",
  },
  professional: {
    icon: Zap,
    gradient: "from-purple-500 to-purple-600",
    popular: true,
  },
  business: {
    icon: Building2,
    gradient: "from-orange-500 to-orange-600",
  },
  enterprise: {
    icon: Crown,
    gradient: "from-pink-500 to-pink-600",
  },
};

export function PricingSection({ onPlanSelect }: PricingSectionProps) {
  const [plans, setPlans] = useState<UIPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  const getPrice = (plan: UIPlan) => {
    if (plan.isFree || plan.isEnterprise) return plan.basePrice;

    if (billingCycle === "monthly") return plan.basePrice;
    if (billingCycle === "quarterly") return (plan.basePrice * 3 * 0.95); // 5% discount
    if (billingCycle === "half-yearly") return (plan.basePrice * 6 * 0.90); // 10% discount
    return (plan.basePrice * 12 * 0.8); // 20% discount
  };

  const getBillingText = () => {
    if (billingCycle === "monthly") return "/month";
    if (billingCycle === "quarterly") return "/quarter";
    if (billingCycle === "half-yearly") return "/6 months";
    return "/year";
  };

  const getDiscountText = () => {
    if (billingCycle === "quarterly") return "Save 5%";
    if (billingCycle === "half-yearly") return "Save 10%";
    if (billingCycle === "yearly") return "Save 20%";
    return "";
  };

  const handlePlanClick = (plan: UIPlan) => {
    if (plan.isEnterprise) {
      return;
    }

    if (onPlanSelect) {
      onPlanSelect({
        licenseId: plan.id,
        name: plan.name,
        price: String(getPrice(plan)),
        period: plan.period,
        billingCycle,
      });
    }
  };

  const getButtonText = (plan: UIPlan) => {
    if (plan.isEnterprise) return "Contact Sales";
    if (plan.isFree) return "Start Free Trial";
    return "Buy Now";
  };

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const res = await fetch(
          "http://localhost:4000/api/license/public/licenses-by-product/69589e3fe70228ef3c25f26c",
          {
            headers: {
              "x-api-key": "my-secret-key-123",
            },
          }
        );

        const data = await res.json();

        if (!data?.licenses) {
          throw new Error("Invalid license response");
        }

        const mappedPlans: UIPlan[] = data.licenses
          .map((lic: any): UIPlan => {
            const key = lic.licenseType?.name?.toLowerCase() || "";
            const uiMeta = PLAN_UI_META[key] || {};
            const priceAmount = lic.licenseType.price?.amount;

            return {
              id: lic._id,
              name: lic.licenseType.name,
              icon: uiMeta.icon || Star,
              basePrice: priceAmount ?? 0,
              period: priceAmount === null ? "contact sales" : "per user/month",
              description:
                lic.licenseType.description ||
                "Flexible plan for your organization",
              popular: uiMeta.popular || false,
              gradient: uiMeta.gradient || "from-gray-500 to-gray-600",
              isFree: priceAmount === 0,
              isEnterprise: key === "enterprise",
              features: (lic.licenseType.features || []).reduce(
                (acc: Record<string, number | boolean>, f: any) => {
                  // LMS v2 (feature registry based)
                  if (typeof f === "object") {
                    acc[f.uiLabel] =
                      f.featureType === "limit"
                        ? f.limitValue ?? true
                        : true;
                    return acc;
                  }

                  // LMS v1 fallback (string based)
                  acc[f] = true;
                  return acc;
                },
                {}
              ),
            };
          })
          .sort((a: UIPlan, b: UIPlan) => {
            return (
              (PLAN_ORDER[a.name.toLowerCase()] ?? 99) -
              (PLAN_ORDER[b.name.toLowerCase()] ?? 99)
            );
          });

        setPlans(mappedPlans);
      } catch (err) {
        console.error("Failed to load Workeye plans", err);
      } finally {
        setLoading(false);
      }
    };

    loadPlans();
  }, []);

  if (loading || plans.length === 0) return null;

  return (
    <section
      id="pricing"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-purple-50"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl mb-4">
            Simple,{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Transparent Pricing
            </span>
          </h2>

          <Tabs
            value={billingCycle}
            onValueChange={(v : BillingCycle) => setBillingCycle(v as BillingCycle)}
            className="w-fit mx-auto mt-8"
          >
            <TabsList className="inline-flex h-auto p-1">
              <TabsTrigger value="monthly" className="px-4 py-2">
                Monthly
              </TabsTrigger>
              <TabsTrigger value="quarterly" className="px-4 py-2">
                Quarterly{" "}
                <span className="ml-1 text-xs text-emerald-600 font-medium">-5%</span>
              </TabsTrigger>
              <TabsTrigger value="half-yearly" className="px-4 py-2">
                Half-Yearly{" "}
                <span className="ml-1 text-xs text-emerald-600 font-medium">-10%</span>
              </TabsTrigger>
              <TabsTrigger value="yearly" className="px-4 py-2">
                Yearly{" "}
                <span className="ml-1 text-xs text-emerald-600 font-medium">-20%</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`relative bg-white rounded-3xl p-8 border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                plan.popular
                  ? "border-purple-600 shadow-xl"
                  : "border-gray-200"
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}

              <div
                className={`inline-flex p-3 bg-gradient-to-r ${plan.gradient} rounded-xl mb-4`}
              >
                <plan.icon className="h-8 w-8 text-white" />
              </div>

              <h3 className="text-2xl mb-2">{plan.name}</h3>
              <p className="text-gray-600 text-sm mb-6 min-h-[40px]">
                {plan.description}
              </p>

              <div className="mb-6">
                {plan.isFree ? (
                  <div className="text-3xl">Free</div>
                ) : (
                  <>
                    <div className="flex items-baseline">
                      <span className="text-4xl">₹{getPrice(plan)}</span>
                      <span className="text-gray-600 ml-2">{getBillingText()}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {plan.period}
                    </p>
                    {getDiscountText() && (
                      <p className="text-sm text-emerald-600 mt-1">
                        {getDiscountText()}
                      </p>
                    )}
                  </>
                )}
              </div>

              <Button
                className={`w-full mb-6 ${
                  plan.popular
                    ? "bg-gradient-to-r from-purple-600 to-pink-600"
                    : `bg-gradient-to-r ${plan.gradient}`
                }`}
                onClick={() => handlePlanClick(plan)}
              >
                {getButtonText(plan)}
              </Button>

              <div className="space-y-3">
                {Object.entries(plan.features).map(([slug, value]) => (
                  <div key={slug} className="flex items-start space-x-2">
                    {value ? (
                      <Check className="h-5 w-5 text-green-600 mt-0.5" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mt-0.5" />
                    )}

                    <span className="text-sm text-gray-700">
                      {slug.replace(/-/g, " ")}
                      {typeof value === "number" && ` (${value})`}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}