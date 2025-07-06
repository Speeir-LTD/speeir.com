"use client"

import { useState, useEffect } from "react";

const Contact = () => {
  // Add these new state variables to your existing ones
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  // Your existing state variables remain the same...
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHoveringForm, setIsHoveringForm] = useState(false);

  // MODIFY your existing first useEffect to include cursor tracking:
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
      
      // ADD form area detection
      const formContainer = document.querySelector('#contact .rounded-xl');
      const cursor = document.querySelector('.cursor-dot') as HTMLElement;
      
      if (cursor && formContainer) {
        const formRect = formContainer.getBoundingClientRect();
        const isOverForm = (
          e.clientX >= formRect.left &&
          e.clientX <= formRect.right &&
          e.clientY >= formRect.top &&
          e.clientY <= formRect.bottom
        );
        
        if (isOverForm) {
          // Show beautiful cursor over form
          cursor.style.display = 'block';
          cursor.style.left = e.clientX + 'px';
          cursor.style.top = e.clientY + 'px';
        } else {
          // Hide cursor outside form
          cursor.style.display = 'none';
        }
      }
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // ADD THESE FUNCTIONS for interactive elements
    const handleMouseEnter = () => setIsHoveringInteractive(true);
    const handleMouseLeave = () => setIsHoveringInteractive(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ADD THESE LINES for interactive element detection
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      // ADD CLEANUP
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);



  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Check if the contact section is in viewport
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        setIsVisible(isInView);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Beautiful cursor - only shows over form */}
      <div 
        className="cursor-dot"
        style={{
          background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
          width: '12px',
          height: '12px',
          boxShadow: `
            0 0 15px rgba(59, 130, 246, 0.8),
            0 0 25px rgba(59, 130, 246, 0.6),
            0 0 35px rgba(59, 130, 246, 0.4)
          `,
          border: '2px solid rgba(255, 255, 255, 0.3)',
          display: 'none', /* Initially hidden */
        }}
      ></div>
      
      <section
        id="contact"
        className="relative overflow-hidden py-16 md:py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-900/90"
      >
        {/* Subtle background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-5 dark:opacity-10">
          <div
            className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-400 animate-[float_8s_ease-in-out_infinite]"
            style={{
              transform: `translateY(${scrollY * 0.02}px)`,
            }}
          ></div>
          <div
            className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-purple-400 animate-[float_10s_ease-in-out_infinite_reverse]"
            style={{
              transform: `translateY(${scrollY * -0.015}px)`,
            }}
          ></div>
        </div>
        {/* ADD ULTRA PREMIUM ELEMENTS HERE */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Cursor-following spotlight */}
          <div
            className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl transition-all duration-300 ease-out"
            style={{
              left: `${mousePosition.x}%`,
              top: `${mousePosition.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />
          {/* Floating geometric shapes */}
          <div className="absolute top-20 right-20 w-16 h-16 rotate-45 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 backdrop-blur-sm animate-[float_7s_ease-in-out_infinite]" />
          <div className="absolute bottom-32 left-16 w-12 h-12 rounded-full bg-gradient-to-br from-pink-400/20 to-rose-500/20 backdrop-blur-sm animate-[float_9s_ease-in-out_infinite_reverse]" />

          {/* Animated particles */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/40 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Subtle parallax background layer
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-0 opacity-3 dark:opacity-5"
            style={{
              transform: `translateY(${scrollY * 0.03}px)`,
            }}
          >
            <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 blur-3xl"></div>
          </div>
        </div> */}

        <div className="container relative z-10">
          <div className="flex justify-center">
            <div className="w-full max-w-3xl px-4">
              <div
                className="mb-12 rounded-xl bg-white/80 px-8 py-11 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:bg-gray-800/80 dark:hover:shadow-gray-900/50 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px] text-center relative overflow-hidden group"
                style={{
                  transform: `translateY(${scrollY * 0.01}px)`,
                  opacity: isVisible ? 1 : 0.9,
                }}
              >
                {/* Subtle accent border */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100"></div>

                {/* Subtle corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 -mt-8 -mr-8 rounded-full bg-gradient-to-br from-blue-500/5 to-purple-500/5 blur-xl"></div>

                {/* Header with subtle parallax */}
                <div
                  className="mx-auto max-w-2xl mb-12"
                  style={{
                    transform: `translateY(${scrollY * 0.005}px)`,
                  }}
                >
                  <div className="inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full mb-6">
                    <span className="text-sm font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
                      Premium Services
                    </span>
                  </div>

                  <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                    <span className="relative inline-block">
                      <span className="relative z-10">Need Help?</span>
                      <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-blue-500 to-purple-600"></span>
                    </span>
                    <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Open a Ticket
                    </span>
                  </h2>

                  <p className="mb-12 text-base font-medium text-body-color dark:text-gray-300">
                    Our support team will get back to you ASAP via email.
                  </p>
                </div>

                {/* Enhanced form with subtle effects */}
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div
                        className="group"
                        style={{
                          transform: `translateY(${scrollY * 0.003}px)`,
                          opacity: isVisible ? 1 : 0.9,
                        }}
                      >
                        <label htmlFor="name" className="mb-3 block text-sm font-medium text-dark dark:text-white text-left">
                          Your Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          required
                          className="w-full rounded-lg border-0 bg-white/90 px-6 py-3 text-base text-body-color shadow-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-primary dark:bg-gray-700/90 dark:text-body-color-dark dark:focus:ring-purple-500 focus:shadow-lg hover:shadow-md"
                        />
                      </div>

                      <div
                        className="group"
                        style={{
                          transform: `translateY(${scrollY * 0.004}px)`,
                          opacity: isVisible ? 1 : 0.9,
                          transitionDelay: '50ms',
                        }}
                      >
                        <label htmlFor="email" className="mb-3 block text-sm font-medium text-dark dark:text-white text-left">
                          Your Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          required
                          className="w-full rounded-lg border-0 bg-white/90 px-6 py-3 text-base text-body-color shadow-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-primary dark:bg-gray-700/90 dark:text-body-color-dark dark:focus:ring-purple-500 focus:shadow-lg hover:shadow-md"
                        />
                      </div>
                    </div>

                    <div
                      className="group"
                      style={{
                        transform: `translateY(${scrollY * 0.005}px)`,
                        opacity: isVisible ? 1 : 0.9,
                        transitionDelay: '100ms',
                      }}
                    >
                      <label htmlFor="message" className="mb-3 block text-sm font-medium text-dark dark:text-white text-left">
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        id="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Enter your Message"
                        required
                        className="w-full resize-none rounded-lg border-0 bg-white/90 px-6 py-3 text-base text-body-color shadow-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-primary dark:bg-gray-700/90 dark:text-body-color-dark dark:focus:ring-purple-500 focus:shadow-lg hover:shadow-md"
                      ></textarea>
                    </div>

                    <div className="pt-2">
                      {/* Status messages */}
                      {submitStatus === 'success' && (
                        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg animate-[fadeInUp_0.5s_ease-out]">
                          Message sent successfully! Check your email for confirmation.
                        </div>
                      )}
                      {submitStatus === 'error' && (
                        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg animate-[fadeInUp_0.5s_ease-out]">
                          Error sending message. Please try again.
                        </div>
                      )}

                      {/* Submit button with subtle effects */}
                      <div
                        className="flex justify-center"
                        style={{
                          transform: `translateY(${scrollY * 0.003}px)`,
                          transitionDelay: '150ms',
                        }}
                      >
                        <div className="relative inline-flex group">
                          <div className="absolute transition-all duration-500 opacity-70 -inset-px bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200"></div>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="relative inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white transition-all duration-200 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full md:w-auto disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-lg"
                          >
                            <span className="relative z-10">
                              {isSubmitting ? 'Sending...' : 'Submit Ticket'}
                            </span>
                            <svg className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle floating elements */}
        <div className="absolute bottom-0 left-0 right-0 hidden h-40 md:block">
          <div className="relative h-full w-full">
            <div
              className="absolute left-[10%] bottom-0 h-24 w-24 animate-[float_6s_ease-in-out_infinite] rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 shadow-lg backdrop-blur-sm"
              style={{
                transform: `translateY(${scrollY * -0.05}px)`,
              }}
            ></div>
            <div
              className="absolute right-[10%] bottom-10 h-16 w-16 animate-[float_8s_ease-in-out_infinite_reverse] rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 shadow-lg backdrop-blur-sm"
              style={{
                transform: `translateY(${scrollY * -0.03}px)`,
              }}
            ></div>
          </div>
        </div>

        {/* Subtle ambient lighting */}
        <div
          className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500/3 via-purple-500/3 to-pink-500/3 blur-3xl pointer-events-none"
          style={{
            transform: `translate(-50%, -50%) scale(${1 + scrollY * 0.0002})`,
          }}
        ></div>

        {/* Subtle mesh gradient overlay */}
        <div
          className="absolute inset-0 opacity-10 dark:opacity-5 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${50 + Math.sin(scrollY * 0.005) * 5}% ${50 + Math.cos(scrollY * 0.005) * 5}%, rgba(59, 130, 246, 0.05) 0%, transparent 50%), radial-gradient(circle at ${30 + Math.cos(scrollY * 0.004) * 8}% ${70 + Math.sin(scrollY * 0.004) * 8}%, rgba(147, 51, 234, 0.03) 0%, transparent 50%)`,
          }}
        ></div>

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-3 dark:opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.15) 1px, transparent 0)`,
            backgroundSize: `${25 + Math.sin(scrollY * 0.005) * 2}px ${25 + Math.sin(scrollY * 0.005) * 2}px`,
            transform: `translateX(${scrollY * 0.02}px) translateY(${scrollY * 0.01}px)`,
          }}
        ></div>

        {/* Subtle spotlight effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(400px circle at 50% ${Math.max(0, Math.min(100, (scrollY - 300) * 0.05))}%, rgba(59, 130, 246, 0.02), transparent 40%)`,
          }}
        ></div>

        {/* Subtle glow effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute w-24 h-24 rounded-full bg-blue-500/5 blur-2xl"
            style={{
              top: `${25 + Math.sin(scrollY * 0.003) * 5}%`,
              left: `${15 + Math.cos(scrollY * 0.002) * 3}%`,
              transform: `scale(${1 + Math.sin(scrollY * 0.005) * 0.1})`,
            }}
          ></div>
          <div
            className="absolute w-32 h-32 rounded-full bg-purple-500/4 blur-2xl"
            style={{
              top: `${65 + Math.cos(scrollY * 0.002) * 8}%`,
              right: `${20 + Math.sin(scrollY * 0.003) * 4}%`,
              transform: `scale(${1 + Math.cos(scrollY * 0.004) * 0.08})`,
            }}
          ></div>
        </div>

        {/* Subtle floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-blue-400/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                transform: `translateY(${scrollY * (0.01 + Math.random() * 0.01)}px)`,
              }}
            ></div>
          ))}
        </div>

        {/* Subtle depth shadow */}
        <div
          className="absolute inset-0 bg-gradient-radial from-transparent via-gray-900/1 to-transparent dark:via-gray-100/0.5 pointer-events-none"
          style={{
            transform: `scale(${1 + Math.sin(scrollY * 0.002) * 0.02})`,
          }}
        ></div>
      </section>
    </>
  );
};

export default Contact;
