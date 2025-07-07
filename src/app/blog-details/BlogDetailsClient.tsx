"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import SharePost from "@/components/Blog/SharePost";
import TagButton from "@/components/Blog/TagButton";
import Image from "next/image";
import { BlogPost } from "@/types/post";
import ReactMarkdown from "react-markdown";
import { useSearchParams } from "next/navigation";
import Head from "next/head";

export default function BlogDetailsClient() {
    const [blogDetails, setBlogDetails] = useState<BlogPost | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchBlogDetails = useCallback(async (id: string | null) => {
        if (!id) {
            console.warn("No blog ID provided. Skipping fetch.");
            setError("Invalid blog ID");
            setIsLoading(false);
            return;
        }

        try {
            console.log("Fetching blog details for ID:", id);
            setIsLoading(true);
            const res = await fetch(`/api/blog/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                console.error(`Failed to fetch blog details. Status: ${res.status}`);
                if (res.status === 404) {
                    throw new Error("Blog post not found");
                }
                throw new Error(`Failed to fetch: ${res.statusText}`);
            }

            const json = await res.json();

            if (!json || !json.data) {
                console.error("No data received from the API.");
                throw new Error("No data received");
            }

            // Normalize response to handle both object and array formats
            const normalizedData = Array.isArray(json.data) ? json.data[0] : json.data;

            if (!normalizedData) {
                console.error("Normalized data is empty.");
                throw new Error("Invalid data format received");
            }

            setBlogDetails(normalizedData);
        } catch (err) {
            console.error("Error fetching blog details:", err);
            setError(err instanceof Error ? err.message : "An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <Suspense fallback={<LoadingFallback />}>
            <SearchParamsWrapper fetchBlogDetails={fetchBlogDetails} />
            {isLoading ? (
                <LoadingFallback />
            ) : error ? (
                <ErrorFallback error={error} />
            ) : blogDetails ? (
                <BlogContent blogDetails={blogDetails} />
            ) : null}
        </Suspense>
    );
}

const SearchParamsWrapper = ({ fetchBlogDetails }: { fetchBlogDetails: (id: string | null) => void }) => {
    const searchParams = useSearchParams();
    const id = searchParams?.get("id") || null;

    useEffect(() => {
        if (id) fetchBlogDetails(id);
    }, [id, fetchBlogDetails]);

    return null;
};

const LoadingFallback = () => (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-900/90">
        <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin">
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
            </div>
        </div>
        <div className="text-center">
            <p className="text-xl font-medium text-gray-600 dark:text-gray-300">Loading blog post...</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Please wait while we fetch the content</p>
        </div>
    </div>
);

const ErrorFallback = ({ error }: { error: string }) => (
    <div className="min-h-screen flex items-center justify-center py-20 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-900/90">
        <div className="max-w-md mx-auto text-center p-8 rounded-2xl bg-white/80 shadow-xl backdrop-blur-sm dark:bg-gray-900/90">
            <div className="mb-6">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/20">
                    <svg className="h-8 w-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Something went wrong</h2>
            <p className="text-lg font-medium text-red-500 mb-6">{error}</p>
            <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
                Try Again
            </button>
        </div>
    </div>
);

const BlogContent = ({ blogDetails }: { blogDetails: BlogPost }) => {
    const authorImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(blogDetails.author || 'Author')}&background=6366f1&color=fff&size=128`;
    
    const formatDate = (date: Date | string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <>
            <Head>
                <title>{blogDetails.title} | Speeir Blog</title>
                <meta name="description" content={blogDetails.content ? blogDetails.content.substring(0, 160).replace(/[#*`]/g, '').trim() + '...' : 'Read this insightful article from Speeir about software development and technology.'} />
                <meta property="og:title" content={blogDetails.title} />
                <meta property="og:description" content={blogDetails.content ? blogDetails.content.substring(0, 160).replace(/[#*`]/g, '').trim() + '...' : 'Read this insightful article from Speeir.'} />
                <meta property="og:type" content="article" />
                <meta property="article:author" content={blogDetails.author} />
                <meta property="article:published_time" content={new Date(blogDetails.createdAt).toISOString()} />
                {blogDetails.tags && blogDetails.tags.map((tag, index) => (
                    <meta key={index} property="article:tag" content={tag} />
                ))}
            </Head>
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

            <div className="container relative z-10 max-w-5xl mx-auto px-4">
                {/* Hero section */}
                <div className="mb-12 text-center">
                    <div className="mb-6">
                        <span className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
                            📖 Blog Article
                        </span>
                    </div>
                    <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            {blogDetails.title}
                        </span>
                    </h1>
                    
                    {/* Author and meta info */}
                    <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-8 sm:space-y-0">
                        <div className="flex items-center space-x-3">
                            <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow-lg">
                                <Image
                                    src={authorImage}
                                    alt={blogDetails.author}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="text-left">
                                <p className="font-semibold text-gray-900 dark:text-white">{blogDetails.author}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Author</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center space-x-2">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span>{formatDate(blogDetails.createdAt)}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                </svg>
                                <span>{blogDetails.views || 0} views</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Tags */}
                    {blogDetails.tags?.length > 0 && (
                        <div className="mt-6 flex flex-wrap justify-center gap-2">
                            {blogDetails.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="mx-auto max-w-4xl">
                    <div className="rounded-2xl bg-white/80 p-8 shadow-xl backdrop-blur-sm dark:bg-gray-900/90 lg:p-12">
                        <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:rounded prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:text-sm dark:prose-code:bg-gray-800">
                            <ReactMarkdown
                                components={{
                                    p: ({ node, ...props }) => (
                                        <p {...props} className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300" />
                                    ),
                                    h1: ({ node, ...props }) => (
                                        <h1 {...props} className="mb-6 text-3xl font-bold text-gray-900 dark:text-white" />
                                    ),
                                    h2: ({ node, ...props }) => (
                                        <h2 {...props} className="mb-5 text-2xl font-bold text-gray-800 dark:text-gray-100 mt-10 pb-2 border-b border-gray-100 dark:border-gray-700" />
                                    ),
                                    h3: ({ node, ...props }) => (
                                        <h3 {...props} className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100 mt-8" />
                                    ),
                                    ul: ({ node, ...props }) => (
                                        <ul {...props} className="mb-6 list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300" />
                                    ),
                                    ol: ({ node, ...props }) => (
                                        <ol {...props} className="mb-6 list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300" />
                                    ),
                                    li: ({ node, ...props }) => (
                                        <li {...props} className="text-lg leading-relaxed" />
                                    ),
                                    a: ({ node, ...props }) => (
                                        <a {...props} className="text-blue-600 hover:underline font-medium" target="_blank" rel="noopener noreferrer" />
                                    ),
                                    code: ({ node, inline, ...props }: { node: any; inline?: boolean; [key: string]: any }) => (
                                        <code
                                            {...props}
                                            className={inline ? "px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm" : "block p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm my-4 overflow-x-auto"}
                                        />
                                    ),
                                    blockquote: ({ node, ...props }) => (
                                        <blockquote {...props} className="border-l-4 border-blue-600 pl-4 my-6 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-r-lg" />
                                    ),
                                    hr: ({ node, ...props }) => (
                                        <hr {...props} className="my-10 border-t border-gray-200 dark:border-gray-700" />
                                    ),
                                    strong: ({ node, ...props }) => (
                                        <strong {...props} className="font-bold text-gray-900 dark:text-white" />
                                    ),
                                    em: ({ node, ...props }) => (
                                        <em {...props} className="italic" />
                                    ),
                                }}
                            >
                                {blogDetails.content}
                            </ReactMarkdown>
                        </div>

                        {/* Footer with tags and share */}
                        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                                {Array.isArray(blogDetails.tags) && blogDetails.tags.length > 0 && (
                                    <div>
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

                                <div>
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
        </section>
        </>
    );
};
