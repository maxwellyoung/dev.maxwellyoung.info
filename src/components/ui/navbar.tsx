import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/projects">Projects</Link>
      <Link href="/resume">Resume</Link>
    </nav>
  );
};

export default Navbar;
