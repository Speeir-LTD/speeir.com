"use client";

import { useEffect, useState } from "react";
import SharePost from "@/components/Blog/SharePost";
import TagButton from "@/components/Blog/TagButton";
import Image from "next/image";
import { BlogPost } from "@/types/post";
import ReactMarkdown from "react-markdown";

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
            <div className="container flex min-h-screen items-center justify-center py-20 text-center">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                <p className="mt-4 text-lg font-medium text-gray-600 dark:text-gray-400">Loading blog post...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container flex min-h-screen items-center justify-center py-20 text-center">
                <div className="max-w-md rounded-xl bg-white p-8 shadow-lg dark:bg-gray-900">
                    <p className="mb-4 text-lg font-medium text-red-500">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="rounded-lg bg-primary px-6 py-3 font-medium text-white transition-all hover:bg-primary/90"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!blogDetails) {
        return (
            <div className="container flex min-h-screen items-center justify-center py-20 text-center">
                <div className="max-w-md rounded-xl bg-white p-8 shadow-lg dark:bg-gray-900">
                    <p className="text-lg font-medium text-gray-600 dark:text-gray-400">No blog post data available</p>
                </div>
            </div>
        );
    }

    return (
        <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 pb-[120px] pt-[150px] dark:from-gray-900 dark:to-gray-800">
            {/* Floating background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute left-[5%] top-[20%] h-32 w-32 animate-[float_8s_ease-in-out_infinite] rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 shadow-lg backdrop-blur-sm"></div>
                <div className="absolute right-[5%] top-[40%] h-24 w-24 animate-[float_10s_ease-in-out_infinite_reverse] rounded-full bg-gradient-to-br from-pink-500/10 to-rose-500/10 shadow-lg backdrop-blur-sm"></div>
                <div className="absolute left-[15%] bottom-[15%] h-20 w-20 animate-[float_12s_ease-in-out_infinite] rounded-full bg-gradient-to-br from-emerald-500/10 to-teal-500/10 shadow-lg backdrop-blur-sm"></div>
                <div className="absolute right-[15%] bottom-[25%] h-28 w-28 animate-[float_9s_ease-in-out_infinite_reverse] rounded-full bg-gradient-to-br from-amber-500/10 to-yellow-500/10 shadow-lg backdrop-blur-sm"></div>
            </div>

            <div className="container relative z-10">
                <div className="-mx-4 flex flex-wrap justify-center">
                    <div className="w-full px-4 lg:w-10/12 xl:w-8/12">
                        <div className="rounded-2xl bg-white/80 p-10 shadow-xl backdrop-blur-sm dark:bg-gray-900/90 dark:shadow-gray-800/10">
                            <h1 className="mb-8 text-4xl font-bold leading-tight text-black dark:text-white sm:text-5xl sm:leading-tight">
                                {blogDetails.title}
                            </h1>

                            <div className="mb-10 flex flex-wrap items-center justify-between border-b border-gray-200 pb-6 dark:border-gray-700">
                                <div className="flex flex-wrap items-center">
                                    <div className="mb-5 mr-10 flex items-center">
                                        <div className="mr-4">
                                            <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow-md">
                                                <Image
                                                    src="/images/blog/author-02.png"
                                                    alt={blogDetails.author}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <span className="text-base font-medium text-gray-600 dark:text-gray-300">
                                                By <span className="font-semibold text-primary">{blogDetails.author}</span>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mb-5 flex items-center space-x-4">
                                        <p className="flex items-center text-base font-medium text-gray-500 dark:text-gray-400">
                                            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            {/* {formatDate(blogDetails.createdAt)} */}
                                        </p>
                                        <p className="flex items-center text-base font-medium text-gray-500 dark:text-gray-400">
                                            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                            </svg>
                                            {blogDetails.views} Views
                                        </p>
                                    </div>
                                </div>

                                <div className="mb-5">
                                    {blogDetails.tags?.length > 0 && (
                                        <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary/80 px-5 py-2 text-sm font-semibold text-white shadow-md">
                                            {blogDetails.tags[0]}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div>
                                <div className="prose max-w-none dark:prose-invert">
                                    <ReactMarkdown
                                        components={{
                                            p: ({ node, ...props }) => (
                                                <p
                                                    {...props}
                                                    className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300"
                                                />
                                            ),
                                            h1: ({ node, ...props }) => (
                                                <h1
                                                    {...props}
                                                    className="mb-6 text-3xl font-bold text-gray-900 dark:text-white"
                                                />
                                            ),
                                            h2: ({ node, ...props }) => (
                                                <h2
                                                    {...props}
                                                    className="mb-5 text-2xl font-bold text-gray-800 dark:text-gray-100 mt-10 pb-2 border-b border-gray-100 dark:border-gray-700"
                                                />
                                            ),
                                            h3: ({ node, ...props }) => (
                                                <h3
                                                    {...props}
                                                    className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100 mt-8"
                                                />
                                            ),
                                            ul: ({ node, ...props }) => (
                                                <ul
                                                    {...props}
                                                    className="mb-6 list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300"
                                                />
                                            ),
                                            ol: ({ node, ...props }) => (
                                                <ol
                                                    {...props}
                                                    className="mb-6 list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300"
                                                />
                                            ),
                                            li: ({ node, ...props }) => (
                                                <li
                                                    {...props}
                                                    className="text-lg leading-relaxed"
                                                />
                                            ),
                                            a: ({ node, ...props }) => (
                                                <a
                                                    {...props}
                                                    className="text-primary hover:underline font-medium"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                />
                                            ),
                                            code: ({ node, inline, ...props }: { node: any; inline?: boolean; [key: string]: any }) => (
                                                <code
                                                    {...props}
                                                    className={`${inline
                                                        ? "px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm"
                                                        : "block p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm my-4 overflow-x-auto"
                                                        }`}
                                                />
                                            ),
                                            blockquote: ({ node, ...props }) => (
                                                <blockquote
                                                    {...props}
                                                    className="border-l-4 border-primary pl-4 my-6 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-r-lg"
                                                />
                                            ),
                                            hr: ({ node, ...props }) => (
                                                <hr
                                                    {...props}
                                                    className="my-10 border-t border-gray-200 dark:border-gray-700"
                                                />
                                            ),
                                            strong: ({ node, ...props }) => (
                                                <strong
                                                    {...props}
                                                    className="font-bold text-gray-900 dark:text-white"
                                                />
                                            ),
                                            em: ({ node, ...props }) => (
                                                <em
                                                    {...props}
                                                    className="italic"
                                                />
                                            ),
                                            table: ({ node, ...props }) => (
                                                <div className="overflow-x-auto my-8 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                                                    <table
                                                        {...props}
                                                        className="w-full divide-y divide-gray-200 dark:divide-gray-700"
                                                    />
                                                </div>
                                            ),
                                            th: ({ node, ...props }) => (
                                                <th
                                                    {...props}
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-800"
                                                />
                                            ),
                                            td: ({ node, ...props }) => (
                                                <td
                                                    {...props}
                                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300"
                                                />
                                            ),
                                        }}
                                    >
                                        {blogDetails.content}
                                    </ReactMarkdown>
                                </div>

                                <div className="mt-12 items-center justify-between sm:flex">
                                    {blogDetails.tags?.length > 0 && (
                                        <div className="mb-5">
                                            <h4 className="mb-4 text-lg font-medium text-gray-700 dark:text-gray-300">
                                                Tags:
                                            </h4>
                                            <div className="flex flex-wrap gap-3">
                                                {blogDetails.tags.map((tag) => (
                                                    <TagButton key={tag} text={tag} />
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="mb-5">
                                        <h5 className="mb-4 text-lg font-medium text-gray-700 dark:text-gray-300 sm:text-right">
                                            Share this post:
                                        </h5>
                                        <div className="flex items-center sm:justify-end">
                                            <SharePost />
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