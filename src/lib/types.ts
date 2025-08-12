import { projects } from "@/lib/projects";

export type Project = (typeof projects)[0];

export interface BlogPost {
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
