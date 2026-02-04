import { useState } from "react";
import { motion } from "motion/react";
import { Navbar } from "./Navbar";
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

const partners: Partner[] = [
  {
    id: 1,
    name: "TechFlow Solutions",
    type: "Implementation Partner",
    location: "New York, NY",
    badge: "PLATINUM",
    description:
      "Award-winning Workeye Platinum Partner with over 15 years of expertise in workforce management consultation, customization, API integration, and mobile apps integration to enhance your digital experience.",
    specialties: [
      "Custom Integration",
      "Enterprise Solutions",
      "Training & Support",
    ],
    certifications: ["Advanced Implementation", "Security Specialist"],
  },
  {
    id: 2,
    name: "Digital Workforce Partners",
    type: "Consulting Partner",
    location: "San Francisco, Los Angeles, Seattle, WA",
    badge: "GOLD",
    description:
      "A proficient workforce consulting firm empowering organizations with expert guidance and customized Workeye solutions, driving efficient digital transformations to achieve their business goals.",
    specialties: ["Strategy Consulting", "Process Optimization", "Analytics"],
    certifications: ["Certified Consultant"],
  },
  {
    id: 3,
    name: "Enterprise Management Group",
    type: "Technology Partner",
    location: "Chicago, IL",
    badge: "GOLD",
    description:
      "Leading technology partner specializing in Workeye implementations for large enterprises, offering comprehensive solutions from planning to deployment and ongoing support.",
    specialties: [
      "Enterprise Deployment",
      "System Integration",
      "Custom Development",
    ],
    certifications: ["Enterprise Solutions", "Technical Expert"],
  },
  {
    id: 4,
    name: "Global Workforce Solutions",
    type: "Implementation Partner",
    location: "Austin, Dallas, Houston, TX",
    badge: "SILVER",
    description:
      "Dedicated to helping businesses optimize their workforce management through Workeye implementation, training, and continuous improvement initiatives.",
    specialties: ["Implementation", "Training Programs", "Support Services"],
  },
  {
    id: 5,
    name: "Productivity Partners Inc",
    type: "Value-Added Reseller",
    location: "Boston, MA",
    badge: "GOLD",
    description:
      "Certified Workeye reseller providing comprehensive workforce management solutions with focus on productivity enhancement and employee engagement.",
    specialties: ["Sales & Licensing", "Implementation", "Customer Success"],
    certifications: ["Certified Reseller"],
  },
  {
    id: 6,
    name: "Innovation Consulting Group",
    type: "Consulting Partner",
    location: "Miami, Orlando, Tampa, FL",
    badge: "SILVER",
    description:
      "Strategic consulting partner helping organizations transform their workforce management practices through innovative Workeye solutions and best practices.",
    specialties: [
      "Change Management",
      "Workflow Design",
      "Analytics & Reporting",
    ],
  },
];

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
      <Navbar
        onLoginClick={onPartnerLoginClick}
        onLogoClick={onBackToHome}
        onNavigateToSection={onNavigateToSection}
      />
      <TopBanner />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-24"
      >
        <div className="container mx-auto px-6 h-12">
          <br></br>
          <br></br>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            
            className="text-5xl md:text-6xl mb-6"
          >
            Find a Workeye Partner in your area!
          </motion.h1>
        </div>
      </motion.section>

      {/* Tabs Navigation */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex">
            <button
              onClick={onBecomePartnerClick}
              className="flex-1 py-4 text-center font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
            >
              Become a partner
            </button>
            <button className="flex-1 py-4 text-center font-medium text-blue-600 border-b-2 border-blue-600 bg-white">
              Partner directory
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl mb-6 text-gray-900">
              Workeye Partners can help you create and manage your
              workforce!
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
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

          {/* Partner Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Building2 className="w-5 h-5 text-blue-600" />
                          <h3 className="text-xl font-semibold text-gray-900">
                            {partner.name}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {partner.type}
                        </p>
                      </div>
                      <Badge
                        className={`${getBadgeColor(partner.badge)} border font-semibold`}
                      >
                        {partner.badge}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                      <MapPin className="w-4 h-4" />
                      <span>{partner.location}</span>
                    </div>

                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {partner.description}
                    </p>

                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-semibold text-gray-900">
                            Specialties:
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 ml-6">
                          {partner.specialties.map((specialty, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                            >
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {partner.certifications &&
                        partner.certifications.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Award className="w-4 h-4 text-blue-600" />
                              <span className="text-sm font-semibold text-gray-900">
                                Certifications:
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2 ml-6">
                              {partner.certifications.map((cert, idx) => (
                                <Badge
                                  key={idx}
                                  variant="outline"
                                  className="text-xs bg-green-50 text-green-700 border-green-200"
                                >
                                  {cert}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-blue-500 to-blue-500 rounded-lg p-12 text-white ">
              <Users className="w-16 h-16 mx-auto mb-6" />
              <h3 className="text-3xl mb-4">
                Interested in becoming a partner?
              </h3>
              <p className="text-lg mb-8 max-w-2xl mx-auto text-blue-50">
                Join our growing network of partners and help businesses
                optimize their workforce management.
              </p>
              <button
                onClick={onBecomePartnerClick}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
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