import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Premium Next.js Template",
  description: "The page you're looking for doesn't exist or has been moved.",
};

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="relative max-w-2xl w-full">
        {/* Floating glassmorphic elements */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl opacity-70 animate-float"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl opacity-70 animate-float-delay"></div>
        
        {/* Main card */}
        <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20 dark:border-gray-700/30 p-10">
          {/* Glow effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-purple-500/20 to-transparent opacity-30"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 text-center">
            {/* Animated 404 */}
            <div className="mb-8 relative inline-block">
              <span className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                404
              </span>
              <div className="absolute -bottom-2 left-0 right-0 mx-auto w-3/4 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-80"></div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Lost in the Digital Space
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
              The page you're looking for has either moved, been deleted, or never existed. Let's get you back on track.
            </p>
            
            {/* Animated button */}
            <Link 
              href="/"
              className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white transition-all duration-300 rounded-xl group bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
            >
              <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-purple-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
              </span>
              <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 bg-blue-600 rounded opacity-30 group-hover:mb-12 group-hover:translate-y-8"></span>
              <span className="relative w-full text-center font-semibold transition-colors duration-200 ease-in-out flex items-center">
                Return Home
                <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
            </Link>
            
            {/* Decorative elements */}
            <div className="mt-12 flex justify-center space-x-6 opacity-60">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-100"></div>
              <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse delay-200"></div>
            </div>
          </div>
        </div>
        
        {/* Floating grid pattern */}
        <div className="absolute inset-0 overflow-hidden -z-10 opacity-20 dark:opacity-10">
          <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark"></div>
        </div>
      </div>
      
      
    </div>
  );
};

export default ErrorPage;