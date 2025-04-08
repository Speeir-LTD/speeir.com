"use client"

import { useState } from "react";

const Contact = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
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
    <section
      id="contact"
      className="relative overflow-hidden py-16 md:py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-900/90"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-400 animate-[float_8s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-purple-400 animate-[float_10s_ease-in-out_infinite_reverse]"></div>
      </div>

      <div className="container relative z-10">
        <div className="flex justify-center">
          <div className="w-full max-w-3xl px-4"> {/* Centered container with max-width */}
            <div className="mb-12 rounded-xl bg-white/80 px-8 py-11 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:bg-gray-800/80 dark:hover:shadow-gray-900/50 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px] text-center"> {/* Added text-center */}

              {/* Centered heading */}
              <div className="mx-auto max-w-2xl">
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

              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
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
                        className="w-full rounded-lg border-0 bg-white/90 px-6 py-3 text-base text-body-color shadow-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-primary dark:bg-gray-700/90 dark:text-body-color-dark dark:focus:ring-purple-500"
                      />
                    </div>
                    <div>
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
                        className="w-full rounded-lg border-0 bg-white/90 px-6 py-3 text-base text-body-color shadow-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-primary dark:bg-gray-700/90 dark:text-body-color-dark dark:focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  <div>
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
                      className="w-full resize-none rounded-lg border-0 bg-white/90 px-6 py-3 text-base text-body-color shadow-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-primary dark:bg-gray-700/90 dark:text-body-color-dark dark:focus:ring-purple-500"
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    {submitStatus === 'success' && (
                      <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
                        Message sent successfully! Check your email for confirmation.
                      </div>
                    )}
                    {submitStatus === 'error' && (
                      <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                        Error sending message. Please try again.
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative mx-auto overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-9 py-4 text-base font-medium text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:from-blue-700 hover:to-purple-700 w-full md:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10">
                        {isSubmitting ? 'Sending...' : 'Submit Ticket'}
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                    </button>
                  </div>
                </div>
              </form>
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
  );
};

export default Contact;