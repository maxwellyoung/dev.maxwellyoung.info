import { redirect } from "next/navigation";

// The projects list lives on the home page; keep old /projects links working.
export default function ProjectsPage() {
  redirect("/#projects");
}
