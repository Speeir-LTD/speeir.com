"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { services } from "@/data/services";
import Breadcrumb from "@/components/Common/Breadcrumb";

const ServiceDetailPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  
  // Cursor tracking state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const service = services.find(s => s.slug === slug);

  // Mouse tracking and window size effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    // Initial setup
    handleResize();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!service) {
    return (
      <div className="relative overflow-hidden py-16 md:py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-900/90">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Service not found
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            The service you're looking for doesn't exist or has been moved.
          </p>
          <Link
            href="/services"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:shadow-xl"
          >
            View all services
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero-style Cursor - Interactive Cursor Trail */}
      <div 
        className="fixed w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full pointer-events-none z-50 opacity-60 transition-all duration-100 ease-out"
        style={{ 
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Features-style Cursor - Main cursor dot */}
      <div 
        className="fixed w-4 h-4 pointer-events-none z-50 transition-all duration-150 ease-out"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: `scale(${isHovering ? 1.5 : 1})`,
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
      </div>

      {/* Features-style Cursor - Cursor Follower */}
      <div 
        className="fixed w-8 h-8 pointer-events-none z-40 transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          transform: `scale(${isHovering ? 1.2 : 1})`,
        }}
      >
        <div className="w-full h-full rounded-full border border-blue-500/50 dark:border-purple-400/50"></div>
      </div>

      {/* Ultra Premium Cursor-Following Spotlight System */}
      {/* Primary Mega Spotlight */}
      <div 
        className="fixed inset-0 pointer-events-none z-5 transition-all duration-700 ease-out"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15), rgba(147, 51, 234, 0.08) 40%, transparent 70%)`,
        }}
      ></div>

      {/* Secondary Spotlight Layer */}
      <div 
        className="fixed inset-0 pointer-events-none z-4 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(1200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.08), rgba(59, 130, 246, 0.05) 50%, transparent 80%)`,
        }}
      ></div>

      {/* Tertiary Ambient Glow */}
      <div 
        className="fixed inset-0 pointer-events-none z-3 transition-all duration-1500 ease-out opacity-60"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(168, 85, 247, 0.12), transparent 60%)`,
        }}
      ></div>

      {/* Premium Floating Orbs System */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Primary Luxury Orb */}
        <div 
          className="absolute w-40 h-40 rounded-full transition-all duration-1000 ease-out opacity-20"
          style={{
            left: mousePosition.x * 0.08 + 100,
            top: mousePosition.y * 0.08 + 100,
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(147, 51, 234, 0.2) 50%, transparent 100%)',
            filter: 'blur(20px)',
            transform: `scale(${1 + Math.sin(Date.now() * 0.001) * 0.3}) rotate(${mousePosition.x * 0.1}deg)`,
          }}
        ></div>

        {/* Secondary Floating Orb */}
        <div 
          className="absolute w-60 h-60 rounded-full transition-all duration-1200 ease-out opacity-15"
          style={{
            right: (windowSize.width - mousePosition.x) * 0.06 + 80,
            top: mousePosition.y * 0.12 + 150,
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, rgba(168, 85, 247, 0.15) 60%, transparent 100%)',
            filter: 'blur(25px)',
            transform: `scale(${1 + Math.cos(Date.now() * 0.0008) * 0.4}) rotate(${mousePosition.y * -0.08}deg)`,
          }}
        ></div>

        {/* Tertiary Accent Orb */}
        <div 
          className="absolute w-32 h-32 rounded-full transition-all duration-800 ease-out opacity-25"
          style={{
            left: mousePosition.x * 0.15 + 200,
            bottom: (windowSize.height - mousePosition.y) * 0.1 + 120,
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(99, 102, 241, 0.2) 40%, transparent 100%)',
            filter: 'blur(15px)',
            transform: `scale(${1 + Math.sin(Date.now() * 0.0012) * 0.25}) rotate(${mousePosition.x * 0.05}deg)`,
          }}
        ></div>

        {/* Luxury Particle System */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 rounded-full transition-all duration-500 ease-out opacity-40"
            style={{
              left: mousePosition.x + Math.sin(Date.now() * 0.001 + i * 0.8) * (120 + i * 20),
              top: mousePosition.y + Math.cos(Date.now() * 0.001 + i * 0.8) * (100 + i * 15),
              background: `linear-gradient(45deg, ${i % 2 === 0 ? 'rgba(99, 102, 241, 0.6)' : 'rgba(147, 51, 234, 0.6)'}, transparent)`,
              filter: 'blur(2px)',
              transform: `scale(${0.5 + Math.sin(Date.now() * 0.002 + i) * 0.5})`,
              animationDelay: `${i * 100}ms`,
            }}
          ></div>
        ))}

        {/* Premium Light Rays */}
        <div 
          className="absolute w-1 opacity-30 transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x,
            top: 0,
            height: mousePosition.y,
            background: 'linear-gradient(to bottom, rgba(99, 102, 241, 0.4), rgba(147, 51, 234, 0.2), transparent)',
            filter: 'blur(1px)',
            transform: `rotate(${Math.sin(Date.now() * 0.001) * 5}deg)`,
          }}
        ></div>

        <div 
          className="absolute h-1 opacity-30 transition-all duration-1000 ease-out"
          style={{
            top: mousePosition.y,
            left: 0,
            width: mousePosition.x,
            background: 'linear-gradient(to right, rgba(147, 51, 234, 0.4), rgba(168, 85, 247, 0.2), transparent)',
            filter: 'blur(1px)',
            transform: `rotate(${Math.cos(Date.now() * 0.001) * 3}deg)`,
          }}
        ></div>
      </div>

      {/* Interactive Mesh Gradient Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-2 transition-all duration-1000 ease-out opacity-40"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x * 0.1}% ${mousePosition.y * 0.1}%, rgba(99, 102, 241, 0.08) 0%, transparent 50%), 
            radial-gradient(circle at ${80 - mousePosition.x * 0.08}% ${70 - mousePosition.y * 0.08}%, rgba(147, 51, 234, 0.06) 0%, transparent 50%),
            radial-gradient(circle at ${mousePosition.x * 0.12}% ${90 - mousePosition.y * 0.1}%, rgba(168, 85, 247, 0.05) 0%, transparent 40%)
          `,
        }}
      ></div>

      {/* Dynamic Grid Pattern */}
      <div 
        className="fixed inset-0 pointer-events-none z-1 transition-all duration-500 ease-out opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.4) 1px, transparent 0)`,
          backgroundSize: `${25 + Math.sin(mousePosition.x * 0.01) * 8}px ${25 + Math.sin(mousePosition.y * 0.01) * 8}px`,
          transform: `translateX(${mousePosition.x * 0.02}px) translateY(${mousePosition.y * 0.02}px) rotate(${mousePosition.x * 0.01}deg)`,
        }}
      ></div>

      {/* Luxury Glow Effects */}
      <div className="fixed inset-0 pointer-events-none z-8 overflow-hidden opacity-60">
        <div 
          className="absolute w-48 h-48 rounded-full transition-all duration-1500 ease-out"
          style={{
            top: `${15 + Math.sin(mousePosition.x * 0.005) * 20}%`,
            left: `${10 + Math.cos(mousePosition.y * 0.003) * 15}%`,
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
            filter: 'blur(30px)',
            transform: `scale(${1 + Math.sin(Date.now() * 0.001) * 0.4}) rotate(${mousePosition.x * 0.05}deg)`,
          }}
        ></div>
        
        <div 
          className="absolute w-64 h-64 rounded-full transition-all duration-1800 ease-out"
          style={{
            top: `${60 + Math.cos(mousePosition.y * 0.004) * 25}%`,
            right: `${12 + Math.sin(mousePosition.x * 0.006) * 18}%`,
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.12) 0%, transparent 70%)',
            filter: 'blur(35px)',
            transform: `scale(${1 + Math.cos(Date.now() * 0.0008) * 0.3}) rotate(${mousePosition.y * -0.03}deg)`,
          }}
        ></div>

        <div 
          className="absolute w-40 h-40 rounded-full transition-all duration-1200 ease-out"
          style={{
            bottom: `${20 + Math.sin(mousePosition.x * 0.007) * 15}%`,
            left: `${45 + Math.cos(mousePosition.y * 0.005) * 20}%`,
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.18) 0%, transparent 70%)',
            filter: 'blur(25px)',
            transform: `scale(${1 + Math.sin(Date.now() * 0.0012) * 0.35}) rotate(${mousePosition.x * 0.08}deg)`,
          }}
        ></div>
      </div>

      <Breadcrumb
        pageName="Service Details"
        description=""
      />

      <section className="relative overflow-hidden py-16 md:py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-900/90">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-20">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-400 animate-[float_8s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-purple-400 animate-[float_10s_ease-in-out_infinite_reverse]"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Service title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient-x">
                {service.title}
              </span>

            </h1>

            {/* Long description */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                {service.longDescription}
              </p>
            </div>

            {/* Benefits section */}
            {service.benefits && (
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient-x">
                    Key Benefits
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                  {/* Decorative floating elements */}
                  <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-blue-500/10 blur-xl opacity-40"></div>
                  <div className="absolute -bottom-5 -right-5 w-40 h-40 rounded-full bg-purple-500/10 blur-xl opacity-40"></div>

                  {service.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="relative group overflow-hidden"
                      data-aos="fade-up"
                      data-aos-delay={index * 50}
                    >
                      {/* Animated background layer */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>

                      {/* Main card */}
                      <div className="flex items-center bg-white/80 dark:bg-gray-800/70 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-500 backdrop-blur-sm border border-white/30 dark:border-gray-700/50 relative z-10 h-full">
                        {/* Animated icon container */}
                        <div className="flex-shrink-0 mr-4 relative">
                          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg group-hover:scale-110 transition-transform duration-500">
                            <svg
                              className="w-7 h-7 transform group-hover:rotate-12 transition-transform duration-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                          </div>
                          {/* Icon glow effect */}
                          <div className="absolute inset-0 rounded-full bg-purple-400/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                        </div>

                        {/* Benefit text with animated underline */}
                        <div className="relative">
                          <p className="text-lg text-gray-700 dark:text-gray-200 font-medium leading-relaxed">
                            {benefit}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 group-hover:w-full"></span>
                          </p>
                        </div>

                        {/* Floating particles effect */}
                        <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute w-2 h-2 rounded-full bg-blue-400/50 animate-float"
                              style={{
                                left: `${Math.random() * 80 + 10}%`,
                                top: `${Math.random() * 80 + 10}%`,
                                animationDelay: `${i * 0.5}s`
                              }}
                            ></div>
                          ))}
                        </div>
                      </div>

                      {/* Reflection effect */}
                      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/30 to-transparent dark:from-gray-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-xl overflow-hidden -z-10"></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Process section */}
            {service.process && (
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Our Process
                  </span>
                </h2>
                <div className="relative">
                  {/* Decorative connecting line */}
                  <div className="absolute left-[28px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-blue-500/30 z-0"></div>

                  <div className="space-y-8 relative z-10">
                    {service.process.map((step, index) => (
                      <div
                        key={index}
                        className="flex items-start group relative"
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                      >
                        {/* Animated pulse effect */}
                        <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

                        {/* Step number with glow effect */}
                        <div className="flex-shrink-0 mr-6 relative">
                          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold text-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                            {index + 1}
                          </div>
                          {/* Glow effect */}
                          <div className="absolute inset-0 rounded-full bg-blue-400/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                        </div>

                        {/* Content with animated border */}
                        <div className="flex-grow bg-white/70 dark:bg-gray-800/60 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm border-l-4 border-transparent group-hover:border-purple-500 relative overflow-hidden">
                          {/* Subtle animated background */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-blue-500/10 group-hover:animate-pulse"></div>
                            <div className="absolute -left-5 -bottom-5 w-20 h-20 rounded-full bg-purple-500/10 group-hover:animate-pulse delay-100"></div>
                          </div>

                          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 relative">
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                              {step.title}
                            </span>
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed relative">
                            {step.description}
                          </p>

                          {/* Animated arrow on hover */}
                          <div className="absolute right-6 top-6 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                            <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CTA section */}
            <div className="relative overflow-hidden mt-16 py-16 bg-gradient-to-r from-blue-500/5 via-purple-500/10 to-indigo-500/5 border-y border-gray-200/50 dark:border-gray-700/30">
              {/* Animated background elements */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-blue-400/20 animate-[float_12s_ease-in-out_infinite]"></div>
                <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-purple-400/20 animate-[float_15s_ease-in-out_infinite_reverse]"></div>
              </div>

              {/* Glow effects */}
              <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-blue-600/10 to-transparent pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-600/10 to-transparent pointer-events-none"></div>

              <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-6xl mx-auto text-center">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient-x">
                      Ready to get started?
                    </span>
                  </h2>

                  <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                    Contact us today to discuss how our <span className="font-semibold text-blue-600 dark:text-purple-400">{service.title.toLowerCase()}</span> services can transform your business.
                  </p>

                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                      href="/contact"
                      className="relative overflow-hidden group inline-flex items-center justify-center px-10 py-5 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl hover:shadow-[0_10px_30px_-5px_rgba(79,70,229,0.3)] transition-all duration-500 hover:-translate-y-1"
                    >
                      <span className="relative z-10">Contact Us</span>
                      <svg className="w-6 h-6 ml-3 relative z-10 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                      {/* Button glow effect */}
                      <div className="absolute inset-0 rounded-full bg-blue-500/30 group-hover:opacity-100 opacity-0 transition-opacity duration-500 blur-md -z-10"></div>
                    </Link>

                    <Link
                      href="/services"
                      className="relative overflow-hidden group inline-flex items-center justify-center px-10 py-5 text-lg font-semibold text-gray-800 dark:text-white bg-white/80 dark:bg-gray-800/80 rounded-full shadow-xl hover:shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:-translate-y-1"
                    >
                      <span className="relative z-10">Explore Services</span>
                      <svg className="w-6 h-6 ml-3 relative z-10 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                      {/* Button glow effect */}
                      <div className="absolute inset-0 rounded-full bg-gray-400/10 group-hover:opacity-100 opacity-0 transition-opacity duration-500 blur-md -z-10"></div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Floating particles */}
              <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-blue-400 animate-float"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.5}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute bottom-0 left-0 right-0 hidden h-40 md:block">
          <div className="relative h-full w-full">
            <div className="absolute left-[10%] bottom-0 h-24 w-24 animate-[float_6s_ease-in-out_infinite] rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 shadow-lg backdrop-blur-sm"></div>
            <div className="absolute right-[10%] bottom-10 h-16 w-16 animate-[float_8s_ease-in-out_infinite_reverse] rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 shadow-lg backdrop-blur-sm"></div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        body {
          cursor: none !important;
        }
        
        *, *:before, *:after {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

export default ServiceDetailPage;