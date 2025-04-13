"use client";
import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { services } from "@/data/services";

const ServiceDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const service = services.find(s => s.slug === slug);
  
  if (!service) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Service not found</h1>
        <p className="mb-8">The service you're looking for doesn't exist or has been moved.</p>
        <a href="/services" className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90">
          View all services
        </a>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Use a regular anchor tag instead of Next.js Link */}
        <a href="/services" className="inline-flex items-center text-primary mb-8">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to all services
        </a>
        
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">{service.title}</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {service.longDescription}
          </p>
          
          {service.benefits && (
            <>
              <h2 className="text-2xl font-semibold mt-12 mb-6">Benefits</h2>
              <ul className="space-y-2">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
          
          {service.process && (
            <>
              <h2 className="text-2xl font-semibold mt-12 mb-6">Our Process</h2>
              <div className="space-y-6">
                {service.process.map((step, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium">{step.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          
          <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Ready to get started?</h2>
            <p className="mb-6">Contact us today to discuss how our {service.title.toLowerCase()} services can help your business.</p>
            <a href="/contact" className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
