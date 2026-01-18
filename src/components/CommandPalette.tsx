"use client";

import { useEffect, useState, useCallback } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Briefcase,
  FileText,
  Github,
  Linkedin,
  Mail,
  Moon,
  Sun,
  Music,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Palette,
  Download,
  Zap,
  BookOpen,
  Smartphone,
  Code2,
  Layers,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useArtStyle } from "@/components/providers/ArtStyleProvider";
import { downloadResumePDF } from "@/lib/generateResumePDF";
import { downloadResumeATSPDF } from "@/lib/generateResumeATSPDF";

interface CommandItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  keywords?: string[];
  group: string;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { playSound } = useSoundEffects();
  const { toggleMenu: toggleShaderMenu } = useArtStyle();

  // Toggle command palette
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
        playSound("open");
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [playSound]);

  const runCommand = useCallback(
    (command: () => void) => {
      setOpen(false);
      playSound("select");
      command();
    },
    [playSound]
  );

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText("maxwell@ninetynine.digital");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  // Surprise actions - pick random interesting thing
  const triggerSurprise = useCallback(() => {
    const surpriseActions = [
      () => router.push("/case-study/spark"), // Technical case study
      () => window.open("https://jeremy-blake.vercel.app/", "_blank"), // Interactive art
      () => window.open("https://vapequitcoach.com", "_blank"), // Solo app
      () => {
        toggleShaderMenu();
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("trigger-easter-egg"));
        }, 500);
      },
      () => router.push("/case-study/silk"),
      () => window.open("https://chlita.com", "_blank"), // Client work
    ];
    const action = surpriseActions[Math.floor(Math.random() * surpriseActions.length)];
    action();
  }, [router, toggleShaderMenu]);

  const commands: CommandItem[] = [
    // Featured - what you want hiring managers to see
    {
      id: "silk-case",
      label: "Case Study: Silk",
      icon: <Smartphone className="w-4 h-4" />,
      action: () => router.push("/case-study/silk"),
      keywords: ["silk", "mobile", "react native", "case study"],
      group: "Featured Work",
    },
    {
      id: "spark-case",
      label: "Case Study: Spark Dashboard",
      icon: <Layers className="w-4 h-4" />,
      action: () => router.push("/case-study/spark"),
      keywords: ["spark", "dashboard", "react", "performance", "technical"],
      group: "Featured Work",
    },
    {
      id: "vqc-case",
      label: "Case Study: Vape Quit Coach",
      icon: <Zap className="w-4 h-4" />,
      action: () => router.push("/case-study/vape-quit-coach"),
      keywords: ["vape", "quit", "coach", "ios", "app", "solo"],
      group: "Featured Work",
    },
    {
      id: "chlita-case",
      label: "Case Study: Ch'lita",
      icon: <BookOpen className="w-4 h-4" />,
      action: () => router.push("/case-study/chlita"),
      keywords: ["chlita", "fashion", "portfolio", "sanity"],
      group: "Featured Work",
    },
    // Quick Actions
    {
      id: "download-resume",
      label: "Download Resume (Standard)",
      icon: <Download className="w-4 h-4" />,
      action: () => downloadResumePDF(),
      keywords: ["download", "resume", "pdf", "cv"],
      group: "Quick Actions",
    },
    {
      id: "download-resume-ats",
      label: "Download Resume (ATS)",
      icon: <FileText className="w-4 h-4" />,
      action: () => downloadResumeATSPDF(),
      keywords: ["download", "resume", "ats", "recruiter", "pdf"],
      group: "Quick Actions",
    },
    {
      id: "copy-email",
      label: copied ? "Copied!" : "Copy Email",
      icon: copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />,
      action: copyEmail,
      keywords: ["email", "contact", "copy", "hire"],
      group: "Quick Actions",
    },
    {
      id: "surprise",
      label: "Surprise Me",
      icon: <Sparkles className="w-4 h-4" />,
      action: triggerSurprise,
      keywords: ["surprise", "random", "explore", "fun"],
      group: "Quick Actions",
    },
    // Navigation
    {
      id: "home",
      label: "Home",
      icon: <Home className="w-4 h-4" />,
      action: () => router.push("/"),
      keywords: ["home", "start", "index"],
      group: "Navigate",
    },
    {
      id: "projects",
      label: "All Projects",
      icon: <Briefcase className="w-4 h-4" />,
      action: () => router.push("/projects"),
      keywords: ["work", "portfolio", "projects"],
      group: "Navigate",
    },
    {
      id: "resume",
      label: "Resume Page",
      icon: <FileText className="w-4 h-4" />,
      action: () => router.push("/resume"),
      keywords: ["cv", "resume", "experience"],
      group: "Navigate",
    },
    // Settings
    {
      id: "theme",
      label: theme === "dark" ? "Switch to Light" : "Switch to Dark",
      icon: theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />,
      action: () => setTheme(theme === "dark" ? "light" : "dark"),
      keywords: ["theme", "dark", "light", "mode"],
      group: "Settings",
    },
    {
      id: "shaders",
      label: "Background Effects",
      icon: <Palette className="w-4 h-4" />,
      action: toggleShaderMenu,
      keywords: ["shader", "background", "style", "visual", "effect"],
      group: "Settings",
    },
    // External
    {
      id: "github",
      label: "GitHub",
      icon: <Github className="w-4 h-4" />,
      action: () => window.open("https://github.com/maxwellyoung", "_blank"),
      keywords: ["github", "code", "repo", "source"],
      group: "External",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: <Linkedin className="w-4 h-4" />,
      action: () =>
        window.open("https://linkedin.com/in/maxwell-young-a55032125", "_blank"),
      keywords: ["linkedin", "connect", "network", "hire"],
      group: "External",
    },
    {
      id: "email",
      label: "Send Email",
      icon: <Mail className="w-4 h-4" />,
      action: () =>
        window.open("mailto:maxwell@ninetynine.digital", "_blank"),
      keywords: ["email", "contact", "message", "hire"],
      group: "External",
    },
    {
      id: "vqc-live",
      label: "Vape Quit Coach (Live)",
      icon: <Smartphone className="w-4 h-4" />,
      action: () => window.open("https://vapequitcoach.com", "_blank"),
      keywords: ["vape", "app", "ios", "live"],
      group: "External",
    },
    {
      id: "jeremy-blake",
      label: "Jeremy Blake Art (Live)",
      icon: <Code2 className="w-4 h-4" />,
      action: () => window.open("https://jeremy-blake.vercel.app/", "_blank"),
      keywords: ["jeremy", "blake", "art", "webgl", "threejs"],
      group: "External",
    },
  ];

  const groupedCommands = commands.reduce((acc, cmd) => {
    if (!acc[cmd.group]) acc[cmd.group] = [];
    acc[cmd.group].push(cmd);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Command palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-x-0 top-[20%] z-[101] mx-auto w-full max-w-lg px-4"
          >
            <Command
              className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] shadow-2xl overflow-hidden"
              loop
            >
              <div className="flex items-center border-b border-[hsl(var(--border))] px-4">
                <Command.Input
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent py-4 text-sm outline-none placeholder:text-muted-foreground"
                  autoFocus
                />
                <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                  ESC
                </kbd>
              </div>

              <Command.List className="max-h-[300px] overflow-y-auto p-2">
                <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                  No results found.
                </Command.Empty>

                {Object.entries(groupedCommands).map(([group, items]) => (
                  <Command.Group
                    key={group}
                    heading={group}
                    className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground"
                  >
                    {items.map((cmd) => (
                      <Command.Item
                        key={cmd.id}
                        value={`${cmd.label} ${cmd.keywords?.join(" ") || ""}`}
                        onSelect={() => runCommand(cmd.action)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer aria-selected:bg-[hsl(var(--accent))]/10 aria-selected:text-foreground text-muted-foreground hover:bg-[hsl(var(--muted))] transition-colors"
                      >
                        <span className="text-muted-foreground">{cmd.icon}</span>
                        <span>{cmd.label}</span>
                        {cmd.group === "Links" && (
                          <ExternalLink className="w-3 h-3 ml-auto text-muted-foreground/50" />
                        )}
                      </Command.Item>
                    ))}
                  </Command.Group>
                ))}
              </Command.List>

              <div className="border-t border-[hsl(var(--border))] px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <kbd className="rounded border border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-1.5 py-0.5 font-mono">
                    ↑↓
                  </kbd>
                  <span>Navigate</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="rounded border border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-1.5 py-0.5 font-mono">
                    ↵
                  </kbd>
                  <span>Select</span>
                </div>
              </div>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Trigger hint component
export function CommandPaletteHint() {
  return (
    <button
      onClick={() => {
        const event = new KeyboardEvent("keydown", {
          key: "k",
          metaKey: true,
          bubbles: true,
        });
        document.dispatchEvent(event);
      }}
      className="fixed bottom-6 right-6 z-50 hidden md:flex items-center gap-2 px-3 py-2 rounded-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-xs text-muted-foreground hover:text-foreground hover:border-[hsl(var(--accent))]/50 shadow-lg transition-all duration-200"
    >
      <span>Quick actions</span>
      <kbd className="rounded border border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-1.5 py-0.5 font-mono text-[10px]">
        ⌘K
      </kbd>
    </button>
  );
}
