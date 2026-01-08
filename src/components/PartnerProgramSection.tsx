import { Store, Users, Code, Briefcase } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function PartnerProgramSection() {
  const partnerTypes = [
    {
      icon: Store,
      title: 'Reseller Partner',
      description: 'Sell WorkTrackPro to your clients and earn up to 30% recurring commission on every sale. Get dedicated account management, marketing materials, and priority technical support.',
      benefits: ['30% recurring revenue share', 'Dedicated partner success manager', 'Co-branded marketing materials', 'Priority technical support & training', 'Early access to new features'],
      gradient: 'from-blue-600 to-blue-700',
    },
    {
      icon: Users,
      title: 'Referral Partner',
      description: 'Refer clients and earn generous commissions for every successful sale with our simple, no-commitment referral program. Perfect for consultants and advisors.',
      benefits: ['20% one-time referral bonus', 'Easy online tracking portal', 'Quick monthly payouts', 'No commitment or quotas needed', 'Lifetime commission on renewals'],
      gradient: 'from-purple-600 to-purple-700',
    },
    {
      icon: Code,
      title: 'Technology Partner',
      description: 'Integrate WorkTrackPro with your platform using our robust API. Build custom solutions and offer value-added services to your customers.',
      benefits: ['Full API access & documentation', 'Dedicated technical support team', 'Co-marketing opportunities', 'White-label options available', 'Revenue sharing on integrations'],
      gradient: 'from-pink-600 to-pink-700',
    },
    {
      icon: Briefcase,
      title: 'Agency Partner',
      description: 'Offer WorkTrackPro as part of your service bundle to clients. Perfect for HR consulting firms, IT service providers, and business consultants.',
      benefits: ['Volume discounts up to 40%', 'Custom pricing for clients', 'Comprehensive training resources', 'Partner portal with analytics', 'Marketing development funds'],
      gradient: 'from-green-600 to-green-700',
    },
  ];

  const successStories = [
    {
      name: 'TechSolutions Inc.',
      role: 'Reseller Partner',
      result: '$50K monthly recurring revenue',
      clients: '120+ clients',
      quote: 'Partnering with WorkTrackPro has been transformative for our business. The recurring revenue model and excellent support make it easy to grow.',
    },
    {
      name: 'Digital Growth Agency',
      role: 'Agency Partner',
      result: '200+ clients onboarded',
      clients: '15% profit margin increase',
      quote: 'Our clients love the insights they get from WorkTrackPro. It\'s become an essential part of our service offering.',
    },
    {
      name: 'HR Consulting Group',
      role: 'Referral Partner',
      result: '$25K in referral bonuses',
      clients: '50+ successful referrals',
      quote: 'The easiest partnership program we\'ve ever joined. Great commissions, simple tracking, and quick payouts.',
    },
  ];

  return (
    <section id="partners" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl mb-4">
            Partner <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Program</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Join our growing partner network and unlock new revenue opportunities. 
            Whether you're a reseller, referral partner, technology integrator, or agency, we have a program designed for your success.
          </p>
        </div>

        {/* Partnership Image */}
        <div className="mb-16 rounded-3xl overflow-hidden shadow-2xl">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1745847768380-2caeadbb3b71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBhcnRuZXJzaGlwJTIwaGFuZHNoYWtlfGVufDF8fHx8MTc2MzI4MDM5N3ww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Business Partnership"
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>

        {/* Partner Types */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {partnerTypes.map((partner, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-200"
            >
              <div className={`inline-flex p-4 bg-gradient-to-r ${partner.gradient} rounded-xl mb-4`}>
                <partner.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl mb-3">{partner.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{partner.description}</p>
              <div className="space-y-2 mb-6">
                {partner.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center text-gray-700">
                    <span className="mr-2 text-green-600">✓</span>
                    <span className="leading-relaxed">{benefit}</span>
                  </div>
                ))}
              </div>
              <Button className={`w-full bg-gradient-to-r ${partner.gradient} hover:opacity-90`}>
                Become a Partner
              </Button>
            </div>
          ))}
        </div>

        {/* CTA */}
        
      </div>
    </section>
  );
}