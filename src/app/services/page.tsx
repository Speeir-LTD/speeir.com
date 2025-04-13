"use client";
import React from "react";
import Link from "next/link";
import { services } from "@/data/services";
import Breadcrumb from "@/components/Common/Breadcrumb";

const ServicesPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Our Services"
        description="We provide a range of software development and IT services to help your business succeed in the digital world."
      />

      <section className="relative overflow-hidden py-16 md:py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-900/90">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-20">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-400 animate-[float_8s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-purple-400 animate-[float_10s_ease-in-out_infinite_reverse]"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service) => (
              <Link href={`/services/${service.slug}`} key={service.id} className="block group">
                <div className="relative bg-white/70 dark:bg-gray-800/60 rounded-2xl shadow-[0_15px_35px_-5px_rgba(0,0,0,0.1)] dark:shadow-[0_15px_35px_-5px_rgba(0,0,0,0.3)] backdrop-blur-md p-8 transition-all duration-500 hover:shadow-[0_20px_40px_-5px_rgba(79,70,229,0.2)] dark:hover:shadow-[0_20px_40px_-5px_rgba(139,92,246,0.3)] hover:-translate-y-1 h-full flex flex-col overflow-hidden border border-gray-100/50 dark:border-gray-700/30">
                  {/* Premium accent border on top */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100"></div>
                  
                  {/* Subtle corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 -mt-8 -mr-8 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-xl"></div>
                  
                  <div className="mb-6 flex-grow">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  
                  <div className="mt-auto pt-5 flex justify-center">
                    <span className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-sm hover:from-blue-700 hover:to-purple-700 transition-all duration-300 group-hover:shadow-lg">
                      <span>Learn more</span>
                      <svg className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
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
    </>
  );
};

export default ServicesPage;
