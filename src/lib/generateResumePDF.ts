"use client";

import jsPDF from "jspdf";
import { resumeData } from "./resumeData";

/**
 * Generates a professionally formatted PDF resume from resumeData
 */
export async function generateResumePDF(): Promise<Blob> {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "pt", // Use points for precise typography
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const marginLeft = 50;
  const marginRight = 50;
  const marginTop = 50;
  const marginBottom = 50;
  const contentWidth = pageWidth - marginLeft - marginRight;

  let y = marginTop;

  // Colors
  const black: [number, number, number] = [20, 20, 20];
  const gray: [number, number, number] = [100, 100, 100];
  const lightGray: [number, number, number] = [150, 150, 150];
  const accent: [number, number, number] = [220, 60, 60];

  // Typography helpers
  const setFont = (size: number, weight: "normal" | "bold" = "normal", color = black) => {
    pdf.setFontSize(size);
    pdf.setFont("helvetica", weight);
    pdf.setTextColor(...color);
  };

  // Check if we need a new page
  const checkPageBreak = (neededSpace: number): void => {
    if (y + neededSpace > pageHeight - marginBottom) {
      pdf.addPage();
      y = marginTop;
    }
  };

  // Add wrapped text and return new Y position
  const addWrappedText = (
    text: string,
    x: number,
    maxWidth: number,
    lineHeight: number
  ): number => {
    const lines = pdf.splitTextToSize(text, maxWidth);
    lines.forEach((line: string) => {
      checkPageBreak(lineHeight);
      pdf.text(line, x, y);
      y += lineHeight;
    });
    return y;
  };

  // === HEADER ===
  setFont(28, "bold", black);
  pdf.text(resumeData.name, marginLeft, y);
  y += 28;

  setFont(12, "normal", gray);
  pdf.text(resumeData.title, marginLeft, y);
  y += 20;

  // Contact line
  setFont(9, "normal", gray);
  const contactLine = `${resumeData.contact.email}  |  ${resumeData.contact.location}  |  ${resumeData.contact.website.replace("https://", "")}`;
  pdf.text(contactLine, marginLeft, y);
  y += 14;

  // Availability
  if (resumeData.availability) {
    setFont(9, "normal", accent);
    pdf.text(resumeData.availability, marginLeft, y);
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
  y += 18;

  for (const exp of resumeData.experience) {
    checkPageBreak(80);

    // Role title
    setFont(11, "bold", black);
    pdf.text(exp.title, marginLeft, y);

    // Date on the right
    setFont(9, "normal", lightGray);
    const dateWidth = pdf.getTextWidth(exp.date);
    pdf.text(exp.date, pageWidth - marginRight - dateWidth, y);
    y += 14;

    // Company
    setFont(10, "normal", gray);
    pdf.text(exp.company, marginLeft, y);
    y += 14;

    // Summary if exists
    if (exp.summary) {
      setFont(9, "normal", gray);
      y = addWrappedText(exp.summary, marginLeft, contentWidth, 12);
      y += 2;
    }

    // Responsibilities
    setFont(9, "normal", black);
    for (const resp of exp.responsibilities) {
      checkPageBreak(14);
      const bulletText = `  •  ${resp}`;
      const lines = pdf.splitTextToSize(bulletText, contentWidth - 10);
      lines.forEach((line: string, i: number) => {
        pdf.text(i === 0 ? line : `      ${line.trim()}`, marginLeft, y);
        y += 12;
      });
    }

    y += 12; // Space between jobs
  }

  y += 6;

  // === EDUCATION ===
  checkPageBreak(60);
  setFont(11, "bold", black);
  pdf.text("EDUCATION", marginLeft, y);
  y += 18;

  for (const edu of resumeData.education) {
    checkPageBreak(40);

    setFont(10, "bold", black);
    pdf.text(edu.degree, marginLeft, y);
    y += 13;

    setFont(9, "normal", gray);
    pdf.text(`${edu.institution}  |  ${edu.date}`, marginLeft, y);
    y += 16;
  }

  y += 10;

  // === SKILLS ===
  checkPageBreak(80);
  setFont(11, "bold", black);
  pdf.text("SKILLS", marginLeft, y);
  y += 18;

  // Main skills (not "Also Familiar")
  const mainSkills = resumeData.skills.filter(s => s.category !== "Also Familiar");
  const alsoFamiliar = resumeData.skills.find(s => s.category === "Also Familiar");

  for (const skillGroup of mainSkills) {
    checkPageBreak(20);

    setFont(9, "bold", black);
    const categoryText = `${skillGroup.category}: `;
    pdf.text(categoryText, marginLeft, y);

    setFont(9, "normal", gray);
    const categoryWidth = pdf.getTextWidth(categoryText);
    const skillsText = skillGroup.items.join(", ");
    const availableWidth = contentWidth - categoryWidth;

    const skillLines = pdf.splitTextToSize(skillsText, availableWidth);
    skillLines.forEach((line: string, i: number) => {
      if (i === 0) {
        pdf.text(line, marginLeft + categoryWidth, y);
      } else {
        y += 12;
        checkPageBreak(12);
        pdf.text(line, marginLeft + categoryWidth, y);
      }
    });
    y += 14;
  }

  // Also familiar (smaller, at bottom)
  if (alsoFamiliar) {
    y += 4;
    checkPageBreak(30);
    setFont(8, "normal", lightGray);
    pdf.text("Also familiar with: ", marginLeft, y);
    const prefixWidth = pdf.getTextWidth("Also familiar with: ");
    const alsoText = alsoFamiliar.items.join(", ");
    const alsoLines = pdf.splitTextToSize(alsoText, contentWidth - prefixWidth);
    alsoLines.forEach((line: string, i: number) => {
      if (i === 0) {
        pdf.text(line, marginLeft + prefixWidth, y);
      } else {
        y += 10;
        pdf.text(line, marginLeft, y);
      }
    });
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
