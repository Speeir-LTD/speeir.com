import {
  Barbell,
  Buildings,
  CalendarCheck,
  ChatsCircle,
  CheckSquare,
  DeviceMobile,
  EyeSlash,
  Fingerprint,
  Gauge,
  HandTap,
  LockKey,
  ShieldCheck,
  User,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import { contactHref, type Product } from "@/components/ProductShowcase";

// Source: fitness_service/PRODUCT.md (features, FAQ, security, stack) and
// PRICING.md (only the pricing model, no figures that would drift). No roadmap
// section: nothing in the repo commits to one, so we don't invent it.

const DASHBOARD = "https://trackhq.speeir.com/auth/sign-in";

export const trackhq: Product = {
  slug: "trackhq",
  name: "TrackHQ",
  metaDescription:
    "TrackHQ is the training log trainers prescribe into and clients actually fill in. Plans built on the web, logged set by set on iOS and Android. Built by Speeir.",
  logo: "/images/work/trackhq/logo.png",
  brand: "#A15FDC",
  category: "HealthApplication",

  hero: {
    heading: "Prescribed on the web. Logged in the gym.",
    lead: "TrackHQ is the training log trainers prescribe into and clients actually fill in. Trainers build the program and see who trained. Clients open the app, see today's session and log it set by set.",
    status: ["Live on iOS & Android", "Version 2.0.1", "Web dashboard for trainers"],
    primaryCta: { label: "Start programming", href: DASHBOARD },
    stores: {
      appStore: "https://apps.apple.com/app/trackhq/id6754441500",
      googlePlay: "https://play.google.com/store/apps/details?id=com.speeir.trackhq",
    },
    screens: [
      { src: "/images/work/trackhq/client-today.png", alt: "TrackHQ client Today screen: today's session and the last 7 days" },
      { src: "/images/work/trackhq/trainer-today.png", alt: "TrackHQ trainer Today screen: roster triage and adherence" },
    ],
  },

  facts: [
    { value: "2 taps", label: "to log a set mid-workout" },
    { value: "€0", label: "for clients, forever" },
    { value: "Up to 3", label: "clients free on the Solo plan" },
    { value: "4 roles", label: "admin, agency, trainer and client" },
  ],

  problem: {
    eyebrow: "The problem",
    heading: "Most fitness apps are built for one person training alone.",
    body: "Coaching is a pair: the trainer who writes the program and the client who runs it. Without a shared log, the plan lives in one place and the training in another.",
    points: [
      { icon: ChatsCircle, title: "Plans in spreadsheets", body: "Programs live in a spreadsheet and progress arrives as WhatsApp screenshots." },
      { icon: CheckSquare, title: "Checkboxes prove nothing", body: "A ticked workout says nothing about the weight, the reps or the effort." },
      { icon: EyeSlash, title: "Quiet clients go unseen", body: "Without a live log, a trainer can't tell who stopped training until they ask." },
    ],
  },

  steps: {
    heading: "From written plan to logged set in four steps.",
    items: [
      { title: "Trainer signs up", body: "On the web dashboard. Build your own exercise library or use the shared public one." },
      { title: "Write the plan", body: "Multi-week programs with sets, reps, weight, rest and supersets, for a client or a whole group." },
      { title: "Clients join by code", body: "Share your trainer code. Clients enter it in the app, with no admin approval loop." },
      { title: "Log and review", body: "Clients log each set in two taps. You see who trained, and who went quiet." },
    ],
  },

  audiences: [
    {
      icon: User,
      eyebrow: "For clients",
      heading: "Know today's session. Log it. Watch it go up.",
      image: "/images/work/trackhq/progress.png",
      points: [
        "Today's prescribed session on open, with rest days stated plainly",
        "Prescribed weight and reps pre-filled, adjusted with steppers",
        "Leave a session and pick it up later, with every set kept",
        "Volume and top-set charts that answer one question: is it going up?",
        "Join more than one trainer by code, and leave any time",
      ],
    },
    {
      icon: Barbell,
      eyebrow: "For trainers",
      heading: "Program the roster, not a spreadsheet.",
      image: "/images/work/trackhq/trainer-plan.png",
      points: [
        "Multi-week plans with supersets, warm-ups, cool-downs and notes",
        "Clients triaged as on track, needs attention, needs re-programming or no plan",
        "One plan for a whole group, with per-member progress",
        "Start a session on a client's behalf for in-person coaching",
        "A calendar of every client's assigned work",
      ],
    },
  ],

  features: {
    eyebrow: "Why TrackHQ",
    heading: "Every number comes from a set someone logged.",
    items: [
      { icon: CheckSquare, title: "Logged, not ticked", body: "Adherence and volume come from real sets with real weights, never from a checkbox." },
      { icon: HandTap, title: "Two taps per set", body: "The workout player is used mid-set with sweat on the phone, so nothing adds a tap to it." },
      { icon: CalendarCheck, title: "Days, not sessions", body: "A personal plan and a group class on the same day count as one trained day, not one missed." },
      { icon: Gauge, title: "Trainer-first triage", body: "The roster tells a trainer who to message today, not just who exists." },
      { icon: UsersThree, title: "Groups are first class", body: "Write one plan for the group and keep the truth for every member, including who logged nothing." },
      { icon: Buildings, title: "Isolation by design", body: "One gym can never read another's trainers, clients, plans or sessions." },
    ],
  },

  engineering: {
    eyebrow: "Built by Speeir",
    heading: "Designed, built and run in-house.",
    body: "TrackHQ is one of Speeir's own products. The same team that builds client software built and operates the backend, the web dashboard and the mobile app.",
    stack: ["Go + gRPC", "PostgreSQL", "Redis", "React + TypeScript dashboard", "Flutter (iOS & Android)", "Kubernetes + Helm", "OpenTelemetry"],
    trust: [
      { icon: Fingerprint, title: "Sessions", body: "Every login gets its own session. Log out of one device and that token stops working at once." },
      { icon: LockKey, title: "Passwords", body: "Hashed with bcrypt. Clients and trainers can delete their account from the app." },
      { icon: ShieldCheck, title: "Roles", body: "Role-based access across admin, agency, trainer and client, checked on every request." },
      { icon: Buildings, title: "Gym isolation", body: "Enforced in the service layer, not the UI, and covered by a dedicated security test suite." },
    ],
  },

  invites: {
    eyebrow: "Get started",
    heading: "Pick your side of the plan.",
    body: "Clients never pay. Trainers and gyms pay only for clients who actually train.",
    items: [
      {
        icon: DeviceMobile,
        title: "Clients",
        body: "Free, forever. Get the app, enter your trainer's code, and today's session appears.",
        cta: "Get the app",
        href: "https://trackhq.ie",
      },
      {
        icon: Barbell,
        title: "Trainers",
        body: "Start free with up to 3 clients. Paid plans count only the clients who logged a session that month.",
        cta: "Start programming",
        href: DASHBOARD,
      },
      {
        icon: Buildings,
        title: "Gyms & agencies",
        body: "Onboard your trainers under one roof, see roster health across every coach, and keep your data isolated.",
        cta: "Book a demo",
        href: contactHref("TrackHQ: gym / agency demo"),
      },
    ],
  },

  closing: {
    heading: "The plan your trainer wrote. The log you actually keep.",
    body: "Trainers: start programming on the web, free for your first three clients. Clients: get the app and enter your trainer's code.",
  },

  faqs: [
    { question: "Do I need a trainer to use TrackHQ?", answer: "Yes. TrackHQ is built around a trainer writing the plan. Without one there is nothing to log against." },
    { question: "What does it cost?", answer: "Clients never pay. Trainers can start free with up to 3 clients, and paid plans count only clients who logged at least one session that month. Full pricing is at trackhq.ie/pricing." },
    { question: "Can I have more than one trainer?", answer: "Yes. Clients can join multiple trainers by code and remove any of them." },
    { question: "What if I stop mid-session?", answer: "Leave it. The session stays open and is handed back when you return, with the sets you already logged intact." },
    { question: "Does a group class count toward my training?", answer: "Yes. Adherence counts days trained, so a personal session and a group class on the same day count as one trained day, not one missed." },
    { question: "Can trainers log on a client's behalf?", answer: "Yes. For in-person coaching, a trainer can start and record a session for a client." },
    { question: "Is my data visible to other gyms?", answer: "No. Agency data is isolated at the service layer; one agency cannot read another's data." },
    { question: "Can I delete my account?", answer: "Yes, from the app, with a confirmation step listing what will be removed." },
  ],
};
