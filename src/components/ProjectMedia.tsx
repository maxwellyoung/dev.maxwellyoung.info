import Image from "next/image";
import type { Project } from "@/lib/projects";

type ProjectMediaVariant = "row" | "detail" | "hover";

const toneClasses = {
  slate: {
    surface: "bg-slate-950 text-white",
    accent: "bg-slate-400/20 text-slate-100",
    line: "border-white/10",
    glow: "bg-slate-300/10",
  },
  teal: {
    surface: "bg-teal-950 text-white",
    accent: "bg-teal-300/20 text-teal-50",
    line: "border-white/10",
    glow: "bg-cyan-300/10",
  },
  amber: {
    surface: "bg-stone-950 text-white",
    accent: "bg-amber-300/20 text-amber-50",
    line: "border-white/10",
    glow: "bg-amber-300/10",
  },
  forest: {
    surface: "bg-emerald-950 text-white",
    accent: "bg-emerald-300/20 text-emerald-50",
    line: "border-white/10",
    glow: "bg-lime-300/10",
  },
  plum: {
    surface: "bg-neutral-950 text-white",
    accent: "bg-fuchsia-300/20 text-fuchsia-50",
    line: "border-white/10",
    glow: "bg-fuchsia-300/10",
  },
} as const;

interface ProjectMediaProps {
  project: Pick<Project, "name" | "description" | "screenshots" | "thumb" | "cover" | "tags">;
  variant: ProjectMediaVariant;
  priority?: boolean;
  sizes?: string;
}

function getCopyLimit(variant: ProjectMediaVariant) {
  if (variant === "detail") return 110;
  if (variant === "hover") return 66;
  return 58;
}

function clampCopy(text: string, max: number) {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

function ProjectBrandCover({
  project,
  variant,
}: {
  project: ProjectMediaProps["project"];
  variant: ProjectMediaVariant;
}) {
  const tone = toneClasses[project.cover?.tone ?? "slate"];
  const isCompact = variant === "row";
  const isHover = variant === "hover";
  const summary = clampCopy(
    project.cover?.summary ?? project.description,
    getCopyLimit(variant),
  );
  const kicker = project.cover?.kicker ?? "Selected work";
  const tags = isCompact ? [] : (project.tags ?? []).slice(0, variant === "detail" ? 4 : 2);

  return (
    <div className={`absolute inset-0 overflow-hidden ${tone.surface}`}>
      <div className={`absolute inset-0 ${tone.glow}`} />
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
      <div className="absolute right-4 top-4 h-16 w-16 rounded-full border border-white/10 bg-white/5 blur-2xl" />
      <div className={`relative flex h-full flex-col justify-between ${isCompact ? "p-2.5" : "p-4 sm:p-5"}`}>
        <div className={isCompact ? "space-y-1.5" : "space-y-2"}>
          <span
            className={`inline-flex items-center rounded-full font-medium uppercase tracking-[0.16em] ${tone.accent} ${
              isCompact ? "px-2 py-0.5 text-[0.52rem]" : "min-h-7 px-2.5 py-1 text-[0.62rem]"
            }`}
          >
            {kicker}
          </span>
          <div className={`w-full border-t ${tone.line}`} />
        </div>

        <div className={isCompact ? "space-y-1.5" : "space-y-3"}>
          <div>
            <p className={isCompact ? "text-xs font-medium leading-tight" : "text-lg font-medium leading-tight sm:text-xl"}>
              {project.name}
            </p>
            {!isCompact && (
              <p
                className={`mt-2 max-w-[28rem] leading-relaxed text-white/70 ${
                  isHover ? "text-[0.78rem]" : "text-sm sm:text-[0.95rem]"
                }`}
              >
                {summary}
              </p>
            )}
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[0.68rem] text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const conceptFrames = {
  silk: ["WRITE", "ARCHIVE", "MEDIA"],
  whakapapa: ["SCAN", "EXTRACT", "REVIEW"],
  "receipt-radar": ["CAPTURE", "NORMALIZE", "COMPARE"],
} as const;

function ProjectConceptCover({
  project,
  variant,
}: {
  project: ProjectMediaProps["project"];
  variant: ProjectMediaVariant;
}) {
  const tone = toneClasses[project.cover?.tone ?? "slate"];
  const isCompact = variant === "row";
  const isHover = variant === "hover";
  const conceptKey = project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const frames = conceptFrames[conceptKey as keyof typeof conceptFrames] ?? ["BUILD", "SHIP", "LEARN"];
  const summary = clampCopy(
    project.cover?.summary ?? project.description,
    getCopyLimit(variant),
  );

  return (
    <div className={`absolute inset-0 overflow-hidden ${tone.surface}`}>
      <div className={`absolute inset-0 ${tone.glow}`} />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -right-12 -top-10 h-36 w-36 rounded-full border border-white/10 bg-white/5 blur-2xl" />
      <div className={`relative flex h-full flex-col ${isCompact ? "justify-center p-2.5" : "justify-between p-4 sm:p-5"}`}>
        {!isCompact && (
          <div className="flex items-center justify-between gap-3">
            <span className={`inline-flex items-center rounded-full font-medium uppercase tracking-[0.16em] ${tone.accent} ${isHover ? "px-2 py-0.5 text-[0.56rem]" : "min-h-7 px-2.5 py-1 text-[0.62rem]"}`}>
              {project.cover?.kicker ?? "Selected work"}
            </span>
            <div className="flex gap-1.5">
              {[0, 1, 2].map((index) => (
                <span key={index} className="h-1.5 w-1.5 rounded-full bg-white/35" />
              ))}
            </div>
          </div>
        )}

        <div className={isCompact ? "space-y-1.5" : "space-y-4"}>
          <div className={`grid gap-1.5 ${isCompact ? "grid-cols-3" : "grid-cols-3"}`}>
            {frames.map((frame, index) => (
              <div
                key={frame}
                className={`rounded-md border border-white/10 bg-white/[0.07] ${isCompact ? "h-8 p-1" : "min-h-16 p-2.5"}`}
              >
                <div className="mb-2 h-1 w-6 rounded-full bg-white/35" />
                {!isCompact && (
                  <>
                    <div className="mb-1.5 h-1.5 rounded-full bg-white/20" />
                    <div className="h-1.5 w-2/3 rounded-full bg-white/15" />
                  </>
                )}
                <p className={`mt-auto font-medium text-white/75 ${isCompact ? "text-[0.42rem]" : "text-[0.55rem] tracking-[0.14em]"}`}>
                  {index + 1}. {frame}
                </p>
              </div>
            ))}
          </div>

          <div>
            <p className={isCompact ? "truncate text-xs font-medium leading-tight" : "text-lg font-medium leading-tight sm:text-xl"}>
              {project.name}
            </p>
            {!isCompact && (
              <p className={`mt-2 max-w-[30rem] leading-relaxed text-white/70 ${isHover ? "text-[0.78rem]" : "text-sm sm:text-[0.95rem]"}`}>
                {summary}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectImageCover({
  src,
  alt,
  objectPosition,
  sizes,
  priority,
  className,
}: {
  src: string;
  alt: string;
  objectPosition?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className ?? "object-cover"}
      style={objectPosition ? { objectPosition } : undefined}
    />
  );
}

export function ProjectMedia({
  project,
  variant,
  priority = false,
  sizes = "100vw",
}: ProjectMediaProps) {
  const cover = project.cover;
  const imageSrc = cover?.src ?? project.thumb ?? project.screenshots?.[0];
  const imageAlt = cover?.alt ?? `${project.name} preview`;

  if (cover?.variant === "concept") {
    return <ProjectConceptCover project={project} variant={variant} />;
  }

  if (cover?.variant === "brand" || !imageSrc) {
    return <ProjectBrandCover project={project} variant={variant} />;
  }

  if (cover?.variant === "device") {
    const tone = toneClasses[cover.tone ?? "slate"];

    return (
      <div className={`absolute inset-0 overflow-hidden ${tone.surface}`}>
        <div className={`absolute inset-0 ${tone.glow}`} />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-black/20" />

        <div className="relative flex h-full items-center justify-center p-4 sm:p-6">
          <div className="relative h-full max-h-full w-[42%] min-w-[7rem] max-w-[13rem] overflow-hidden rounded-[1.6rem] border border-white/12 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            <div className="absolute inset-x-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black/80" />
            <ProjectImageCover
              src={imageSrc}
              alt={imageAlt}
              objectPosition={cover.objectPosition ?? "center top"}
              sizes={sizes}
              priority={priority}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <ProjectImageCover
        src={imageSrc}
        alt={imageAlt}
        objectPosition={cover?.objectPosition}
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
    </>
  );
}
