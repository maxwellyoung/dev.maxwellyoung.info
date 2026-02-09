"use client";

import React, { useEffect, useState, ReactNode } from "react";
import { useParams } from "next/navigation";
import {
  PortableText,
  PortableTextComponents,
  PortableTextBlock,
} from "@portabletext/react";
import Image from "next/image";
import { Calendar, Tag } from "lucide-react";
import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { formatDate } from "@/lib/utils";
import { Prism as SyntaxHighlighterBase } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

// Type assertion to fix React 19 compatibility
const SyntaxHighlighter = SyntaxHighlighterBase as typeof SyntaxHighlighterBase & React.FC<any>;

const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-03-21",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

interface SanityImageSource {
  asset?: { _ref?: string };
  alt?: string;
}

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

interface BlogPost {
  title: string;
  publishedAt: string;
  content: PortableTextBlock[];
  tags?: string[];
  mainImage?: {
    asset: { _id: string; url: string };
    alt?: string;
  };
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImageSource }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="relative w-full h-96 my-6">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || " "}
            width={800}
            height={600}
            className="object-cover rounded-lg"
          />
        </div>
      );
    },
    code: ({
      value,
    }: {
      value: { code?: string; language?: string; filename?: string };
    }) => {
      if (!value?.code) {
        return null;
      }
      return (
        <div className="my-6">
          {value.filename && (
            <div className="bg-gray-800 text-gray-200 px-4 py-2 text-sm rounded-t-lg">
              {value.filename}
            </div>
          )}
          <SyntaxHighlighter
            language={value.language || "typescript"}
            style={tomorrow}
            className="rounded-b-lg"
          >
            {value.code}
          </SyntaxHighlighter>
        </div>
      );
    },
  },
  block: {
    h1: ({ children }: { children?: ReactNode }) => (
      <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }: { children?: ReactNode }) => (
      <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children?: ReactNode }) => (
      <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>
    ),
    normal: ({ children }: { children?: ReactNode }) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: { children?: ReactNode }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({
      value,
      children,
    }: {
      value?: { href?: string };
      children?: ReactNode;
    }) => {
      const href = value?.href || "#";
      const rel = !href.startsWith("/") ? "noreferrer noopener" : undefined;
      return (
        <a
          href={href}
          rel={rel}
          className="text-blue-500 hover:underline"
          target="_blank"
        >
          {children}
        </a>
      );
    },
    code: ({ children }: { children?: ReactNode }) => (
      <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }: { children?: ReactNode }) => (
      <ul className="list-disc ml-4 mb-4">{children}</ul>
    ),
    number: ({ children }: { children?: ReactNode }) => (
      <ol className="list-decimal ml-4 mb-4">{children}</ol>
    ),
  },
};

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const query = `*[_type == "blogPost" && slug.current == $slug][0]{
          title,
          publishedAt,
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
        const fetchedPost = await client.fetch(query, { slug: params.slug });
        setPost(fetchedPost);
      } catch {
        // Error fetching post - silently fail
      } finally {
        setIsLoading(false);
      }
    }

    if (params.slug) {
      fetchPost();
    }
  }, [params.slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl">Post not found</h1>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      {post.mainImage && (
        <div className="relative w-full h-[400px] mb-8">
          <Image
            src={post.mainImage.asset.url}
            alt={post.mainImage.alt || post.title}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>
      )}

      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      <div className="flex gap-4 mb-8 text-gray-600">
        <time dateTime={post.publishedAt}>
          <Calendar className="w-4 h-4 inline mr-2" />
          {formatDate(post.publishedAt)}
        </time>
        {post.tags && (
          <div className="flex gap-2">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <PortableText
          value={post.content}
          components={portableTextComponents}
        />
      </div>
    </article>
  );
}
