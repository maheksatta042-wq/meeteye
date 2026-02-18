import { useState } from "react";
import { motion } from "motion/react";
import { TopBanner } from "./TopBanner";
import { Footer } from "./Footer";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Building2, MapPin, Award, Users, CheckCircle } from "lucide-react";

interface PartnersPageProps {
  onBecomePartnerClick: () => void;
  onPartnerLoginClick: () => void;
  onBackToHome: () => void;
  onNavigateToSection: (section: string) => void;
}

interface Partner {
  id: number;
  name: string;
  type: string;
  location: string;
  badge: "GOLD" | "SILVER" | "PLATINUM";
  description: string;
  specialties: string[];
  certifications?: string[];
}

const getBadgeColor = (badge: string) => {
  switch (badge) {
    case "PLATINUM":
      return "bg-purple-100 text-purple-800 border-purple-300";
    case "GOLD":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "SILVER":
      return "bg-gray-100 text-gray-800 border-gray-300";
    default:
      return "bg-blue-100 text-blue-800 border-blue-300";
  }
};

export function PartnersPage({
  onBecomePartnerClick,
  onPartnerLoginClick,
  onBackToHome,
  onNavigateToSection,
}: PartnersPageProps) {
  const [activeTab, setActiveTab] = useState<"directory" | "become" | "login">(
    "directory",
  );

  const handleTabClick = (tab: "directory" | "become" | "login") => {
    if (tab === "become") {
      onBecomePartnerClick();
    } else if (tab === "login") {
      onPartnerLoginClick();
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <TopBanner />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-24"
      >
        <div className="container mx-auto px-6">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-6xl mb-6 max-w-4xl font-bold"
          >
            Find a Workeye Partner in your area!
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl text-white/90 max-w-2xl font-medium"
          >
            Connect with certified experts who can help you maximize your Workeye experience
          </motion.p>
        </div>
      </motion.section>

      {/* Tabs Navigation */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-40 shadow-md">
        <div className="container mx-auto px-6">
          <div className="flex">
            <button
              onClick={onBecomePartnerClick}
              className="flex-1 py-5 text-center font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 border-b-2 border-transparent hover:border-blue-300"
            >
              Become a partner
            </button>
            <button className="flex-1 py-5 text-center font-semibold text-blue-600 border-b-2 border-blue-600 bg-blue-50/50">
              Partner directory
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
              <Award className="w-5 h-5" />
              <span className="font-semibold">Certified Partners</span>
            </div>
            <h2 className="text-4xl md:text-5xl mb-8 text-gray-900">
              Workeye Partners can help you create and manage your
              workforce!
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Our partners are there to make your Workeye experience more
              pleasant and productive – from choosing a subscription plan to
              product implementation, customization, and employee training.
              Workeye partners can also help you set up an integration with
              a third-party app or service. Browse our Partner Directory to find
              a Workeye partner in your area and contact them directly or
              use the form below to get a price estimate for your Workeye
              implementation project.
            </p>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12"
          >
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl mb-3 text-gray-900">Expert Implementation</h3>
              <p className="text-gray-600">
                Get professional help with setup, customization, and deployment tailored to your needs
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl mb-3 text-gray-900">Certified Support</h3>
              <p className="text-gray-600">
                Work with certified professionals who understand Workeye inside and out
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl mb-3 text-gray-900">Local Expertise</h3>
              <p className="text-gray-600">
                Find partners in your area who understand your regional requirements
              </p>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-20 text-center"
          >
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-12 text-white shadow-xl">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <Users className="w-10 h-10" />
              </div>
              <h3 className="text-4xl mb-4">
                Interested in becoming a partner?
              </h3>
              <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-50">
                Join our growing network of partners and help businesses
                optimize their workforce management.
              </p>
              <button
                onClick={onBecomePartnerClick}
                className="bg-white text-blue-600 px-8 py-5 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 text-lg"
              >
                Become a Partner
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}