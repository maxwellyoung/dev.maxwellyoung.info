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
  const marginLeft = 40;
  const marginRight = 40;
  const marginTop = 32;
  const marginBottom = 32;

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
      lightGray: [110, 110, 110], // 5.1:1 on white, the lightest grey that passes AA at small sizes
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

/** Draw segments on one line, separated by a middle dot, linking those with a url. */
function writeLinkedLine(
  context: PdfContext,
  segments: { text: string; url?: string }[],
  x: number,
  y: number
) {
  const separator = "  ·  ";
  let cursor = x;
  segments.forEach((segment, index) => {
    const text = sanitizeForPDF(segment.text);
    if (segment.url) context.pdf.textWithLink(text, cursor, y, { url: segment.url });
    else context.pdf.text(text, cursor, y);
    cursor += context.pdf.getTextWidth(text);
    if (index < segments.length - 1) {
      context.pdf.text(separator, cursor, y);
      cursor += context.pdf.getTextWidth(separator);
    }
  });
}

function writeSectionTitle(context: PdfContext, title: string, marginTop = 0) {
  context.y += marginTop;
  checkPageBreak(context, 24);
  setFont(context, 11, "bold");
  context.pdf.text(title, context.marginLeft, context.y);
  context.y += 14;
}

function writeHeader(context: PdfContext) {
  setFont(context, 26, "bold");
  context.pdf.text(sanitizeForPDF(resumeData.name), context.marginLeft, context.y);
  context.y += 24;

  setFont(context, 12, "normal", context.colors.gray);
  context.pdf.text(sanitizeForPDF(resumeData.title), context.marginLeft, context.y);
  context.y += 17;

  setFont(context, 9, "normal", context.colors.gray);
  writeWrappedText(
    context,
    resumeData.profile,
    context.marginLeft,
    context.contentWidth,
    10
  );
  context.y += 5;

  setFont(context, 9, "normal", context.colors.gray);
  writeLinkedLine(context, [
    { text: resumeData.contact.email, url: `mailto:${resumeData.contact.email}` },
    { text: resumeData.contact.location },
    { text: resumeData.contact.website, url: `https://${resumeData.contact.website}` },
  ], context.marginLeft, context.y);
  context.y += 18;

  context.pdf.setDrawColor(220, 220, 220);
  context.pdf.setLineWidth(0.5);
  context.pdf.line(
    context.marginLeft,
    context.y,
    context.pageWidth - context.marginRight,
    context.y
  );
  context.y += 14;
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
    context.y += 12;

    setFont(context, 9, "normal", context.colors.gray);
    context.pdf.text(
      sanitizeForPDF(experience.company),
      context.marginLeft,
      context.y
    );
    context.y += 10;

    if (experience.summary) {
      context.y += 1;
      setFont(context, 9, "normal", context.colors.gray);
      writeWrappedText(
        context,
        experience.summary,
        context.marginLeft,
        context.contentWidth,
        10
      );
      context.y += 1;
    }

    context.y += 2;
    setFont(context, 9, "normal");
    for (const responsibility of experience.responsibilities) {
      const lines = splitText(context, `- ${responsibility}`, context.contentWidth - 8);

      checkPageBreak(context, 10);
      lines.forEach((line, index) => {
        if (index > 0) {
          checkPageBreak(context, 10);
        }
        context.pdf.text(
          index === 0 ? line : `  ${String(line).trim()}`,
          context.marginLeft + 4,
          context.y
        );
        context.y += 10;
      });
      context.y += 1;
    }

    context.y += 5;
  }
}

function writeSelectedWork(context: PdfContext) {
  writeSectionTitle(context, "SELECTED WORK", 4);

  for (const work of resumeData.selectedWork) {
    checkPageBreak(context, 48);

    setFont(context, 10, "bold");
    // The project name links to its live proof, as it does on the web page.
    context.pdf.textWithLink(sanitizeForPDF(work.name), context.marginLeft, context.y, { url: work.href });
    const nameWidth = context.pdf.getTextWidth(sanitizeForPDF(work.name));
    setFont(context, 10, "normal", context.colors.gray);
    context.pdf.text(sanitizeForPDF(` · ${work.descriptor}`), context.marginLeft + nameWidth, context.y);

    setFont(context, 9, "normal", context.colors.lightGray);
    const sanitizedDate = sanitizeForPDF(work.date);
    const dateWidth = context.pdf.getTextWidth(sanitizedDate);
    context.pdf.text(
      sanitizedDate,
      context.pageWidth - context.marginRight - dateWidth,
      context.y
    );
    // Tighter above the summary than below it, so each summary reads with its own title.
    context.y += 12;

    setFont(context, 9, "normal", context.colors.gray);
    writeWrappedText(
      context,
      work.summary,
      context.marginLeft,
      context.contentWidth,
      10
    );
    context.y += 8;
  }
}

function writeEducation(context: PdfContext) {
  writeSectionTitle(context, "EDUCATION", 4);

  for (const education of resumeData.education) {
    checkPageBreak(context, 40);
    setFont(context, 10, "bold");
    context.pdf.text(sanitizeForPDF(education.degree), context.marginLeft, context.y);
    context.y += 12;

    setFont(context, 9, "normal", context.colors.gray);
    context.pdf.text(
      sanitizeForPDF(`${education.institution}  ·  ${education.date}`),
      context.marginLeft,
      context.y
    );
    context.y += 14;
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
  const bodyOffset = prefixWidth + 2;
  const lines = splitText(
    context,
    items.join(", "),
    context.contentWidth - bodyOffset
  );

  lines.forEach((line, index) => {
    if (index > 0) {
      context.y += lineHeight;
      checkPageBreak(context, lineHeight);
    }
    context.pdf.text(
      line,
      context.marginLeft + bodyOffset,
      context.y
    );
  });
}

function writeSkills(context: PdfContext) {
  writeSectionTitle(context, "SKILLS", 6);

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
      10
    );
    context.y += 12;
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
      9
    );
  }
}

function writeFooter(context: PdfContext) {
  context.pdf.setFontSize(7);
  context.pdf.setTextColor(...context.colors.gray);
  writeLinkedLine(context, [
    { text: resumeData.contact.github, url: `https://${resumeData.contact.github}` },
    { text: resumeData.contact.linkedin, url: `https://${resumeData.contact.linkedin}` },
  ], context.marginLeft, context.pageHeight - 22);
}

export async function generateResumePDF(): Promise<Blob> {
  const context = createPdfContext();

  writeHeader(context);
  writeExperience(context);
  writeSelectedWork(context);
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
