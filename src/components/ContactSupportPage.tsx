import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Mail, Phone, MapPin, Clock, MessageCircle, HeadphonesIcon, ArrowLeft } from 'lucide-react';
import { createCustomerSupport } from "../api/customerSupport";


interface ContactSupportPageProps {
  onBack: () => void;
}

export function ContactSupportPage({ onBack }: ContactSupportPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    type: 'support'
  });

  const [loading, setLoading] = useState(false);
  const mapInquiryType = (type: string) => {
  switch (type) {
    case "support":
      return "TECHNICAL_SUPPORT";
    case "sales":
      return "SALES_INQUIRY";
    case "billing":
      return "BILLING_QUESTION";
    case "demo":
      return "DEMO_REQUEST";
    case "feature":
      return "FEATURE_REQUEST";
    case "bug":
      return "BUG_REPORT";
    default:
      return "OTHER";
  }
};


  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  const payload = {
    fullName: formData.name,
    email: formData.email,
    phoneNumber: formData.phone,
    companyName: formData.company,

    inquiryType: mapInquiryType(formData.type),
    subject: formData.subject,
    message: formData.message,

    source: "WORKEYE", // Just a string now
  };

  try {
    await createCustomerSupport(payload);

    alert("Thank you! Our support team will get back to you within 24 hours.");

    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: "",
      type: "support",
    });
    } catch (error) {
        console.error(error);
        alert("Failed to submit support request. Please try again.");
    } finally {
        setLoading(false);
    }
    };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="bg-[#00C4CC] text-white py-12">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-white hover:text-white hover:bg-white/20"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">Contact Support</h1>
          <p className="text-white/90 text-lg max-w-2xl">
            Our support team is here to help you with any questions about WorkEye
          </p>
        </div>
      </div>
      <br></br>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information Cards */}
          <div className="lg:col-span-1 space-y-6">
            {/* Customer Support Card */}
            <Card className="border-2 hover:border-[#003366]/30 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-[#003366]/10 flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-[#003366]" />
                </div>
                <CardTitle className="text-[#003366]">Customer Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-[#003366] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <a href="mailto:support@workeye.com" className="text-sm text-gray-600 hover:text-[#003366] transition-colors">
                      support@workeye.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-[#003366] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Phone</p>
                    <a href="tel:+18001234567" className="text-sm text-gray-600 hover:text-[#003366] transition-colors">
                      +1 (800) 123-4567
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-[#003366] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Support Hours</p>
                    <p className="text-sm text-gray-600">24/7 Support Available</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sales Inquiries Card */}
            <Card className="border-2 hover:border-[#003366]/30 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-[#003366]/10 flex items-center justify-center mb-4">
                  <HeadphonesIcon className="h-6 w-6 text-[#003366]" />
                </div>
                <CardTitle className="text-[#003366]">Sales Inquiries</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-[#003366] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <a href="mailto:sales@workeye.com" className="text-sm text-gray-600 hover:text-[#003366] transition-colors">
                      sales@workeye.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-[#003366] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Phone</p>
                    <a href="tel:+18001234568" className="text-sm text-gray-600 hover:text-[#003366] transition-colors">
                      +1 (800) 123-4568
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-[#003366] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Hours</p>
                    <p className="text-sm text-gray-600">Mon-Fri: 9AM - 6PM PST</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Office Location Card */}
            <Card className="border-2 hover:border-[#003366]/30 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-[#003366]/10 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-[#003366]" />
                </div>
                <CardTitle className="text-[#003366]">Office Location</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 leading-relaxed">
                  WorkEye Headquarters<br />
                  123 Business Ave<br />
                  San Francisco, CA 94105<br />
                  United States
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-2 shadow-lg">
              <CardHeader className="space-y-2">
                <CardTitle className="text-2xl text-gray-900">Send us a Message</CardTitle>
                <p className="text-gray-600">
                  Fill out the form below and our support team will get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-gray-900">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border-gray-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-900">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border-gray-300"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-gray-900">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border-gray-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium text-gray-900">
                        Company Name
                      </label>
                      <Input
                        id="company"
                        name="company"
                        placeholder="Acme Corporation"
                        value={formData.company}
                        onChange={handleChange}
                        className="border-gray-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="type" className="text-sm font-medium text-gray-900">
                      Inquiry Type *
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                      required
                    >
                      <option value="support">Technical Support</option>
                      <option value="sales">Sales Inquiry</option>
                      <option value="billing">Billing Question</option>
                      <option value="demo">Demo Request</option>
                      <option value="feature">Feature Request</option>
                      <option value="bug">Bug Report</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-gray-900">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="How can we help you?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="border-gray-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-900">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Please describe your inquiry in detail..."
                      className="min-h-[150px] border-gray-300"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <Button
                    type="submit"
                    size="lg"
                    className="flex-1 bg-[#00C4CC] hover:bg-[#00C4CC]/90"
                    disabled={loading}
                    >
                    {loading ? "Submitting..." : "Send Message"}
                    </Button>

                    <Button 
                      type="button" 
                      size="lg" 
                      variant="outline"
                      onClick={onBack}
                      className="flex-1 border-gray-300 hover:bg-gray-100"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* FAQ Quick Link */}
            <Card className="border-2 border-[#003366]/20 bg-gradient-to-r from-[#003366]/5 to-[#003366]/10">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-[#003366]">Looking for Quick Answers?</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Check out our FAQ section for instant answers to common questions about WorkEye.
                </p>
                <Button 
                variant="outline" 
                onClick={() => {
                    onBack(); // Go back to home page first
                    setTimeout(() => {
                    const faqElement = document.getElementById('faqs');
                    if (faqElement) {
                        faqElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                    }, 100); // Small delay to ensure page has loaded
                }}
                className="border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white"
                >
                Visit FAQ Section
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

