"use client";

import React, { useEffect } from "react";
import { motion, useSpring } from "framer-motion";
import { BlogPost } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Calendar } from "lucide-react";

interface BlogPostCardProps {
  post: BlogPost;
  isSelected: boolean;
  onClick: () => void;
  "data-post-index": number;
}

export function BlogPostCard({
  post,
  isSelected,
  onClick,
  ...props
}: BlogPostCardProps) {
  const springConfig = { stiffness: 300, damping: 30 };
  const scale = useSpring(1, springConfig);
  const x = useSpring(0, springConfig);

  useEffect(() => {
    scale.set(isSelected ? 1.05 : 1);
    x.set(isSelected ? 5 : 0);
  }, [isSelected, scale, x]);

  return (
    <motion.div
      style={{ scale, x }}
      className="relative overflow-hidden rounded-lg cursor-pointer group w-full mb-4 p-4 bg-white dark:bg-neutral-800 shadow-sm"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      <div className="relative z-10">
        <h3 className="text-sm font-medium mb-2 text-gray-800 dark:text-gray-200">
          {post.title}
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 font-light mb-2 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <Calendar className="w-3 h-3 mr-1" />
          {formatDate(post.publishedAt)}
        </div>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isSelected ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
