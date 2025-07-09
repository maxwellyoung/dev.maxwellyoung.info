import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { urlFor } from "@/lib/sanity";

export const PortableTextComponents = {
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
            fill
            className="object-cover rounded-lg"
          />
        </div>
      );
    },
    code: ({ value }: any) => {
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
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-blue-500 hover:underline"
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
