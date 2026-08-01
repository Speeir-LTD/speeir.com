import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Speeir",
  description: "The terms that govern use of the Speeir website.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="container py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Legal
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-muted">Last updated: August 2026</p>
      </div>

      <div className="prose prose-neutral mx-auto mt-16 max-w-2xl prose-headings:font-semibold prose-headings:text-ink prose-p:text-muted prose-a:text-primary prose-strong:text-ink prose-li:text-muted">
        <p>
          These terms govern your use of speeir.com, operated by Speeir LTD
          (&quot;Speeir&quot;, &quot;we&quot;, &quot;us&quot;), based in Dublin, Ireland. By using
          this site, you agree to these terms.
        </p>

        <h2>Use of this site</h2>
        <p>
          This website is provided to share information about Speeir&apos;s
          services, work, and blog content. You agree not to misuse the
          site, attempt to disrupt it, or use it for any unlawful purpose.
        </p>

        <h2>Content</h2>
        <p>
          All content on this site — including text, graphics, logos, and
          the Speeir name and branding — belongs to Speeir or its licensors
          and may not be reproduced without permission, except as needed to
          share or link to a page in the normal course of browsing.
        </p>

        <h2>No professional advice</h2>
        <p>
          Blog posts and other content on this site are provided for general
          information only and do not constitute professional or legal
          advice. Any project work is governed separately by the agreement
          between Speeir and the client for that engagement, not by this
          website.
        </p>

        <h2>Third-party links</h2>
        <p>
          This site may link to third-party websites (e.g. social media, the
          products we&apos;ve built). We aren&apos;t responsible for the content or
          practices of those external sites.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          This website is provided &quot;as is&quot; without warranties of any kind.
          To the fullest extent permitted by law, Speeir is not liable for
          any damages arising from use of this site.
        </p>

        <h2>Changes</h2>
        <p>
          We may update these terms from time to time. The &quot;last updated&quot;
          date above reflects the most recent revision.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms can be sent to{" "}
          <a href="mailto:info@speeir.com">info@speeir.com</a>.
        </p>
      </div>
    </div>
  );
}
