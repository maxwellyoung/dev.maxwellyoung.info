import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const About = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-center text-2xl">About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-700">
              I am Maxwell Young, a passionate developer and designer from
              Auckland, New Zealand. My journey into web development has been
              fueled by a love for creating beautiful and functional user
              experiences. I specialize in web development with a focus on
              modern, responsive design, using technologies like React, Next.js,
              TypeScript, and TailwindCSS.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
