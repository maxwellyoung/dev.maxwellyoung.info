import Link from "next/link";
import Projects from "./projects/page";
import Resume from "./resume/page"; // Adjust the path based on where your Resume component is located

export default function Home() {
  return (
    <div className="min-h-screen bg-[#111110] text-white p-8 flex flex-col justify-between">
      <div>
        <header className="text-center my-12">
          <h1 className="text-5xl font-bold font-robotoMono">Maxwell Young</h1>
          <p className="text-2xl text-gray-400 font-robotoMono mt-4">
            Software Engineer
          </p>
        </header>
        <div className="flex flex-col items-center space-y-8">
          <p className="text-center text-gray-400 max-w-2xl">
            Energetic Full Stack Web Developer pursuing a Bachelors degree in
            Computer and Information Sciences, specialising in Software
            Development and Data Science at Auckland University of Technology.
            Proven track record of delivering intuitive and user-centred web
            solutions using modern technologies. Seeking roles that challenge my
            skills and allow me to contribute to innovative projects within the
            tech industry.
          </p>

          <div className="flex space-x-4 mt-6">
            <a
              href="#projects"
              className="px-4 py-2 text-sm font-medium text-gray-900 bg-white rounded-md hover:bg-gray-200 transition duration-300 ease-in-out transform hover:scale-105"
            >
              View Projects
            </a>
            <a
              href="#resume"
              className="px-4 py-2 text-sm font-medium text-white bg-transparent border border-white rounded-md hover:bg-white hover:text-gray-900 transition duration-300 ease-in-out transform hover:scale-105"
            >
              View Resume
            </a>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <Projects />
      </div>
      <section
        id="resume"
        className="min-h-screen bg-white text-black p-6 flex flex-col items-center mt-12"
      >
        <Resume />
      </section>
    </div>
  );
}
