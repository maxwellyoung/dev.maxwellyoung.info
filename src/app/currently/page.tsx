"use client";

import React from "react";

export default function Currently() {
  const books = [
    {
      title: "Designing Data-Intensive Applications",
      author: "Martin Kleppmann",
    },
    {
      title: "Clean Architecture",
      author: "Robert C. Martin",
    },
    {
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt & David Thomas",
    },
  ];

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-8 fade-in">
      <div>
        <h1 className="text-2xl font-medium mb-4">Currently Reading</h1>
        <ul className="space-y-4">
          {books.map((book) => (
            <li key={book.title}>
              <p className="font-semibold text-zinc-800 dark:text-zinc-200">
                {book.title}
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {book.author}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
