// pages/index.tsx

import Link from "next/link";
import Resume from "./resume/page"; // Adjust the path based on your project structure

export default function Home() {
  return (
    <div className="min-h-screen text-white p-4 md:p-8 flex flex-col justify-between bg-neutral-900">
      <main className="max-w-2xl mx-auto text-zinc-300 space-y-8 overflow-y-auto">
        <section className="flex flex-col justify-center items-left min-h-screen space-y-8 p-4 md:p-8">
          <header className="mb-12">
            <a href="/" className="text-xl text-zinc-200 font-medium">
              Maxwell Young
            </a>
            <p className="text-xl font-light text-gray-400">Design Engineer</p>
          </header>

          <div className="leading-relaxed">
            <h2 className="font-medium mb-6">Today</h2>
            <div></div>
            <p className="text-gray-400">
              Currently studying a Bachelor of Computer Science at Auckland
              University of Technology, majoring in Software Development and
              Data Science.
            </p>
            <p className="text-gray-400">
              I&apos;m passionate about making software simple with intention
              and principles to elevate user experiences and solve everyday
              issues.
            </p>
            <p className="text-gray-400">
              I&apos;ve also been releasing{" "}
              <a
                href="https://music.maxwellyoung.info/"
                className="underline hover:text-zinc-300"
              >
                music
              </a>{" "}
              under my own name since 2015.
            </p>
          </div>

          <div className="leading-relaxed">
            <h2 className="font-medium mb-6">Previously</h2>
            <p className="text-gray-400">
              I&apos;ve previously been a UI Developer at Spark New Zealand and
              graduated from the web development bootcamp Dev Academy Aotearoa.
            </p>
          </div>

          <div className="leading-relaxed">
            <h2 className="font-medium mb-6">More</h2>
            <p className="text-gray-400">
              You can see my work here soon, my resume below, & more of my code
              on{" "}
              <Link
                href="https://github.com/maxwellyoung"
                target="_blank"
                className="underline hover:text-zinc-300"
              >
                GitHub
              </Link>
              .
            </p>
          </div>
        </section>

        <section id="resume">
          <Resume />
        </section>
      </main>
    </div>
  );
}
