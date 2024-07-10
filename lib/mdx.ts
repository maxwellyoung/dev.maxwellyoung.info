// lib/mdx.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Processor } from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkHtml from "remark-html";

const unified = require("unified");
const processor = unified()
  .use(remarkParse)
  .use(remarkStringify)
  .use(remarkFrontmatter, ["yaml"])
  .use(remarkHtml);

const postsDirectory = path.join(process.cwd(), "posts"); // Update 'posts' to match your folder name

export function getPostSlugs(): string[] {
  return fs.readdirSync(postsDirectory);
}

export async function getPostBySlug(slug: string): Promise<any> {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await processor.process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...data,
  };
}
