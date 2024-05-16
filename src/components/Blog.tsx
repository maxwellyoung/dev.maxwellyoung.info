import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const blogPosts = [
  {
    title: "My Journey into Web Development",
    excerpt:
      "Read about how I started my career in web development and the challenges I faced along the way.",
    url: "/blog/my-journey-into-web-development",
  },
  {
    title: "Tips for Learning React",
    excerpt: "Here are some tips and resources that helped me master React.",
    url: "/blog/tips-for-learning-react",
  },
];

const Blog = () => {
  return (
    <div className="bg-gray-300 py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-2xl font-bold">Blog</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {blogPosts.map((post, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{post.excerpt}</p>
                <a href={post.url} className="text-blue-500 hover:underline">
                  Read More
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
