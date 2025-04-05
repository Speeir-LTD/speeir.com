import Link from "next/link";

const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-900/90 min-h-screen flex items-center pb-16 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-[-1] overflow-hidden">
          {/* Gradient Mesh Background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20"></div>
          
          {/* Floating Particles */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="particle absolute rounded-full"
              style={{
                width: `${3 + Math.random() * 5}px`,
                height: `${3 + Math.random() * 5}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: `rgba(${
                  Math.random() > 0.5 ? "74, 108, 247" : "159, 122, 234"
                }, ${0.3 + Math.random() * 0.3})`,
              }}
            ></div>
          ))}

          {/* Floating Blobs */}
          <div className="absolute right-0 top-0 opacity-20 dark:opacity-30">
            <div className="relative h-[600px] w-[600px]">
              <div className="absolute right-0 top-0 h-[400px] w-[400px] animate-[float_8s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-30 blur-[80px]"></div>
              <div className="absolute right-20 top-40 h-[300px] w-[300px] animate-[float_6s_ease-in-out_infinite_reverse] rounded-full bg-gradient-to-r from-pink-500 to-rose-500 opacity-20 blur-[60px]"></div>
            </div>
          </div>
        </div>

        <div className="container flex items-center justify-center min-h-[calc(100vh-120px)]">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[800px] text-center">
                {/* Animated Title */}
                <h1
                  className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight"
                >
                  <span className="relative inline-block">
                    <span className="relative z-10">
                    Speeir LTD
                    </span>
                    <span className="absolute -bottom-1 left-0 h-2 w-full animate-[underline_3s_ease-in-out_infinite] bg-gradient-to-r from-blue-500 to-purple-600 opacity-80"></span>
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Web & Mobile Solutions for Modern Businesses
                  </span>
                </h1>

                {/* Animated Subtitle */}
                <p
                  className="mb-12 text-base !leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg md:text-xl"
                >
                  We craft fast, beautiful websites and powerful mobile apps that put your customers first. 
                  Whether you need a startup launchpad or enterprise-grade SaaS, 
                  we build digital experiences that convert and grow.  
                  <br />
                  
                </p>

                {/* Animated CTA Buttons */}
                <div
                  className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
                >
                  <Link
                    href="#"
                    className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20"
                  >
                    <span className="relative z-10">Lets Chat 👋</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                  </Link>
                 
                </div>

               
              </div>
            </div>
          </div>
        </div>

        {/* Floating Components */}
        <div className="absolute bottom-0 left-0 right-0 hidden h-40 md:block">
          <div className="relative h-full w-full">
            <div className="absolute left-[10%] bottom-0 h-24 w-24 animate-[float_6s_ease-in-out_infinite] rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 shadow-lg backdrop-blur-sm"></div>
            <div className="absolute left-[30%] bottom-10 h-16 w-16 animate-[float_8s_ease-in-out_infinite_reverse] rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 shadow-lg backdrop-blur-sm"></div>
            <div className="absolute right-[20%] bottom-5 h-20 w-20 animate-[float_7s_ease-in-out_infinite] rounded-2xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 shadow-lg backdrop-blur-sm"></div>
          </div>
        </div>

      </section>
    </>
  );
};

export default Hero;