"use client";

import { FormEvent, useState } from "react";
import posthog from "posthog-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrackedActionLink } from "@/components/TrackedActionLink";

type BudgetBand = "under-4k" | "4k-10k" | "10k-25k" | "25k-plus";
type TimelineBand = "asap" | "2-4-weeks" | "1-2-months" | "flexible";

export function ProjectBriefForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [projectType, setProjectType] = useState("product-flow");
  const [budgetBand, setBudgetBand] = useState<BudgetBand>("4k-10k");
  const [timelineBand, setTimelineBand] = useState<TimelineBand>("2-4-weeks");
  const [problem, setProblem] = useState("");
  const [started, setStarted] = useState(false);

  const isQualified =
    (budgetBand === "4k-10k" ||
      budgetBand === "10k-25k" ||
      budgetBand === "25k-plus") &&
    (timelineBand === "asap" || timelineBand === "2-4-weeks");
  const looksLikeStudioEngagement =
    budgetBand === "25k-plus" ||
    projectType === "design-system" ||
    timelineBand === "1-2-months" ||
    timelineBand === "flexible";

  const markStarted = () => {
    if (started) return;
    setStarted(true);
    posthog.capture("project_brief_started", { placement: "work_with_me" });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = `Design Engineering Sprint Brief — ${company || name || "New Inquiry"}`;
    const lines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || "N/A"}`,
      `Project Type: ${projectType}`,
      `Budget: ${budgetBand}`,
      `Timeline: ${timelineBand}`,
      "",
      "Problem to solve:",
      problem,
      "",
      `Qualification Signal: ${isQualified ? "Qualified" : "Needs scope review"}`,
      "Source: dev.maxwellyoung.info/work-with-me",
    ];
    const body = lines.join("\n");
    const mailto = `mailto:maxwell@ninetynine.digital?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    posthog.capture("project_brief_submitted", {
      placement: "work_with_me",
      project_type: projectType,
      budget_band: budgetBand,
      timeline_band: timelineBand,
      qualified: isQualified,
      studio_fit: looksLikeStudioEngagement,
    });

    window.location.href = mailto;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <Input
          required
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={markStarted}
        />
        <Input
          required
          type="email"
          placeholder="Work email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={markStarted}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <Input
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          onFocus={markStarted}
        />
        <select
          value={projectType}
          onChange={(e) => setProjectType(e.target.value)}
          onFocus={markStarted}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="product-flow">Product flow improvement</option>
          <option value="frontend-performance">Frontend performance fix</option>
          <option value="design-system">Design system implementation</option>
          <option value="conversion-optimization">Conversion optimization</option>
        </select>
      </div>

      {looksLikeStudioEngagement && (
        <div className="rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30 p-3">
          <p className="text-xs text-muted-foreground">
            This may be better as a full studio engagement.
          </p>
          <TrackedActionLink
            href="https://www.ninetynine.digital/contact?utm_source=dev.maxwellyoung.info&utm_medium=referral&utm_campaign=brief_qualification"
            external
            eventName="project_brief_escalation_clicked"
            eventProps={{ reason: "studio_fit" }}
            className="text-sm underline underline-offset-2 hover:text-foreground transition-colors"
          >
            Route to ninetynine studio intake
          </TrackedActionLink>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-3">
        <select
          value={budgetBand}
          onChange={(e) => setBudgetBand(e.target.value as BudgetBand)}
          onFocus={markStarted}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="under-4k">Budget: under NZD 4k</option>
          <option value="4k-10k">Budget: NZD 4k-10k</option>
          <option value="10k-25k">Budget: NZD 10k-25k</option>
          <option value="25k-plus">Budget: NZD 25k+</option>
        </select>
        <select
          value={timelineBand}
          onChange={(e) => setTimelineBand(e.target.value as TimelineBand)}
          onFocus={markStarted}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="asap">Timeline: ASAP</option>
          <option value="2-4-weeks">Timeline: 2-4 weeks</option>
          <option value="1-2-months">Timeline: 1-2 months</option>
          <option value="flexible">Timeline: flexible</option>
        </select>
      </div>

      <textarea
        required
        rows={5}
        placeholder="What flow is underperforming, and what outcome do you need?"
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
        onFocus={markStarted}
        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      />

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" className="bg-foreground text-background hover:opacity-90">
          Send Project Brief
        </Button>
        <p className="text-xs text-muted-foreground">
          Opens a prefilled email draft. No spam, no CRM traps.
        </p>
      </div>
    </form>
  );
}
