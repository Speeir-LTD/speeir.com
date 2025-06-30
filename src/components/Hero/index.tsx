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
        {/* 3D Floating Objects - Ultra Premium */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Main 3D Floating Object */}
          <div
            ref={floatingObjectRef}
            className="absolute w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64"
            style={{
              left: `${45 + (mousePosition.x - 50) * 0.1}%`,
              top: `${30 + (mousePosition.y - 50) * 0.1 + scrollY * 0.05}%`,
              transform: `
                perspective(1000px) 
                rotateX(${(mousePosition.y - 50) * 0.3}deg) 
                rotateY(${(mousePosition.x - 50) * 0.3}deg) 
                rotateZ(${Math.sin(Date.now() * 0.001) * 5}deg)
                translateZ(${Math.sin(Date.now() * 0.002) * 20}px)
              `,
              transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            {/* Geometric 3D Shape */}
            <div className="relative w-full h-full">
              {/* Main Cube */}
              <div className="absolute inset-0 preserve-3d animate-[spin_20s_linear_infinite]">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-600/30 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl transform-gpu">
                  <div className="absolute inset-2 bg-gradient-to-tr from-cyan-400/20 to-blue-500/20 rounded-xl"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl transform translate-z-12 rotate-y-45">
                  <div className="absolute inset-2 bg-gradient-to-tl from-purple-400/20 to-pink-400/20 rounded-xl"></div>
                </div>
              </div>
              
              {/* Floating Particles around main object */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-60"
                  style={{
                    left: `${50 + Math.cos((Date.now() * 0.001) + (i * Math.PI / 4)) * 60}%`,
                    top: `${50 + Math.sin((Date.now() * 0.001) + (i * Math.PI / 4)) * 60}%`,
                    transform: `translateZ(${Math.sin(Date.now() * 0.003 + i) * 30}px)`,
                    animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Secondary Floating Objects */}
          <div
            className="absolute w-16 h-16 md:w-24 md:h-24"
            style={{
              right: `${20 + (mousePosition.x - 50) * -0.05}%`,
              top: `${20 + (mousePosition.y - 50) * 0.08 + scrollY * 0.03}%`,
              transform: `
                perspective(800px) 
                rotateX(${(mousePosition.y - 50) * -0.2}deg) 
                rotateY(${(mousePosition.x - 50) * -0.2}deg)
                translateZ(${Math.cos(Date.now() * 0.0015) * 15}px)
              `,
              transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-cyan-400/25 to-blue-500/25 backdrop-blur-sm rounded-full border border-white/20 shadow-xl animate-pulse">
              <div className="absolute inset-2 bg-gradient-to-tr from-cyan-300/30 to-blue-400/30 rounded-full"></div>
            </div>
          </div>

          <div
            className="absolute w-12 h-12 md:w-20 md:h-20"
            style={{
              left: `${15 + (mousePosition.x - 50) * -0.08}%`,
              bottom: `${25 + (mousePosition.y - 50) * -0.06 + scrollY * 0.02}%`,
              transform: `
                perspective(600px) 
                rotateX(${(mousePosition.y - 50) * 0.15}deg) 
                rotateY(${(mousePosition.x - 50) * 0.25}deg)
                translateZ(${Math.sin(Date.now() * 0.0018) * 10}px)
              `,
              transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-purple-400/25 to-pink-500/25 backdrop-blur-sm rounded-lg border border-white/20 shadow-xl transform rotate-45 animate-[spin_15s_linear_infinite]">
              <div className="absolute inset-1 bg-gradient-to-tr from-purple-300/30 to-pink-400/30 rounded-md"></div>
            </div>
          </div>

          {/* Interactive Light Rays */}
          <div
            className="absolute w-1 h-32 bg-gradient-to-b from-blue-400/50 to-transparent"
            style={{
              left: `${mousePosition.x}%`,
              top: `${mousePosition.y - 10}%`,
              transform: `rotate(${mousePosition.x * 0.1}deg)`,
              transition: 'all 0.1s ease-out',
            }}
          />
          <div
            className="absolute w-1 h-24 bg-gradient-to-b from-purple-400/40 to-transparent"
            style={{
              left: `${mousePosition.x + 2}%`,
              top: `${mousePosition.y - 8}%`,
              transform: `rotate(${mousePosition.x * -0.08}deg)`,
              transition: 'all 0.15s ease-out',
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
                      <span className="absolute -bottom-1 left-0 h-2 w-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-80 transition-all duration-300 z-10"
                        style={{
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
      </section>
    </>
  );
};

export default Hero;
