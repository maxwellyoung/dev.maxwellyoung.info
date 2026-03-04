import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { Calendar, Tag } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { PortableTextComponents } from "@/components/PortableTextComponents";
import { getBlogPostBySlug } from "@/lib/sanity";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found | Maxwell Young",
    };
  }

  const description =
    post.excerpt?.slice(0, 160) || `Read ${post.title} on Maxwell Young's blog.`;

  return {
    title: `${post.title} | Maxwell Young`,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      images: post.mainImage?.asset?.url
        ? [{ url: post.mainImage.asset.url, alt: post.mainImage.alt || post.title }]
        : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      {post.mainImage?.asset?.url && (
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

      <div className="flex flex-wrap gap-4 mb-8 text-gray-600">
        <time dateTime={post.publishedAt}>
          <Calendar className="w-4 h-4 inline mr-2" />
          {formatDate(post.publishedAt)}
        </time>
        {(post.tags || []).length > 0 && (
          <div className="flex gap-2">
            {(post.tags || []).map((tag) => (
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
        <PortableText value={post.content || []} components={PortableTextComponents} />
      </div>
    </article>
  );
}
