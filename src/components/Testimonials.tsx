"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Quote } from "lucide-react";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company?: string;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "Maxwell brings a rare combination of design sensibility and engineering rigor. He doesn't just build features—he crafts experiences that feel intentional and complete.",
    author: "Add testimonials",
    role: "via LinkedIn recommendations",
    company: "",
  },
  // Add more testimonials as you collect them
];

export function Testimonials() {
  // Don't render if no real testimonials
  if (testimonials.length === 0 || testimonials[0].author === "Add testimonials") {
    return null;
  }

  return (
    <section className="py-12">
      <div className="flex items-center gap-2 mb-8">
        <Quote className="w-4 h-4 text-accent" />
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          What people say
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative p-6 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))]/50"
          >
            {/* Quote mark */}
            <div className="absolute -top-3 left-6 w-6 h-6 rounded-full bg-[hsl(var(--accent))] flex items-center justify-center">
              <Quote className="w-3 h-3 text-white" />
            </div>

            <blockquote className="text-sm text-foreground leading-relaxed mb-4">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            <div className="flex items-center gap-3">
              {testimonial.image ? (
                <Image
                  src={testimonial.image}
                  alt={testimonial.author}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[hsl(var(--muted))] flex items-center justify-center text-sm font-medium text-muted-foreground">
                  {testimonial.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-foreground">
                  {testimonial.author}
                </p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.role}
                  {testimonial.company && ` at ${testimonial.company}`}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
