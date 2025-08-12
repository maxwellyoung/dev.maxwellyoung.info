export type Status = "Completed" | "WIP" | "Planned" | string;
export type Role =
  | "Solo"
  | "Lead"
  | "Collaborator"
  | "Frontend"
  | "Studio Collaboration"
  | string;
export type Category = "Client" | "Personal" | "Studio" | "Experiment" | string;

export interface BuildLogEntry {
  date: string;
  whatWorks: string[];
  nextMilestone?: string;
  openQuestion?: string;
}

export interface Metrics {
  lighthouseMobile?: number;
  lcpMs?: number;
  cls?: number;
  bundleKB?: number;
}

export interface Links {
  live?: string;
  repo?: string;
  video?: string;
}

export interface Project {
  slug: string;
  name: string;
  status: Status;
  category?: Category;
  role?: Role;
  description: string;
  longDescription?: string;
  startDate?: string;
  endDate?: string;
  featured?: boolean;
  priority?: number;
  tags?: string[];
  stack?: string[];
  client?: string;
  redacted?: boolean;
  links?: Links;
  screenshots?: string[];
  thumb?: string;
  impact?: string[];
  metrics?: Metrics;
  buildLog?: BuildLogEntry[];
}
