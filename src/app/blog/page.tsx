import SingleBlog from "@/components/Blog/SingleBlog";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Page | Speeir",
  description: "We craft fast, beautiful websites and powerful mobile apps that put your customers first. Whether you need a startup launchpad or enterprise-grade SaaS, we build digital experiences that convert and grow.  ",
};

const Blog = async () => {
  const baseUrl = process.env.BASE_URL; 
  const res = await fetch(`${baseUrl}/api/blog`); 
  const { data: blogData } = await res.json();

  return (
    <>
      <Breadcrumb
        pageName="Blog Page"
        description="Speeir Blogs"
      />

      <section className="pb-[120px] pt-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            {blogData.map((blog: any) => (
              <div
                key={blog._id}
                className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
              >
                <SingleBlog post={blog} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;