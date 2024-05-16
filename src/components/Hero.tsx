import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center bg-white p-4 text-center">
      <Image
        src="/avatar.jpg"
        alt="Profile Picture"
        width={150}
        height={150}
        className="mb-4 rounded-full"
      />
      <h1 className="mb-2 text-4xl font-bold">Maxwell Young</h1>
      <p className="mb-2 text-lg text-gray-700"></p>
      <p className="text-md mb-4 text-gray-700">Aspiring Design Engineer.</p>
      <a
        href="#projects"
        className="mt-4 cursor-pointer rounded-full bg-red-500 px-6 py-2 text-white hover:bg-red-600"
        style={{ scrollBehavior: "smooth" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
          />
        </svg>
      </a>
    </div>
  );
};

export default Hero;
