"use client";
import React from "react";
import Link from "next/link";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { motion } from "framer-motion";

const AboutPage = () => {
  const processItems = [
    {
      title: "Consultation & Planning",
      description: "We take time to understand your goals, challenges, and vision to design a roadmap that fits your business.",
      icon: "📋"
    },
    {
      title: "Agile Development",
      description: "Our cross-border teams work in sprints to deliver fast, iterative progress with ongoing feedback and transparency.",
      icon: "🔄"
    },
    {
      title: "Quality & Compliance",
      description: "Rigorous testing, security practices, and adherence to international standards are baked into everything we do.",
      icon: "🔍"
    },
    {
      title: "Support & Scaling",
      description: "After launch, we remain your technology partner—offering maintenance, enhancements, and scaling support as your needs grow.",
      icon: "🚀"
    }
  ];

  return (
    <>
      <Breadcrumb
        pageName="About Us"
        description="Crafting digital excellence through innovation and partnership"
      />

      <section className="relative overflow-hidden py-16 md:py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50/30 dark:from-gray-900 dark:to-gray-900/80">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-20">
          <motion.div
            className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30"
            animate={{
              y: [0, -20, 0],
              x: [0, 15, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-gradient-to-r from-purple-400/30 to-indigo-400/30"
            animate={{
              y: [0, 20, 0],
              x: [0, -15, 0],
              rotate: [0, -5, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </div>

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-400/20 dark:bg-purple-400/20"
            style={{
              width: Math.random() * 10 + 5 + 'px',
              height: Math.random() * 10 + 5 + 'px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, (Math.random() * 100) - 50],
              x: [0, (Math.random() * 60) - 30],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}

        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Company Introduction */}
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient-x">
                  Redefining Digital Innovation
                </span>
              </h1>
              
              <div className="relative bg-white/80 dark:bg-gray-800/70 rounded-2xl p-8 md:p-10 shadow-xl backdrop-blur-lg border border-gray-100/50 dark:border-gray-700/30 overflow-hidden">
                <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-blue-500/10 blur-xl"></div>
                <div className="absolute -left-5 -bottom-5 w-32 h-32 rounded-full bg-purple-500/10 blur-xl"></div>
                
                <div className="relative z-10">
                  <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    At <span className="font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Speeir LTD</span>, we're passionate about building reliable, scalable, and innovative software solutions tailored to the unique needs of our clients. Headquartered in Ireland, we bring together a team of experienced professionals committed to delivering excellence.
                  </p>
                  <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                    Our mission is to bridge the gap between business and technology, transforming ideas into powerful digital products that drive growth and create exceptional user experiences.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* How We Work Section */}
            <div className="mb-16">
              <motion.h2 
                className="text-3xl font-bold text-gray-900 dark:text-white mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ⚡ Our Methodology
                </span>
              </motion.h2>
              
              <motion.div 
                className="relative bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-gray-800/80 dark:to-gray-900/90 rounded-2xl p-8 shadow-2xl backdrop-blur-md border border-gray-200/30 dark:border-gray-700/30 mb-12 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="absolute inset-0 bg-[url('/images/patterns/grid.svg')] opacity-10 dark:opacity-5"></div>
                <div className="relative z-10">
                  <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    We operate with a <span className="font-semibold">flexible, client-first approach</span> that combines local expertise with global capabilities. Our extended development network ensures rapid scaling, around-the-clock progress, and cost-efficient development without compromising on quality.
                  </p>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {processItems.map((item, index) => (
                  <motion.div
                    key={index}
                    className="relative bg-white/80 dark:bg-gray-800/80 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-gray-100/40 dark:border-gray-700/30 overflow-hidden group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="absolute -right-5 -top-5 w-24 h-24 rounded-full bg-blue-500/10 group-hover:bg-purple-500/10 transition-all duration-500 blur-lg"></div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xl">
                          {item.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                            {item.title}
                          </span>
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                className="mt-12 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 rounded-2xl p-8 backdrop-blur-sm border border-blue-500/20 dark:border-purple-500/20 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="absolute inset-0 bg-[url('/images/patterns/circuit.svg')] opacity-10 dark:opacity-5"></div>
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 relative z-10">
                  With our <span className="font-semibold">blended model</span>, you get the best of both worlds: <span className="font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">local accountability with global reach</span>.
                </p>
              </motion.div>
            </div>

            {/* CTA Section */}
            <motion.div
              className="relative mt-20 p-8 md:p-10 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-md"></div>
              <div className="absolute inset-0 bg-[url('/images/patterns/dots.svg')] opacity-10"></div>
              <div className="relative z-10 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    Ready to Transform Your Vision?
                  </span>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                  Let's collaborate to create something extraordinary.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  <span>Start Your Project</span>
                  <svg className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;