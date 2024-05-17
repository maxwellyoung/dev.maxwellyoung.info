import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const testimonials = [
  {
    name: "John Doe",
    feedback:
      "Maxwell is an incredible developer. His attention to detail and commitment to quality are outstanding.",
  },
  {
    name: "Jane Smith",
    feedback:
      "Working with Maxwell has been a pleasure. He delivered exactly what we needed and more.",
  },
];

const Testimonials = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-2xl font-bold">Testimonials</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader>
                <CardTitle>{testimonial.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>&quot;{testimonial.feedback}&quot;</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
