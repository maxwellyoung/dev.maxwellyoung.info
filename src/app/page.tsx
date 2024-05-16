import About from "~/components/About";
import Blog from "~/components/Blog";
import Contact from "~/components/Contact";
import Hero from "~/components/Hero";
import Projects from "~/components/Projects";
import Testimonials from "~/components/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <About />
      <Testimonials />
      <Contact />
    </>
  );
}
