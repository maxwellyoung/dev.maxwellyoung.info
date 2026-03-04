import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { BlogPost } from "@/lib/types";

const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION?.replace(/^v/, "") ||
  "2024-03-21";

export const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion,
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const query = `*[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    "excerpt": coalesce(excerpt, ""),
    "tags": coalesce(tags, []),
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    }
  }`;
  return client.fetch(query);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const query = `*[_type == "blogPost" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    publishedAt,
    "excerpt": coalesce(excerpt, ""),
    content[] {
      ...,
      _type == "image" => {
        ...,
        "asset": asset->
      },
      _type == "code" => {
        ...,
        language,
        filename,
        code
      }
    },
    "tags": coalesce(tags, []),
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    }
  }`;
  return client.fetch(query, { slug });
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const query = `*[_type == "blogPost" && defined(slug.current)]{
    "slug": slug.current
  }`;
  const posts: Array<{ slug: string }> = await client.fetch(query);
  return posts.map((post) => post.slug);
}
