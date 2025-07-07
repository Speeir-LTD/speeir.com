"use client";

import React from "react";
import Link from "next/link";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const AboutPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [scrollY, setScrollY] = useState(0);

  // SMOOTH MOUSE TRACKING - NO LAG
useEffect(() => {
    let cursorDot: HTMLElement | null = null;
    let cursorRing: HTMLElement | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      // Direct DOM manipulation - NO React state updates
      if (!cursorDot || !cursorRing) {
        cursorDot = document.getElementById('cursor-dot');
        cursorRing = document.getElementById('cursor-ring');
      }

      if (cursorDot && cursorRing) {
        const x = e.clientX;
        const y = e.clientY;
        
        // Direct style updates - INSTANT, NO LAG
        cursorDot.style.left = x + 'px';
        cursorDot.style.top = y + 'px';
        cursorRing.style.left = x + 'px';
        cursorRing.style.top = y + 'px';
      }

      // Only update scroll for background effects (less frequent)
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
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
        description="Learn more about Speeir, our mission, values, and the team behind our innovative solutions."
      />

      <section className="relative overflow-hidden py-16 md:py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50/30 dark:from-gray-900 dark:to-gray-900/80">
        
        {/* ULTRA PREMIUM BACKGROUND EFFECTS */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Cursor-following mega spotlight */}
          <div 
            className="absolute w-[200px] h-[200px] rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl transition-all duration-300 ease-out"
            style={{
              left: `${mousePosition.x}%`,
              top: `${mousePosition.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />
          
          {/* Interactive mesh gradient */}
          <div 
            className="absolute inset-0 opacity-20 dark:opacity-30"
            style={{
              background: `
                radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)
              `,
            }}
          />

          {/* Floating orbs that follow cursor */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-blue-400/50 animate-pulse"
              style={{
                left: `${mousePosition.x + Math.sin(i * Math.PI / 3 + scrollY * 0.01) * 20}%`,
                top: `${mousePosition.y + Math.cos(i * Math.PI / 3 + scrollY * 0.01) * 20}%`,
                transform: 'translate(-50%, -50%)',
                transition: `all ${0.5 + i * 0.1}s ease-out`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}

          {/* Enhanced parallax geometric shapes */}
          <motion.div
            className="absolute top-20 left-20 w-32 h-32 rotate-45 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl"
            animate={{
              rotate: [45, 50, 45],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              transform: `rotate(${45 + scrollY * 0.05}deg) translateY(${scrollY * 0.1}px)`,
            }}
          />
          
          <motion.div
            className="absolute bottom-32 right-32 w-28 h-28 rounded-full bg-gradient-to-br from-pink-500/10 to-rose-500/10 backdrop-blur-sm"
            animate={{
              y: [0, -15, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              transform: `scale(${1 + Math.sin(scrollY * 0.005) * 0.1}) translateY(${scrollY * -0.08}px)`,
            }}
          />

          {/* Dynamic grid pattern */}
          <div 
            className="absolute inset-0 opacity-5 dark:opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.4) 1px, transparent 0)`,
              backgroundSize: '25px 25px',
              transform: `translateX(${mousePosition.x * 0.02}px) translateY(${mousePosition.y * 0.02}px)`,
            }}
          />

          {/* Enhanced floating particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20"
              style={{
                width: Math.random() * 6 + 3 + 'px',
                height: Math.random() * 6 + 3 + 'px',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, (Math.random() * 60) - 30],
                x: [0, (Math.random() * 40) - 20],
                opacity: [0.2, 0.6, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Parallax background layers */}
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute inset-0 opacity-5 dark:opacity-10"
              style={{
                transform: `translateY(${scrollY * 0.03}px)`,
              }}
            >
              <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 blur-3xl"></div>
            </div>
          </div>
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Company Introduction */}
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                transform: `translateY(${scrollY * 0.02}px)`,
              }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
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
                style={{
                  transform: `translateY(${scrollY * 0.015}px)`,
                }}
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
                style={{
                  transform: `translateY(${scrollY * 0.01}px)`,
                }}
              >
                <div className="absolute inset-0 opacity-10 dark:opacity-5"></div>
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
                    style={{
                      transform: `translateY(${scrollY * (0.005 + index * 0.002)}px)`,
                    }}
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
                                style={{
                  transform: `translateY(${scrollY * 0.008}px)`,
                }}
              >
                <div className="absolute inset-0 opacity-10 dark:opacity-5"></div>
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
              style={{
                transform: `translateY(${scrollY * 0.005}px)`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-md"></div>
              <div className="absolute inset-0 opacity-10"></div>
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


        {/* ULTRA SMOOTH CURSOR - DIRECT DOM MANIPULATION */}
        <div 

          id="cursor-dot"
          className="fixed w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full pointer-events-none z-50 opacity-60"
          style={{


            transform: 'translate(-50%, -50%)',
            transition: 'none', // NO TRANSITIONS for instant movement
          }}
        />
        <div 

          id="cursor-ring"
          className="fixed w-8 h-8 border-2 border-blue-400/30 rounded-full pointer-events-none z-40"
          style={{


            transform: 'translate(-50%, -50%)',
            transition: 'none', // NO TRANSITIONS for instant movement
          }}
        />

        {/* Enhanced floating elements with parallax */}
        <div className="absolute bottom-0 left-0 right-0 hidden h-40 md:block overflow-hidden">
          <div className="relative h-full w-full">
            <div 
              className="absolute left-[10%] bottom-0 h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 shadow-lg backdrop-blur-sm animate-[float_8s_ease-in-out_infinite]"
              style={{
                transform: `translateY(${scrollY * -0.05}px) rotate(${scrollY * 0.02}deg)`,
              }}
            />
            <div 
              className="absolute right-[10%] bottom-10 h-16 w-16 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 shadow-lg backdrop-blur-sm animate-[float_10s_ease-in-out_infinite_reverse]"
              style={{
                transform: `translateY(${scrollY * -0.03}px) rotate(${scrollY * -0.02}deg)`,
              }}
            />
            <div 
              className="absolute left-[60%] bottom-5 h-18 w-18 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 shadow-lg backdrop-blur-sm animate-[float_12s_ease-in-out_infinite]"
              style={{
                transform: `translateY(${scrollY * -0.04}px) scale(${1 + Math.sin(scrollY * 0.005) * 0.1})`,
              }}
            />
          </div>
        </div>

        {/* Additional ambient lighting effects */}
        <div 
          className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 blur-3xl pointer-events-none"
          style={{
            transform: `translate(-50%, -50%) scale(${1 + scrollY * 0.0002}) rotate(${scrollY * 0.01}deg)`,
          }}
        />

        {/* Subtle mesh gradient overlay */}
        <div 
          className="absolute inset-0 opacity-10 dark:opacity-5 pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at ${50 + Math.sin(scrollY * 0.003) * 5}% ${50 + Math.cos(scrollY * 0.003) * 5}%, rgba(59, 130, 246, 0.05) 0%, transparent 50%), 
              radial-gradient(circle at ${30 + Math.cos(scrollY * 0.002) * 8}% ${70 + Math.sin(scrollY * 0.002) * 8}%, rgba(147, 51, 234, 0.03) 0%, transparent 50%)
            `,
          }}
        />

        {/* Premium glow effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute w-24 h-24 rounded-full bg-blue-500/8 blur-2xl"
            style={{
              top: `${25 + Math.sin(scrollY * 0.002) * 5}%`,
              left: `${15 + Math.cos(scrollY * 0.001) * 3}%`,
              transform: `scale(${1 + Math.sin(scrollY * 0.003) * 0.2})`,
            }}
          />
          <div 
            className="absolute w-32 h-32 rounded-full bg-purple-500/6 blur-2xl"
            style={{
              top: `${65 + Math.cos(scrollY * 0.001) * 8}%`,
              right: `${20 + Math.sin(scrollY * 0.002) * 4}%`,
              transform: `scale(${1 + Math.cos(scrollY * 0.002) * 0.15})`,
            }}
          />
          <div 
            className="absolute w-28 h-28 rounded-full bg-pink-500/4 blur-2xl"
            style={{
              bottom: `${30 + Math.sin(scrollY * 0.003) * 6}%`,
              left: `${50 + Math.cos(scrollY * 0.002) * 5}%`,
              transform: `scale(${1 + Math.sin(scrollY * 0.004) * 0.18})`,
            }}
          />
        </div>

        {/* Spotlight effect that follows scroll */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(400px circle at 50% ${Math.max(0, Math.min(100, (scrollY - 300) * 0.05))}%, rgba(59, 130, 246, 0.03), transparent 40%)`,
          }}
        />

        {/* Dynamic grid pattern that moves with scroll */}
        <div 
          className="absolute inset-0 opacity-3 dark:opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.2) 1px, transparent 0)`,
            backgroundSize: `${20 + Math.sin(scrollY * 0.005) * 3}px ${20 + Math.sin(scrollY * 0.005) * 3}px`,
            transform: `translateX(${scrollY * 0.05}px) translateY(${scrollY * 0.02}px)`,
          }}
        />

        {/* Subtle floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-blue-400/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                transform: `translateY(${scrollY * (0.01 + Math.random() * 0.01)}px)`,
              }}
            />
          ))}
        </div>

        {/* Subtle depth shadow */}
        <div 
          className="absolute inset-0 bg-gradient-radial from-transparent via-gray-900/1 to-transparent dark:via-gray-100/0.5 pointer-events-none"
          style={{
            transform: `scale(${1 + Math.sin(scrollY * 0.001) * 0.01})`,
          }}
        />
      </section>
    </>
  );
};

export default AboutPage;
