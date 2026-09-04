import type { Metadata } from "next";
import MaxwellOSLoader from "@/components/maxwell-os/MaxwellOSLoader";
export const metadata: Metadata = { title: "Maxwell OS", description: "A fictional desktop system by Maxwell Young. The files are real." };
export default function OSPage() { return <MaxwellOSLoader />; }
