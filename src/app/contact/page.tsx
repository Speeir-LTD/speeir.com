import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Page | Speeir",
  description: "We craft fast, beautiful websites and powerful mobile apps that put your customers first. Whether you need a startup launchpad or enterprise-grade SaaS, we build digital experiences that convert and grow.  ",
  // other metadata
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact Page"
        description="Reach out to our team for inquiries, support, or collaborations. Whether you have questions about our services, need technical assistance, or want to explore partnerships, we’re here to help. We're here to help and will respond promptly."
      />

      <Contact />
    </>
  );
};

export default ContactPage;
