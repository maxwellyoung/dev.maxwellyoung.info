import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const Contact = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                ></textarea>
              </div>
              <button
                type="submit"
                className="mt-4 rounded-full bg-red-500 px-6 py-2 text-white hover:bg-red-600"
              >
                Send Message
              </button>
            </form>
            <div className="mt-8 text-center">
              <p>
                Email:{" "}
                <a
                  href="mailto:maxwellyoung@example.com"
                  className="text-red-500 hover:underline"
                >
                  maxwellyoung@example.com
                </a>
              </p>
              <p>
                LinkedIn:{" "}
                <a href="#" className="text-red-500 hover:underline">
                  Maxwell Young
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
