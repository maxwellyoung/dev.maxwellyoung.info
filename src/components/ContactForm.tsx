"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check, AlertCircle } from "lucide-react";
import { useSoundEffects } from "@/hooks/useSoundEffects";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { playSound } = useSoundEffects();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");

    try {
      // Send to API route
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormState("success");
        playSound("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setFormState("idle"), 3000);
      } else {
        throw new Error("Failed to send");
      }
    } catch {
      setFormState("error");
      setTimeout(() => setFormState("idle"), 3000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-xs font-medium text-muted-foreground mb-1.5"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 text-sm bg-transparent border border-[hsl(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all placeholder:text-muted-foreground/50"
            placeholder="Your name"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-medium text-muted-foreground mb-1.5"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 text-sm bg-transparent border border-[hsl(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all placeholder:text-muted-foreground/50"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-xs font-medium text-muted-foreground mb-1.5"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-3 py-2 text-sm bg-transparent border border-[hsl(var(--border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none placeholder:text-muted-foreground/50"
          placeholder="What's on your mind?"
        />
      </div>

      <motion.button
        type="submit"
        disabled={formState === "submitting"}
        className="relative flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 text-sm font-medium bg-[hsl(var(--accent))] text-white rounded-lg hover:bg-[hsl(var(--accent))]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        whileTap={{ scale: 0.98 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {formState === "idle" && (
            <motion.span
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send Message
            </motion.span>
          )}
          {formState === "submitting" && (
            <motion.span
              key="submitting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <motion.div
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              Sending...
            </motion.span>
          )}
          {formState === "success" && (
            <motion.span
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Sent!
            </motion.span>
          )}
          {formState === "error" && (
            <motion.span
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4" />
              Try again
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.form>
  );
}
