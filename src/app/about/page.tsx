import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "About | Maxwell Young",
  description:
    "Design engineer at Silk. React, React Native, TypeScript. 3+ years shipping apps. Previously Spark NZ.",
  alternates: {
    canonical: "https://dev.maxwellyoung.info/",
  },
};

export default function AboutPage() {
  redirect("/");
}
