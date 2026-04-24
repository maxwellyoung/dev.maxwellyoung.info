"use client";

import jsPDF from "jspdf";
import { resumeData } from "./resumeData";

type RGB = [number, number, number];

type PdfContext = {
  pdf: jsPDF;
  pageWidth: number;
  pageHeight: number;
  marginLeft: number;
  marginRight: number;
  marginTop: number;
  marginBottom: number;
  contentWidth: number;
  y: number;
  colors: {
    black: RGB;
    gray: RGB;
    lightGray: RGB;
  };
};

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

function createPdfContext(): PdfContext {
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

  return {
    pdf,
    pageWidth,
    pageHeight,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    contentWidth: pageWidth - marginLeft - marginRight,
    y: marginTop,
    colors: {
      black: [25, 25, 25],
      gray: [90, 90, 90],
      lightGray: [130, 130, 130],
    },
  };
}

function setFont(
  context: PdfContext,
  size: number,
  weight: "normal" | "bold" = "normal",
  color = context.colors.black
) {
  context.pdf.setFontSize(size);
  context.pdf.setFont("helvetica", weight);
  context.pdf.setTextColor(...color);
}

function checkPageBreak(context: PdfContext, neededSpace: number) {
  if (context.y + neededSpace <= context.pageHeight - context.marginBottom) {
    return;
  }

  context.pdf.addPage();
  context.y = context.marginTop;
}

function getTextHeight(
  context: PdfContext,
  text: string,
  maxWidth: number,
  lineHeight: number
) {
  return splitText(context, text, maxWidth).length * lineHeight;
}

function splitText(context: PdfContext, text: string, maxWidth: number): string[] {
  return context.pdf.splitTextToSize(sanitizeForPDF(text), maxWidth) as string[];
}

function writeWrappedText(
  context: PdfContext,
  text: string,
  x: number,
  maxWidth: number,
  lineHeight: number
) {
  const lines = splitText(context, text, maxWidth);
  for (const line of lines) {
    checkPageBreak(context, lineHeight);
    context.pdf.text(line, x, context.y);
    context.y += lineHeight;
  }
}

function writeSectionTitle(context: PdfContext, title: string, marginTop = 0) {
  context.y += marginTop;
  checkPageBreak(context, 24);
  setFont(context, 11, "bold");
  context.pdf.text(title, context.marginLeft, context.y);
  context.y += 16;
}

function writeHeader(context: PdfContext) {
  setFont(context, 28, "bold");
  context.pdf.text(sanitizeForPDF(resumeData.name), context.marginLeft, context.y);
  context.y += 28;

  setFont(context, 12, "normal", context.colors.gray);
  context.pdf.text(sanitizeForPDF(resumeData.title), context.marginLeft, context.y);
  context.y += 20;

  setFont(context, 9, "normal", context.colors.gray);
  writeWrappedText(
    context,
    resumeData.profile,
    context.marginLeft,
    context.contentWidth,
    11
  );
  context.y += 8;

  setFont(context, 9, "normal", context.colors.gray);
  const contactLine = `${resumeData.contact.email}  |  ${resumeData.contact.location}  |  ${resumeData.contact.website.replace("https://", "")}`;
  context.pdf.text(sanitizeForPDF(contactLine), context.marginLeft, context.y);
  context.y += 22;

  context.pdf.setDrawColor(220, 220, 220);
  context.pdf.setLineWidth(0.5);
  context.pdf.line(
    context.marginLeft,
    context.y,
    context.pageWidth - context.marginRight,
    context.y
  );
  context.y += 20;
}

function writeExperience(context: PdfContext) {
  writeSectionTitle(context, "EXPERIENCE");

  for (const experience of resumeData.experience) {
    let entryHeight = 28;
    if (experience.summary) {
      entryHeight += getTextHeight(context, experience.summary, context.contentWidth, 11) + 6;
    }
    if (experience.responsibilities[0]) {
      entryHeight += getTextHeight(
        context,
        `- ${experience.responsibilities[0]}`,
        context.contentWidth - 8,
        12
      );
    }
    checkPageBreak(context, Math.min(entryHeight, 90));

    setFont(context, 10, "bold");
    context.pdf.text(sanitizeForPDF(experience.title), context.marginLeft, context.y);

    setFont(context, 9, "normal", context.colors.lightGray);
    const sanitizedDate = sanitizeForPDF(experience.date);
    const dateWidth = context.pdf.getTextWidth(sanitizedDate);
    context.pdf.text(
      sanitizedDate,
      context.pageWidth - context.marginRight - dateWidth,
      context.y
    );
    context.y += 13;

    setFont(context, 9, "normal", context.colors.gray);
    context.pdf.text(
      sanitizeForPDF(experience.company),
      context.marginLeft,
      context.y
    );
    context.y += 12;

    if (experience.summary) {
      context.y += 2;
      setFont(context, 9, "normal", context.colors.gray);
      writeWrappedText(
        context,
        experience.summary,
        context.marginLeft,
        context.contentWidth,
        11
      );
      context.y += 2;
    }

    context.y += 4;
    setFont(context, 9, "normal");
    for (const responsibility of experience.responsibilities) {
      const lines = splitText(context, `- ${responsibility}`, context.contentWidth - 8);

      checkPageBreak(context, 12);
      lines.forEach((line, index) => {
        if (index > 0) {
          checkPageBreak(context, 11);
        }
        context.pdf.text(
          index === 0 ? line : `  ${String(line).trim()}`,
          context.marginLeft + 4,
          context.y
        );
        context.y += 11;
      });
      context.y += 2;
    }

    context.y += 10;
  }
}

function writeEducation(context: PdfContext) {
  writeSectionTitle(context, "EDUCATION", 4);

  for (const education of resumeData.education) {
    checkPageBreak(context, 40);
    setFont(context, 10, "bold");
    context.pdf.text(sanitizeForPDF(education.degree), context.marginLeft, context.y);
    context.y += 13;

    setFont(context, 9, "normal", context.colors.gray);
    context.pdf.text(
      sanitizeForPDF(`${education.institution}  |  ${education.date}`),
      context.marginLeft,
      context.y
    );
    context.y += 16;
  }
}

function writeSkillLine(
  context: PdfContext,
  prefix: string,
  items: string[],
  color: RGB,
  prefixWeight: "normal" | "bold",
  prefixSize: number,
  bodySize: number,
  lineHeight: number
) {
  checkPageBreak(context, lineHeight);
  setFont(context, prefixSize, prefixWeight);
  const prefixWidth = context.pdf.getTextWidth(prefix);
  context.pdf.text(prefix, context.marginLeft, context.y);

  setFont(context, bodySize, "normal", color);
  const lines = splitText(context, items.join(", "), context.contentWidth - prefixWidth);

  lines.forEach((line, index) => {
    if (index > 0) {
      context.y += lineHeight;
      checkPageBreak(context, lineHeight);
    }
    context.pdf.text(
      line,
      context.marginLeft + prefixWidth,
      context.y
    );
  });
}

function writeSkills(context: PdfContext) {
  writeSectionTitle(context, "SKILLS", 10);

  const mainSkills = resumeData.skills.filter((skill) => skill.category !== "Also");
  const alsoSkills = resumeData.skills.find((skill) => skill.category === "Also");

  for (const skillGroup of mainSkills) {
    writeSkillLine(
      context,
      `${skillGroup.category}: `,
      skillGroup.items,
      context.colors.gray,
      "bold",
      9,
      9,
      11
    );
    context.y += 13;
  }

  if (alsoSkills) {
    context.y += 2;
    writeSkillLine(
      context,
      "Also: ",
      alsoSkills.items,
      context.colors.lightGray,
      "normal",
      8,
      8,
      10
    );
  }
}

function writeFooter(context: PdfContext) {
  context.pdf.setFontSize(7);
  context.pdf.setTextColor(180, 180, 180);
  context.pdf.text(
    "github.com/maxwellyoung  |  linkedin.com/in/maxwell-young-a55032125",
    context.marginLeft,
    context.pageHeight - 30
  );
}

async function generateResumePDF(): Promise<Blob> {
  const context = createPdfContext();

  writeHeader(context);
  writeExperience(context);
  writeEducation(context);
  writeSkills(context);
  writeFooter(context);

  return context.pdf.output("blob");
}

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
