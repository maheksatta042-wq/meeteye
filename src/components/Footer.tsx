import React, { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { Shield, FileText, Cookie, Lock, Mail, MapPin } from 'lucide-react';

type PolicyType = 'privacy' | 'terms' | 'cookie' | 'security' | null;

interface PolicySection {
  title: string;
  content?: string;
  bullets?: string[];
  type?: 'date' | 'normal';
  contact?: {
    email: string;
    address?: string;
  };
}

interface PolicyContent {
  title: string;
  icon: any;
  sections: PolicySection[];
}

export function Footer() {
  const [openPolicy, setOpenPolicy] = useState<PolicyType>(null);

  const policyContent: Record<Exclude<PolicyType, null>, PolicyContent> = {
    privacy: {
      title: 'Privacy Policy',
      icon: Shield,
      sections: [
        {
          title: 'Last Updated',
          content: 'December 12, 2025',
          type: 'date'
        },
        {
          title: '1. Information We Collect',
          content: 'WorkEye collects employee activity data to provide workforce monitoring and productivity analytics services. The information collected includes:',
          bullets: [
            'Cursor movements and idle detection data',
            'Application usage and window titles',
            'Browser activity and visited URLs',
            'System events (lock/unlock, on/off)',
            'Screenshots (as configured by your administrator)',
            'Login and session timestamps'
          ]
        },
        {
          title: '2. How We Use Your Information',
          content: 'The data collected is used exclusively for legitimate business purposes:',
          bullets: [
            'Monitor employee productivity and activity during work hours',
            'Generate comprehensive daily summaries and productivity reports',
            'Provide real-time tracking dashboards and analytics to administrators',
            'Identify patterns and trends in workforce productivity',
            'Maintain system security, integrity, and performance',
            'Comply with legal and regulatory requirements'
          ]
        },
        {
          title: '3. Data Storage and Security',
          content: 'We implement industry-standard security measures to protect your data:',
          bullets: [
            'All data encrypted at rest using AES-256 encryption',
            'Data transmitted via secure TLS 1.3 connections',
            'Database-free JSON storage architecture with secure permissions',
            'Data retention based on your subscription plan (30 days to unlimited)',
            'Regular security audits and vulnerability assessments',
            'Geographically distributed backup storage'
          ]
        },
        {
          title: '4. Data Sharing and Third Parties',
          content: 'Your privacy is our priority. We maintain strict data sharing policies:',
          bullets: [
            'We do not sell or rent your tracking data to third parties',
            'Data is accessible only to authorized administrators within your organization',
            'Third-party service providers (hosting, analytics) operate under strict confidentiality agreements',
            'Law enforcement requests are handled according to applicable legal requirements',
            'Data transfers comply with international privacy regulations'
          ]
        },
        {
          title: '5. Employee Rights and Data Access',
          content: 'Employees have specific rights regarding their tracked data:',
          bullets: [
            'Right to access personal tracking data',
            'Right to understand how data is being used',
            'Right to request data corrections or deletions (subject to retention policies)',
            'Right to file complaints with data protection authorities',
            'Contact your organization\'s administrator for data access requests'
          ]
        },
        {
          title: '6. Cookies and Tracking Technologies',
          content: 'WorkEye uses cookies and similar technologies:',
          bullets: [
            'Essential cookies for authentication and session management',
            'Performance cookies to monitor system functionality',
            'Real-time updates delivered via Server-Sent Events (SSE)',
            'No third-party advertising or tracking cookies',
            'See our Cookie Policy for detailed information'
          ]
        },
        {
          title: '7. International Data Transfers',
          content: 'If you access WorkEye from outside the United States, please note that your data may be transferred to and processed in the United States and other countries where our servers are located. We ensure appropriate safeguards are in place for international data transfers.'
        },
        {
          title: '8. Children\'s Privacy',
          content: 'WorkEye is not intended for individuals under the age of 18. We do not knowingly collect personal information from children.'
        },
        {
          title: '9. Changes to This Policy',
          content: 'We may update this privacy policy periodically to reflect changes in our practices or legal requirements. Material changes will be communicated to administrators via email and dashboard notifications. Continued use of WorkEye after changes constitutes acceptance of the updated policy.'
        },
        {
          title: 'Contact Information',
          content: 'For questions, concerns, or requests regarding our privacy practices:',
          contact: {
            email: 'privacy@workeye.com',
            address: 'WorkEye Privacy Team, 123 Business Ave, San Francisco, CA 94105'
          }
        }
      ]
    },
    terms: {
      title: 'Terms of Service',
      icon: FileText,
      sections: [
        {
          title: 'Last Updated',
          content: 'December 12, 2025',
          type: 'date'
        },
        {
          title: '1. Acceptance of Terms',
          content: 'By accessing or using WorkEye, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not access or use the service.'
        },
        {
          title: '2. Service Description',
          content: 'WorkEye provides comprehensive employee tracking and productivity monitoring software, including:',
          bullets: [
            'Real-time cursor and idle detection (1-minute intervals)',
            'Application and browser activity monitoring',
            'Automated screenshot capture (configurable intervals)',
            'System lock/unlock and power state logging',
            'Daily productivity summaries with automatic calculations',
            'Customizable tracking settings and schedules',
            'Detailed analytics and reporting dashboards'
          ]
        },
        {
          title: '3. User Accounts and Responsibilities',
          content: 'Account holders must adhere to the following requirements:',
          bullets: [
            'Admin accounts have full access to tracking data and system configuration',
            'Employees are subject to monitoring as configured by administrators',
            'Account credentials must be kept secure and confidential',
            'Users are responsible for all activities under their account',
            'Unauthorized access or credential sharing is prohibited',
            'Notify WorkEye immediately of any security breaches'
          ]
        },
        {
          title: '4. Acceptable Use Policy',
          content: 'WorkEye may only be used for:',
          bullets: [
            'Legitimate workforce monitoring and productivity measurement',
            'Compliance with applicable employment and labor laws',
            'Improving organizational efficiency and performance',
            'Security monitoring and incident detection',
            'Time tracking and attendance verification'
          ]
        },
        {
          title: '5. Prohibited Activities',
          content: 'The following activities are strictly prohibited:',
          bullets: [
            'Circumventing, disabling, or tampering with tracking mechanisms',
            'Accessing data or systems you are not authorized to view',
            'Using the service to violate employee privacy rights beyond legal limits',
            'Reverse engineering or attempting to extract source code',
            'Introducing malware, viruses, or harmful code',
            'Interfering with service availability or performance'
          ]
        },
        {
          title: '6. Data Ownership and Licensing',
          content: 'You retain full ownership of all data collected through WorkEye. WorkEye is granted a limited license to process and store this data solely for the purpose of providing the service. We do not claim ownership of your employee tracking data.'
        },
        {
          title: '7. Service Availability and Support',
          content: 'WorkEye strives to maintain high service availability:',
          bullets: [
            'Target uptime: 99.9% excluding scheduled maintenance',
            'Scheduled maintenance communicated 48 hours in advance',
            'Technical support available via email and chat',
            'Emergency support for critical issues',
            'Service status updates via dashboard and email'
          ]
        },
        {
          title: '8. Payment Terms and Billing',
          content: 'Subscription and payment terms:',
          bullets: [
            'Subscription fees billed monthly per active user',
            '14-day free trial available (no credit card required)',
            'Automatic renewal unless cancelled',
            'Cancellation takes effect at end of current billing cycle',
            'Refunds considered on case-by-case basis',
            'Price changes communicated 30 days in advance'
          ]
        },
        {
          title: '9. Intellectual Property',
          content: 'All WorkEye software, documentation, trademarks, and materials are protected by intellectual property laws. You may not copy, modify, distribute, or create derivative works without explicit written permission.'
        },
        {
          title: '10. Termination and Suspension',
          content: 'We reserve the right to suspend or terminate accounts that:',
          bullets: [
            'Violate these Terms of Service',
            'Engage in fraudulent or illegal activities',
            'Fail to pay subscription fees',
            'Pose security risks to the platform',
            'Abuse support or system resources'
          ]
        },
        {
          title: '11. Disclaimers and Limitations of Liability',
          content: 'WorkEye is provided "as is" without warranties of any kind. We are not liable for indirect, incidental, consequential, or punitive damages. Our total liability is limited to the amount paid for the service in the 12 months preceding the claim.'
        },
        {
          title: '12. Indemnification',
          content: 'You agree to indemnify and hold harmless WorkEye from any claims, losses, or damages arising from your use of the service or violation of these terms.'
        },
        {
          title: '13. Governing Law and Dispute Resolution',
          content: 'These terms are governed by the laws of the State of California, United States. Disputes will be resolved through binding arbitration in San Francisco, California.'
        },
        {
          title: 'Contact Information',
          content: 'For questions about these Terms of Service:',
          contact: {
            email: 'legal@workeye.com',
            address: 'WorkEye Legal Department, 123 Business Ave, San Francisco, CA 94105'
          }
        }
      ]
    },
    cookie: {
      title: 'Cookie Policy',
      icon: Cookie,
      sections: [
        {
          title: 'Last Updated',
          content: 'December 12, 2025',
          type: 'date'
        },
        {
          title: '1. What Are Cookies?',
          content: 'Cookies are small text files stored on your device by your web browser when you visit websites. They help websites remember your preferences, maintain your login session, and provide analytics about how the site is used.'
        },
        {
          title: '2. How WorkEye Uses Cookies',
          content: 'WorkEye uses several types of cookies to provide and improve our services:'
        },
        {
          title: 'Essential Cookies (Required)',
          content: 'These cookies are necessary for the website to function properly:',
          bullets: [
            'Authentication and session management',
            'Security and fraud prevention',
            'Maintaining login state across browser sessions',
            'Remembering user preferences and settings',
            'Core functionality of the tracking dashboard',
            'CSRF protection and request validation'
          ]
        },
        {
          title: 'Performance and Analytics Cookies',
          content: 'These cookies help us understand and improve system performance:',
          bullets: [
            'Monitoring system performance and uptime',
            'Understanding how users interact with the dashboard',
            'Identifying and resolving technical issues',
            'Measuring page load times and responsiveness',
            'Tracking feature usage and adoption rates'
          ]
        },
        {
          title: 'Functional Cookies',
          content: 'These cookies enhance your experience:',
          bullets: [
            'Remembering dashboard layout preferences',
            'Saving filter and sorting preferences',
            'Storing date range selections',
            'Language and timezone preferences',
            'Notification settings'
          ]
        },
        {
          title: '3. Server-Sent Events (SSE)',
          content: 'WorkEye uses Server-Sent Events for real-time dashboard updates instead of traditional polling. SSE maintains a persistent connection to deliver live activity data without requiring page refreshes. This is not a cookie but provides similar real-time functionality with better performance.'
        },
        {
          title: '4. Third-Party Cookies',
          content: 'WorkEye does not use third-party advertising or tracking cookies. Limited third-party cookies may be used for:',
          bullets: [
            'Authentication providers (OAuth, SSO)',
            'Analytics services (if explicitly enabled)',
            'Payment processing (Stripe, PayPal)',
            'Customer support chat widgets',
            'CDN services for faster content delivery'
          ]
        },
        {
          title: '5. Managing and Controlling Cookies',
          content: 'You can control cookies through your browser settings:',
          bullets: [
            'Chrome: Settings > Privacy and Security > Cookies and other site data',
            'Firefox: Settings > Privacy & Security > Cookies and Site Data',
            'Safari: Preferences > Privacy > Cookies and website data',
            'Edge: Settings > Cookies and site permissions > Cookies and data stored',
            'Mobile browsers: Check your device and browser settings'
          ]
        },
        {
          title: 'Important Note',
          content: 'Disabling essential cookies may prevent WorkEye from functioning properly. Features like login, dashboard access, and real-time updates require cookies to work correctly.'
        },
        {
          title: '6. Cookie Duration and Expiration',
          content: 'Different cookies have different lifespans:',
          bullets: [
            'Session cookies: Deleted when you close your browser',
            'Persistent cookies: Stored for up to 30 days for authentication',
            'Analytics cookies: Stored for up to 1 year',
            'Preference cookies: Stored until manually cleared',
            'Security cookies: May persist for extended periods'
          ]
        },
        {
          title: '7. Do Not Track (DNT) Signals',
          content: 'WorkEye respects Do Not Track browser settings. When DNT is enabled, we limit analytics and non-essential tracking while maintaining core functionality.'
        },
        {
          title: '8. Updates to Cookie Policy',
          content: 'We may update this Cookie Policy to reflect changes in our practices or legal requirements. Material changes will be communicated via email and dashboard notifications. Check this page periodically for updates.'
        },
        {
          title: 'Contact Information',
          content: 'For questions about our cookie practices:',
          contact: {
            email: 'privacy@workeye.com'
          }
        }
      ]
    },
    security: {
      title: 'Security',
      icon: Lock,
      sections: [
        {
          title: 'Last Updated',
          content: 'December 12, 2025',
          type: 'date'
        },
        {
          title: '1. Our Security Commitment',
          content: 'WorkEye is built with security as a fundamental principle. We implement comprehensive security measures across infrastructure, application, and operational layers to protect employee tracking data and ensure system integrity.'
        },
        {
          title: '2. Data Encryption',
          content: 'Multi-layered encryption protects data at every stage:',
          bullets: [
            'TLS 1.3 encryption for all data in transit',
            'AES-256 encryption for data at rest',
            'End-to-end encryption for screenshot data',
            'Encrypted database backups',
            'Secure key management using hardware security modules (HSM)',
            'Perfect forward secrecy for all connections'
          ]
        },
        {
          title: '3. Authentication and Access Control',
          content: 'Robust identity and access management:',
          bullets: [
            'Multi-factor authentication (MFA) for admin accounts',
            'Role-based access control (RBAC) with granular permissions',
            'Strong password requirements (minimum 12 characters, complexity validation)',
            'Automatic session timeout after 30 minutes of inactivity',
            'Single sign-on (SSO) integration (SAML, OAuth 2.0)',
            'IP whitelisting and geolocation-based restrictions',
            'Audit logging of all authentication events'
          ]
        },
        {
          title: '4. Infrastructure Security',
          content: 'Enterprise-grade infrastructure protection:',
          bullets: [
            'Regular security audits and penetration testing (quarterly)',
            'Automated vulnerability scanning and patching',
            'Secure cloud infrastructure with redundancy and failover',
            'DDoS protection and rate limiting',
            'Web Application Firewall (WAF) with custom rules',
            'Network segmentation and isolation',
            'Intrusion detection and prevention systems (IDS/IPS)'
          ]
        },
        {
          title: '5. Application Security',
          content: 'Secure development practices:',
          bullets: [
            'Secure coding standards and peer code reviews',
            'Input validation and output encoding',
            'Protection against OWASP Top 10 vulnerabilities',
            'SQL injection prevention',
            'Cross-Site Scripting (XSS) protection',
            'Cross-Site Request Forgery (CSRF) tokens',
            'Content Security Policy (CSP) headers',
            'Regular dependency updates and security patching'
          ]
        },
        {
          title: '6. Employee Tracking Data Protection',
          content: 'Special protections for sensitive tracking data:',
          bullets: [
            'Screenshot data stored with restricted file system permissions',
            'Activity logs encrypted and access-controlled',
            'Automatic daily summaries generated in secure isolated processes',
            'Self-updating tracker system with integrity verification',
            'Data anonymization options for compliance',
            'Retention policies enforced automatically'
          ]
        },
        {
          title: '7. Monitoring and Threat Detection',
          content: 'Continuous security monitoring:',
          bullets: [
            '24/7 security operations center (SOC) monitoring',
            'Real-time intrusion detection systems',
            'Automated anomaly detection using AI/ML',
            'Regular security log reviews and correlation',
            'Threat intelligence integration',
            'Behavioral analysis for unusual activities',
            'Alert escalation procedures'
          ]
        },
        {
          title: '8. Incident Response',
          content: 'Comprehensive incident response plan:',
          bullets: [
            'Immediate investigation and containment procedures',
            'Notification to affected administrators within 72 hours',
            'Detailed incident reports with root cause analysis',
            'Post-incident security reviews and improvements',
            'Communication templates and escalation paths',
            'Regular incident response drills and tabletop exercises'
          ]
        },
        {
          title: '9. Data Backup and Recovery',
          content: 'Robust backup and disaster recovery:',
          bullets: [
            'Automated encrypted backups every 6 hours',
            'Geographically distributed backup storage (multiple regions)',
            'Regular backup restoration testing (monthly)',
            'Recovery Time Objective (RTO): 4 hours',
            'Recovery Point Objective (RPO): 6 hours',
            'Disaster recovery plan with annual testing',
            'Business continuity procedures'
          ]
        },
        {
          title: '10. Compliance and Certifications',
          content: 'We maintain compliance with industry standards:',
          bullets: [
            'SOC 2 Type II certified',
            'ISO 27001 information security certified',
            'GDPR compliant (General Data Protection Regulation)',
            'CCPA compliant (California Consumer Privacy Act)',
            'HIPAA considerations for healthcare customers',
            'PCI DSS compliant for payment processing',
            'Regular third-party security assessments'
          ]
        },
        {
          title: '11. Employee Security Training',
          content: 'Our team undergoes comprehensive security training:',
          bullets: [
            'Annual security awareness training for all staff',
            'Phishing simulation exercises',
            'Secure development training for engineers',
            'Incident response training',
            'Background checks for all employees',
            'Strict confidentiality agreements'
          ]
        },
        {
          title: '12. Security Best Practices for Users',
          content: 'Recommendations to enhance your security:',
          bullets: [
            'Use strong, unique passwords (consider a password manager)',
            'Enable multi-factor authentication on all accounts',
            'Regularly review access logs and audit trails',
            'Keep tracker software and browsers updated',
            'Report suspicious activity immediately',
            'Train employees on security awareness',
            'Use secure Wi-Fi networks for accessing WorkEye',
            'Implement least-privilege access principles'
          ]
        },
        {
          title: '13. Third-Party Security',
          content: 'Strict third-party vendor management:',
          bullets: [
            'All third-party integrations vetted for security',
            'Limited third-party data access based on need-to-know',
            'Regular third-party security assessments',
            'Vendor contracts include security requirements',
            'Continuous monitoring of third-party dependencies'
          ]
        },
        {
          title: '14. Responsible Disclosure Program',
          content: 'We welcome security researchers to report vulnerabilities:',
          bullets: [
            'Acknowledgment of reports within 24 hours',
            'Regular updates on remediation progress',
            'Recognition for responsible disclosure',
            'No legal action for good-faith security research',
            'Bounty program for qualifying vulnerabilities'
          ]
        },
        {
          title: '15. Security Updates and Transparency',
          content: 'This security policy is reviewed and updated quarterly to reflect our evolving security practices. We maintain a public security changelog for major security enhancements.'
        },
        {
          title: 'Contact Information',
          content: 'For security questions, concerns, or to report vulnerabilities:',
          contact: {
            email: 'security@workeye.com',
            address: 'WorkEye Security Team, 123 Business Ave, San Francisco, CA 94105'
          }
        }
      ]
    }
  };

  const handlePolicyClick = (policy: PolicyType) => {
    setOpenPolicy(policy);
  };

  const renderPolicyContent = (policy: Exclude<PolicyType, null>) => {
    const content = policyContent[policy];
    const Icon = content.icon;

    return (
      <div className="space-y-6">
        {content.sections.map((section, idx) => (
          <div key={idx} className="space-y-3">
            {section.type === 'date' ? (
              <div className="flex items-center gap-2 text-sm text-gray-500 border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded">
                <span className="font-medium">{section.title}:</span>
                <span>{section.content}</span>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  {section.title}
                </h3>
                {section.content && (
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {section.content}
                  </p>
                )}
                {section.bullets && (
                  <ul className="space-y-2 ml-4">
                    {section.bullets.map((bullet, bulletIdx) => (
                      <li key={bulletIdx} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.contact && (
                  <div className="bg-gray-50 rounded-lg p-4 mt-3 space-y-2 border border-gray-200">
                    <div className="flex items-start gap-2 text-sm">
                      <Mail className="h-4 w-4 text-blue-600 mt-0.5" />
                      <div>
                        <span className="font-medium text-gray-700">Email: </span>
                        <a href={`mailto:${section.contact.email}`} className="text-blue-600 hover:underline">
                          {section.contact.email}
                        </a>
                      </div>
                    </div>
                    {section.contact.address && (
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div>
                          <span className="font-medium text-gray-700">Address: </span>
                          <span className="text-gray-600">{section.contact.address}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <footer className="bg-gray-900 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
            <Button
              variant="link"
              className="text-gray-300 hover:text-white text-xs sm:text-sm md:text-base transition-colors flex items-center gap-2"
              onClick={() => handlePolicyClick('privacy')}
            >
              <Shield className="h-4 w-4" />
              Privacy Policy
            </Button>
            <Button
              variant="link"
              className="text-gray-300 hover:text-white text-xs sm:text-sm md:text-base transition-colors flex items-center gap-2"
              onClick={() => handlePolicyClick('terms')}
            >
              <FileText className="h-4 w-4" />
              Terms of Service
            </Button>
            <Button
              variant="link"
              className="text-gray-300 hover:text-white text-xs sm:text-sm md:text-base transition-colors flex items-center gap-2"
              onClick={() => handlePolicyClick('cookie')}
            >
              <Cookie className="h-4 w-4" />
              Cookie Policy
            </Button>
            <Button
              variant="link"
              className="text-gray-300 hover:text-white text-xs sm:text-sm md:text-base transition-colors flex items-center gap-2"
              onClick={() => handlePolicyClick('security')}
            >
              <Lock className="h-4 w-4" />
              Security
            </Button>
          </div>
          <div className="text-center text-gray-500 text-xs sm:text-sm mt-6">
            <p>&copy; {new Date().getFullYear()} WorkEye. All rights reserved.</p>
          </div>
          {/* Powered by Averlon */}
          <div className="text-center mt-4">
            <p className="text-sm text-white">
              Powered by{' '}
              <a 
                href="https://averlonworld.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors duration-300"
              >
                Averlon
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Policy Modals */}
      {openPolicy && (
        <Dialog open={true} onOpenChange={() => setOpenPolicy(null)}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col">
  <DialogHeader className="border-b pb-4 flex-shrink-0">
    <DialogTitle className="text-2xl flex items-center gap-3">
      {React.createElement(policyContent[openPolicy].icon, { 
        className: "h-7 w-7 text-blue-600" 
      })}
      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {policyContent[openPolicy].title}
      </span>
    </DialogTitle>
    <DialogDescription className="text-sm mt-2">
      Please read our {policyContent[openPolicy].title.toLowerCase()} carefully
    </DialogDescription>
  </DialogHeader>
  <div className="overflow-y-auto flex-1 pr-4 py-4">
    {renderPolicyContent(openPolicy)}
  </div>
  <div className="border-t pt-4 flex justify-end flex-shrink-0">
    <Button 
      onClick={() => setOpenPolicy(null)}
      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
    >
      Close
    </Button>
  </div>
</DialogContent>
        </Dialog>
      )}
    </>
  );
}