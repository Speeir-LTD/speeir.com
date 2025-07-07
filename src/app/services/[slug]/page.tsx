"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { services } from "@/data/services";
import Breadcrumb from "@/components/Common/Breadcrumb";

const ServiceDetailPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  
  const service = useMemo(() => services.find(s => s.slug === slug), [slug]);

  // Simplified background animation with reduced complexity
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
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
      <Breadcrumb
        pageName={service.title}
        description={service.description}
      />

      <section className="relative overflow-hidden py-16 md:py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-900/90">
        {/* Optimized background elements - static positioning */}
        <div className="absolute inset-0 overflow-hidden opacity-5 dark:opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-gradient-to-r from-purple-400/30 to-indigo-400/30 blur-3xl animate-pulse animation-delay-1000"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Service title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
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
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Key Benefits
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/70 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 backdrop-blur-sm border border-white/30 dark:border-gray-700/50"
                    >
                      {/* Icon */}
                      <div className="flex items-center mb-4">
                        <div className="flex-shrink-0 mr-4">
                          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                            <svg
                              className="w-6 h-6"
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
                        </div>
                        <p className="text-lg text-gray-700 dark:text-gray-200 font-medium">
                          {benefit}
                        </p>
                      </div>
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
                  {/* Connecting line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-blue-500/30 z-0"></div>

                  <div className="space-y-8 relative z-10">
                    {service.process.map((step, index) => (
                      <div
                        key={index}
                        className="flex items-start group relative"
                      >
                        {/* Step number */}
                        <div className="flex-shrink-0 mr-6 relative">
                          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold text-lg shadow-lg group-hover:shadow-xl transition-all duration-300">
                            {index + 1}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-grow bg-white/70 dark:bg-gray-800/60 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm border-l-4 border-transparent group-hover:border-purple-500">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                              {step.title}
                            </span>
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CTA section */}
            <div className="relative overflow-hidden mt-16 py-16 bg-gradient-to-r from-blue-500/5 via-purple-500/10 to-indigo-500/5 rounded-2xl border border-gray-200/50 dark:border-gray-700/30">
              <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      Ready to get started?
                    </span>
                  </h2>

                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                    Contact us today to discuss how our <span className="font-semibold text-blue-600 dark:text-purple-400">{service.title.toLowerCase()}</span> services can transform your business.
                  </p>

                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      Contact Us
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </Link>

                    <Link
                      href="/services"
                      className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-800 dark:text-white bg-white/80 dark:bg-gray-800/80 rounded-full shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1"
                    >
                      Explore Services
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetailPage;
