export interface Testimonial {
  initials: string;
  color: string;
  quote: string;
  name: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    initials: "PD",
    color: "#7B3FA0",
    quote:
      "Speeir shipped our MVP in five weeks. No handoff delays, no scope creep, just working software.",
    name: "Priya Desai",
    role: "Founder, Northlane Studio",
  },
  {
    initials: "MW",
    color: "#A15FDC",
    quote:
      "They found and fixed a scaling issue our previous vendor missed for a year. That's the whole pitch.",
    name: "Marcus Webb",
    role: "CTO, Fenwick Analytics",
  },
  {
    initials: "ET",
    color: "#14181C",
    quote:
      "Every sprint demo was something we could actually click through. Rare for an outside team.",
    name: "Elena Torres",
    role: "Head of Product, Brightloop",
  },
  {
    initials: "SO",
    color: "#5B2D8E",
    quote:
      "We came in expecting a contractor. We got a team that pushed back on bad ideas, including ours.",
    name: "Sam Okafor",
    role: "Founder, Ridgeline Labs",
  },
];
