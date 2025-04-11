import SingleBlog from "@/components/Blog/SingleBlog";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Page | Speeir",
  description: "We craft fast, beautiful websites and powerful mobile apps.",
};

const Blog = async () => {
  const baseUrl = process.env.BASE_URL || "https://speeir.com";
  console.log("Fetching blogs from:", `${baseUrl}/api/blog`); // Log the API URL

  if (!baseUrl) {
    console.error("BASE_URL is not defined.");
    return (
      <>
        <Breadcrumb
          pageName="Blog Page"
          description="Speeir Blogs"
        />
        <section className="min-h-screen flex items-center justify-center">
          <p className="text-center text-gray-500 dark:text-gray-400">
            Configuration error: BASE_URL is not set.
          </p>
        </section>
      </>
    );
  }

  const res = await fetch(`${baseUrl}/api/blog`);

  if (!res.ok || !res.headers.get("content-type")?.includes("application/json")) {
    console.error("Failed to fetch blog data:", res.statusText);
    return (
      <>
        <Breadcrumb
          pageName="Blog Page"
          description="Speeir Blogs"
        />
        <section className="min-h-screen flex items-center justify-center">
          <p className="text-center text-gray-500 dark:text-gray-400">
            Failed to load blogs. Please try again later.
          </p>
        </section>
      </>
    );
  }

  let blogData;
  try {
    const json = await res.json();
    blogData = json.data;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return (
      <>
        <Breadcrumb
          pageName="Blog Page"
          description="Speeir Blogs"
        />
        <section className="min-h-screen flex items-center justify-center">
          <p className="text-center text-gray-500 dark:text-gray-400">
            Failed to load blogs. Please try again later.
          </p>
        </section>
      </>
    );
  }

  return (
    <>
      <Breadcrumb
        pageName="Blog Page"
        description="Speeir Blogs"
      />

      <section className="relative min-h-screen overflow-hidden bg-white dark:bg-gray-900">
        {/* Subtle background texture */}
        <div className="absolute inset-0 bg-[url('/images/blog/texture.png')] opacity-5 dark:opacity-10"></div>
        
        {/* Premium Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large floating circles */}
          <div className="absolute left-[5%] top-[15%] h-60 w-60 animate-[float_12s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-blue-50/50 to-purple-50/50 blur-[80px] dark:from-blue-900/20 dark:to-purple-900/20"></div>
          <div className="absolute right-[5%] bottom-[15%] h-64 w-64 animate-[float_14s_ease-in-out_infinite_reverse] rounded-full bg-gradient-to-r from-green-50/50 to-teal-50/50 blur-[80px] dark:from-green-900/20 dark:to-teal-900/20"></div>
          
          {/* Medium floating elements */}
          <div className="absolute left-[15%] top-[60%] h-40 w-40 animate-[float_10s_ease-in-out_infinite] rounded-full bg-amber-50/40 blur-[60px] dark:bg-amber-900/15"></div>
          <div className="absolute right-[20%] top-[30%] h-32 w-32 animate-[float_8s_ease-in-out_infinite_reverse] rounded-full bg-rose-50/40 blur-[50px] dark:bg-rose-900/15"></div>
          
          {/* Small floating dots */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gray-300/30 dark:bg-gray-600/30"
              style={{
                width: `${Math.random() * 12 + 4}px`,
                height: `${Math.random() * 12 + 4}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 15 + 10}s ease-in-out infinite alternate`,
                animationDelay: `${i * 0.5}s`
              }}
            ></div>
          ))}
        </div>

        <div className="container relative z-10 py-12">
          <div className="-mx-4 flex flex-wrap justify-center gap-8">
            {blogData.map((blog: any) => (
              <div
                key={blog._id}
                className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
              >
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white/80 shadow-sm transition-all hover:shadow-md backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80">
                  <SingleBlog post={blog} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;