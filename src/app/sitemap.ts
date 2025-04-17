// app/sitemap.ts
import { MetadataRoute } from 'next';
import { services } from "../data/services";

interface Service {
  slug: string;
  updatedAt: string | Date;
}

interface BlogPost {
  _id: string;
  updatedAt: string | Date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.speeir.com';
  const now = new Date();

  // Static routes with proper typing
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ];

  try {
    // Dynamic routes - services
    const servicesData = services.map((service) => ({
      slug: service.slug,
      updatedAt: new Date(), // Assuming current date for updatedAt
    }));

    // Dynamic routes - blogs
    const blogsResponse = await fetch(`${baseUrl}/api/blog`);
    const blogsData = blogsResponse.ok 
      ? ((await blogsResponse.json())?.data || []) as BlogPost[]
      : [];

    const dynamicRoutes: MetadataRoute.Sitemap = [
      ...servicesData.map((service) => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: new Date(service.updatedAt).toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      })),
      ...blogsData.map((blog) => ({
        url: `${baseUrl}/blog-details?id=${blog._id}`,
        lastModified: new Date(blog.updatedAt).toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })),
    ];

    return [...staticRoutes, ...dynamicRoutes];
  } catch (error) {
    console.error('Error generating dynamic sitemap routes:', error);
    // Fallback to static routes if there's an error
    return staticRoutes;
  }
}