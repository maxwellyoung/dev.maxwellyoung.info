import type {Metadata} from "next";
import MaxwellOS from "@/components/maxwell-os/MaxwellOS";
export const metadata:Metadata={title:"Maxwell OS",description:"A fictional desktop system by Maxwell Young."};
export default function OSPage(){return <MaxwellOS/>}
