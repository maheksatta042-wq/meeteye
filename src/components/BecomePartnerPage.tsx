import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { CheckCircle, Globe, TrendingUp, Users, Award, Briefcase, Target, Zap } from 'lucide-react';
import { submitPartnerApplication } from '../api/partnerProgram';

interface BecomePartnerPageProps {
  onBackToPartners: () => void;
  onPartnerLoginClick: () => void;
  onBackToHome: () => void;
  onNavigateToSection: (section: string) => void;
}

export function BecomePartnerPage({
  onBackToPartners,
  onPartnerLoginClick,
  onBackToHome,
  onNavigateToSection,
}: BecomePartnerPageProps) {
  const partnerBenefits = [
    {
      icon: TrendingUp,
      title: 'Revenue Growth',
      description: 'Unlock new revenue streams with our partner program',
    },
    {
      icon: Users,
      title: 'Training & Certification',
      description: 'Access comprehensive training and certification programs',
    },
    {
      icon: Award,
      title: 'Partner Tiers',
      description: 'Bronze, Silver, and Gold partnership levels',
    },
    {
      icon: Briefcase,
      title: 'Business Support',
      description: 'Dedicated partner success managers',
    },
    {
      icon: Target,
      title: 'Marketing Resources',
      description: 'Co-marketing materials and campaigns',
    },
    {
      icon: Zap,
      title: 'Priority Support',
      description: 'Fast-track technical support for partners',
    },
  ];

  const partnerTiers = [
    {
      name: 'Bronze Partner',
      color: 'from-orange-400 to-orange-600',
      requirements: ['Basic certification', '5+ implementations', 'Annual revenue target'],
      benefits: ['Partner badge', 'Marketing materials', 'Technical support'],
    },
    {
      name: 'Silver Partner',
      color: 'from-gray-300 to-gray-500',
      requirements: ['Advanced certification', '15+ implementations', 'Higher revenue target'],
      benefits: ['All Bronze benefits', 'Priority support', 'Co-marketing opportunities'],
    },
    {
      name: 'Gold Partner',
      color: 'from-yellow-400 to-yellow-600',
      requirements: ['Expert certification', '30+ implementations', 'Premium revenue target'],
      benefits: ['All Silver benefits', 'Dedicated success manager', 'Featured listing'],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#002855] to-[#0066CC] text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Become a Workeye Partner
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Join our network of trusted partners and grow your business with Workeye
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <div className="bg-[#00BCD4] sticky top-16 md:top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="flex-1 md:flex-none px-8 py-4 text-center bg-white text-[#002855] font-medium border-b-4 border-white">
              Become a partner
            </div>
            <Link
              to="/partners"
              className="flex-1 md:flex-none px-8 py-4 text-center text-white hover:bg-white/10 transition-colors font-medium border-b-4 border-transparent hover:border-white"
            >
              Partner directory
            </Link>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-[#EBF5FB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#002855] mb-6">
              Partner Benefits & Advantages
            </h2>
            <p className="text-[#5A6C7D] text-lg md:text-xl max-w-3xl mx-auto">
              Join 500+ global partners who are growing their business with Workeye
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {partnerBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#00BCD4] hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#00BCD4] to-[#0066CC] rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-[#002855] mb-3">
                  {benefit.title}
                </h3>
                <p className="text-[#5A6C7D]">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Tiers */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#002855] mb-6">
              Partnership Tiers
            </h2>
            <p className="text-[#5A6C7D] text-lg md:text-xl max-w-3xl mx-auto">
              Choose the partnership level that matches your business goals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {partnerTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:shadow-xl transition-all"
              >
                <div className={`bg-gradient-to-r ${tier.color} text-white py-6 px-8 text-center`}>
                  <h3 className="text-2xl font-bold">{tier.name}</h3>
                </div>
                <div className="p-8">
                  <div className="mb-6">
                    <h4 className="font-bold text-[#002855] mb-3">Requirements:</h4>
                    <ul className="space-y-2">
                      {tier.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-[#5A6C7D] text-sm">
                          <CheckCircle className="text-[#00BCD4] flex-shrink-0 mt-0.5" size={16} />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#002855] mb-3">Benefits:</h4>
                    <ul className="space-y-2">
                      {tier.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-[#5A6C7D] text-sm">
                          <CheckCircle className="text-[#00BCD4] flex-shrink-0 mt-0.5" size={16} />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <ApplicationForm />
    </div>
  );
}

// Application Form Component - Updated to match Callifo structure
function ApplicationForm() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    website: '',
    companySize: '',
    partnerType: '',
    experience: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mapping functions to match API requirements (same as Callifo)
  const mapPartnerType = (type: string) => {
    if (type === "distributor") {
      return "distributor";
    }
    // All other types (reseller, implementation, technology, referral) are channel partners
    return "channel_partner";
  };

  const mapExperience = (exp: string) => {
    switch (exp) {
      case "0-1":
        return "0-1";
      case "1-3":
        return "1-3";
      case "3-5":
        return "3-5";
      case "5-10":
        return "5-10";
      case "10+":
        return "10+";
      default:
        return "0-1";
    }
  };

  const mapBusinessType = (partnerType: string) => {
    switch (partnerType) {
      case "technology":
        return "Technology";
      case "reseller":
        return "Reseller";
      case "implementation":
        return "Consulting";
      case "referral":
        return "Other";
      default:
        return "Other";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (!formData.companyName || !formData.contactName || !formData.email || 
        !formData.phone || !formData.country || !formData.city || 
        !formData.companySize || !formData.partnerType || !formData.experience) {
      alert("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        contactInformation: {
          fullName: formData.contactName,
          email: formData.email,
          phone: formData.phone,
        },

        companyInformation: {
          companyName: formData.companyName,
          website: formData.website || "",
          country: formData.country,
          city: formData.city,
        },

        businessDetails: {
          businessType: mapBusinessType(formData.partnerType),
          yearsInBusiness: mapExperience(formData.experience),
          numberOfEmployees: formData.companySize,
          existingClients: 0,
        },

        partnershipDetails: {
          joinAs: mapPartnerType(formData.partnerType),
          motivation: formData.message || "No additional information provided",
        },

        source: "workeye",
      };

      console.log("Submitting partner application:", payload);

      await submitPartnerApplication(payload);

      alert("Thank you for your interest! We'll review your application and get back to you within 48 hours.");
      
      // Reset form
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        country: '',
        city: '',
        website: '',
        companySize: '',
        partnerType: '',
        experience: '',
        message: '',
      });

    } catch (error: any) {
      console.error("Partner application failed:", error);
      console.error("Error response:", error.response?.data);
      
      const errorMessage = error.response?.data?.message 
        || error.message 
        || "Submission failed. Please try again.";
      
      alert(`Application submission failed: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-16 md:py-24 bg-[#EBF5FB]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#002855] mb-6">
            Apply for Partnership
          </h2>
          <p className="text-[#5A6C7D] text-lg">
            Fill out the form below and our team will get back to you within 48 hours
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-[#002855] mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  required
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BCD4] focus:border-transparent outline-none transition-all"
                  placeholder="Your Company Ltd."
                />
              </div>

              <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-[#002855] mb-2">
                  Contact Name *
                </label>
                <input
                  type="text"
                  id="contactName"
                  name="contactName"
                  required
                  value={formData.contactName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BCD4] focus:border-transparent outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#002855] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BCD4] focus:border-transparent outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[#002855] mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BCD4] focus:border-transparent outline-none transition-all"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-[#002855] mb-2">
                  Country *
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BCD4] focus:border-transparent outline-none transition-all"
                  placeholder="United States"
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-[#002855] mb-2">
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BCD4] focus:border-transparent outline-none transition-all"
                  placeholder="New York"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-[#002855] mb-2">
                  Company Website
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BCD4] focus:border-transparent outline-none transition-all"
                  placeholder="https://yourcompany.com"
                />
              </div>

              <div>
                <label htmlFor="companySize" className="block text-sm font-medium text-[#002855] mb-2">
                  Company Size *
                </label>
                <select
                  id="companySize"
                  name="companySize"
                  required
                  value={formData.companySize}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BCD4] focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="500+">500+ employees</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="partnerType" className="block text-sm font-medium text-[#002855] mb-2">
                  Partner Type *
                </label>
                <select
                  id="partnerType"
                  name="partnerType"
                  required
                  value={formData.partnerType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BCD4] focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select type</option>
                  <option value="reseller">Reseller Partner</option>
                  <option value="distributor">Distributor</option>
                  <option value="implementation">Implementation Partner</option>
                  <option value="technology">Technology Partner</option>
                  <option value="referral">Referral Partner</option>
                </select>
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-[#002855] mb-2">
                  Years of Experience *
                </label>
                <select
                  id="experience"
                  name="experience"
                  required
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BCD4] focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select experience</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[#002855] mb-2">
                Additional Information
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BCD4] focus:border-transparent outline-none transition-all resize-none"
                placeholder="Tell us why you want to become a partner and what makes your company unique..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#00BCD4] to-[#0066CC] text-white py-4 rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}