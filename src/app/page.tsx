import Link from "next/link";
import Resume from "./resume/page";
import Projects from "./projects/page";

export default function Home() {
  return (
    <div className="min-h-screen dark:text-white text-zinc-800 p-4 md:p-8 flex flex-col justify-between">
      <main className="max-w-2xl mx-auto text-zinc-300 space-y-8 overflow-y-auto">
        <section className="flex flex-col justify-center items-left min-h-screen space-y-8 p-4 md:p-8">
          <header className="mb-12">
            <a
              href="/"
              className="text-xl glint dark:text-zinc-200 text-zinc-800 font-medium"
            >
              Maxwell Young
            </a>
            <p className="text-xl font-light dark:text-zinc-400 text-zinc-500">
              Design Engineer & Founder of ninetynine digital
            </p>
          </header>

          <div className="leading-relaxed">
            <h2 className="font-medium mb-6 dark:text-zinc-300 text-zinc-800">
              Today
            </h2>
            <p className="dark:text-zinc-400 text-zinc-500">
              I am currently studying for a Bachelor of Computer Science at
              Auckland University of Technology, majoring in Software
              Development and Data Science.
            </p>
            <p className="dark:text-zinc-400 text-zinc-500">
              I&apos;m passionate about making software simple with intention
              and principles to elevate user experiences and solve everyday
              issues.
            </p>
            <p className="dark:text-zinc-400 text-zinc-500">
              As the founder of{" "}
              <Link
                href={"https://ninetynine.digital/"}
                target="_blank"
                className="underline hover:dark:text-zinc-300"
              >
                ninetynine digital
              </Link>
              , I am developing{" "}
              <Link
                href={"https://studentview.app/"}
                target="_blank"
                className="underline hover:dark:text-zinc-300"
              >
                StudentView
              </Link>
              , a companion app designed to enhance the lives of students.
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
