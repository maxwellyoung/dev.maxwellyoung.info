"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type CompanyLogo = {
  company: string;
  href: string;
  sourceHref: string;
  logoSrc: string;
  logoBoxClassName: string;
  colorSrc?: string;
  colorMode?: "image" | "mask";
  colorClassName?: string;
  hoverSurfaceClassName: string;
};

const companyLogos: CompanyLogo[] = [
  {
    company: "University of Auckland",
    href: "https://www.auckland.ac.nz/",
    sourceHref:
      "https://www.auckland.ac.nz/etc.clientlibs/uoa-digital/clientlibs/resources/img/sprite.svg?v=9",
    logoSrc: "/company-logos/university-of-auckland.svg",
    logoBoxClassName: "h-10 w-full max-w-[11.5rem] sm:h-11 sm:max-w-[12rem]",
    hoverSurfaceClassName:
      "hover:bg-[#f6f7ff] dark:hover:bg-[#f6f7ff]",
  },
  {
    company: "Auckland University of Technology",
    href: "https://www.aut.ac.nz/",
    sourceHref:
      "https://www.aut.ac.nz/__data/assets/file/0007/651742/AUT-logo-tab-maori-web-version-only.svg",
    logoSrc: "/company-logos/aut.svg",
    logoBoxClassName:
      "h-[4.05rem] w-full max-w-[4.65rem] sm:h-[4.3rem] sm:max-w-[4.95rem]",
    colorMode: "mask",
    colorClassName: "bg-[#536972] dark:bg-[#a8b3b7]",
    hoverSurfaceClassName:
      "hover:bg-[#f3f5f4] dark:hover:bg-[#111415]",
  },
  {
    company: "Silk",
    href: "https://www.silk.cx/",
    sourceHref: "https://www.silk.cx/silkcxlogo.svg",
    logoSrc: "/company-logos/silk.svg",
    logoBoxClassName: "h-8 w-full max-w-[8rem] sm:h-[2.15rem] sm:max-w-[8.5rem]",
    hoverSurfaceClassName:
      "hover:bg-[#151526] dark:hover:bg-[#151526]",
  },
  {
    company: "Spark New Zealand",
    href: "https://www.spark.co.nz/",
    sourceHref:
      "https://www.spark.co.nz/content/dam/spark/images/brand-logos/spark/spark-light-logo.svg",
    logoSrc: "/company-logos/spark.svg",
    logoBoxClassName: "h-10 w-full max-w-[8.75rem] sm:h-11 sm:max-w-[9rem]",
    hoverSurfaceClassName:
      "hover:bg-[#fbf7ff] dark:hover:bg-[#fbf7ff]",
  },
];

const maskStyle = (src: string) => ({
  WebkitMask: `url(${src}) center / contain no-repeat`,
  mask: `url(${src}) center / contain no-repeat`,
});

const monoLogoClass =
  "absolute inset-0 bg-foreground opacity-55 transition duration-500 ease-out group-hover:scale-[0.98] group-hover:opacity-0 motion-reduce:transition-none";

const colorLogoClass =
  "absolute inset-0 opacity-0 scale-[0.98] object-contain transition duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 motion-reduce:transition-none";

type CompanyLogoStudyProps = {
  className?: string;
  compact?: boolean;
};

export function CompanyLogoStudy({
  className,
  compact = false,
}: CompanyLogoStudyProps) {
  return (
    <section
      className={cn(
        "border-y border-border/70",
        compact ? "py-5" : "py-6",
        className
      )}
      aria-labelledby="company-logo-study-heading"
    >
      <h2
        id="company-logo-study-heading"
        className="mb-4 text-xs font-medium uppercase tracking-normal text-muted-foreground"
      >
        Experience Marks
      </h2>

      <div className="grid grid-cols-2 overflow-hidden rounded-sm border border-border/70 sm:grid-cols-4">
        {companyLogos.map((logo, index) => (
          <a
            key={logo.company}
            href={logo.href}
            target="_blank"
            rel="noopener noreferrer"
            data-logo-source={logo.sourceHref}
            className={cn(
              "group flex min-h-[112px] items-center justify-center p-5 transition duration-500 ease-out focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:min-h-[116px]",
              logo.hoverSurfaceClassName,
              index % 2 === 0 && "border-r border-border/70",
              index < 2 && "border-b border-border/70 sm:border-b-0",
              index < companyLogos.length - 1 && "sm:border-r sm:border-border/70"
            )}
            aria-label={`${logo.company} website`}
          >
            <span
              aria-hidden="true"
              className={cn(
                "relative block shrink-0 transition-transform duration-500 ease-out group-hover:-translate-y-0.5 motion-reduce:transition-none",
                logo.logoBoxClassName
              )}
            >
              <span className={monoLogoClass} style={maskStyle(logo.logoSrc)} />
              {logo.colorMode === "mask" ? (
                <span
                  className={cn(colorLogoClass, logo.colorClassName)}
                  style={maskStyle(logo.logoSrc)}
                />
              ) : (
                <Image
                  src={logo.colorSrc ?? logo.logoSrc}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className={colorLogoClass}
                />
              )}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
