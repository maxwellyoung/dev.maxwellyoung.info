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
