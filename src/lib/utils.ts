import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const DATE_ONLY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

export function formatDate(date: string): string {
  const parsedDate = DATE_ONLY_PATTERN.test(date)
    ? new Date(`${date}T00:00:00Z`)
    : new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return DATE_FORMATTER.format(parsedDate);
}
