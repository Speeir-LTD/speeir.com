import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="relative max-w-2xl w-full">
        {/* Floating glassmorphic elements */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl opacity-70 animate-pulse"></div>
        
        {/* Main card */}
        <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20 dark:border-gray-700/30 p-10">
          
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
              Page Not Found
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved.
            </p>
            
            {/* Return home button */}
            <Link 
              href="/"
              className="inline-flex items-center justify-center px-8 py-3 font-medium text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
            >
              <span className="flex items-center">
                Return Home
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
