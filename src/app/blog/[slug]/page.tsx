"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { Calendar, Tag } from "lucide-react";
import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { formatDate } from "@/lib/utils";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-03-21",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

const PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
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
    code: ({ value }: any) => {
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
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ value, children }: any) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-blue-500 hover:underline"
          target="_blank"
        >
          {children}
        </a>
      );
    },
    code: ({ children }: any) => (
      <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc ml-4 mb-4">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal ml-4 mb-4">{children}</ol>
    ),
  },
};

export default function BlogPost() {
  const params = useParams();
  const [post, setPost] = useState<any>(null);
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
      } catch (error) {
        console.error("Error fetching post:", error);
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
          />
        </div>
      )}

      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      <div className="flex gap-4 mb-8 text-gray-600">
        <time dateTime={post.publishedAt}>
          <Calendar className="w-4 h-4 inline mr-2" />
          {formatDate(post.publishedAt, "long")}
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
          components={PortableTextComponents}
        />
      </div>
    </article>
  );
}
