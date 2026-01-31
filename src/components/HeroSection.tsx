import { motion } from 'motion/react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroSectionProps {
  onLoginClick: () => void;
}

export function HeroSection({ onLoginClick }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          
          {/* Left Content */}
          <motion.div 
            className="space-y-7"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-[#00C4CC]">Smarter</span>{' '}
              <span className="text-[#003366]">Employee Tracking Solutions</span>
              <span className="block text-[#003366] mt-2">
                for Growing Businesses
              </span>
            </motion.h1>

            <motion.p 
              className="text-lg text-gray-600 max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Streamline operations, boost productivity, and scale faster with WorkEye — trusted by SMEs and enterprises across industries for comprehensive workforce monitoring and analytics.
            </motion.p>

            {/* CTA Button */}
            <motion.div 
              className="flex flex-wrap gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              
            </motion.div>
          </motion.div>

          {/* Right Content */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-[#00C4CC]/10 rounded-3xl blur-3xl"></div>

            <motion.div 
              className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGFuYWx5dGljcyUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NjY4MDQ2NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Workforce Analytics Dashboard"
                className="w-full h-auto"
              />

              <div className="p-5 bg-gray-50">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <motion.div 
                    className="p-3 bg-white rounded-lg border"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-xl">⏱️</div>
                    <p className="text-xs text-gray-600 mt-1">Time Tracking</p>
                  </motion.div>
                  <motion.div 
                    className="p-3 bg-white rounded-lg border"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-xl">📸</div>
                    <p className="text-xs text-gray-600 mt-1">Screenshots</p>
                  </motion.div>
                  <motion.div 
                    className="p-3 bg-white rounded-lg border"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-xl">📊</div>
                    <p className="text-xs text-gray-600 mt-1">Reports</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}