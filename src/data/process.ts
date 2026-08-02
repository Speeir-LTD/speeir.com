export interface ProcessStep {
  title: string;
  description: string;
}

// How Speeir runs a project. Rendered twice — as wobble cards on the homepage
// and as the methodology grid on /about — so the copy lives here, once.
// Presentation (icons, card colours) stays with each consumer.
export const process: ProcessStep[] = [
  {
    title: "Consultation & Planning",
    description:
      "We take time to understand your goals, challenges, and vision to design a roadmap that fits your business.",
  },
  {
    title: "Agile Development",
    description:
      "Our cross-border teams work in sprints to deliver fast, iterative progress with ongoing feedback and transparency.",
  },
  {
    title: "Quality & Compliance",
    description:
      "Rigorous testing, security practices, and adherence to international standards are baked into everything we do.",
  },
  {
    title: "Launch & Scale",
    description:
      "After launch, we remain your technology partner, offering maintenance, enhancements, and scaling support as your needs grow.",
  },
];
