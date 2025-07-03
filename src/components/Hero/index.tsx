"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from 'react';

const Hero = () => {
  const floatingObjectRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [scrollY, setScrollY] = useState(0);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-900/90 min-h-screen flex items-center pb-16 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
      >
        {/* ULTRA PREMIUM 3D ORB SYSTEM */}
        <div className="absolute inset-0 pointer-events-none z-0">
          
          {/* Main Central Orb - Ultra Premium Design */}
          <div
            ref={floatingObjectRef}
            className="absolute w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72"
            style={{
              left: '50%',
              top: `${45 + scrollY * 0.05}%`,
              transform: `
                translate(-50%, -50%)
                perspective(1200px) 
                rotateX(${(mousePosition.y - 50) * 0.4}deg) 
                rotateY(${(mousePosition.x - 50) * 0.4}deg) 
                rotateZ(${Math.sin(Date.now() * 0.0008) * 8}deg)
                translateZ(${Math.sin(Date.now() * 0.001) * 30}px)
                scale(${1 + Math.sin(Date.now() * 0.0005) * 0.05})
                translateY(${scrollY * 0.3}px)
              `,
              transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              opacity: Math.max(0.1, 1 - scrollY * 0.002),
            }}
          >
            <div className="relative w-full h-full preserve-3d">
              
              {/* Main Ultra Premium Orb */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-blue-400/40 to-purple-600/50 backdrop-blur-2xl border border-white/40 shadow-[0_0_80px_rgba(59,130,246,0.4)] animate-[spin_30s_linear_infinite]">
                
                {/* Primary Surface Highlights */}
                <div className="absolute top-4 left-8 w-16 h-16 bg-white/60 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute top-6 left-10 w-8 h-8 bg-white/90 rounded-full blur-md"></div>
                <div className="absolute top-8 left-12 w-3 h-3 bg-white rounded-full"></div>
                
                {/* Secondary Highlights */}
                <div className="absolute bottom-12 right-16 w-12 h-12 bg-cyan-300/70 rounded-full blur-lg animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-8 right-12 w-6 h-6 bg-cyan-200/80 rounded-full blur-sm"></div>
                
                {/* Tertiary Accent Lights */}
                <div className="absolute top-1/3 right-8 w-4 h-4 bg-purple-300/60 rounded-full blur-md animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-1/3 left-6 w-5 h-5 bg-blue-300/70 rounded-full blur-md animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                
                {/* Inner Core Glow */}
                <div className="absolute inset-8 bg-gradient-to-br from-cyan-300/40 to-blue-500/40 rounded-full backdrop-blur-sm animate-pulse">
                  <div className="absolute inset-4 bg-gradient-to-tr from-white/30 to-purple-400/30 rounded-full blur-sm"></div>
                  <div className="absolute inset-6 bg-gradient-to-bl from-blue-200/40 to-purple-300/40 rounded-full"></div>
                </div>

                {/* Outer Atmospheric Glow */}
                <div className="absolute -inset-8 bg-gradient-to-r from-blue-400/20 via-purple-500/25 to-cyan-400/20 rounded-full blur-3xl animate-pulse opacity-80"></div>
                <div className="absolute -inset-12 bg-gradient-to-r from-blue-300/15 via-purple-400/20 to-pink-400/15 rounded-full blur-[100px] animate-pulse opacity-60" style={{ animationDelay: '1s' }}></div>
              </div>

              {/* Energy Rings Around Main Orb */}
              <div className="absolute inset-0 rounded-full border-2 border-blue-400/40 animate-[spin_20s_linear_infinite] scale-110">
                <div className="absolute top-0 left-1/2 w-3 h-3 bg-blue-400 rounded-full transform -translate-x-1/2 -translate-y-1.5 shadow-lg shadow-blue-400/50"></div>
                <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-cyan-300 rounded-full transform -translate-x-1/2 translate-y-1 shadow-lg shadow-cyan-300/50"></div>
              </div>
              
              <div className="absolute inset-0 rounded-full border border-purple-400/30 animate-[spin_35s_linear_infinite_reverse] scale-125">
                <div className="absolute top-1/4 right-0 w-2.5 h-2.5 bg-purple-400 rounded-full transform translate-x-1.5 shadow-lg shadow-purple-400/50"></div>
                <div className="absolute bottom-1/4 left-0 w-2 h-2 bg-pink-400 rounded-full transform -translate-x-1 shadow-lg shadow-pink-400/50"></div>
              </div>

              <div className="absolute inset-0 rounded-full border border-cyan-400/25 animate-[spin_45s_linear_infinite] scale-140">
                <div className="absolute top-1/2 left-0 w-1.5 h-1.5 bg-cyan-400 rounded-full transform -translate-x-0.5 -translate-y-0.5 shadow-lg shadow-cyan-400/50"></div>
              </div>

              {/* Orbital Particles */}
              {[...Array(16)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-70 shadow-lg"
                  style={{
                    left: `${50 + Math.cos((Date.now() * 0.0006) + (i * Math.PI / 8)) * (90 + i * 3)}%`,
                    top: `${50 + Math.sin((Date.now() * 0.0006) + (i * Math.PI / 8)) * (90 + i * 3)}%`,
                    transform: `translate(-50%, -50%) scale(${0.6 + Math.sin(Date.now() * 0.002 + i) * 0.4})`,
                    animation: `float ${2 + i * 0.2}s ease-in-out infinite`,
                    animationDelay: `${i * 0.1}s`,
                    boxShadow: `0 0 10px rgba(59, 130, 246, 0.6)`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Cursor-Following Satellite Elements */}
          
          {/* Floating Diamond - Top Right */}
          <div
            className="absolute w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
            style={{
              right: `${15 + (mousePosition.x - 50) * -0.15}%`,
              top: `${20 + (mousePosition.y - 50) * 0.12 + scrollY * 0.08}%`,
              transform: `
                perspective(800px) 
                rotateX(${(mousePosition.y - 50) * -0.3}deg) 
                rotateY(${(mousePosition.x - 50) * -0.3}deg)
                rotateZ(${45 + Math.sin(Date.now() * 0.0012) * 15}deg)
                translateZ(${Math.cos(Date.now() * 0.0015) * 20}px)
                translateY(${scrollY * 0.2}px)
              `,
              transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              opacity: Math.max(0.2, 1 - scrollY * 0.0015),
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-cyan-400/40 to-blue-500/50 backdrop-blur-xl transform rotate-45 border border-white/30 shadow-[0_0_40px_rgba(34,211,238,0.4)] rounded-lg">
              <div className="absolute inset-2 bg-gradient-to-tr from-white/30 to-transparent border-l border-t border-white/20"></div>
              <div className="absolute inset-2 bg-gradient-to-bl from-transparent to-cyan-400/30 border-r border-b border-cyan-400/20"></div>
              <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
            </div>
          </div>

          {/* Floating Hexagon - Left Side */}
          <div
            className="absolute w-14 h-14 md:w-18 md:h-18 lg:w-20 lg:h-20"
            style={{
              left: `${12 + (mousePosition.x - 50) * -0.18}%`,
              top: `${35 + (mousePosition.y - 50) * 0.15 + scrollY * 0.06}%`,
              transform: `
                perspective(600px) 
                rotateX(${(mousePosition.y - 50) * 0.25}deg) 
                rotateY(${(mousePosition.x - 50) * 0.35}deg)
                rotateZ(${Math.cos(Date.now() * 0.001) * 20}deg)
                translateZ(${Math.sin(Date.now() * 0.0018) * 15}px)
                translateY(${scrollY * 0.25}px)
              `,
              transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              opacity: Math.max(0.2, 1 - scrollY * 0.0015),
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-purple-400/40 to-pink-500/50 backdrop-blur-xl border border-white/30 shadow-[0_0_35px_rgba(168,85,247,0.4)]"
                 style={{
                   clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                 }}>
              <div className="absolute inset-1 bg-gradient-to-tr from-white/20 to-purple-300/20"
                   style={{
                     clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                   }}></div>
            </div>
          </div>

          {/* Floating Triangle - Bottom Left */}
          <div
            className="absolute w-12 h-12 md:w-16 md:h-16 lg:w-18 lg:h-18"
            style={{
              left: `${25 + (mousePosition.x - 50) * -0.12}%`,
              bottom: `${30 + (mousePosition.y - 50) * -0.1 - scrollY * 0.04}%`,
              transform: `
                perspective(500px) 
                rotateX(${(mousePosition.y - 50) * 0.2}deg) 
                rotateY(${(mousePosition.x - 50) * 0.4}deg)
                rotateZ(${Math.sin(Date.now() * 0.0014) * 25}deg)
                translateZ(${Math.cos(Date.now() * 0.0016) * 12}px)
                translateY(${scrollY * 0.15}px)
              `,
              transition: 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              opacity: Math.max(0.2, 1 - scrollY * 0.0015),
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-emerald-400/40 to-teal-500/50 backdrop-blur-xl border border-white/30 shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                 style={{
                   clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
                 }}>
              <div className="absolute inset-1 bg-gradient-to-tr from-white/25 to-emerald-300/20"
                   style={{
                     clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
                   }}></div>
            </div>
          </div>

          {/* Floating Octagon - Top Left */}
          <div
            className="absolute w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16"
            style={{
              left: `${8 + (mousePosition.x - 50) * -0.08}%`,
              top: `${15 + (mousePosition.y - 50) * 0.08 + scrollY * 0.04}%`,
              transform: `
                perspective(400px)
                                rotateX(${(mousePosition.y - 50) * 0.15}deg) 
                rotateY(${(mousePosition.x - 50) * 0.25}deg)
                rotateZ(${Math.cos(Date.now() * 0.0016) * 30}deg)
                translateZ(${Math.sin(Date.now() * 0.002) * 10}px)
                translateY(${scrollY * 0.18}px)
              `,
              transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              opacity: Math.max(0.2, 1 - scrollY * 0.0015),
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-rose-400/40 to-orange-500/50 backdrop-blur-xl border border-white/30 shadow-[0_0_25px_rgba(251,113,133,0.4)] rounded-lg transform rotate-12">
              <div className="absolute inset-1 bg-gradient-to-tr from-white/30 to-rose-300/20 rounded-md"></div>
              <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white/80 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
            </div>
          </div>

          {/* Floating Pill Shape - Right Side */}
          <div
            className="absolute w-8 h-16 md:w-10 md:h-20 lg:w-12 lg:h-24"
            style={{
              right: `${8 + (mousePosition.x - 50) * -0.1}%`,
              top: `${60 + (mousePosition.y - 50) * 0.1 + scrollY * 0.07}%`,
              transform: `
                perspective(600px) 
                rotateX(${(mousePosition.y - 50) * 0.2}deg) 
                rotateY(${(mousePosition.x - 50) * 0.3}deg)
                rotateZ(${Math.sin(Date.now() * 0.0013) * 20}deg)
                translateZ(${Math.cos(Date.now() * 0.0017) * 18}px)
                translateY(${scrollY * 0.22}px)
              `,
              transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              opacity: Math.max(0.2, 1 - scrollY * 0.0015),
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-indigo-400/40 to-violet-500/50 backdrop-blur-xl border border-white/30 shadow-[0_0_35px_rgba(99,102,241,0.4)] rounded-full">
              <div className="absolute inset-1 bg-gradient-to-tr from-white/25 to-indigo-300/20 rounded-full"></div>
              <div className="absolute top-2 left-1/2 w-1 h-1 bg-white/90 rounded-full transform -translate-x-1/2 animate-pulse"></div>
              <div className="absolute bottom-2 left-1/2 w-1 h-1 bg-white/90 rounded-full transform -translate-x-1/2 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>

          {/* Floating Star Shape - Bottom Right */}
          <div
            className="absolute w-12 h-12 md:w-16 md:h-16 lg:w-18 lg:h-18"
            style={{
              right: `${20 + (mousePosition.x - 50) * -0.14}%`,
              bottom: `${25 + (mousePosition.y - 50) * -0.08 - scrollY * 0.05}%`,
              transform: `
                perspective(700px) 
                rotateX(${(mousePosition.y - 50) * 0.18}deg) 
                rotateY(${(mousePosition.x - 50) * 0.28}deg)
                rotateZ(${Math.cos(Date.now() * 0.0011) * 35}deg)
                translateZ(${Math.sin(Date.now() * 0.0019) * 22}px)
                translateY(${scrollY * 0.12}px)
              `,
              transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              opacity: Math.max(0.2, 1 - scrollY * 0.0015),
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-yellow-400/40 to-amber-500/50 backdrop-blur-xl border border-white/30 shadow-[0_0_40px_rgba(251,191,36,0.4)]"
                 style={{
                   clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                 }}>
              <div className="absolute inset-1 bg-gradient-to-tr from-white/30 to-yellow-300/20"
                   style={{
                     clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                   }}></div>
            </div>
          </div>

          {/* Micro Floating Particles */}
          {[...Array(12)].map((_, i) => (
            <div
              key={`micro-${i}`}
              className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-60"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                transform: `
                  translate(
                    ${(mousePosition.x - 50) * (0.05 + i * 0.01)}px,
                    ${(mousePosition.y - 50) * (0.05 + i * 0.01)}px
                  )
                  translateZ(${Math.sin(Date.now() * 0.002 + i) * 5}px)
                `,
                animation: `float ${3 + i * 0.3}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
                boxShadow: `0 0 8px rgba(59, 130, 246, 0.5)`,
                transition: 'all 0.3s ease-out',
              }}
            />
          ))}

          {/* Interactive Light Rays Following Cursor */}
          <div
            className="absolute w-0.5 h-40 bg-gradient-to-b from-blue-400/60 via-purple-400/40 to-transparent blur-sm"
            style={{
              left: `${mousePosition.x}%`,
              top: `${mousePosition.y - 15}%`,
              transform: `rotate(${(mousePosition.x - 50) * 0.2}deg)`,
              transition: 'all 0.15s ease-out',
              opacity: 0.7,
            }}
          />
          <div
            className="absolute w-0.5 h-32 bg-gradient-to-b from-cyan-400/50 via-blue-400/30 to-transparent blur-sm"
            style={{
              left: `${mousePosition.x + 3}%`,
              top: `${mousePosition.y - 12}%`,
              transform: `rotate(${(mousePosition.x - 50) * -0.15}deg)`,
              transition: 'all 0.2s ease-out',
              opacity: 0.5,
            }}
          />
          <div
            className="absolute w-0.5 h-24 bg-gradient-to-b from-purple-400/40 via-pink-400/25 to-transparent blur-sm"
            style={{
              left: `${mousePosition.x - 2}%`,
              top: `${mousePosition.y - 10}%`,
              transform: `rotate(${(mousePosition.x - 50) * 0.1}deg)`,
              transition: 'all 0.25s ease-out',
              opacity: 0.4,
            }}
          />

          {/* Cursor-Following Glow Effect */}
          <div
            className="absolute w-32 h-32 bg-gradient-radial from-blue-400/20 via-purple-400/10 to-transparent rounded-full blur-2xl pointer-events-none"
            style={{
              left: `${mousePosition.x}%`,
              top: `${mousePosition.y}%`,
              transform: 'translate(-50%, -50%)',
              transition: 'all 0.3s ease-out',
            }}
          />
          <div
            className="absolute w-48 h-48 bg-gradient-radial from-cyan-400/15 via-blue-400/8 to-transparent rounded-full blur-3xl pointer-events-none"
            style={{
              left: `${mousePosition.x}%`,
              top: `${mousePosition.y}%`,
              transform: 'translate(-50%, -50%)',
              transition: 'all 0.4s ease-out',
            }}
          />
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-[-1] overflow-hidden">
          {/* Enhanced Gradient Mesh Background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20"></div>
          
          {/* Dynamic Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle absolute rounded-full animate-float"
              style={{
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: `rgba(${
                  Math.random() > 0.5 ? "74, 108, 247" : "159, 122, 234"
                }, ${0.4 + Math.random() * 0.4})`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            ></div>
          ))}

          {/* Enhanced Floating Blobs */}
          <div className="absolute right-0 top-0 opacity-20 dark:opacity-30">
            <div className="relative h-[600px] w-[600px]">
              <div className="absolute right-0 top-0 h-[400px] w-[400px] animate-[float_8s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-30 blur-[80px]"></div>
              <div className="absolute right-20 top-40 h-[300px] w-[300px] animate-[float_6s_ease-in-out_infinite_reverse] rounded-full bg-gradient-to-r from-pink-500 to-rose-500 opacity-20 blur-[60px]"></div>
            </div>
          </div>
        </div>

        <div className="container flex items-center justify-center min-h-[calc(100vh-120px)] relative z-30">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[800px] text-center">
                {/* Company Name */}
                <div className="relative mb-8">
                  {/* Company Name with Enhanced Effects */}
                  <h1 className="relative z-10 py-12 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
                    <span className="relative inline-block group">
                      <span className="relative z-20 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                        Speeir LTD
                      </span>
                      <span className="absolute left-0 h-2 w-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-80 transition-all duration-300 z-10"
                        style={{
                          bottom: '4px',
                          transform: `translateX(${(mousePosition.x - 50) * 0.1}px) scaleX(${0.8 + (mousePosition.x / 100) * 0.4})`,
                          transformOrigin: 'center'
                        }}></span>
                      
                      {/* Hover glow effect */}
                      <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                    </span>
                  </h1>
                </div>

                {/* Enhanced Tagline */}
                <h2 className="mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-xl font-semibold sm:text-2xl md:text-3xl lg:text-4xl animate-[fadeInUp_1s_ease-out_0.5s_both]">
                  Web & Mobile Solutions for Modern Businesses
                </h2>

                {/* Description */}
                <p className="mb-12 text-base !leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg md:text-xl animate-[fadeInUp_1s_ease-out_0.7s_both]">
                  We craft fast, beautiful websites and powerful mobile apps that put your customers first. 
                  Whether you need a startup launchpad or enterprise-grade SaaS, 
                  we build digital experiences that convert and grow.  
                  <br />
                </p>

                {/* Enhanced CTA Buttons */}
                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 animate-[fadeInUp_1s_ease-out_0.9s_both]">
                  <Link
                    href="/contact"
                    className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105"
                  >
                    <span className="relative z-10 flex items-center">
                      Lets Chat 👋
                      <svg
                                                className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                    
                    {/* Button glow effect */}
                    <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-lg"></span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Floating Components */}
        <div className="absolute bottom-0 left-0 right-0 hidden h-40 md:block z-10">
          <div className="relative h-full w-full">
            <div 
              className="absolute left-[10%] bottom-0 h-24 w-24 animate-[float_6s_ease-in-out_infinite] rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 shadow-lg backdrop-blur-sm"
              style={{
                transform: `translateX(${(mousePosition.x - 50) * 0.02}px) translateY(${(mousePosition.y - 50) * 0.02}px)`
              }}
            ></div>
            <div 
              className="absolute left-[30%] bottom-10 h-16 w-16 animate-[float_8s_ease-in-out_infinite_reverse] rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 shadow-lg backdrop-blur-sm"
              style={{
                transform: `translateX(${(mousePosition.x - 50) * -0.015}px) translateY(${(mousePosition.y - 50) * 0.025}px)`
              }}
            ></div>
            <div 
              className="absolute right-[20%] bottom-5 h-20 w-20 animate-[float_7s_ease-in-out_infinite] rounded-2xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 shadow-lg backdrop-blur-sm"
              style={{
                transform: `translateX(${(mousePosition.x - 50) * 0.03}px) translateY(${(mousePosition.y - 50) * -0.02}px)`
              }}
            ></div>
          </div>
        </div>

        {/* Interactive Cursor Trail */}
        <div 
          className="fixed w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full pointer-events-none z-50 opacity-60 transition-all duration-100 ease-out"
          style={{
            left: `${mousePosition.x * (typeof window !== 'undefined' ? window.innerWidth : 1920) / 100}px`,
            top: `${mousePosition.y * (typeof window !== 'undefined' ? window.innerHeight : 1080) / 100}px`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div 
          className="fixed w-8 h-8 border-2 border-blue-400/30 rounded-full pointer-events-none z-40 transition-all duration-200 ease-out"
          style={{
            left: `${mousePosition.x * (typeof window !== 'undefined' ? window.innerWidth : 1920) / 100}px`,
            top: `${mousePosition.y * (typeof window !== 'undefined' ? window.innerHeight : 1080) / 100}px`,
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Energy Connections Between Elements */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 z-5">
          <defs>
            <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.6)" />
              <stop offset="50%" stopColor="rgba(147, 51, 234, 0.4)" />
              <stop offset="100%" stopColor="rgba(236, 72, 153, 0.3)" />
            </linearGradient>
          </defs>
          
          {/* Dynamic connecting lines that respond to cursor */}
          {typeof window !== 'undefined' && (
            <>
              <path
                d={`M ${window.innerWidth * 0.5} ${window.innerHeight * 0.45} Q ${mousePosition.x * window.innerWidth / 100} ${mousePosition.y * window.innerHeight / 100} ${window.innerWidth * 0.85} ${window.innerHeight * 0.2}`}
                stroke="url(#energyGradient)"
                strokeWidth="1"
                fill="none"
                className="animate-pulse"
              />
              <path
                d={`M ${window.innerWidth * 0.5} ${window.innerHeight * 0.45} Q ${mousePosition.x * window.innerWidth / 100} ${mousePosition.y * window.innerHeight / 100} ${window.innerWidth * 0.12} ${window.innerHeight * 0.35}`}
                stroke="url(#energyGradient)"
                strokeWidth="1"
                fill="none"
                className="animate-pulse"
                style={{ animationDelay: '0.5s' }}
              />
            </>
          )}
        </svg>
      </section>
    </>
  );
};

export default Hero;
