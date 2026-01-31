import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Download, UserPlus, Activity, BarChart3, Play } from "lucide-react";

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "01",
      icon: Download,
      title: "Download & Install",
      description:
        "Download the lightweight tracker application and install it on employee computers in just 2 minutes.",
      color: "from-blue-500 to-blue-600",
      gradientColors: { from: "rgb(59, 130, 246)", to: "rgb(37, 99, 235)" },
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      videoPoster:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
    },
    {
      number: "02",
      icon: UserPlus,
      title: "Add Your Team",
      description:
        "Create user accounts through the admin dashboard. Assign roles and configure tracking preferences.",
      color: "from-purple-500 to-purple-600",
      gradientColors: { from: "rgb(168, 85, 247)", to: "rgb(147, 51, 234)" },
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      videoPoster:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    },
    {
      number: "03",
      icon: Activity,
      title: "Start Tracking",
      description:
        "Tracker automatically monitors activity in real-time. Captures screenshots and system events seamlessly.",
      color: "from-green-500 to-green-600",
      gradientColors: { from: "rgb(34, 197, 94)", to: "rgb(22, 163, 74)" },
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      videoPoster:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    },
    {
      number: "04",
      icon: BarChart3,
      title: "Analyze & Report",
      description:
        "Access comprehensive analytics and automated daily reports to track productivity and make data-driven decisions.",
      color: "from-orange-500 to-orange-600",
      gradientColors: { from: "rgb(249, 115, 22)", to: "rgb(234, 88, 12)" },
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      videoPoster:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    },
  ];

  return (
    <section
      id="how"
      className="h-screen min-h-[600px] flex items-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl sm:text-5xl mb-3">
            How <span className="text-[#00C4CC]">WorkEye</span> Works
          </h2>
          <p className="text-lg text-gray-600">
            Get started in minutes with our simple 4-step process
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Steps */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative p-6 rounded-2xl cursor-pointer overflow-hidden"
                onClick={() => setActiveStep(index)}
                whileHover={{ scale: activeStep === index ? 1.05 : 1.02 }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                style={{
                  boxShadow:
                    activeStep === index
                      ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                      : undefined,
                }}
              >
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  initial={false}
                  animate={{
                    background:
                      activeStep === index
                        ? `linear-gradient(to right, ${step.gradientColors.from}, ${step.gradientColors.to})`
                        : "rgb(255, 255, 255)",
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />

                {/* Hover shadow overlay for inactive cards */}
                {activeStep !== index && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    whileHover={{
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                <div className="relative flex items-start gap-4">
                  {/* Step Number & Icon */}
                  <div className="flex-shrink-0">
                    <motion.div
                      className="p-3 rounded-xl"
                      initial={false}
                      animate={{
                        backgroundColor:
                          activeStep === index
                            ? "rgba(255, 255, 255, 0.2)"
                            : undefined,
                      }}
                      transition={{ duration: 0.5 }}
                      style={{
                        backgroundColor:
                          activeStep !== index
                            ? index === 0
                              ? "rgb(219, 234, 254)"
                              : index === 1
                                ? "rgb(243, 232, 255)"
                                : index === 2
                                  ? "rgb(220, 252, 231)"
                                  : "rgb(255, 237, 213)"
                            : undefined,
                      }}
                    >
                      <step.icon
                        className={`h-8 w-8 transition-colors duration-500 ${activeStep === index ? "text-white" : step.iconColor}`}
                      />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <motion.span
                        className="text-3xl font-bold"
                        initial={false}
                        animate={{
                          color:
                            activeStep === index
                              ? "rgb(255, 255, 255)"
                              : undefined,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <span
                          className={
                            activeStep !== index
                              ? `bg-gradient-to-r ${step.color} bg-clip-text text-transparent`
                              : ""
                          }
                        >
                          {step.number}
                        </span>
                      </motion.span>
                      <motion.h3
                        className="text-xl font-semibold"
                        initial={false}
                        animate={{
                          color:
                            activeStep === index
                              ? "rgb(255, 255, 255)"
                              : "rgb(0, 51, 102)",
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        {step.title}
                      </motion.h3>
                    </div>
                    <motion.p
                      className="leading-relaxed"
                      initial={false}
                      animate={{
                        color:
                          activeStep === index
                            ? "rgba(255, 255, 255, 0.9)"
                            : "rgb(75, 85, 99)",
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {step.description}
                    </motion.p>
                  </div>

                  {/* Active Indicator */}
                  <AnimatePresence>
                    {activeStep === index && (
                      <motion.div
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ duration: 0.5, type: "spring" }}
                      >
                        <div className="w-3 h-3 bg-white rounded-full shadow-lg"></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Side - Video Display */}
          <motion.div
            className="relative h-[500px] z-10"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                className="h-full relative rounded-2xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {/* Video Container with animated gradient */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  initial={false}
                  animate={{
                    background: `linear-gradient(to bottom right, ${steps[activeStep].gradientColors.from}, ${steps[activeStep].gradientColors.to})`,
                  }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <div className="absolute inset-4 bg-white rounded-xl overflow-hidden">
                    {/* Video Placeholder */}
                    <div className="relative w-full h-full group">
                      <img
                        src={steps[activeStep].videoPoster}
                        alt={steps[activeStep].title}
                        className="w-full h-full object-cover"
                      />

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-all duration-300">
                        <motion.button
                          className="p-6 rounded-full shadow-2xl"
                          style={{
                            background: `linear-gradient(to right, ${steps[activeStep].gradientColors.from}, ${steps[activeStep].gradientColors.to})`,
                          }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            duration: 0.5,
                            delay: 0.3,
                            type: "spring",
                          }}
                        >
                          <Play className="h-12 w-12 text-white fill-white" />
                        </motion.button>
                      </div>

                      {/* Step Label */}
                      <motion.div
                        className="absolute top-4 left-4 text-white px-4 py-2 rounded-lg font-semibold shadow-lg"
                        style={{
                          background: `linear-gradient(to right, ${steps[activeStep].gradientColors.from}, ${steps[activeStep].gradientColors.to})`,
                        }}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        Step {steps[activeStep].number}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Decorative Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-32 h-32 bg-white/20 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-40 h-40 bg-white/10 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Progress Dots */}
            <div className="flex justify-center gap-3 mt-6">
              {steps.map((_, index) => (
                <motion.button
                  key={index}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    activeStep === index
                      ? "w-12 bg-[#00C4CC]"
                      : "w-2 bg-gray-300"
                  }`}
                  onClick={() => setActiveStep(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}