"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services, type Service } from "@/data/services";
import { ServiceIcon } from "@/components/ServiceIcon";
import {
  Card,
  CardTitle,
  CardDescription,
  CardSkeletonContainer,
  CardSkeleton,
} from "@/components/ui/damn-good-card";

function ServiceSpotlightCard({
  service,
  isGridHovered,
  onHoverStart,
  onHoverEnd,
}: {
  service: Service;
  isGridHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative block p-2"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      {/* Shared glow, from card-hover-effect — fills the padded outer area, so it peeks out as a ring around the card */}
      <AnimatePresence>
        {isGridHovered && (
          <motion.span
            className="absolute inset-0 z-0 block rounded-3xl bg-primary/25"
            layoutId="hoverBackground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.15 } }}
            exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
          />
        )}
      </AnimatePresence>

      <Card className="relative z-20 transition-colors duration-300 group-hover:border-primary/40">
        <CardSkeletonContainer>
          <CardSkeleton>
            <ServiceIcon name={service.icon} size={26} />
          </CardSkeleton>
        </CardSkeletonContainer>
        <CardTitle>{service.title}</CardTitle>
        <CardDescription>{service.description}</CardDescription>
      </Card>
    </Link>
  );
}

export function ServiceSpotlightGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => (
        <ServiceSpotlightCard
          key={service.slug}
          service={service}
          isGridHovered={hoveredIndex === index}
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
        />
      ))}
    </div>
  );
}
