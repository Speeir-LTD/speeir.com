"use client";

import { useEffect, useState } from "react";
import SharePost from "@/components/Blog/SharePost";
import TagButton from "@/components/Blog/TagButton";
import Image from "next/image";
import { BlogPost } from "@/types/post";
// import { formatDate } from "@/utils/formatDate";

const BlogDetailsPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [blogDetails, setBlogDetails] = useState<BlogPost | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/blog/${id}`);
        
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Blog post not found");
          }
          throw new Error(`Failed to fetch: ${res.statusText}`);
        }

        const { data } = await res.json();
        if (!data) throw new Error("No data received");
        
        setBlogDetails(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchBlogDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container py-20 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
        <p className="mt-4">Loading blog post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-20 text-center">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 rounded bg-primary px-4 py-2 text-white"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!blogDetails) {
    return (
      <div className="container py-20 text-center">
        <p>No blog post data available</p>
      </div>
    );
  }

//   const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric'
//   });

  return (
    <section className="pb-[120px] pt-[150px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4 lg:w-8/12">
            <div>
              <h1 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
                {blogDetails.title}
              </h1>
              
              <div className="mb-10 flex flex-wrap items-center justify-between border-b border-body-color border-opacity-10 pb-4 dark:border-white dark:border-opacity-10">
                <div className="flex flex-wrap items-center">
                  <div className="mb-5 mr-10 flex items-center">
                    <div className="mr-4">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full">
                        <Image
                          src="/images/blog/author-02.png"
                          alt={blogDetails.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <span className="mb-1 text-base font-medium text-body-color">
                        By <span className="text-primary">{blogDetails.author}</span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-5 flex items-center">
                    <p className="mr-5 flex items-center text-base font-medium text-body-color">
                      {/* {formatDate(blogDetails.createdAt)} */}
                    </p>
                    <p className="mr-5 flex items-center text-base font-medium text-body-color">
                      {blogDetails.views} Views
                    </p>
                  </div>
                </div>
                
                <div className="mb-5">
                  {blogDetails.tags?.length > 0 && (
                    <span className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white">
                      {blogDetails.tags[0]}
                    </span>
                  )}
                </div>
              </div>
              
              <div>
                <div className="prose max-w-none dark:prose-invert">
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    {blogDetails.content}
                  </p>
                  
                  {/* {blogDetails.image && (
                    <div className="mb-10 w-full overflow-hidden rounded">
                      <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                        <Image
                          src={blogDetails.image}
                          alt={blogDetails.title}
                          fill
                          className="object-cover object-center"
                          priority
                        />
                      </div>
                    </div>
                  )} */}
                </div>
                
                <div className="items-center justify-between sm:flex">
                  {blogDetails.tags?.length > 0 && (
                    <div className="mb-5">
                      <h4 className="mb-3 text-sm font-medium text-body-color">
                        Tags:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {blogDetails.tags.map((tag) => (
                          <TagButton key={tag} text={tag} />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-5">
                    <h5 className="mb-3 text-sm font-medium text-body-color sm:text-right">
                      Share this post:
                    </h5>
                    <div className="flex items-center sm:justify-end">
                      <SharePost 
                        // title={blogDetails}
                        // url={`/blog/${id}`} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsPage;