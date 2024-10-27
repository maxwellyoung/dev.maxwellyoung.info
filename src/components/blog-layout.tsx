"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useSpring,
  useTransform,
} from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Calendar, Tag, Search, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import sanityClient from "@sanity/client";
import { PortableText } from "@portabletext/react";

const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: true,
});

interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  excerpt: string;
  content: any[];
  tags: string[];
  mainImage?: {
    asset: {
      _id: string;
      url: string;
    };
    alt: string;
  };
}

interface BlogPostCardProps {
  post: BlogPost;
  isSelected: boolean;
  onClick: () => void;
}

function BlogPostCard({ post, isSelected, onClick }: BlogPostCardProps) {
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
          {post.publishedAt}
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

export function BlogLayoutComponent() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isFullPostOpen, setIsFullPostOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [lastScrollTime, setLastScrollTime] = useState(0);
  const scrollDelay = 800;

  useEffect(() => {
    async function fetchBlogPosts() {
      const query = `*[_type == "blogPost"] {
        _id,
        title,
        slug,
        publishedAt,
        excerpt,
        content,
        tags,
        mainImage {
          asset->{
            _id,
            url
          },
          alt
        }
      }`;

      const posts = await client.fetch(query);
      setBlogPosts(posts);
    }

    fetchBlogPosts();
  }, []);

  const filteredPosts = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const nextPost = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredPosts.length);
  }, [filteredPosts.length]);

  const prevPost = useCallback(() => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + filteredPosts.length) % filteredPosts.length
    );
  }, [filteredPosts.length]);

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      if (
        containerRef.current &&
        containerRef.current.contains(event.target as Node)
      ) {
        event.preventDefault();
        const currentTime = Date.now();

        if (currentTime - lastScrollTime > scrollDelay) {
          const delta = event.deltaY;
          if (Math.abs(delta) > 10) {
            if (delta > 0) {
              nextPost();
            } else {
              prevPost();
            }
            setLastScrollTime(currentTime);
          }
        }
      }
    },
    [nextPost, prevPost, lastScrollTime, scrollDelay]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [handleWheel]);

  useEffect(() => {
    setSelectedPost(filteredPosts[currentIndex]);

    const scrollArea = scrollAreaRef.current;
    const selectedPostElement = scrollArea?.querySelector(
      `[data-post-index="${currentIndex}"]`
    );

    if (scrollArea && selectedPostElement) {
      const scrollAreaRect = scrollArea.getBoundingClientRect();
      const selectedPostRect = selectedPostElement.getBoundingClientRect();

      if (
        selectedPostRect.top < scrollAreaRect.top ||
        selectedPostRect.bottom > scrollAreaRect.bottom
      ) {
        selectedPostElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest",
        });
      }
    }
  }, [currentIndex, filteredPosts]);

  const backgroundSpring = useSpring(0, { stiffness: 100, damping: 30 });
  const backgroundRotation = useTransform(backgroundSpring, [0, 1], [0, 360]);

  useEffect(() => {
    const interval = setInterval(() => {
      backgroundSpring.set(Math.random());
    }, 15000);
    return () => clearInterval(interval);
  }, [backgroundSpring]);

  const [isHovered, setIsHovered] = useState(false);

  const titleVariants = {
    initial: { opacity: 1, y: 0 },
    hover: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  const subtitleVariants = {
    initial: { opacity: 0, y: 10 },
    hover: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut", delay: 0.1 },
    },
  };

  return (
    <div className="min-h-screen text-gray-800 dark:text-gray-200 font-sans relative overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          background: `conic-gradient(from ${backgroundRotation}deg at 50% 50%, #4ECDC4, #45B7D1, #98CA32, #FB8B24, #4ECDC4)`,
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div
          className="relative mb-8 overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.h1
            className="text-4xl font-extralight tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-400 dark:from-gray-300 dark:to-gray-500"
            variants={titleVariants}
            initial="initial"
            animate={isHovered ? "hover" : "initial"}
          >
            Blog
          </motion.h1>
          <motion.span
            className="absolute top-0 left-0 text-4xl font-extralight tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-400 dark:from-gray-300 dark:to-gray-500 whitespace-nowrap"
            variants={subtitleVariants}
            initial="initial"
            animate={isHovered ? "hover" : "initial"}
          >
            Thoughts and Insights
          </motion.span>
        </div>
        <div className="mb-8 relative">
          <Input
            type="search"
            placeholder="Search blog posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="w-full md:w-64 pl-10"
          />
          <Search
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-all duration-300 ease-in-out ${
              isSearchFocused ? "text-gray-600 dark:text-gray-300" : ""
            }`}
            size={18}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2" ref={containerRef}>
            {blogPosts.length === 0 ? (
              <div className="bg-white dark:bg-neutral-800 bg-opacity-70 backdrop-blur-sm rounded-xl p-6 shadow-lg flex flex-col items-center justify-center min-h-[400px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <p className="text-gray-600 dark:text-gray-400">
                  No blog posts available.
                </p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {selectedPost && (
                  <motion.div
                    key={selectedPost.title}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      mass: 0.8,
                      bounce: 0.25,
                    }}
                    className="bg-white dark:bg-neutral-800 bg-opacity-70 backdrop-blur-sm rounded-xl p-6 shadow-lg"
                  >
                    <h2 className="text-2xl font-light mb-3 text-gray-700 dark:text-gray-300">
                      {selectedPost.title}
                    </h2>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <Calendar className="w-4 h-4 mr-2" />
                      {selectedPost.publishedAt}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 font-light line-clamp-4">
                      {selectedPost.content}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedPost.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button
                      onClick={() => setIsFullPostOpen(true)}
                      className="inline-flex items-center text-sm font-light bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded transition-colors duration-200"
                    >
                      Read Full Post
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
          <div className="w-full">
            <ScrollArea
              className="h-[calc(100vh-200px)] lg:h-[700px] w-full pr-4"
              ref={scrollAreaRef}
            >
              <div className="space-y-4 py-2">
                {filteredPosts.map((post, index) => (
                  <BlogPostCard
                    key={post._id}
                    post={post}
                    isSelected={selectedPost?._id === post._id}
                    onClick={() => {
                      setSelectedPost(post);
                      setCurrentIndex(index);
                    }}
                    data-post-index={index}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
      <Dialog open={isFullPostOpen} onOpenChange={setIsFullPostOpen}>
        <DialogContent className="max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <FullBlogPost post={selectedPost} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface FullBlogPostProps {
  post: BlogPost | null;
}

function FullBlogPost({ post }: FullBlogPostProps) {
  if (!post) return null;

  const renderContent = (content: string) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(content.slice(lastIndex, match.index));
      }
      const language = match[1] || "text";
      const code = match[2].trim();
      parts.push(
        <SyntaxHighlighter
          key={match.index}
          language={language}
          style={tomorrow}
        >
          {code}
        </SyntaxHighlighter>
      );
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push(content.slice(lastIndex));
    }

    return parts.map((part, index) =>
      typeof part === "string" ? (
        <p key={index} className="mb-4">
          {part}
        </p>
      ) : (
        part
      )
    );
  };

  return (
    <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg">
      <div className="mb-6">
        <h2 className="text-3xl font-light text-gray-800 dark:text-gray-200">
          {post.title}
        </h2>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2">
          <Calendar className="w-4 h-4 mr-2" />
          {post.publishedAt}
        </div>
      </div>
      {post.mainImage && (
        <div className="mb-6">
          <Image
            src={post.mainImage.asset.url}
            alt={post.mainImage.alt}
            width={800}
            height={400}
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      )}
      <div className="prose dark:prose-invert max-w-none mb-6">
        <PortableText value={post.content} />
      </div>
      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
          >
            <Tag className="w-3 h-3 mr-1" />
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
