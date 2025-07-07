import React from "react";
import Link from "next/link";
import { services } from "@/data/services";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Services | Speeir",
    description: "Explore our range of software development and IT services designed to help your business thrive in the digital world.",
    keywords: "services, software development, IT services, Ireland, Speeir",
    robots: "index, follow",
};

const ServicesPage = () => {
    return (
        <>
            <Breadcrumb
                pageName="Our Services"
                description="We provide a range of software development and IT services to help your business succeed in the digital world."
            />

            <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-900/90 py-16 md:py-20 lg:py-28">
                {/* Modern background elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5 dark:opacity-10">
                    <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30 blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-purple-400/30 to-indigo-400/30 blur-3xl animate-pulse animation-delay-1000"></div>
                </div>

                {/* Floating grid pattern */}
                <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
                    <div className="h-full w-full bg-[linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
                </div>

                <div className="container relative z-10 max-w-7xl mx-auto px-4">
                    {/* Hero section */}
                    <div className="mb-16 text-center">
                        <div className="mb-6">
                            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
                                🚀 Our Services
                            </span>
                        </div>
                        <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                Transform Your Business
                            </span>
                            <br />
                            <span className="text-gray-900 dark:text-white">With Our Expert Services</span>
                        </h1>
                        <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                            From cutting-edge web development to strategic digital marketing, we deliver comprehensive solutions that drive growth and innovation for your business.
                        </p>
                    </div>

                    {/* Statistics section */}
                    {/* <div className="mb-16 grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { number: "100+", label: "Projects Completed", icon: "📊" },
                            { number: "50+", label: "Happy Clients", icon: "😊" },
                            { number: "24/7", label: "Support Available", icon: "🔧" },
                            { number: "5★", label: "Average Rating", icon: "⭐" }
                        ].map((stat, index) => (
                            <div key={index} className="text-center p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="text-3xl mb-2">{stat.icon}</div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.number}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                            </div>
                        ))}
                    </div> */}

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => {
                            const serviceIcons = [
                                { icon: "🌐", gradient: "from-blue-500 to-cyan-500" },
                                { icon: "📱", gradient: "from-purple-500 to-pink-500" },
                                { icon: "⚙️", gradient: "from-orange-500 to-red-500" },
                                { icon: "📈", gradient: "from-green-500 to-teal-500" },
                                { icon: "🛒", gradient: "from-indigo-500 to-purple-500" },
                                { icon: "🔧", gradient: "from-gray-500 to-slate-500" }
                            ];

                            const serviceIcon = serviceIcons[index % serviceIcons.length];

                            return (
                                <Link
                                    href={`/services/${service.slug}`}
                                    key={service.id}
                                    className="group relative overflow-hidden rounded-2xl bg-white/80 shadow-lg hover:shadow-2xl transition-all duration-500 backdrop-blur-sm dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 hover:-translate-y-2"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    <div className="relative z-10 p-8 h-full flex flex-col">
                                        {/* Service Icon */}
                                        <div className="mb-6 flex justify-center">
                                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${serviceIcon.gradient} p-0.5 shadow-lg`}>
                                                <div className="w-full h-full rounded-2xl bg-white dark:bg-gray-800 flex items-center justify-center">
                                                    <span className="text-2xl">{serviceIcon.icon}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-grow text-center">
                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                                                {service.title}
                                            </h3>

                                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                                                {service.description}
                                            </p>

                                            {/* Key benefits */}
                                            {service.benefits && (
                                                <div className="mb-6">
                                                    <div className="flex flex-wrap gap-2 justify-center">
                                                        {service.benefits.slice(0, 3).map((benefit, idx) => (
                                                            <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 dark:from-blue-900/30 dark:to-purple-900/30 dark:text-blue-200">
                                                                {benefit.split(' ').slice(0, 2).join(' ')}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* CTA Button */}
                                        <div className="mt-auto">
                                            <div className="inline-flex w-full items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
                                                Learn More
                                                <svg className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                    {/* Why Choose Us Section */}
                    <div className="mt-24 mb-16">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Speeir</span>?
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                We combine technical expertise with business insight to deliver solutions that not only work but excel.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: "🎯",
                                    title: "Results-Driven",
                                    description: "Every project is focused on delivering measurable business outcomes and ROI."
                                },
                                {
                                    icon: "⚡",
                                    title: "Fast Delivery",
                                    description: "Agile development process ensures quick turnaround without compromising quality."
                                },
                                {
                                    icon: "🔒",
                                    title: "Secure & Reliable",
                                    description: "Built with security best practices and industry-standard protocols."
                                },
                                {
                                    icon: "🚀",
                                    title: "Scalable Solutions",
                                    description: "Architecture designed to grow with your business and handle increasing demands."
                                },
                                {
                                    icon: "👥",
                                    title: "Expert Team",
                                    description: "Skilled professionals with years of experience in cutting-edge technologies."
                                },
                                {
                                    icon: "💬",
                                    title: "24/7 Support",
                                    description: "Continuous support and maintenance to ensure your systems run smoothly."
                                }
                            ].map((feature, index) => (
                                <div key={index} className="text-center p-6 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30 hover:shadow-lg transition-all duration-300">
                                    <div className="text-4xl mb-4">{feature.icon}</div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="mt-24 text-center">
                        <div className="max-w-3xl mx-auto p-12 rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-gray-200/50 dark:border-gray-700/50">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                Ready to Transform Your Business?
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                                Let's discuss how our services can help you achieve your goals and drive growth.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                                >
                                    Get Started Today
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                    </svg>
                                </Link>
                                <Link
                                    href="/about"
                                    className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                                >
                                    Learn More About Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ServicesPage;