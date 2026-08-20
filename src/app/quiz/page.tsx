import type {Metadata} from "next";import Quiz from "./quiz";
export const metadata:Metadata={title:"How well do you know Maxwell Young?",description:"A music-first Maxwell Professional personnel verification quiz.",alternates:{canonical:"https://dev.maxwellyoung.info/quiz"}};
export default function Page(){return <Quiz/>}
