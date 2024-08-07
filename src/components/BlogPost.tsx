// components/BlogPost.tsx
import Image from "next/image";
import Link from "next/link";

type BlogPostProps = {
  meta: {
    title: string;
    author: string;
    category: string;
  };
};

const BlogPost: React.FC<BlogPostProps> = ({ meta }) => {
  return (
    <div className="relative w-full bg-zinc-950 p-6 flex flex-col items-center fade-in">
      <div className="max-w-4xl w-full">
        <div className="flex justify-between items-center mb-6">
          <div>
            <span className="block text-3xl font-bold text-white font-robotoMono">
              {meta.title}
            </span>
            <span className="block text-xl font-normal text-zinc-400 font-robotoMono">
              {meta.author}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/MaxwellYoung_CV.pdf" legacyBehavior>
              <a
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-opacity-15 bg-[#EA2D42] border border-[#EA2D42] rounded-md hover:bg-transparent hover:text-[#EA2D42] transition duration-300 ease-in-out transform hover:scale-105"
                download
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
                Download Resume
              </a>
            </Link>
            <Image
              className="w-18 h-18 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
              src="/avatar.webp"
              alt="Profile"
              width={72}
              height={72}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative">
              <span className="block text-xs font-normal text-zinc-400 font-inter uppercase tracking-wide mb-2">
                {meta.category}
              </span>
            </div>
            <div className="mb-4">
              <div>
                <span className="block text-sm font-bold text-white font-inter">
                  Full Stack Web Developer
                </span>
              </div>
              <span className="block text-sm font-normal text-zinc-400 font-inter">
                Freelance
              </span>
              <span className="block text-xs font-normal text-zinc-500 font-inter">
                Apr 2023 - Present, Auckland
              </span>
              <ul className="list-disc pl-5 mt-2 text-sm font-normal text-zinc-400 font-inter">
                <li>
                  Developed a portfolio site for motion designer Tom Crampin,
                  enhancing user experience with responsive designs and dynamic
                  animations using Tailwind and Framer Motion.
                </li>
                <li>
                  Utilised Next.js to ensure high performance across devices,
                  constantly exploring new front-end technologies to stay ahead
                  of industry trends.
                </li>
                <li>
                  Developing personal finance tracker and study assistant mobile
                  apps using React Native and Expo, focusing on improving
                  personal productivity and financial management.
                </li>
                <li>
                  Committed to continuous learning through online courses,
                  workshops, and collaboration with other developers to upskill
                  in various fields.
                </li>
              </ul>
            </div>
            <div className="mb-8">
              <div>
                <span className="block text-sm font-bold text-white font-inter mt-4">
                  Data Intelligence UI Developer
                </span>
              </div>
              <span className="block text-sm font-normal text-zinc-400 font-inter">
                Spark New Zealand
              </span>
              <span className="block text-xs font-normal text-zinc-500 font-inter">
                Nov 2022 - Apr 2023, Auckland
              </span>
              <ul className="list-disc pl-5 mt-2 text-sm font-normal text-zinc-400 font-inter">
                <li>
                  Designed and developed the front end of an internal dashboard
                  application.
                </li>
                <li>
                  Translated PowerBI dashboard into Figma design, integrating
                  machine learning algorithms.
                </li>
                <li>
                  Implemented front-end using React and Next.js, increasing
                  productivity by 20%.
                </li>
                <li>
                  Collaborated with product team and stakeholders for usability.
                </li>
                <li>Conducted user testing to refine the UI.</li>
              </ul>
            </div>
            <div className="relative">
              <span className="block text-xs font-normal text-zinc-400 font-inter uppercase tracking-wide mb-2">
                Education
              </span>
            </div>
            <div className="mb-4">
              <div>
                <span className="block text-sm font-bold text-white font-inter">
                  B.Sc. Computer and Information Sciences (Software Development
                  and Data Science)
                </span>
              </div>
              <span className="block text-sm font-normal text-zinc-400 font-inter">
                Auckland University of Technology
              </span>
              <span className="block text-xs font-normal text-zinc-500 font-inter">
                2024 - 2026 (Expected), Auckland
              </span>
            </div>
            <div>
              <div>
                <span className="block text-sm font-bold text-white font-inter mt-4">
                  Certificate - Level 6 Web Development Training Scheme
                </span>
              </div>
              <span className="block text-sm font-normal text-zinc-400 font-inter">
                Dev Academy Aotearoa
              </span>
              <span className="block text-xs font-normal text-zinc-500 font-inter">
                2022, Wellington
              </span>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="mt-8 lg:mt-0">
              <div>
                <span className="block text-sm font-bold text-zinc-400 font-inter">
                  Contact Information
                </span>
              </div>
              <span className="block text-sm font-normal text-zinc-400 font-inter mt-2">
                maxtheyoung@gmail.com
                <br />
                +64 020 4134 9603
                <br />
                Auckland
              </span>
            </div>
            <div className="mt-8">
              <div>
                <span className="block text-sm font-bold text-zinc-400 font-inter">
                  Web Development
                </span>
              </div>
              <span className="block text-sm font-normal text-zinc-400 font-inter mt-2">
                Full Stack Web Development
                <br />
                UI/UX Design
                <br />
                Responsive Web Design
              </span>
            </div>
            <div className="mt-8">
              <div>
                <span className="block text-sm font-bold text-zinc-400 font-inter">
                  Collaboration & Methodologies
                </span>
              </div>
              <span className="block text-sm font-normal text-zinc-400 font-inter mt-2">
                Agile and Scrum Methodologies
                <br />
                Cross-functional Team Collaboration
              </span>
            </div>
            <div className="mt-8">
              <div>
                <span className="block text-sm font-bold text-zinc-400 font-inter">
                  Tools & Technologies
                </span>
              </div>
              <span className="block text-sm font-normal text-zinc-400 font-inter mt-2">
                Database Management
                <br />
                Cloud Services (AWS, Azure)
                <br />
                Automated Testing (Jest)
                <br />
                Git & Version Control
                <br />
                TypeScript & JavaScript
                <br />
                React, React Native, Next.js
                <br />
                PHP
                <br />
                C, C++, Go
                <br />
                CSS, Tailwind
                <br />
                Figma
                <br />
                Adobe Creative Suite
              </span>
            </div>
            <div className="mt-8">
              <div>
                <span className="block text-sm font-bold text-zinc-400 font-inter">
                  Social
                </span>
              </div>
              <span className="block text-sm font-normal text-zinc-400 font-inter underline mt-2">
                maxwellyoung.info
                <br />
                github.com/maxwellyoung
                <br />
                linkedin.com/in/maxwellyoung
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
