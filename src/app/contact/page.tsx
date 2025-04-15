import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Page | Speeir",
  description: "Reach out to our team for inquiries, support, or collaborations.",
  keywords: "contact, support, Ireland, Speeir, inquiries, collaborations, software solutions, web development, application development, ecommerce, mobile apps",
  robots: "index, follow",
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
