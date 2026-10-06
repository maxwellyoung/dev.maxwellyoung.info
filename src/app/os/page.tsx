import type { Metadata } from "next";
import MaxwellOSLoader from "@/components/maxwell-os/MaxwellOSLoader";
export const metadata: Metadata = { title: "Maxwell OS", description: "Maxwell Young's portfolio laid out as a small desktop: his work, his iPhone apps, and what he is watching and listening to." };
export default function OSPage() { return <MaxwellOSLoader />; }
