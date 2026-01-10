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

// ========================================
// TESTIMONIAL ACTION PLAN
// ========================================
// Priority contacts to ask for testimonials:
//
// 1. SILK TEAM - Ask your lead/manager for a LinkedIn recommendation
//    Focus: collaboration, frontend skills, product thinking
//
// 2. CH'LITA - Fashion stylist client
//    Focus: communication, delivery, understanding their craft
//
// 3. IVAN GUZMAN - Writer client
//    Focus: CMS setup, independence, ongoing relationship
//
// 4. GOODNESS GRACIOUS - Bakery client
//    Focus: performance results (40% faster), client autonomy
//
// 5. SPARK NZ - Former colleagues
//    Focus: dashboard work, design systems, collaboration
//
// 6. DEV ACADEMY - Instructors/cohort leads
//    Focus: learning speed, community contribution
//
// Template message:
// "Hey [name], I'm updating my portfolio and collecting testimonials.
// Would you be willing to write 2-3 sentences about working with me?
// Specifically about [relevant project/skill]. No pressure if not!"
//
// When you have real testimonials, replace the placeholder below:
// ========================================

const testimonials: Testimonial[] = [
  // Example format - replace with real testimonials:
  // {
  //   id: "1",
  //   quote: "Maxwell delivered exactly what we needed...",
  //   author: "Client Name",
  //   role: "Creative Director",
  //   company: "Company Name",
  //   image: "/testimonials/client.jpg", // optional
  // },
  {
    id: "placeholder",
    quote: "Placeholder - component hidden until real testimonials added",
    author: "Add testimonials",
    role: "See comments above for action plan",
    company: "",
  },
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
