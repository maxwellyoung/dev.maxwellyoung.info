"use client";

import jsPDF from "jspdf";
import { resumeData } from "./resumeData";

/**
 * Generates a PDF resume from the resumeData
 * Uses jsPDF for direct PDF generation with proper text rendering
 */
export async function generateResumePDF(): Promise<Blob> {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Colors
  const accentColor: [number, number, number] = [255, 90, 95]; // #FF5A5F
  const textColor: [number, number, number] = [30, 30, 30];
  const mutedColor: [number, number, number] = [100, 100, 100];

  // Helper to add text with word wrap
  const addText = (
    text: string,
    x: number,
    yPos: number,
    options: {
      fontSize?: number;
      fontStyle?: "normal" | "bold" | "italic";
      color?: [number, number, number];
      maxWidth?: number;
      lineHeight?: number;
    } = {}
  ): number => {
    const {
      fontSize = 10,
      fontStyle = "normal",
      color = textColor,
      maxWidth = contentWidth,
      lineHeight = 1.4,
    } = options;

    pdf.setFontSize(fontSize);
    pdf.setFont("helvetica", fontStyle);
    pdf.setTextColor(...color);

    const lines = pdf.splitTextToSize(text, maxWidth);
    const lineHeightMm = (fontSize * lineHeight) / 2.83465; // Convert pt to mm

    lines.forEach((line: string, i: number) => {
      if (yPos + lineHeightMm > pageHeight - margin) {
        pdf.addPage();
        yPos = margin;
      }
      pdf.text(line, x, yPos + i * lineHeightMm);
    });

    return yPos + lines.length * lineHeightMm;
  };

  // Helper to add a section header
  const addSectionHeader = (title: string, yPos: number): number => {
    // Add accent bar
    pdf.setFillColor(...accentColor);
    pdf.rect(margin, yPos, 2, 4, "F");

    // Add title
    pdf.setFontSize(9);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(...mutedColor);
    pdf.text(title.toUpperCase(), margin + 5, yPos + 3);

    // Add line
    const textWidth = pdf.getTextWidth(title.toUpperCase());
    pdf.setDrawColor(200, 200, 200);
    pdf.setLineWidth(0.2);
    pdf.line(margin + 5 + textWidth + 3, yPos + 1.5, pageWidth - margin, yPos + 1.5);

    return yPos + 10;
  };

  // === HEADER ===
  // Name
  y = addText(resumeData.name, margin, y, {
    fontSize: 24,
    fontStyle: "bold",
    color: textColor,
  });

  // Title
  y = addText(resumeData.title, margin, y + 2, {
    fontSize: 14,
    color: mutedColor,
  });

  // Availability badge
  if (resumeData.availability) {
    y += 4;
    pdf.setFillColor(255, 90, 95, 0.1);
    pdf.setDrawColor(...accentColor);
    pdf.setLineWidth(0.3);
    const badgeText = resumeData.availability;
    pdf.setFontSize(8);
    const badgeWidth = pdf.getTextWidth(badgeText) + 6;
    pdf.roundedRect(margin, y - 3, badgeWidth, 5, 1, 1, "FD");
    pdf.setTextColor(...accentColor);
    pdf.text(badgeText, margin + 3, y);
    y += 6;
  }

  // Contact info
  y += 4;
  pdf.setFontSize(9);
  pdf.setTextColor(...mutedColor);
  pdf.text(
    `${resumeData.contact.email} · ${resumeData.contact.location}`,
    margin,
    y
  );
  y += 12;

  // === EXPERIENCE ===
  y = addSectionHeader("Experience", y);

  for (const exp of resumeData.experience) {
    if (y > pageHeight - 50) {
      pdf.addPage();
      y = margin;
    }

    // Title and company
    y = addText(exp.title, margin, y, {
      fontSize: 11,
      fontStyle: "bold",
    });

    y = addText(`${exp.company} · ${exp.date}`, margin, y + 1, {
      fontSize: 9,
      color: mutedColor,
    });

    // Summary if available
    if (exp.summary) {
      y = addText(exp.summary, margin, y + 3, {
        fontSize: 9,
        fontStyle: "italic",
        color: mutedColor,
      });
    }

    // Responsibilities
    y += 2;
    for (const resp of exp.responsibilities) {
      y = addText(`• ${resp}`, margin + 2, y + 1, {
        fontSize: 9,
        maxWidth: contentWidth - 4,
      });
    }

    y += 6;
  }

  // === EDUCATION ===
  y = addSectionHeader("Education", y);

  for (const edu of resumeData.education) {
    if (y > pageHeight - 30) {
      pdf.addPage();
      y = margin;
    }

    y = addText(edu.degree, margin, y, {
      fontSize: 10,
      fontStyle: "bold",
    });

    y = addText(`${edu.institution} · ${edu.date}`, margin, y + 1, {
      fontSize: 9,
      color: mutedColor,
    });

    y += 5;
  }

  // === SKILLS (compact) ===
  y += 4;
  y = addSectionHeader("Skills", y);

  // Group skills into a more compact format
  const skillGroups = resumeData.skills.filter(
    (s) => s.category !== "Also Familiar"
  );
  const alsoFamiliar = resumeData.skills.find(
    (s) => s.category === "Also Familiar"
  );

  for (const group of skillGroups) {
    if (y > pageHeight - 20) {
      pdf.addPage();
      y = margin;
    }

    pdf.setFontSize(9);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(...textColor);
    pdf.text(`${group.category}:`, margin, y);

    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(...mutedColor);
    const skillsText = group.items.join(", ");
    const categoryWidth = pdf.getTextWidth(`${group.category}: `);
    const skillLines = pdf.splitTextToSize(
      skillsText,
      contentWidth - categoryWidth - 2
    );

    if (skillLines.length === 1) {
      pdf.text(skillsText, margin + categoryWidth, y);
      y += 5;
    } else {
      y += 4;
      y = addText(skillsText, margin + 4, y, {
        fontSize: 9,
        color: mutedColor,
        maxWidth: contentWidth - 6,
      });
      y += 2;
    }
  }

  // Also familiar (smaller)
  if (alsoFamiliar) {
    y += 2;
    pdf.setFontSize(8);
    pdf.setFont("helvetica", "italic");
    pdf.setTextColor(...mutedColor);
    pdf.text("Also familiar with:", margin, y);
    y = addText(alsoFamiliar.items.join(", "), margin, y + 3, {
      fontSize: 8,
      color: mutedColor,
    });
  }

  // === FOOTER ===
  y = pageHeight - 10;
  pdf.setFontSize(7);
  pdf.setTextColor(180, 180, 180);
  pdf.text(
    `${resumeData.contact.website} · Generated ${new Date().toLocaleDateString()}`,
    margin,
    y
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
