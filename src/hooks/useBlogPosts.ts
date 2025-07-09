import { useState, useEffect } from "react";
import { client } from "@/lib/sanity";
import { BlogPost } from "@/lib/types";

export function useBlogPosts() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        setLoading(true);
        const query = `*[_type == "blogPost"] {
          _id,
          title,
          slug,
          publishedAt,
          excerpt,
          content[] {
            ...,
            _type == "image" => {
              "asset": asset->
            },
            _type == "code" => {
              ...,
              language,
              filename,
              code
            }
          },
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
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
      } finally {
        setLoading(false);
      }
    }

    fetchBlogPosts();
  }, []);

  return { blogPosts, loading, error };
}
