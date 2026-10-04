import {
  Bell,
  Camera,
  ChartBar,
  Clock,
  Database,
  Eye,
  Leaf,
  ListMagnifyingGlass,
  LockKey,
  MapPin,
  ShieldCheck,
  Storefront,
  Tag,
  TrendDown,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import { contactHref, type Product } from "@/components/ProductShowcase";

// Source: expiry-management-app/store/*.md. The pilot brief is explicit about
// what NOT to claim: no reservations or in-app payment (not live), no sales or
// waste-saved numbers (none exist yet). Keep it that way when editing.

const APP_STORE = "https://apps.apple.com/app/easysave-save-wisely/id6809459802";
const GOOGLE_PLAY = "https://play.google.com/store/apps/details?id=com.speeir.easysave";

export const easysave: Product = {
  slug: "easysave",
  name: "easySave",
  metaDescription:
    "easySave is a marketplace app where shops sell food close to its expiry date, at a discount, to shoppers nearby. Live on iOS and Android, built by Speeir.",
  logo: "/images/work/easysave/logo.png",
  brand: "#3FB27A",
  category: "LifestyleApplication",
  ogImage: { url: "/images/work/easysave/feature.png", width: 1024, height: 500 },

  hero: {
    heading: "Still good. Just close to the date.",
    lead: "easySave is a marketplace for food and goods nearing their expiry date. Shops list stock they would otherwise mark down or bin. Shoppers nearby see it, collect it and pay less.",
    status: ["Live on iOS & Android", "Version 1.1.3", "Free pilot open in Athlone"],
    primaryCta: { label: "Join the free pilot", href: contactHref("easySave: join the shop pilot") },
    stores: { appStore: APP_STORE, googlePlay: GOOGLE_PLAY },
    screens: [
      { src: "/images/work/easysave/shopper-feed.png", alt: "easySave shopper feed: discounted items nearby with price, time left and distance" },
      { src: "/images/work/easysave/shop-dashboard.png", alt: "easySave shop dashboard: active products, items expiring today and potential revenue" },
    ],
  },

  facts: [
    { value: "< 1 min", label: "to list a product from a phone" },
    { value: "15 min", label: "to set up a shop, done with you" },
    { value: "1–50 km", label: "shopper and notify radius" },
    { value: "15", label: "food and household categories" },
  ],

  problem: {
    eyebrow: "The problem",
    heading: "Markdown stickers only reach people already in the shop.",
    body: "Shops discount or bin stock every day because the date is close, not because anything is wrong with it. That is lost margin for the shop and food that didn't need to be wasted.",
    points: [
      { icon: TrendDown, title: "Lost margin", body: "Stock written off near its date is money the shop has already spent." },
      { icon: Eye, title: "Offers nobody sees", body: "A reduced sticker on a shelf is invisible to the shopper two streets away." },
      { icon: Leaf, title: "Avoidable waste", body: "Good food goes in the bin for want of someone who would have bought it." },
    ],
  },

  steps: {
    heading: "From shelf to shopper in four steps.",
    items: [
      { title: "Shop signs up", body: "Store name, address, location and logo. About 15 minutes, and we do it with you." },
      { title: "List what needs to move", body: "Snap a photo, set a discounted price, quantity and expiry date. Under a minute." },
      { title: "Shoppers nearby see it", body: "A live feed of discounted items within the distance each shopper chooses." },
      { title: "Collect and pay in store", body: "The shopper comes in, pays less, and the item gets used instead of binned." },
    ],
  },

  audiences: [
    {
      icon: UsersThree,
      eyebrow: "For shoppers",
      heading: "Deals on your street, before they expire.",
      image: "/images/work/easysave/shopper-feed.png",
      points: [
        "Live feed of discounted, soon-to-expire products near you",
        "Filter by category, distance, shop, or expiring within 24 hours",
        "Sort by nearest, soonest to expire, or biggest discount",
        "See the original price, the new price and the exact expiry date",
        "Save favourites and browse any shop's full catalogue, with a map link",
      ],
    },
    {
      icon: Storefront,
      eyebrow: "For shops",
      heading: "Sell it instead of binning it.",
      image: "/images/work/easysave/shop-dashboard.png",
      points: [
        "Recover margin on stock you would otherwise write off",
        "Reach new shoppers nearby who are looking for a deal",
        "You set the price, and lower it as the date gets closer",
        "Run your whole catalogue from your phone",
        "A public shop page with your logo, location and live stock",
      ],
    },
  ],

  features: {
    eyebrow: "The shop toolkit",
    heading: "Everything a shop owner uses, in one app.",
    items: [
      { icon: ChartBar, title: "Dashboard", body: "What's live, what expires today, quick actions and your latest products at a glance." },
      { icon: ListMagnifyingGlass, title: "Inventory", body: "Searchable catalogue filtered by Expiring, Live, Sold out, Expired and Removed, with counts." },
      { icon: Camera, title: "Add a product", body: "Photo, name, category, original and discounted price, quantity and expiry date." },
      { icon: Bell, title: "Notify shoppers", body: "One tap sends “[Your shop] just restocked” to shoppers inside your notify radius." },
      { icon: Tag, title: "Price cuts", body: "Lower the discounted price any time as the date nears. Never above the original." },
      { icon: Clock, title: "Shelf report", body: "Live listings, units in stock, retail value, potential revenue and average discount." },
    ],
  },

  engineering: {
    eyebrow: "Built by Speeir",
    heading: "Designed, built and run in-house.",
    body: "easySave is one of Speeir's own products. The same team that builds client software built and operates this one, from the mobile apps to the servers behind them.",
    stack: ["Flutter (iOS & Android)", "Node.js + Express API", "PostgreSQL", "Firebase push notifications", "S3 image storage", "nginx + Docker"],
    trust: [
      { icon: LockKey, title: "Accounts", body: "Verified email sign-up, hashed passwords, and log out of every device in one tap." },
      { icon: ShieldCheck, title: "Tokens", body: "Refresh tokens and one-time codes are stored hashed, so a leaked row can't be replayed." },
      { icon: MapPin, title: "Location", body: "Used only to show nearby deals. With location off, the app still works." },
      { icon: Database, title: "Data", body: "Uploaded images are restricted to our own storage. Users can delete their account in-app." },
    ],
  },

  roadmap: {
    eyebrow: "Where we are",
    heading: "Live, piloting, and honest about what's next.",
    body: "We don't have sales or waste-saved numbers yet. The pilot is how we get them, and we'd rather report real results than invent them.",
    stages: [
      {
        state: "done",
        label: "Shipped",
        title: "Live on iOS and Android",
        points: ["Two-sided marketplace for shoppers and shops", "Email verification, password reset, device logout", "Search, filters, favourites and shop pages", "Push notifications and store maps (v1.1.2)"],
      },
      {
        state: "now",
        label: "Now",
        title: "Free pilot with local shops",
        points: ["Independent grocers, bakeries, delis and convenience stores", "Set up in person, first items listed together", "Check-ins every 1–2 weeks shape what we build"],
      },
      {
        state: "next",
        label: "Next",
        title: "Reservations and results",
        points: ["In-app reservations (planned, not live today)", "First pilot results on sales and stock saved", "Expansion beyond the first pilot area"],
      },
    ],
  },

  invites: {
    eyebrow: "For shops",
    heading: "Bring your shop on board.",
    body: "We're piloting with local shops and setting each one up with the owner, in person where we can.",
    items: [
      {
        icon: Storefront,
        title: "Shops",
        body: "Free during the pilot, about 15 minutes to set up, no commitment. Early shops are the ones shoppers find first in their area.",
        cta: "Join the pilot",
        href: contactHref("easySave: join the shop pilot"),
      },
    ],
  },

  closing: {
    heading: "Save wisely. Waste less.",
    body: "Shops: join the free pilot and list your first items with us in 15 minutes. Shoppers: get the app and see what's close to its date near you.",
  },

  faqs: [
    { question: "What does it cost a shop?", answer: "Nothing during the pilot. Setup takes about 15 minutes, we'll do it with you, and you can stop any time." },
    { question: "How far away do shoppers see my shop?", answer: "Shoppers choose a distance from 1 km to 50 km (default 5 km) and only see stock from shops inside it. With location on, the feed is sorted nearest first." },
    { question: "How do shoppers pay?", answer: "In store, when they collect. In-app reservations and payment are planned but not live yet." },
    { question: "Can I tell shoppers when I add new stock?", answer: "Yes. Tap Notify shoppers on your dashboard to send a push notification to shoppers within your notify radius (1–50 km, default 5 km) who have allowed notifications. You can send one every 5 minutes at most." },
    { question: "What can I list?", answer: "Anything in the app's 15 categories: Bakery, Dairy, Produce, Meat, Frozen, Pantry, Fish & Seafood, Ready Meals, Rice & Grains, Pulses & Lentils, Spices & Masala, Snacks, Sweets, Drinks and Household." },
    { question: "What happens when an item expires or sells out?", answer: "It stops showing to shoppers automatically. You can still see it in your Inventory under Expired or Sold out, and edit or remove it." },
    { question: "Is my data safe?", answer: "Passwords are stored hashed, sessions can be revoked from any device, and emails are verified. Shoppers' location is used only to show nearby deals." },
    { question: "Who is behind easySave?", answer: "Speeir, a software company that builds its own products as well as software for clients. Contact us at info@speeir.com or through Contact support in the app." },
  ],
};
