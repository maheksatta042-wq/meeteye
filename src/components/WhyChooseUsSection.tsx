import { ImageWithFallback } from './figma/ImageWithFallback';

export function WhyChooseUsSection() {
  const advantages = [
    {
      title: 'Real-Time Activity Monitoring',
      description: 'Live employee tracking with cursor/idle detection (1-minute threshold), complete app usage logging with timestamps, browser activity tracking, and system lock/unlock events. All data syncs in real-time via Server-Sent Events for instant visibility.',
      icon: '⚡',
    },
    {
      title: 'Database-Free Architecture',
      description: 'Simple JSON-based storage eliminates complex database setup and maintenance. All logs stored in organized per-user files with automatic daily summary generation. Lightweight and easy to deploy anywhere.',
      icon: '🗂️',
    },
    {
      title: 'Comprehensive Daily Analytics',
      description: 'Automatic calculation of total screen time, active time, idle time, and productivity percentages. Office-hour filtering (9:30 AM - 6:30 PM) and intelligent interval merging prevent double-counting for accurate metrics.',
      icon: '📊',
    },
    {
      title: 'Screenshot Monitoring',
      description: 'Automated screenshot capture every 5 minutes (customizable) with secure upload to server. All screenshots stored in organized per-user folders with timestamp tracking for complete visual documentation of work.',
      icon: '📸',
    },
    {
      title: 'Self-Updating System',
      description: 'Admins can upload new tracker versions remotely. Employee trackers automatically detect updates and download new versions, making deployment of features and fixes instant across your entire workforce.',
      icon: '🔄',
    },
    {
      title: 'Advanced Search & Filtering',
      description: 'Search across all employee logs by keywords, event types, dates, and usernames. Quickly identify patterns, find specific website visits, track unusual activity, or locate particular events across your organization.',
      icon: '🔍',
    },
  ];

  return (
    <section id="why-choose-us" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl mb-4">
            Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">WorkTrackPro</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            We're not just another monitoring tool - we're your partner in building a more productive, 
            transparent, and trust-based workplace culture
          </p>
        </div>

        {/* Image Banner */}
        <div className="mb-16 rounded-3xl overflow-hidden shadow-2xl">
          <ImageWithFallback
            src="https://clockly.com/images/blog/employee-monitoring-software-pros-cons.png?v=1670827896263470492"
            alt="Remote Work Setup"
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>

        {/* Advantages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{advantage.icon}</div>
              <h3 className="text-xl mb-2">{advantage.title}</h3>
              <p className="text-gray-600 leading-relaxed">{advantage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}