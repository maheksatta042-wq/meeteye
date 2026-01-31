import { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';

type PolicyType = 'privacy' | 'terms' | 'cookie' | 'security' | null;

export function Footer() {
  const [openPolicy, setOpenPolicy] = useState<PolicyType>(null);

  const policyContent = {
    privacy: {
      title: 'Privacy Policy',
      content: `Last Updated: December 12, 2025

1. Information We Collect
WorkEye collects employee activity data including cursor movements, application usage, browser activity, system events, and screenshots as configured by your organization's administrator.

2. How We Use Your Information
- Monitor employee productivity and activity during work hours
- Generate daily summaries and productivity reports
- Provide real-time tracking and analytics to administrators
- Maintain system security and integrity

3. Data Storage and Security
All tracking data is stored using our database-free JSON storage architecture with enterprise-grade encryption. Data is retained according to your subscription plan (30 days to unlimited).

4. Data Sharing
We do not sell or share your tracking data with third parties. Data is accessible only to authorized administrators within your organization.

5. Employee Rights
Employees have the right to request access to their tracked data and understand how it's being used. Contact your organization's administrator for data access requests.

6. Cookies and Tracking
We use essential cookies for authentication and session management. Real-time updates are delivered via Server-Sent Events (SSE).

7. Changes to This Policy
We may update this privacy policy periodically. Material changes will be communicated to administrators.

For questions about our privacy practices, contact: privacy@workeye.com`,
    },
    terms: {
      title: 'Terms of Service',
      content: `Last Updated: December 12, 2025

1. Acceptance of Terms
By accessing or using WorkEye, you agree to be bound by these Terms of Service and all applicable laws and regulations.

2. Service Description
WorkEye provides comprehensive employee tracking software including:
- Real-time cursor/idle detection (1-minute intervals)
- Application and browser activity monitoring
- Automated screenshot capture (configurable intervals)
- System lock/unlock and on/off logging
- Daily productivity summaries with automatic calculations

3. User Accounts and Access
- Admin accounts have full access to all tracking data and system controls
- Employees are subject to monitoring as configured by administrators
- Account credentials must be kept secure and confidential

4. Acceptable Use
You agree to use WorkEye only for:
- Legitimate workforce monitoring purposes
- Compliance with applicable employment laws
- Improving organizational productivity

5. Prohibited Activities
- Circumventing or disabling the tracking system
- Accessing data you're not authorized to view
- Using the service to violate employee privacy rights beyond legal monitoring

6. Data Ownership
You retain ownership of all data collected through WorkEye. We provide the platform and infrastructure but do not claim ownership of your tracking data.

7. Service Availability
We strive for 99.9% uptime but do not guarantee uninterrupted service. Scheduled maintenance will be communicated in advance.

8. Payment Terms
- Subscription fees are billed monthly per user
- 14-day free trial available (no credit card required)
- Cancellation takes effect at the end of the current billing cycle

9. Termination
We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent activity.

10. Limitation of Liability
WorkEye is provided "as is" without warranties. We are not liable for any indirect, incidental, or consequential damages.

11. Governing Law
These terms are governed by the laws of the State of California, United States.

For questions about these terms, contact: legal@workeye.com`,
    },
    cookie: {
      title: 'Cookie Policy',
      content: `Last Updated: December 12, 2025

1. What Are Cookies?
Cookies are small text files stored on your device that help us provide and improve our services.

2. How We Use Cookies
WorkEye uses the following types of cookies:

Essential Cookies (Required)
- Authentication and session management
- Security and fraud prevention
- Maintaining login state across sessions
- Core functionality of the tracking system

Performance Cookies
- Monitoring system performance and uptime
- Understanding how users interact with the dashboard
- Identifying and resolving technical issues

Analytics Cookies
- Tracking feature usage and adoption
- Improving user experience based on behavior patterns
- Generating usage statistics for administrators

3. Server-Sent Events (SSE)
WorkEye uses Server-Sent Events for real-time dashboard updates instead of traditional polling. This is not a cookie but provides similar real-time functionality.

4. Third-Party Cookies
We do not use third-party advertising cookies. Any third-party cookies are limited to:
- Authentication providers
- Analytics services (if enabled)
- Payment processing (for billing)

5. Managing Cookies
You can control cookies through your browser settings:
- Chrome: Settings > Privacy and Security > Cookies
- Firefox: Settings > Privacy & Security > Cookies
- Safari: Preferences > Privacy > Cookies
- Edge: Settings > Privacy > Cookies

Note: Disabling essential cookies may prevent WorkEye from functioning properly.

6. Cookie Duration
- Session cookies: Deleted when you close your browser
- Persistent cookies: Stored for up to 30 days for authentication
- Analytics cookies: Stored for up to 1 year

7. Updates to Cookie Policy
We may update this policy to reflect changes in our cookie usage. Check this page periodically for updates.

For questions about our cookie practices, contact: privacy@workeye.com`,
    },
    security: {
      title: 'Security',
      content: `Last Updated: December 12, 2025

1. Our Security Commitment
WorkEye takes the security of your data seriously. We implement industry-standard security measures to protect employee tracking data.

2. Data Encryption
- All data transmitted between trackers and servers uses TLS 1.3 encryption
- Stored data is encrypted at rest using AES-256 encryption
- Database-free JSON architecture with secure file system permissions

3. Authentication and Access Control
- Multi-factor authentication (MFA) available for admin accounts
- Role-based access control (RBAC) for different permission levels
- Secure password requirements with complexity validation
- Automatic session timeout after inactivity

4. Infrastructure Security
- Regular security audits and penetration testing
- Automated vulnerability scanning and patching
- Secure cloud infrastructure with redundancy
- DDoS protection and rate limiting

5. Employee Tracking Data Protection
- Screenshot data stored with restricted access permissions
- Activity logs encrypted and access-controlled
- Automatic daily summaries generated securely
- Self-updating tracker system with integrity verification

6. Monitoring and Detection
- 24/7 security monitoring and alerting
- Intrusion detection systems (IDS)
- Automated anomaly detection
- Regular security log reviews

7. Incident Response
In the event of a security incident:
- Immediate investigation and containment
- Notification to affected administrators within 72 hours
- Detailed incident reports and remediation plans
- Post-incident security reviews

8. Data Backup and Recovery
- Automated daily backups with encryption
- Geographically distributed backup storage
- Regular backup restoration testing
- Disaster recovery plan with RTO/RPO targets

9. Compliance and Certifications
We comply with:
- GDPR (General Data Protection Regulation)
- SOC 2 Type II standards
- ISO 27001 information security standards
- CCPA (California Consumer Privacy Act)

10. Security Best Practices for Users
- Use strong, unique passwords
- Enable multi-factor authentication
- Regularly review access logs
- Keep tracker software updated
- Report suspicious activity immediately

11. Third-Party Security
- All third-party integrations are vetted for security
- Limited third-party data access
- Regular third-party security assessments

12. Responsible Disclosure
If you discover a security vulnerability, please report it to:
security@workeye.com

We maintain a responsible disclosure program and will acknowledge receipt within 24 hours.

13. Security Updates
This security policy is reviewed and updated quarterly to reflect our evolving security practices.

For security questions or to report issues, contact: security@workeye.com`,
    },
  };

  const handlePolicyClick = (policy: PolicyType) => {
    setOpenPolicy(policy);
  };

  return (
    <>
      <footer className="bg-gray-900 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
            <Button
              variant="link"
              className="text-gray-300 hover:text-white text-xs sm:text-sm md:text-base transition-colors"
              onClick={() => handlePolicyClick('privacy')}
            >
              Privacy Policy
            </Button>
            <Button
              variant="link"
              className="text-gray-300 hover:text-white text-xs sm:text-sm md:text-base transition-colors"
              onClick={() => handlePolicyClick('terms')}
            >
              Terms of Service
            </Button>
            <Button
              variant="link"
              className="text-gray-300 hover:text-white text-xs sm:text-sm md:text-base transition-colors"
              onClick={() => handlePolicyClick('cookie')}
            >
              Cookie Policy
            </Button>
            <Button
              variant="link"
              className="text-gray-300 hover:text-white text-xs sm:text-sm md:text-base transition-colors"
              onClick={() => handlePolicyClick('security')}
            >
              Security
            </Button>
          </div>
          <div className="text-center text-gray-500 text-xs sm:text-sm mt-6">
            <p>&copy; {new Date().getFullYear()} WorkEye. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Policy Modals */}
      {openPolicy && (
        <Dialog open={true} onOpenChange={() => setOpenPolicy(null)}>
          <DialogContent className="sm:max-w-2xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {policyContent[openPolicy].title}
                </span>
              </DialogTitle>
              <DialogDescription>
                Please read our {policyContent[openPolicy].title.toLowerCase()} carefully
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh] pr-4">
              <div className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
                {policyContent[openPolicy].content}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}