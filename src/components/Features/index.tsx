"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { services } from "@/data/services";
import { Variants } from "framer-motion";


const Features = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Check if the features section is in viewport
      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        const rect = featuresSection.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        setIsVisible(isInView);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Optimized card animation - cards slide up from bottom with slight stagger
// Fix the cardVariants structure
const cardVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.3 } }
};



  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.15,
      }
    }
  };

  // Header animation
  const headerVariants: Variants = {
  hidden: { 
    y: -30, 
    opacity: 0 
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const, // Add 'as const' to fix type issue
      damping: 20,
      stiffness: 100,
      duration: 0.6,
    }
  }
};

  return (
    <>
      <section
        id="features"
        className="relative py-16 md:py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50/20 dark:from-gray-900 dark:to-gray-900/70 overflow-hidden"
      >
        {/* Enhanced Background animation with parallax */}
        <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-20">
          <div 
            className="absolute top-0 left-1/4 w-32 h-32 rounded-full bg-blue-400 animate-float1"
            style={{
              transform: `translateY(${scrollY * 0.1}px) rotate(${scrollY * 0.05}deg)`,
            }}
          ></div>
          <div 
            className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-purple-400 animate-float2"
            style={{
              transform: `translateY(${scrollY * -0.08}px) rotate(${scrollY * -0.03}deg)`,
            }}
          ></div>
          <div 
            className="absolute bottom-1/4 left-1/3 w-24 h-24 rounded-full bg-pink-400 animate-pulse"
            style={{
              transform: `translateY(${scrollY * 0.12}px) scale(${1 + Math.sin(scrollY * 0.01) * 0.1})`,
            }}
          ></div>
        </div>

        {/* Parallax background layers */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Layer 1 - Slowest */}
          <div 
            className="absolute inset-0 opacity-5 dark:opacity-10"
            style={{
              transform: `translateY(${scrollY * 0.05}px)`,
            }}
          >
            <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 blur-3xl"></div>
          </div>
          
          
        </div>

        <div className="container relative z-10">
          {/* Enhanced header with parallax */}
          <motion.div 
            className="text-center mb-16 max-w-3xl mx-auto"
            variants={headerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            style={{
              opacity: isVisible ? 1 : 0.7,
            }}
          >
            <motion.div 
              className="inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full mb-6 backdrop-blur-sm border border-white/20 dark:border-gray-700/30"
              initial={{ scale: 0, opacity: 0 }}
              animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ delay: 0.1, type: "spring", damping: 15 }}
              style={{
                transform: `translateY(${scrollY * 0.01}px)`,
              }}
            >
              <span className="text-sm font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
                Premium Services
              </span>
            </motion.div>
            
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ y: 30, opacity: 0 }}
              animate={isVisible ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              style={{
                transform: `translateY(${scrollY * 0.015}px)`,
              }}
            >
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Tailored Solutions
              </span>{" "}
              For Your Business
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={isVisible ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{
                transform: `translateY(${scrollY * 0.01}px)`,
              }}
            >
              Our comprehensive suite of services is designed to propel your business into the digital future with elegance and precision.
            </motion.p>
          </motion.div>

          {/* Enhanced cards grid with staggered parallax and animations */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="transform-gpu opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                style={{
                  animationDelay: `${index * 0.1}s`, // Simple stagger
                }}
              >
                <Link 
                  href={`/services/${service.slug}`} 
                  className="block group h-full"
                >
                  <div className="relative bg-white/70 dark:bg-gray-800/60 rounded-xl shadow-[0_15px_35px_-5px_rgba(0,0,0,0.1)] dark:shadow-[0_15px_35px_-5px_rgba(0,0,0,0.3)] backdrop-blur-md p-8 min-h-[360px] transition-all duration-300 hover:shadow-[0_25px_50px_-5px_rgba(79,70,229,0.25)] dark:hover:shadow-[0_25px_50px_-5px_rgba(139,92,246,0.35)] hover:-translate-y-2 h-full flex flex-col overflow-hidden border border-gray-100/50 dark:border-gray-700/30 group-hover:border-blue-200/50 dark:group-hover:border-purple-500/30 will-change-transform card-hover">
                    
                    {/* Enhanced premium accent border with animation */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transform origin-left transition-all duration-700 scale-x-0 group-hover:scale-x-100"></div>
                    
                    {/* Animated corner accent */}
                    <div 
                      className="absolute top-0 right-0 w-20 h-20 -mt-10 -mr-10 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-30"
                      style={{
                        transform: `rotate(${scrollY * 0.1 + index * 30}deg)`,
                      }}
                    ></div>
                    
                    {/* Floating particles effect */}
                    <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-blue-400 rounded-full animate-ping"
                          style={{
                            top: `${20 + i * 30}%`,
                            left: `${10 + i * 25}%`,
                            animationDelay: `${i * 200}ms`,
                          }}
                        ></div>
                      ))}
                    </div>
                    
                    {/* Service icon */}
                    <motion.div 
                      className="relative z-10 w-16 h-16 mb-6 mx-auto flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 shadow-inner transition-all duration-700 group-hover:scale-110 group-hover:rotate-6"
                      whileHover={{ 
                        scale: 1.15, 
                        rotate: 12,
                        transition: { type: "spring", damping: 10 }
                      }}
                    >
                      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white dark:bg-gray-800 shadow-sm transition-all duration-700 group-hover:shadow-lg">
                        <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 transition-all duration-700 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                      </div>
                    </motion.div>
                    
                    {/* Content with enhanced animations */}
                    <div className="relative z-10 flex flex-col h-full">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                        {service.title}
                      </h3>
                      
                      <div className="flex-grow">
                        <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed mb-6 transition-all duration-500 group-hover:text-gray-700 dark:group-hover:text-gray-200">
                          {service.description}
                        </p>
                      </div>
                      
                      {/* Ultra premium button with enhanced effects */}
                      <div className="mt-auto flex justify-center">
                        <motion.div 
                          className="relative inline-flex group/btn"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="absolute transition-all duration-700 opacity-70 -inset-px bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-300 animate-tilt"></div>
                          <span className="relative inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 group-hover:from-blue-700 group-hover:to-purple-700 group-hover:shadow-lg">
                            Explore Service
                            <motion.svg 
                              className="w-4 h-4 ml-2" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                                                            whileHover={{ 
                                x: 4, 
                                scale: 1.1,
                                transition: { type: "spring", damping: 10 }
                              }}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                            </motion.svg>
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced floating elements with complex parallax */}
        <div className="absolute bottom-0 left-0 right-0 hidden h-40 md:block overflow-hidden">
          <div className="relative h-full w-full">
            <div 
              className="absolute left-[10%] bottom-0 h-24 w-24 animate-[float_6s_ease-in-out_infinite] rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 shadow-lg backdrop-blur-sm"
              style={{
                transform: `translateY(0px)`, // Static position
              }}
            ></div>
            <div 
              className="absolute right-[10%] bottom-10 h-16 w-16 animate-[float_8s_ease-in-out_infinite_reverse] rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 shadow-lg backdrop-blur-sm"
              style={{
                transform: `translateY(${scrollY * -0.12}px) rotate(${scrollY * -0.08}deg)`,
              }}
            ></div>
            <div 
              className="absolute left-[60%] bottom-5 h-20 w-20 animate-[float_10s_ease-in-out_infinite] rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 shadow-lg backdrop-blur-sm"
              style={{
                transform: `translateY(${scrollY * -0.18}px) scale(${1 + Math.sin(scrollY * 0.01) * 0.1})`,
              }}
            ></div>
          </div>
        </div>

        {/* Additional ambient lighting effects */}
        <div 
          className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 blur-3xl pointer-events-none"
          style={{
            transform: `translate(-50%, -50%) scale(${1 + scrollY * 0.0005}) rotate(${scrollY * 0.02}deg)`,
          }}
        ></div>

        {/* Mesh gradient overlay for ultra premium feel */}
        <div 
          className="absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${50 + Math.sin(scrollY * 0.01) * 10}% ${50 + Math.cos(scrollY * 0.01) * 10}%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at ${30 + Math.cos(scrollY * 0.008) * 15}% ${70 + Math.sin(scrollY * 0.008) * 15}%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)`,
          }}
        ></div>

        {/* Dynamic grid pattern */}
        <div 
          className="absolute inset-0 opacity-5 dark:opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
            backgroundSize: `${20 + Math.sin(scrollY * 0.01) * 5}px ${20 + Math.sin(scrollY * 0.01) * 5}px`,
            transform: `translateX(${scrollY * 0.1}px) translateY(${scrollY * 0.05}px)`,
          }}
        ></div>

        {/* Spotlight effect that follows scroll */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${50}% ${Math.max(0, Math.min(100, (scrollY - 500) * 0.1))}%, rgba(59, 130, 246, 0.05), transparent 40%)`,
          }}
        ></div>

        {/* Premium glow effects on scroll */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute w-32 h-32 rounded-full bg-blue-500/10 blur-2xl"
            style={{
              top: `${20 + Math.sin(scrollY * 0.005) * 10}%`,
              left: `${10 + Math.cos(scrollY * 0.003) * 5}%`,
              transform: `scale(${1 + Math.sin(scrollY * 0.01) * 0.3})`,
            }}
          ></div>
          <div 
            className="absolute w-40 h-40 rounded-full bg-purple-500/10 blur-2xl"
            style={{
              top: `${60 + Math.cos(scrollY * 0.004) * 15}%`,
              right: `${15 + Math.sin(scrollY * 0.006) * 8}%`,
              transform: `scale(${1 + Math.cos(scrollY * 0.008) * 0.2})`,
            }}
          ></div>
          <div 
            className="absolute w-28 h-28 rounded-full bg-pink-500/10 blur-2xl"
            style={{
              bottom: `${25 + Math.sin(scrollY * 0.007) * 12}%`,
              left: `${50 + Math.cos(scrollY * 0.005) * 10}%`,
              transform: `scale(${1 + Math.sin(scrollY * 0.012) * 0.25})`,
            }}
          ></div>
        </div>
      </section>
    </>
  );
};

export default Features;
