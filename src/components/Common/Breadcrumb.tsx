import Link from "next/link";

const Breadcrumb = ({
  pageName,
  description,
}: {
  pageName: string;
  description: string;
}) => {
  return (
    <section className="relative z-10 overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-900/90">
      <div className="container px-5 mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
          {/* Content Section */}
          <div className="w-full lg:w-7/12 space-y-6">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center space-x-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              <Link href="/" className="hover:text-primary transition-colors duration-300">
                Home
              </Link>
              <span className="block h-2 w-2 rotate-45 border-r-2 border-t-2 border-current opacity-60"></span>
              <span className="text-primary font-semibold">{pageName}</span>
            </div>
            
            {/* Page Title */}
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight">
              {pageName}
              <span className="block h-1 w-20 bg-gradient-to-r from-primary to-secondary mt-4"></span>
            </h1>
            
            {/* Description with beautiful typography */}
            <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300">
              <p className="leading-relaxed tracking-wide">
                {description}
              </p>
            </div>
          </div>

          {/* Decorative Graphic (Right Side) */}
          <div className="hidden lg:block w-5/12 relative">
            <div className="absolute -right-10 -top-10 w-full h-full">
              <div className="relative w-full h-full">
                {/* Abstract shape */}
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
                {/* Floating dots pattern */}
                <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2 grid grid-cols-3 gap-4">
                  {[...Array(9)].map((_, i) => (
                    <div 
                      key={i}
                      className="w-3 h-3 rounded-full bg-primary opacity-20"
                      style={{
                        animation: `float 3s ease-in-out ${i * 0.2}s infinite alternate`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-20 dark:opacity-10">
        {/* Animated gradient mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>
        
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-primary/10"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.5}s`
            }}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Breadcrumb;