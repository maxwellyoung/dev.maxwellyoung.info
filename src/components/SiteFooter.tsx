import Link from "next/link";
import { TrackedActionLink } from "@/components/TrackedActionLink";

export function SiteFooter() {
  return (
    <footer className="mt-16 py-8 border-t border-border/50">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span className="text-border/40">·</span>
        <Link href="/#projects" className="hover:text-foreground transition-colors">
          Projects
        </Link>
        <span className="text-border/40">·</span>
        <Link href="/about" className="hover:text-foreground transition-colors">
          About
        </Link>
        <span className="text-border/40">·</span>
        <Link href="/craft" className="hover:text-foreground transition-colors">
          Lab
        </Link>
        <span className="text-border/40">·</span>
        <TrackedActionLink
          href="/work-with-me"
          eventName="footer_nav_clicked"
          eventProps={{ target: "work_with_me" }}
          className="hover:text-foreground transition-colors"
        >
          Work With Me
        </TrackedActionLink>
        <span className="text-border/40">·</span>
        <TrackedActionLink
          href="https://www.ninetynine.digital?utm_source=dev.maxwellyoung.info&utm_medium=referral&utm_campaign=global_footer"
          external
          eventName="footer_nav_clicked"
          eventProps={{ target: "ninetynine_studio" }}
          className="hover:text-foreground transition-colors"
        >
          ninetynine
        </TrackedActionLink>
        <span className="text-border/40">·</span>
        <Link href="/contact" className="hover:text-foreground transition-colors">
          Contact
        </Link>
        <span className="text-border/40">·</span>
        <Link href="/privacy" className="hover:text-foreground transition-colors">
          Privacy
        </Link>
      </div>
    </footer>
  );
}
