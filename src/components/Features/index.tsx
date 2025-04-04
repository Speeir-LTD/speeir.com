import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <>
      <section
        id="features"
        className="relative py-16 md:py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50/20 dark:from-gray-900 dark:to-gray-900/70 overflow-hidden"
      >
        {/* Background animation */}
        <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-20">
          <div className="absolute top-0 left-1/4 w-32 h-32 rounded-full bg-blue-400 animate-float1"></div>
          <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-purple-400 animate-float2"></div>
        </div>

        <div className="container relative z-10">
          <SectionTitle
            title="Main Features"
            paragraph="Discover powerful features designed to elevate your experience."
            center
          />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature) => (
              <div
                key={feature.id}
                className="group relative w-full transform transition-all duration-300 hover:-translate-y-1 rounded-lg p-[2px] overflow-hidden"
              >
                {/* Gradient Border */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Moving Light */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-white/80 animate-[borderLight_4s_linear_infinite]"></div>

                {/* Card Content */}
                <div className="relative rounded-lg bg-white p-8 shadow-md dark:bg-gray-800/90 backdrop-blur-sm">
                  <div className="absolute inset-0 rounded-lg bg-white dark:bg-gray-800 m-[1px]"></div>
                  <div className="relative z-10">
                    <SingleFeature feature={feature} />
                  </div>
                </div>
              </div>
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

export default Features;
