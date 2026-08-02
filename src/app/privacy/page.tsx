import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy",
  description:
    "How Speeir collects, uses, and protects your information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="container py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Legal
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-muted">Last updated: August 2026</p>
      </div>

      <div className="prose prose-neutral mx-auto mt-16 max-w-2xl prose-headings:font-semibold prose-headings:text-ink prose-p:text-muted prose-a:text-primary prose-strong:text-ink prose-li:text-muted">
        <p>
          Speeir LTD (&quot;Speeir&quot;, &quot;we&quot;, &quot;us&quot;) is based in Dublin, Ireland.
          This policy explains what information we collect through
          speeir.com, why we collect it, and how you can control it.
        </p>

        <h2>Information we collect</h2>
        <ul>
          <li>
            <strong>Contact form.</strong> When you submit our contact form,
            we collect your name, email address, and message so we can
            respond to your enquiry. This is sent directly to our team by
            email and is not stored in a database.
          </li>
          <li>
            <strong>Analytics.</strong> If enabled, we use Google Tag Manager
            to understand how visitors use the site (pages viewed, general
            location, device type). This data is aggregated and is not used
            to identify you personally.
          </li>
          <li>
            <strong>Blog view counts.</strong> We track an anonymous view
            count per blog post to understand what content is useful. No
            personal data is attached to this count.
          </li>
        </ul>

        <h2>How we use your information</h2>
        <p>
          We use the information above solely to respond to enquiries sent
          through our contact form, to understand and improve the site, and
          to meet legal obligations where applicable. We do not sell your
          personal data to third parties.
        </p>

        <h2>Cookies</h2>
        <p>
          If analytics are enabled, Google Tag Manager may set cookies to
          distinguish visitors. You can disable cookies in your browser
          settings at any time; this may affect how some parts of the site
          behave.
        </p>

        <h2>Your rights</h2>
        <p>
          If you are in the European Economic Area, you have the right to
          access, correct, or request deletion of your personal data. To
          exercise these rights, contact us at{" "}
          <a href="mailto:info@speeir.com">info@speeir.com</a>.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy can be sent to{" "}
          <a href="mailto:info@speeir.com">info@speeir.com</a>.
        </p>
      </div>
    </div>
  );
}
