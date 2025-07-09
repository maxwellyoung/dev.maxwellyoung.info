import { PortableText } from "@portabletext/react";
import { BlogPost } from "@/lib/types";
import { PortableTextComponents } from "./PortableTextComponents";
import { formatDate } from "@/lib/utils";
import { Calendar, Tag } from "lucide-react";

interface FullBlogPostProps {
  post: BlogPost | null;
}

export function FullBlogPost({ post }: FullBlogPostProps) {
  if (!post) {
    return null;
  }

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Calendar className="w-4 h-4 mr-2" />
        {formatDate(post.publishedAt)}
      </div>
      <div className="prose dark:prose-invert max-w-none">
        <PortableText
          value={post.content}
          components={PortableTextComponents}
        />
      </div>
      <div className="flex flex-wrap gap-2 mt-6">
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
