"use client";

import jsPDF from "jspdf";
import { resumeDataATS } from "./resumeDataATS";

/**
 * Sanitize text for jsPDF (Helvetica doesn't support Unicode well)
 */
function sanitize(text: string): string {
  return text
    .replace(/→/g, "->")
    .replace(/←/g, "<-")
    .replace(/★/g, "*")
    .replace(/–/g, "-")
    .replace(/—/g, " - ")
    .replace(/'/g, "'")
    .replace(/'/g, "'")
    .replace(/"/g, '"')
    .replace(/"/g, '"')
    .replace(/•/g, "-")
    .replace(/…/g, "...");
}

/**
 * Generates an ATS-optimized PDF resume
 * Clean, scannable, keyword-rich
 */
export async function generateResumeATSPDF(): Promise<Blob> {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "letter", // US letter for broader ATS compatibility
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 50;
  const contentWidth = pageWidth - margin * 2;

  let y = margin;

  // Colors - keep it simple for ATS
  const black: [number, number, number] = [0, 0, 0];
  const darkGray: [number, number, number] = [60, 60, 60];

  const setFont = (
    size: number,
    weight: "normal" | "bold" = "normal",
    color = black
  ) => {
    pdf.setFontSize(size);
    pdf.setFont("helvetica", weight);
    pdf.setTextColor(...color);
  };

  const checkPageBreak = (needed: number): boolean => {
    if (y + needed > pageHeight - margin) {
      pdf.addPage();
      y = margin;
      return true;
    }
    return false;
  };

  // === HEADER ===
  setFont(18, "bold");
  pdf.text(resumeDataATS.name.toUpperCase(), margin, y);
  y += 18;

  setFont(11, "normal", darkGray);
  pdf.text(resumeDataATS.title, margin, y);
  y += 16;

  // Contact line - all on one line for ATS
  setFont(9, "normal", darkGray);
  const contact = resumeDataATS.contact;
  const contactLine = `${contact.email} | ${contact.location} | ${contact.website} | ${contact.github}`;
  pdf.text(sanitize(contactLine), margin, y);
  y += 18;

  // === SUMMARY ===
  setFont(10, "bold");
  pdf.text("SUMMARY", margin, y);
  y += 12;

  setFont(9, "normal", darkGray);
  const summaryLines = pdf.splitTextToSize(
    sanitize(resumeDataATS.summary),
    contentWidth
  );
  for (const line of summaryLines) {
    pdf.text(line as string, margin, y);
    y += 11;
  }
  y += 10;

  // === EXPERIENCE ===
  setFont(10, "bold");
  pdf.text("EXPERIENCE", margin, y);
  y += 14;

  for (const exp of resumeDataATS.experience) {
    checkPageBreak(60);

    // Title and date on same line
    setFont(10, "bold");
    pdf.text(sanitize(exp.title), margin, y);
    setFont(9, "normal", darkGray);
    const dateWidth = pdf.getTextWidth(exp.date);
    pdf.text(exp.date, pageWidth - margin - dateWidth, y);
    y += 12;

    // Company and location
    setFont(9, "normal", darkGray);
    const companyLine = exp.location
      ? `${exp.company} - ${exp.location}`
      : exp.company;
    pdf.text(sanitize(companyLine), margin, y);
    y += 12;

    // Bullets
    setFont(9, "normal");
    for (const bullet of exp.bullets) {
      const bulletText = `- ${sanitize(bullet)}`;
      const lines = pdf.splitTextToSize(bulletText, contentWidth - 10);

      for (let i = 0; i < lines.length; i++) {
        checkPageBreak(11);
        const line = lines[i] as string;
        pdf.text(i === 0 ? line : `  ${line.trim()}`, margin + 5, y);
        y += 11;
      }
    }
    y += 8;
  }

  y += 4;

  // === SKILLS ===
  checkPageBreak(50);
  setFont(10, "bold");
  pdf.text("SKILLS", margin, y);
  y += 14;

  for (const skillGroup of resumeDataATS.skills) {
    checkPageBreak(14);
    setFont(9, "bold");
    const label = `${skillGroup.category}: `;
    const labelWidth = pdf.getTextWidth(label);
    pdf.text(label, margin, y);

    setFont(9, "normal", darkGray);
    const skillsText = sanitize(skillGroup.items.join(", "));
    const skillLines = pdf.splitTextToSize(skillsText, contentWidth - labelWidth);

    for (let i = 0; i < skillLines.length; i++) {
      const line = skillLines[i] as string;
      if (i === 0) {
        pdf.text(line, margin + labelWidth, y);
      } else {
        y += 11;
        pdf.text(line, margin + labelWidth, y);
      }
    }
    y += 13;
  }

  y += 6;

  // === EDUCATION ===
  checkPageBreak(50);
  setFont(10, "bold");
  pdf.text("EDUCATION", margin, y);
  y += 14;

  for (const edu of resumeDataATS.education) {
    checkPageBreak(35);

    setFont(9, "bold");
    pdf.text(sanitize(edu.degree), margin, y);
    setFont(9, "normal", darkGray);
    const eduDateWidth = pdf.getTextWidth(edu.date);
    pdf.text(edu.date, pageWidth - margin - eduDateWidth, y);
    y += 12;

    setFont(9, "normal", darkGray);
    const eduLine = edu.location
      ? `${edu.institution} - ${edu.location}`
      : edu.institution;
    pdf.text(sanitize(eduLine), margin, y);
    y += 11;

    if (edu.details) {
      for (const detail of edu.details) {
        pdf.text(sanitize(`- ${detail}`), margin + 5, y);
        y += 11;
      }
    }
    y += 6;
  }

  // === PROJECTS (if space) ===
  if (resumeDataATS.projects && y < pageHeight - 120) {
    y += 4;
    setFont(10, "bold");
    pdf.text("PROJECTS", margin, y);
    y += 14;

    for (const proj of resumeDataATS.projects) {
      if (y > pageHeight - 60) break;

      // Render project name and tech on same line properly
      setFont(9, "bold");
      const projName = sanitize(proj.name);
      const projNameWidth = pdf.getTextWidth(projName);
      pdf.text(projName, margin, y);

      setFont(9, "normal", darkGray);
      const techText = ` | ${sanitize(proj.tech)}`;
      pdf.text(techText, margin + projNameWidth, y);
      y += 12;

      setFont(9, "normal");
      for (const bullet of proj.bullets) {
        if (y > pageHeight - 40) break;
        const bulletText = `- ${sanitize(bullet)}`;
        const lines = pdf.splitTextToSize(bulletText, contentWidth - 10);
        for (const line of lines) {
          pdf.text(line as string, margin + 5, y);
          y += 11;
        }
      }
      y += 6;
    }
  }

  return pdf.output("blob");
}

/**
 * Downloads the ATS-optimized PDF
 */
export async function downloadResumeATSPDF(): Promise<void> {
  const blob = await generateResumeATSPDF();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "MaxwellYoung_Resume_ATS.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
