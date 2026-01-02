import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQCategory {
  category: string;
  icon: string;
  faqs: FAQ[];
}

export function FAQSection() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openQuestions, setOpenQuestions] = useState<{ [key: string]: number | null }>({});

  const faqCategories: FAQCategory[] = [
    {
      category: 'Technical',
      icon: '⚙️',
      faqs: [
        {
          question: 'What are the system requirements for WorkTrackPro?',
          answer: 'WorkTrackPro requires Windows 10 or later, macOS 10.15 or later, or Linux (Ubuntu 18.04+). The tracker requires minimal system resources: 2GB RAM, 500MB disk space, and a stable internet connection. The tracker runs silently in the background with minimal CPU usage (<5%).',
        },
        {
          question: 'How does the real-time tracking work?',
          answer: 'Our tracking system uses Server-Sent Events (SSE) for real-time dashboard updates without constant polling. The desktop tracker monitors cursor movements, application usage, and system events at 1-minute intervals. Screenshots are captured at configurable intervals (default 5 minutes) and securely transmitted using TLS 1.3 encryption.',
        },
        {
          question: 'Is the tracker software detectable by employees?',
          answer: 'The WorkTrackPro tracker is visible in the system tray and task manager as per ethical monitoring practices. We believe in transparent workforce monitoring. Employees can see when tracking is active, and the software displays clear indicators during screenshot capture.',
        },
        {
          question: 'What happens if the internet connection is lost?',
          answer: 'The tracker stores all activity data locally using our database-free JSON storage architecture. Once the connection is restored, it automatically syncs all offline data to the server. No tracking data is lost during internet outages.',
        },
        {
          question: 'Can I customize tracking intervals and settings?',
          answer: 'Yes, administrators have full control over tracking settings including screenshot intervals (1-30 minutes), idle detection timeout (1-15 minutes), browser tracking preferences, and office hours filtering. All settings can be configured per user or organization-wide.',
        },
      ],
    },
    {
      category: 'General',
      icon: '💼',
      faqs: [
        {
          question: 'What is WorkTrackPro?',
          answer: 'WorkTrackPro is a comprehensive employee tracking application that monitors workforce activity through real-time system tracking, including cursor/idle detection, app usage monitoring, browser activity tracking, system lock/unlock detection, computer on/off logging, and automated screenshot capture. It helps organizations improve productivity and ensure accountability.',
        },
        {
          question: 'Is WorkTrackPro suitable for remote teams?',
          answer: 'Absolutely! WorkTrackPro is specifically designed for remote and hybrid workforce management. With real-time tracking, automated daily summaries, and comprehensive activity logs, managers can monitor remote employees as effectively as in-office teams. The system works seamlessly across different time zones.',
        },
        {
          question: 'How do I get started with WorkTrackPro?',
          answer: 'Getting started is simple: 1) Sign up for a free 14-day trial (no credit card required), 2) Download and install the tracker on employee computers, 3) Configure your tracking preferences in the admin dashboard, 4) Start monitoring and receiving automatic daily productivity reports. Our setup wizard guides you through each step.',
        },
        {
          question: 'Do you offer training and support?',
          answer: 'Yes! We provide comprehensive onboarding training, video tutorials, documentation, and 24/7 email support. Professional and Enterprise plans include live chat support and dedicated account managers. We also offer webinar training sessions for team administrators.',
        },
        {
          question: 'Can I integrate WorkTrackPro with other tools?',
          answer: 'Currently, WorkTrackPro operates as a standalone solution with its own dashboard and reporting system. However, we offer data export features (CSV, PDF) for integration with your existing HR and productivity tools. API access is available on Enterprise plans.',
        },
      ],
    },
    {
      category: 'Billing & Pricing',
      icon: '💳',
      faqs: [
        {
          question: 'How does your pricing work?',
          answer: 'WorkTrackPro uses per-user monthly pricing with three tiers: Starter ($9/user/month for up to 5 users), Professional ($15/user/month for up to 50 users), and Enterprise (custom pricing for unlimited users). All plans include a 14-day free trial. Annual billing offers a 20% discount.',
        },
        {
          question: 'Is there a free trial available?',
          answer: 'Yes! We offer a 14-day free trial on all plans with no credit card required. You get full access to all features during the trial period. There are no hidden fees or surprise charges. You can cancel anytime during the trial with no obligations.',
        },
        {
          question: 'What happens when I exceed my user limit?',
          answer: 'When you approach your plan limit, you\'ll receive notifications in your dashboard. You can either upgrade to the next tier or purchase additional user seats. Overage charges apply at $2 per additional user per month on Starter and Professional plans. Enterprise plans support unlimited users.',
        },
        {
          question: 'Can I change or cancel my plan?',
          answer: 'Yes, you can upgrade, downgrade, or cancel your plan at any time from your account settings. Upgrades take effect immediately with prorated billing. Downgrades and cancellations take effect at the end of your current billing cycle. All your data is retained for 30 days after cancellation.',
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), debit cards, and ACH bank transfers for Enterprise plans. All payments are processed securely through Stripe with PCI DSS compliance. We do not store your payment information on our servers.',
        },
      ],
    },
    {
      category: 'Features & Data',
      icon: '📊',
      faqs: [
        {
          question: 'What tracking features are included?',
          answer: 'WorkTrackPro includes: Real-time cursor/idle detection (1-minute intervals), comprehensive app usage monitoring with timestamps, browser activity and website tracking, automated screenshot capture (configurable from 1-30 minutes), system lock/unlock detection, computer on/off time logging, automatic daily productivity summaries, and self-updating tracker system.',
        },
        {
          question: 'How is productivity calculated?',
          answer: 'Our productivity algorithm analyzes active time (keyboard/mouse activity), application usage patterns, website categories (productive vs. unproductive), idle time, and system availability. Daily summaries provide productivity scores, active hours, top applications used, and website activity. All calculations are transparent and customizable.',
        },
        {
          question: 'How long is tracking data retained?',
          answer: 'Data retention varies by plan: Starter (30 days), Professional (90 days), and Enterprise (unlimited). All data is stored using our secure database-free JSON architecture with AES-256 encryption. You can export data anytime before the retention period expires.',
        },
        {
          question: 'Can employees access their own tracking data?',
          answer: 'Yes, transparency is important to us. Employees can log in to view their own activity logs, screenshots, productivity scores, and daily summaries. This promotes accountability and helps employees understand their work patterns. Administrators control which data elements are visible to employees.',
        },
        {
          question: 'Is my company data secure and private?',
          answer: 'Absolutely. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We comply with GDPR, CCPA, and SOC 2 Type II standards. We never sell or share your data with third parties. Access is restricted to authorized personnel within your organization. Regular security audits and penetration testing ensure maximum protection.',
        },
      ],
    },
  ];

  const toggleCategory = (category: string) => {
    if (openCategory === category) {
      setOpenCategory(null);
      setOpenQuestions({ ...openQuestions, [category]: null });
    } else {
      setOpenCategory(category);
      setOpenQuestions({ ...openQuestions, [category]: null });
    }
  };

  const toggleQuestion = (category: string, index: number) => {
    setOpenQuestions({
      ...openQuestions,
      [category]: openQuestions[category] === index ? null : index,
    });
  };

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl sm:text-5xl mb-4">
            Frequently Asked <span className="text-[#00C4CC]">Questions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about WorkTrackPro's features, pricing, and implementation
          </p>
        </motion.div>

        {/* FAQ Categories - Nested Dropdowns */}
        <div className="space-y-4">
          {faqCategories.map((category, idx) => {
            const isCategoryOpen = openCategory === category.category;
            return (
              <motion.div 
                key={category.category} 
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                {/* Category Header - First Level Dropdown */}
                <button
                  onClick={() => toggleCategory(category.category)}
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{category.icon}</span>
                    <h3 className="text-2xl text-[#003366]">
                      {category.category}
                    </h3>
                  </div>
                  <div className="flex-shrink-0">
                    {isCategoryOpen ? (
                      <ChevronUp className="h-6 w-6 text-[#00C4CC]" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                </button>

                {/* Questions - Second Level Dropdown */}
                {isCategoryOpen && (
                  <div className="border-t border-gray-200 bg-gray-50">
                    {category.faqs.map((faq, index) => {
                      const isQuestionOpen = openQuestions[category.category] === index;
                      return (
                        <div key={index} className="border-b border-gray-200 last:border-b-0">
                          <button
                            onClick={() => toggleQuestion(category.category, index)}
                            className="w-full px-8 py-4 flex items-start justify-between hover:bg-white transition-colors text-left"
                          >
                            <div className="flex-1 pr-4">
                              <h4 className="text-lg text-[#003366]">
                                {faq.question}
                              </h4>
                            </div>
                            <div className="flex-shrink-0 mt-1">
                              {isQuestionOpen ? (
                                <ChevronUp className="h-5 w-5 text-[#00C4CC]" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-gray-400" />
                              )}
                            </div>
                          </button>
                          
                          {/* Answer */}
                          {isQuestionOpen && (
                            <div className="px-8 pb-4 bg-white">
                              <p className="text-gray-600 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-[#003366] rounded-2xl p-8 sm:p-12">
          <h3 className="text-2xl sm:text-3xl text-white mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-200 text-lg mb-6 max-w-2xl mx-auto">
            Our support team is here to help you understand how WorkTrackPro can transform your workforce management
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@worktrackpro.com"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#003366] rounded-lg hover:bg-[#00C4CC] hover:text-white transition-colors"
            >
              Contact Support
            </a>
            <a
              href="#pricing"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg hover:bg-white hover:text-[#003366] transition-colors"
            >
              Start Free Trial
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}