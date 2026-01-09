import { useState } from 'react';
import { motion } from 'motion/react';
import { Navbar } from './Navbar';
import { TopBanner } from './TopBanner';
import { Footer } from './Footer';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { 
  Building2, 
  Users, 
  Globe, 
  TrendingUp, 
  Award, 
  CheckCircle,
  Send,
  Handshake,
  Target,
  Zap
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface BecomePartnerPageProps {
  onBackToPartners: () => void;
  onPartnerLoginClick: () => void;
  onBackToHome: () => void;
  onNavigateToSection: (section: string) => void;
}

const benefits = [
  {
    icon: TrendingUp,
    title: 'Revenue Growth',
    description: 'Expand your business with competitive margins and recurring revenue opportunities'
  },
  {
    icon: Users,
    title: 'Marketing Support',
    description: 'Get access to marketing materials, co-marketing opportunities, and lead generation'
  },
  {
    icon: Award,
    title: 'Training & Certification',
    description: 'Comprehensive training programs and certification to enhance your expertise'
  },
  {
    icon: Handshake,
    title: 'Dedicated Support',
    description: 'Priority technical support and dedicated partner success manager'
  },
  {
    icon: Target,
    title: 'Sales Enablement',
    description: 'Sales tools, presentations, and demo environments to help close deals'
  },
  {
    icon: Zap,
    title: 'Early Access',
    description: 'Get early access to new features and participate in beta programs'
  }
];

export function BecomePartnerPage({ onBackToPartners, onPartnerLoginClick, onBackToHome, onNavigateToSection }: BecomePartnerPageProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    companySize: '',
    country: '',
    state: '',
    city: '',
    partnerType: '',
    industryFocus: '',
    experience: '',
    currentSolutions: '',
    certifications: '',
    estimatedClients: '',
    message: '',
    agreeToTerms: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      toast.error('Please accept the terms and conditions');
      return;
    }

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'company', 'partnerType'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.success('Application submitted successfully! Our team will contact you within 2-3 business days.');
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      website: '',
      companySize: '',
      country: '',
      state: '',
      city: '',
      partnerType: '',
      industryFocus: '',
      experience: '',
      currentSolutions: '',
      certifications: '',
      estimatedClients: '',
      message: '',
      agreeToTerms: false
    });
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
        className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20"
      >
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl mb-6">
                Join Our Partner Network
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Become a WorkTrackPro partner and unlock new revenue opportunities while helping businesses 
                optimize their workforce management.
              </p>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-1">500+</div>
                  <div className="text-sm text-blue-200">Active Partners</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-1">50K+</div>
                  <div className="text-sm text-blue-200">Clients Served</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-1">95%</div>
                  <div className="text-sm text-blue-200">Satisfaction Rate</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="hidden md:block"
            >
              <img 
                src="https://images.unsplash.com/photo-1745847768380-2caeadbb3b71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBhcnRuZXJzaGlwJTIwaGFuZHNoYWtlfGVufDF8fHx8MTc2NzkzMDMzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Partnership"
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl mb-4 text-gray-900">Partner Benefits</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Unlock exclusive benefits designed to help you grow your business and serve your clients better
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-gray-200">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl mb-4 text-gray-900">Partnership Programs</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the partnership model that best fits your business
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Card className="h-full border-2 border-blue-200 hover:border-blue-400 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle>Reseller Partner</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Sell WorkTrackPro licenses to your clients and earn competitive margins on every sale.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Competitive pricing tiers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Sales enablement tools</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Marketing support</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Card className="h-full border-2 border-cyan-200 hover:border-cyan-400 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-cyan-600" />
                  </div>
                  <CardTitle>Implementation Partner</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Help clients deploy and customize WorkTrackPro for their specific needs.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Technical training & certification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Implementation methodologies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Priority support</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <Card className="h-full border-2 border-purple-200 hover:border-purple-400 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle>Technology Partner</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Integrate your solution with WorkTrackPro and expand your market reach.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">API access & documentation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Co-marketing opportunities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Technical collaboration</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-10">
              <h2 className="text-4xl mb-4 text-gray-900">Partner Application Form</h2>
              <p className="text-lg text-gray-600">
                Fill out the form below and our partner team will contact you within 2-3 business days
              </p>
            </div>

            <Card className="border-gray-200 shadow-xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      Personal Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          placeholder="John"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          placeholder="Doe"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="john@company.com"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+1 (555) 123-4567"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Company Information */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-blue-600" />
                      Company Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company">Company Name *</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          placeholder="Your Company Inc."
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          type="url"
                          value={formData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          placeholder="https://www.yourcompany.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="companySize">Company Size</Label>
                        <Select value={formData.companySize} onValueChange={(value) => handleInputChange('companySize', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-10">1-10 employees</SelectItem>
                            <SelectItem value="11-50">11-50 employees</SelectItem>
                            <SelectItem value="51-200">51-200 employees</SelectItem>
                            <SelectItem value="201-500">201-500 employees</SelectItem>
                            <SelectItem value="500+">500+ employees</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          value={formData.country}
                          onChange={(e) => handleInputChange('country', e.target.value)}
                          placeholder="United States"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State/Province</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          placeholder="California"
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          placeholder="San Francisco"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Partnership Details */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
                      <Handshake className="w-5 h-5 text-blue-600" />
                      Partnership Details
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="partnerType">Partner Type *</Label>
                        <Select value={formData.partnerType} onValueChange={(value) => handleInputChange('partnerType', value)} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select partner type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="reseller">Reseller Partner</SelectItem>
                            <SelectItem value="implementation">Implementation Partner</SelectItem>
                            <SelectItem value="technology">Technology Partner</SelectItem>
                            <SelectItem value="consulting">Consulting Partner</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="industryFocus">Industry Focus</Label>
                        <Input
                          id="industryFocus"
                          value={formData.industryFocus}
                          onChange={(e) => handleInputChange('industryFocus', e.target.value)}
                          placeholder="e.g., Healthcare, Finance, Technology"
                        />
                      </div>
                      <div>
                        <Label htmlFor="experience">Years of Experience</Label>
                        <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select experience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-2">0-2 years</SelectItem>
                            <SelectItem value="3-5">3-5 years</SelectItem>
                            <SelectItem value="6-10">6-10 years</SelectItem>
                            <SelectItem value="10+">10+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="estimatedClients">Estimated Monthly Clients</Label>
                        <Input
                          id="estimatedClients"
                          value={formData.estimatedClients}
                          onChange={(e) => handleInputChange('estimatedClients', e.target.value)}
                          placeholder="e.g., 10-20"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="currentSolutions">Current Solutions/Services Offered</Label>
                        <Textarea
                          id="currentSolutions"
                          value={formData.currentSolutions}
                          onChange={(e) => handleInputChange('currentSolutions', e.target.value)}
                          placeholder="Describe the solutions and services you currently offer..."
                          rows={3}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="certifications">Relevant Certifications</Label>
                        <Input
                          id="certifications"
                          value={formData.certifications}
                          onChange={(e) => handleInputChange('certifications', e.target.value)}
                          placeholder="List any relevant certifications"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-blue-600" />
                      Additional Information
                    </h3>
                    <div>
                      <Label htmlFor="message">Why do you want to become a WorkTrackPro partner?</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Tell us about your interest in becoming a partner and how you plan to add value..."
                        rows={4}
                      />
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                      I agree to the WorkTrackPro Partner Program terms and conditions. I understand that my application 
                      will be reviewed and that acceptance into the partner program is subject to approval. *
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      Submit Application
                    </button>
                    <button
                      type="button"
                      onClick={onBackToPartners}
                      className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Back to Partners
                    </button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
