import Link from "next/link";
import Resume from "./resume/page";
import Projects from "./projects/page";

export default function Home() {
  return (
    <div className="min-h-screen dark:text-white text-zinc-800p-4 md:p-8 flex flex-col justify-between ">
      <main className="max-w-2xl mx-auto text-zinc-300 space-y-8 overflow-y-auto">
        <section className="flex flex-col justify-center items-left min-h-screen space-y-8 p-4 md:p-8">
          <header className="mb-12">
            <a
              href="/"
              className="text-xl dark:text-zinc-200 text-zinc-800 font-medium"
            >
              Maxwell Young
            </a>
            <p className="text-xl font-light dark:text-zinc-400 text-zinc-600">
              Design Engineer
            </p>
          </header>

          <div className="leading-relaxed">
            <h2 className="font-medium mb-6 dark:text-zinc-300 text-zinc-800">
              Today
            </h2>
            <div></div>
            <p className="dark:text-zinc-400 text-zinc-500">
              Currently studying a Bachelor of Computer Science at Auckland
              University of Technology, majoring in Software Development and
              Data Science.
            </p>
            <p className="dark:text-zinc-400 text-zinc-500">
              I&apos;m passionate about making software simple with intention
              and principles to elevate user experiences and solve everyday
              issues.
            </p>
            <p className="dark:text-zinc-400 text-zinc-500">
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
            <h2 className="font-medium mb-6 dark:text-zinc-300 text-zinc-800">
              Previously
            </h2>
            <p className="dark:text-zinc-400 text-zinc-500">
              I&apos;ve previously been a UI Developer at Spark New Zealand and
              graduated from the web development bootcamp Dev Academy Aotearoa.
            </p>
          </div>

          <div className="leading-relaxed">
            <h2 className="font-medium mb-6 dark:text-zinc-300 text-zinc-800">
              More
            </h2>
            <p className="dark:text-zinc-400 text-zinc-500">
              You can see my work{" "}
              <Link
                href="#projects"
                target="_blank"
                className="underline hover:dark:text-zinc-300"
              >
                here,
              </Link>{" "}
              my resume{" "}
              <Link
                href="#resume"
                target="_blank"
                className="underline hover:dark:text-zinc-300"
              >
                here
              </Link>
              , & more of my code on{" "}
              <Link
                href="https://github.com/maxwellyoung"
                target="_blank"
                className="underline hover:dark:text-zinc-300"
              >
                GitHub
              </Link>
              .
            </p>
          </div>
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="resume">
          <Resume />
        </section>
      </main>
    </div>
  );
}
