// Sanity Portable Text block types
export interface PortableTextBlock {
  _type: "block";
  _key: string;
  style?: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
  children: {
    _type: "span";
    _key: string;
    text: string;
    marks?: string[];
  }[];
  markDefs?: {
    _type: string;
    _key: string;
    href?: string;
  }[];
}

export interface PortableTextImage {
  _type: "image";
  _key: string;
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

export type PortableTextContent = PortableTextBlock | PortableTextImage;

export interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  excerpt: string;
  content: PortableTextContent[];
  tags: string[];
  mainImage?: {
    asset: {
      _id: string;
      url: string;
    };
    alt: string;
  };
}
