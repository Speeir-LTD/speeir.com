export type ServiceIcon =
  | "code"
  | "smartphone"
  | "box"
  | "trending-up"
  | "shopping-cart"
  | "wrench";

export interface Service {
  icon: ServiceIcon;
  title: string;
  description: string;
  slug: string;
  longDescription: string;
  benefits: string[];
  process: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

export const services: Service[] = [
  {
    icon: "code",
    title: "Web Development",
    description:
      "Custom web applications and websites built with React and Next.js — fast, responsive, and SEO-friendly from the first commit.",
    slug: "web-development",
    longDescription:
      "We build with React, Next.js, and TypeScript — the same stack behind our own products — so what ships is fast by default, not optimized after the fact. That covers marketing sites, customer portals, and internal dashboards alike, whether you're launching the first version or replacing something that's aged out.",
    benefits: [
      "Built on React and Next.js — a widely-supported stack, not a proprietary one",
      "Core Web Vitals and load time treated as a build requirement, not a fix-it-later",
      "Responsive by default, tested across real device sizes",
      "Semantic markup and structured data baked in for SEO",
      "Clean handover: readable code and docs if you bring it in-house later",
    ],
    process: [
      { title: "Discovery", description: "We start by understanding your business goals and requirements." },
      { title: "Planning", description: "Creating a detailed roadmap for your project." },
      { title: "Design", description: "Crafting user-friendly interfaces and experiences." },
      { title: "Development", description: "Building your application with clean, maintainable code." },
      { title: "Testing", description: "Ensuring quality through comprehensive testing." },
      { title: "Deployment", description: "Launching your application to production." },
      { title: "Support", description: "Ongoing maintenance and support after launch." },
    ],
    faqs: [
      {
        question: "What technologies do you use for web development?",
        answer:
          "We build primarily with React, Next.js, and TypeScript, backed by Node.js and PostgreSQL — the same stack we use in our own products — so your site stays fast, maintainable, and easy to extend.",
      },
      {
        question: "How long does a custom website take to build?",
        answer:
          "Most marketing sites and web apps launch in 4–10 weeks, depending on scope. We agree a fixed roadmap during planning so you know the timeline before development starts.",
      },
      {
        question: "Will my website be SEO-friendly?",
        answer:
          "Yes. Every site we build follows SEO-friendly architecture — semantic markup, fast load times, and structured data — as a baseline, not an add-on.",
      },
    ],
  },
  {
    icon: "smartphone",
    title: "Mobile App Development",
    description:
      "Native iOS and Android apps, or one React Native codebase for both — built for performance, offline use, and app store approval.",
    slug: "mobile-development",
    longDescription:
      "Most projects ship on React Native, which covers iOS and Android from one codebase and keeps future maintenance to one place instead of two. When a feature genuinely needs native APIs or native-only performance, we build native — that call gets made during strategy, not discovered mid-build.",
    benefits: [
      "One codebase for iOS and Android when React Native fits, native when it doesn't",
      "Device features (camera, push, biometrics, location) integrated, not stubbed out",
      "Offline functionality and local sync designed in from the start",
      "App store submission and optimization handled end to end",
      "Built to survive OS updates — not abandoned after v1 ships",
    ],
    process: [
      { title: "Strategy", description: "Defining your app's purpose and target audience." },
      { title: "UX/UI Design", description: "Creating intuitive and engaging user interfaces." },
      { title: "Development", description: "Building your app with the appropriate technology stack." },
      { title: "Testing", description: "Ensuring quality across devices and platforms." },
      { title: "Deployment", description: "Publishing your app to the app stores." },
      { title: "Maintenance", description: "Ongoing updates and support." },
    ],
    faqs: [
      {
        question: "Should I build a native app or use React Native?",
        answer:
          "It depends on your budget and feature needs. React Native covers iOS and Android from one codebase and suits most product launches; fully native is worth it when you need deep device integration or maximum performance.",
      },
      {
        question: "Do you handle App Store and Google Play submission?",
        answer:
          "Yes. Submission and app store optimization are part of the process, so your app is discoverable and compliant with both stores' review guidelines when it ships.",
      },
      {
        question: "Can the app work offline?",
        answer:
          "Where it matters for your use case, yes. We build offline functionality and local data sync into the architecture from the start rather than bolting it on later.",
      },
    ],
  },
  {
    icon: "box",
    title: "Custom Software Development",
    description:
      "Bespoke internal tools and enterprise software built around how your business already works, not the other way around.",
    slug: "custom-software",
    longDescription:
      "Off-the-shelf tools ask your team to work around them. We design software around the process you already run — internal tools, workflow automation, or enterprise applications — so the software fits the business instead of the business fitting the software.",
    benefits: [
      "Built around your actual workflow, not a generic template",
      "Integrates with the systems and data you already have",
      "Scales with usage instead of hitting per-seat licensing walls",
      "You own the code outright, with no vendor lock-in",
      "Lower long-term cost once workaround time and license fees are counted",
    ],
    process: [
      { title: "Requirements Analysis", description: "Deeply understanding your business processes and needs." },
      { title: "Solution Architecture", description: "Designing the technical foundation of your software." },
      { title: "Development", description: "Building your custom solution with best practices." },
      { title: "Quality Assurance", description: "Rigorous testing to ensure reliability." },
      { title: "Deployment", description: "Smooth implementation into your business." },
      { title: "Maintenance", description: "Ongoing support and enhancements." },
    ],
    faqs: [
      {
        question: "How is custom software different from off-the-shelf tools?",
        answer:
          "Off-the-shelf software makes you adapt your process to fit the tool. Custom software is built around how your business already works, which usually means less workaround and lower long-term cost once you factor in licensing and workflow friction.",
      },
      {
        question: "Can you integrate with our existing systems?",
        answer:
          "Yes. Integration with your existing systems and data sources is part of requirements analysis, not an afterthought — we design the architecture around what you already run.",
      },
      {
        question: "Who owns the code once the project is finished?",
        answer:
          "You do. It's built for your business, so you retain full ownership and can take it to another team for maintenance if you ever choose to.",
      },
    ],
  },
  {
    icon: "trending-up",
    title: "Digital Marketing",
    description:
      "SEO, PPC, social, and content campaigns run on data, not guesswork — built to grow qualified traffic and prove ROI.",
    slug: "digital-marketing",
    longDescription:
      "SEO, paid search and social, and content run as one strategy instead of separate campaigns competing for budget. Every campaign is built with tracking in place from day one, so spend goes toward what's provably converting, and you can see it, not just take our word for it.",
    benefits: [
      "SEO, PPC, social, and content coordinated as one strategy",
      "Tracking and reporting set up before launch, not bolted on after",
      "Budget shifted toward what's converting, reviewed on a real cadence",
      "Campaigns built to compound (SEO, content) as well as convert fast (paid)",
      "Full visibility into cost per lead and channel performance, no vanity metrics",
    ],
    process: [
      { title: "Research", description: "Analyzing your market, competitors, and target audience." },
      { title: "Strategy Development", description: "Creating a customized marketing plan." },
      { title: "Campaign Creation", description: "Developing compelling content and campaigns." },
      { title: "Implementation", description: "Executing across relevant channels." },
      { title: "Monitoring", description: "Tracking performance in real-time." },
      { title: "Optimization", description: "Continuous improvement based on data." },
    ],
    faqs: [
      {
        question: "Which digital marketing channels do you cover?",
        answer:
          "SEO, paid search and social (PPC), organic social, and content marketing — run as one strategy rather than as separate, disconnected campaigns.",
      },
      {
        question: "How do you measure ROI on a campaign?",
        answer:
          "Every campaign ships with analytics and reporting from day one, so you can see cost per lead, conversion rate, and channel performance rather than vanity metrics like impressions alone.",
      },
      {
        question: "How soon will I see results?",
        answer:
          "Paid channels can show traffic within days; SEO and content typically take 3–6 months to compound. We set expectations for both during strategy development, not after launch.",
      },
    ],
  },
  {
    icon: "shopping-cart",
    title: "E-Commerce",
    description:
      "Custom online stores on Shopify, WooCommerce, or headless commerce, with secure checkout and SEO built in from day one.",
    slug: "e-commerce",
    longDescription:
      "Shopify or WooCommerce cover most stores without reinventing anything; a headless build makes sense once you need a custom storefront or you're selling across more than one channel. We pick the platform to fit your catalog and traffic, not the platform we'd rather build on.",
    benefits: [
      "Platform picked to match your catalog and traffic, not our preference",
      "Checkout and payments built for conversion, not just function",
      "Mobile-first — most storefront traffic arrives on a phone",
      "Inventory and order data connected to the tools you already run",
      "SEO-friendly product pages and category structure from launch",
    ],
    process: [
      { title: "Store Planning", description: "Defining your product catalog and store structure." },
      { title: "Platform Selection", description: "Choosing the right e-commerce platform for your needs." },
      { title: "Design", description: "Creating a branded and conversion-focused store design." },
      { title: "Development", description: "Building your store with all required functionality." },
      { title: "Testing", description: "Ensuring a smooth checkout process and user experience." },
      { title: "Launch", description: "Going live with marketing support." },
    ],
    faqs: [
      {
        question: "Which e-commerce platform do you recommend?",
        answer:
          "It depends on catalog size and how much custom logic you need. Shopify and WooCommerce cover most stores quickly; a headless setup makes sense once you need custom storefronts or multi-channel selling.",
      },
      {
        question: "Can you migrate my existing store?",
        answer:
          "Yes, store planning includes migrating existing products, customers, and order history without losing the SEO rankings your current product pages already have.",
      },
      {
        question: "Do you handle payment and inventory integration?",
        answer:
          "Secure payment processing and inventory management integration are built into every store, connected to the platform and tools you already use.",
      },
    ],
  },
  {
    icon: "wrench",
    title: "Maintenance & Support",
    description:
      "24/7 monitoring, security patching, and performance tuning after launch, so your product stays fast, secure, and online.",
    slug: "maintenance-support",
    longDescription:
      "Launch day isn't the finish line. We monitor, patch, and tune performance on whatever's already running — including systems we didn't originally build — starting with an assessment of what's there before we propose a schedule, not a fixed package sold the same way to everyone.",
    benefits: [
      "Plan scoped to your actual systems after an upfront assessment",
      "24/7 monitoring catches issues before users report them",
      "Security patches applied on a schedule, not reactively",
      "Performance tuning as usage grows, not a one-time pass",
      "We take on systems we didn't originally build",
    ],
    process: [
      { title: "Assessment", description: "Evaluating your current systems and needs." },
      { title: "Support Plan", description: "Creating a tailored maintenance schedule." },
      { title: "Monitoring", description: "Proactive system monitoring." },
      { title: "Updates", description: "Regular software updates and security patches." },
      { title: "Support", description: "Responsive technical assistance." },
      { title: "Reporting", description: "Regular performance and status reports." },
    ],
    faqs: [
      {
        question: "What's included in a maintenance plan?",
        answer:
          "Proactive monitoring, regular security updates, performance optimization, and responsive technical support — scoped to your systems during the initial assessment, not sold as a generic package.",
      },
      {
        question: "Do you support software you didn't originally build?",
        answer:
          "Yes. We start with an assessment of your current systems, then build a tailored maintenance schedule around what's already there.",
      },
      {
        question: "What's your response time for critical issues?",
        answer:
          "24/7 support means critical issues get triaged as they happen, not queued for the next business day.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
