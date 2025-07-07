"use client";

import { useEffect, useState } from "react";
import SingleBlog from "@/components/Blog/SingleBlog";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { BlogPost } from "@/types/post";

const Blog = () => {
  const [blogData, setBlogData] = useState<BlogPost[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        // Remove cache busting - let HTTP caching work properly
        const res = await fetch('/api/blog', {
          headers: {
            'Cache-Control': 'max-age=300' // 5 minutes cache
          }
        });

        if (!res.ok || !res.headers.get("content-type")?.includes("application/json")) {
          throw new Error(`Failed to fetch blog data: ${res.status} ${res.statusText}`);
        }

        const json = await res.json();
        setBlogData(json.data || []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs. Please try again later/Reload Page.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <Breadcrumb
        pageName="Blog Page"
        description="Speeir Blogs"
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
                📚 Our Blog
              </span>
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Latest Insights & Updates
              </span>
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Discover the latest trends, insights, and best practices in software development, technology, and innovation.
            </p>
          </div>

          {isLoading ? (
            <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin">
                  <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-xl font-medium text-gray-600 dark:text-gray-300">Loading blogs</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Please wait while we fetch the latest content</p>
              </div>
            </div>
          ) : error ? (
            <div className="min-h-[400px] flex items-center justify-center">
              <div className="max-w-md mx-auto text-center p-8 rounded-2xl bg-white/80 shadow-xl backdrop-blur-sm dark:bg-gray-900/90">
                <div className="mb-6">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/20">
                    <svg className="h-8 w-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Unable to load blogs</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogData.map((blog) => (
                <div
                  key={blog._id.toString()}
                  className="group relative overflow-hidden rounded-2xl bg-white/80 shadow-lg hover:shadow-2xl transition-all duration-500 backdrop-blur-sm dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 hover:-translate-y-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <SingleBlog post={blog} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;