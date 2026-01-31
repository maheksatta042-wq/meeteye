import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Users, 
  FileText, 
  Settings, 
  TrendingUp, 
  Cloud, 
  Shield, 
  Camera 
} from 'lucide-react';
export function FeaturesSection() {
  const features = [
    {
      title: 'Real-Time Activity Monitoring',
      description: 'Track cursor movements, idle time, and application usage in real-time with precise 1-minute detection intervals.',
    },
    {
      title: 'Automated Screenshot Capture',
      description: 'Secure screenshots every 5 minutes with encrypted storage and organized per-user folders.',
    },
    {
      title: 'Smart Productivity Analytics',
      description: 'Automatic daily summaries with productivity calculations, office-hour filtering, and intelligent interval merging.',
    },
    {
      title: 'Database-Free Architecture',
      description: 'Lightweight JSON-based storage with REST API sync - no complex database setup required.',
    },
    {
      title: 'Live Dashboard Updates',
      description: 'Real-time employee monitoring with Server-Sent Events displaying screen time, active hours, and last seen status.',
    },
    {
      title: 'Self-Updating System',
      description: 'Automatic tracker updates with seamless deployment and instant feature rollout across all employees.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-4xl sm:text-5xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              End-to-End Features{' '}
              <span className="text-[#00C4CC]">to Run Your Business Smoothly</span>
            </motion.h2>
            <motion.p 
              className="text-gray-600 text-lg mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              From tracking to analytics, our employee monitoring solutions are built to streamline every core function of your business. Whether you're managing remote teams or in-office staff, our flexible platform WorkEye has got you covered with everything you need — and more.
            </motion.p>

            {/* Features List */}
            <motion.div 
              className="space-y-4 mb-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start gap-4"
                  variants={itemVariants}
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-[#003366] border-b-[8px] border-b-transparent"></div>
                  </div>
                  <div>
                    <h3 className="text-[#003366] text-lg mb-1">
                      {feature.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            
          </motion.div>

          {/* Right Side - Illustration */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Central illustration with icon nodes */}
              <div className="relative w-full h-[500px] flex items-center justify-center">
                {/* Center triangle/logo placeholder */}
                <motion.div 
                  className="absolute z-10 flex flex-col items-center"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div className="relative w-40 h-40 bg-gradient-to-br from-[#003366] via-[#0066CC] to-[#00C4CC] rounded-full flex items-center justify-center shadow-2xl overflow-hidden">
                    {/* Animated gradient overlay */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-tr from-[#00C4CC]/30 via-transparent to-[#003366]/30"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                    
                    {/* Pulse rings */}
                    <motion.div 
                      className="absolute inset-0 border-4 border-white/30 rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <motion.div 
                      className="absolute inset-0 border-4 border-white/20 rounded-full"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    />
                    
                    {/* Inner glow circle */}
                    <div className="relative w-28 h-28 bg-white/10 rounded-full backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                      {/* Triangle with glow effect */}
                      <motion.div 
                        className="relative"
                        animate={{ 
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <div className="text-white text-6xl drop-shadow-2xl" style={{ filter: 'drop-shadow(0 0 20px rgba(0, 196, 204, 0.8))' }}>▲</div>
                      </motion.div>
                    </div>
                    
                    {/* Sparkle effects */}
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                          top: `${20 + Math.random() * 60}%`,
                          left: `${20 + Math.random() * 60}%`,
                        }}
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.4,
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Animated dots below */}
                  <div className="mt-4 text-center">
                    <div className="flex gap-2 justify-center">
                      <motion.div 
                        className="w-2.5 h-2.5 bg-[#00C4CC] rounded-full shadow-lg"
                        animate={{ scale: [1, 1.5, 1], y: [0, -4, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div 
                        className="w-2.5 h-2.5 bg-[#0066CC] rounded-full shadow-lg"
                        animate={{ scale: [1, 1.5, 1], y: [0, -4, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                      />
                      <motion.div 
                        className="w-2.5 h-2.5 bg-[#003366] rounded-full shadow-lg"
                        animate={{ scale: [1, 1.5, 1], y: [0, -4, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Feature Icons in circular pattern - mapped to actual features */}
                {[
                  { 
                    icon: Activity, 
                    position: 'top-0 left-1/4', 
                    color: 'bg-blue-500', 
                    delay: 0.5,
                    label: 'Real-Time Monitoring'
                  },
                  { 
                    icon: Users, 
                    position: 'top-0 right-1/4', 
                    color: 'bg-purple-500', 
                    delay: 0.6,
                    label: 'Team Management'
                  },
                  { 
                    icon: FileText, 
                    position: 'top-1/3 right-0', 
                    color: 'bg-green-500', 
                    delay: 0.7,
                    label: 'Reports'
                  },
                  { 
                    icon: Settings, 
                    position: 'bottom-1/3 right-0', 
                    color: 'bg-orange-500', 
                    delay: 0.8,
                    label: 'Configuration'
                  },
                  { 
                    icon: TrendingUp, 
                    position: 'bottom-0 right-1/4', 
                    color: 'bg-red-500', 
                    delay: 0.9,
                    label: 'Live Updates'
                  },
                  { 
                    icon: Cloud, 
                    position: 'bottom-0 left-1/4', 
                    color: 'bg-cyan-500', 
                    delay: 1.0,
                    label: 'Cloud-Based'
                  },
                  { 
                    icon: Shield, 
                    position: 'bottom-1/3 left-0', 
                    color: 'bg-indigo-500', 
                    delay: 1.1,
                    label: 'Security'
                  },
                  { 
                    icon: Camera, 
                    position: 'top-1/3 left-0', 
                    color: 'bg-pink-500', 
                    delay: 1.2,
                    label: 'Screenshots'
                  },
                ].map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    className={`absolute ${item.position} transform -translate-x-1/2 -translate-y-1/2`}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: item.delay }}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    <motion.div 
                      className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center shadow-lg border-4 border-white cursor-pointer relative`}
                      animate={{ 
                        y: [0, -10, 0],
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        delay: item.delay,
                        ease: "easeInOut"
                      }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ 
                          duration: 20, 
                          repeat: Infinity, 
                          ease: "linear" 
                        }}
                      >
                        <item.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      
                      {/* Pulse effect */}
                      <motion.div
                        className={`absolute inset-0 ${item.color} rounded-full opacity-50`}
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0, 0.5]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          delay: item.delay
                        }}
                      />
                    </motion.div>
                  </motion.div>
                ))}

                {/* Connecting lines animation */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
                  <motion.circle
                    cx="50%"
                    cy="50%"
                    r="150"
                    fill="none"
                    stroke="#00C4CC"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.3 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 1.3 }}
                  />
                </svg>

                {/* Decorative elements */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-8">
                  <motion.div 
                    className="w-24 h-1 bg-gradient-to-r from-transparent via-[#00C4CC] to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 1.3 }}
                  />
                </div>
              </div>

              {/* Person illustration placeholder */}
              <motion.div 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-64 bg-gradient-to-t from-gray-200 to-transparent rounded-t-full opacity-20"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 0.2 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 1.5 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}