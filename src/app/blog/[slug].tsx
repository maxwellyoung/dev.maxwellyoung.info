// pages/blog/[slug].tsx
import { GetStaticProps, GetStaticPaths } from "next";
import { getPostBySlug, getPostSlugs } from "../../../lib/mdx";
import BlogPost from "../../components/BlogPost";

type BlogProps = {
  post: {
    slug: string;
    contentHtml: string;
    title: string;
    author: string;
    category: string;
  };
};

const Blog: React.FC<BlogProps> = ({ post }) => {
  return <BlogPost meta={post} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getPostSlugs().map((slug) => ({
    params: { slug: slug.replace(/\.mdx/, "") },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.slug) {
    return {
      notFound: true,
    };
  }

  const post = await getPostBySlug(params.slug as string);

  return {
    props: {
      post,
    },
  };
};

export default Blog;
