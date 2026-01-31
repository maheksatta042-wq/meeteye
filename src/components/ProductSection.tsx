import { motion } from 'motion/react';
import { DollarSign, ShoppingCart, Package, TrendingUp } from 'lucide-react';
import { LuMonitorSmartphone } from "react-icons/lu";

export function ProductSection() {
  const products = [
    {
      icon: DollarSign,
      title: 'Smart Employee Monitoring',
      description: 'Real-time tracking of employee activities with live status, screenshots, and activity timelines to ensure transparency and accountability across teams.',
      color: 'border-blue-300 bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      icon: Package,
      title: 'Advanced Productivity Analytics',
      description: 'Detailed analytics on app usage, websites visited, time spent, and productivity trends with visual charts and historical data for better decision-making.',
      color: 'border-green-300 bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      icon: ShoppingCart,
      title: 'Time & Attendance Tracking',
      description: 'Accurate time tracking with timelines, daily activity logs, and performance summaries to monitor work hours and optimize workforce efficiency.',
      color: 'border-orange-300 bg-orange-50',
      iconColor: 'text-orange-600',
    },
    {
      icon: TrendingUp,
      title: 'Team & Performance Management',
      description: 'Centralized employee management with individual profiles, performance metrics, reports, and downloadable insights to evaluate and improve team output.',
      color: 'border-purple-300 bg-purple-50',
      iconColor: 'text-purple-600',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="product" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h2 
            className="text-4xl sm:text-5xl mb-4 text-[#003366]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            The globally trusted{' '}
            <span className="text-[#00C4CC]">employee tracking software</span>
          </motion.h2>
          <motion.h3 
            className="text-3xl text-[#003366] mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            for growing enterprises
          </motion.h3>
        </motion.div>

        {/* Product Cards */}
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {products.map((product, index) => (
            <motion.div
              key={index}
              className={`${product.color} rounded-3xl p-8 border-2 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center`}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className={`w-20 h-20 ${product.iconColor} mb-6 flex items-center justify-center`}
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <product.icon className="w-16 h-16" strokeWidth={1.5} />
              </motion.div>
              <h3 className="text-xl text-[#003366] mb-4">
                {product.title}
              </h3>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >

        </motion.div>
      </div>
    </section>
  );
}