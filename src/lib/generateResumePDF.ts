"use client";

import jsPDF from "jspdf";
import { resumeData } from "./resumeData";

/**
 * Sanitize text for jsPDF (Helvetica doesn't support Unicode well)
 */
function sanitizeForPDF(text: string): string {
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
 * Generates a professionally formatted PDF resume from resumeData
 */
export async function generateResumePDF(): Promise<Blob> {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const marginLeft = 48;
  const marginRight = 48;
  const marginTop = 48;
  const marginBottom = 48;
  const contentWidth = pageWidth - marginLeft - marginRight;

  let y = marginTop;

  // Colors
  const black: [number, number, number] = [25, 25, 25];
  const gray: [number, number, number] = [90, 90, 90];
  const lightGray: [number, number, number] = [130, 130, 130];

  // Typography helpers
  const setFont = (size: number, weight: "normal" | "bold" = "normal", color = black) => {
    pdf.setFontSize(size);
    pdf.setFont("helvetica", weight);
    pdf.setTextColor(...color);
  };

  // Calculate height needed for wrapped text
  const getTextHeight = (text: string, maxWidth: number, lineHeight: number): number => {
    const lines = pdf.splitTextToSize(sanitizeForPDF(text), maxWidth);
    return lines.length * lineHeight;
  };

  // Check if we need a new page
  const checkPageBreak = (neededSpace: number): boolean => {
    if (y + neededSpace > pageHeight - marginBottom) {
      pdf.addPage();
      y = marginTop;
      return true;
    }
    return false;
  };

  // Add wrapped text with proper page break handling
  const addWrappedText = (
    text: string,
    x: number,
    maxWidth: number,
    lineHeight: number
  ): number => {
    const lines = pdf.splitTextToSize(sanitizeForPDF(text), maxWidth);
    for (const line of lines) {
      checkPageBreak(lineHeight);
      pdf.text(line, x, y);
      y += lineHeight;
    }
    return y;
  };

  // === HEADER ===
  setFont(28, "bold", black);
  pdf.text(sanitizeForPDF(resumeData.name), marginLeft, y);
  y += 28;

  setFont(12, "normal", gray);
  pdf.text(sanitizeForPDF(resumeData.title), marginLeft, y);
  y += 20;

  // Contact line
  setFont(9, "normal", gray);
  const contactLine = `${resumeData.contact.email}  |  ${resumeData.contact.location}  |  ${resumeData.contact.website.replace("https://", "")}`;
  pdf.text(sanitizeForPDF(contactLine), marginLeft, y);
  y += 14;

  // Availability
  if (resumeData.availability) {
    setFont(9, "normal", gray);
    pdf.text(sanitizeForPDF(resumeData.availability), marginLeft, y);
    y += 10;
  }

  // Divider
  y += 8;
  pdf.setDrawColor(220, 220, 220);
  pdf.setLineWidth(0.5);
  pdf.line(marginLeft, y, pageWidth - marginRight, y);
  y += 20;

  // === EXPERIENCE ===
  setFont(11, "bold", black);
  pdf.text("EXPERIENCE", marginLeft, y);
  y += 16;

  for (const exp of resumeData.experience) {
    // Calculate total height needed for this experience entry
    setFont(9, "normal", gray);
    let entryHeight = 14 + 14; // title + company lines
    if (exp.summary) {
      entryHeight += getTextHeight(exp.summary, contentWidth, 12) + 4;
    }
    // Add first responsibility to keep header with at least one bullet
    if (exp.responsibilities.length > 0) {
      const firstBullet = `• ${exp.responsibilities[0]}`;
      entryHeight += getTextHeight(firstBullet, contentWidth - 16, 12);
    }

    checkPageBreak(Math.min(entryHeight, 90)); // Keep header together, but cap check

    // Role title and date on same line
    setFont(10, "bold", black);
    pdf.text(sanitizeForPDF(exp.title), marginLeft, y);
    setFont(9, "normal", lightGray);
    const sanitizedDate = sanitizeForPDF(exp.date);
    const dateWidth = pdf.getTextWidth(sanitizedDate);
    pdf.text(sanitizedDate, pageWidth - marginRight - dateWidth, y);
    y += 13;

    // Company
    setFont(9, "normal", gray);
    pdf.text(sanitizeForPDF(exp.company), marginLeft, y);
    y += 12;

    // Summary if exists
    if (exp.summary) {
      y += 2;
      setFont(9, "normal", gray);
      y = addWrappedText(exp.summary, marginLeft, contentWidth, 11);
      y += 2;
    }

    // Responsibilities
    y += 4;
    setFont(9, "normal", black);
    for (const resp of exp.responsibilities) {
      const bulletText = `- ${sanitizeForPDF(resp)}`;
      const lines = pdf.splitTextToSize(bulletText, contentWidth - 8);

      // Check if we can fit at least the first line
      checkPageBreak(12);

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i] as string;
        if (i > 0) checkPageBreak(11);
        pdf.text(i === 0 ? line : `  ${line.trim()}`, marginLeft + 4, y);
        y += 11;
      }
      y += 2;
    }

    y += 10; // Space between jobs
  }

  y += 4;

  // === EDUCATION ===
  checkPageBreak(60);
  setFont(11, "bold", black);
  pdf.text("EDUCATION", marginLeft, y);
  y += 18;

  for (const edu of resumeData.education) {
    checkPageBreak(40);

    setFont(10, "bold", black);
    pdf.text(sanitizeForPDF(edu.degree), marginLeft, y);
    y += 13;

    setFont(9, "normal", gray);
    pdf.text(sanitizeForPDF(`${edu.institution}  |  ${edu.date}`), marginLeft, y);
    y += 16;
  }

  y += 10;

  // === SKILLS ===
  checkPageBreak(60);
  setFont(11, "bold", black);
  pdf.text("SKILLS", marginLeft, y);
  y += 16;

  // Main skills (exclude "Also" category)
  const mainSkills = resumeData.skills.filter(s => s.category !== "Also");
  const alsoSkills = resumeData.skills.find(s => s.category === "Also");

  for (const skillGroup of mainSkills) {
    checkPageBreak(16);

    setFont(9, "bold", black);
    const categoryText = `${skillGroup.category}: `;
    const categoryWidth = pdf.getTextWidth(categoryText);
    pdf.text(categoryText, marginLeft, y);

    setFont(9, "normal", gray);
    const skillsText = sanitizeForPDF(skillGroup.items.join(", "));
    const availableWidth = contentWidth - categoryWidth;

    const skillLines = pdf.splitTextToSize(skillsText, availableWidth);
    for (let i = 0; i < skillLines.length; i++) {
      const line = skillLines[i] as string;
      if (i === 0) {
        pdf.text(line, marginLeft + categoryWidth, y);
      } else {
        y += 11;
        checkPageBreak(11);
        pdf.text(line, marginLeft + categoryWidth, y);
      }
    }
    y += 13;
  }

  // Also familiar (smaller, at bottom)
  if (alsoSkills) {
    y += 2;
    checkPageBreak(24);
    setFont(8, "normal", lightGray);
    const prefix = "Also: ";
    const prefixWidth = pdf.getTextWidth(prefix);
    pdf.text(prefix, marginLeft, y);

    const alsoText = sanitizeForPDF(alsoSkills.items.join(", "));
    const alsoLines = pdf.splitTextToSize(alsoText, contentWidth - prefixWidth);
    for (let i = 0; i < alsoLines.length; i++) {
      const line = alsoLines[i] as string;
      if (i === 0) {
        pdf.text(line, marginLeft + prefixWidth, y);
      } else {
        y += 10;
        checkPageBreak(10);
        pdf.text(line, marginLeft + prefixWidth, y);
      }
    }
  }

  // === FOOTER ===
  pdf.setFontSize(7);
  pdf.setTextColor(180, 180, 180);
  pdf.text(
    `github.com/maxwellyoung  |  linkedin.com/in/maxwell-young-a55032125`,
    marginLeft,
    pageHeight - 30
  );

  return pdf.output("blob");
}

/**
 * Downloads the PDF resume
 */
export async function downloadResumePDF(): Promise<void> {
  const blob = await generateResumePDF();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "MaxwellYoung_Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
