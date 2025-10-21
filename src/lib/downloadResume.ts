import resume from "@/data/resume.json";
import type { Resume } from "@/types/resume";
import { saveAs } from "file-saver";
import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";

export function downloadPDF() {
  // Create a link element and trigger download of the PDF from public folder
  const link = document.createElement('a');
  link.href = '/resume.pdf';
  link.download = 'resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function downloadTXT() {
  const r = resume as Resume;
  let text = `${r.basics?.name || ""}\n`;
  text += `${r.basics?.email || ""}\n`;
  text += `GitHub: ${r.basics?.urls?.github || ""}\n`;
  text += `LinkedIn: ${r.basics?.urls?.linkedin || ""}\n\n`;
  
  text += `SUMMARY\n${"=".repeat(50)}\n`;
  text += `${r.basics?.summary || ""}\n\n`;
  
  if (r.skills?.length) {
    text += `SKILLS\n${"=".repeat(50)}\n`;
    text += r.skills.join(", ") + "\n\n";
  }
  
  if (r.experience?.length) {
    text += `EXPERIENCE\n${"=".repeat(50)}\n`;
    r.experience.forEach(exp => {
      text += `\n${exp.title}\n`;
      if (exp.bullets?.length) {
        exp.bullets.forEach(bullet => {
          text += `  • ${bullet}\n`;
        });
      }
    });
    text += "\n";
  }
  
  if (r.education?.length) {
    text += `EDUCATION\n${"=".repeat(50)}\n`;
    r.education.forEach(edu => {
      text += `\n${edu.degree}\n`;
      text += `${edu.institution}\n`;
      if (edu.start || edu.end) {
        text += `${edu.start} - ${edu.end}\n`;
      }
    });
    text += "\n";
  }
  
  if (r.certifications?.length) {
    text += `CERTIFICATIONS\n${"=".repeat(50)}\n`;
    r.certifications.forEach(cert => {
      text += `  • ${cert.name} - ${cert.issuer} (${cert.date})\n`;
    });
  }
  
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "resume.txt");
}

export async function downloadDOCX() {
  const r = resume as Resume;
  
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Name
          new Paragraph({
            text: r.basics?.name || "",
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
          }),
          
          // Contact Info
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: r.basics?.email || "",
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `GitHub: ${r.basics?.urls?.github || ""} | LinkedIn: ${r.basics?.urls?.linkedin || ""}`,
              }),
            ],
          }),
          
          new Paragraph({ text: "" }),
          
          // Summary
          new Paragraph({
            text: "SUMMARY",
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({
            text: r.basics?.summary || "",
          }),
          
          new Paragraph({ text: "" }),
          
          // Skills
          ...(r.skills?.length
            ? [
                new Paragraph({
                  text: "SKILLS",
                  heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                  text: r.skills.join(", "),
                }),
                new Paragraph({ text: "" }),
              ]
            : []),
          
          // Experience
          ...(r.experience?.length
            ? [
                new Paragraph({
                  text: "EXPERIENCE",
                  heading: HeadingLevel.HEADING_1,
                }),
                ...r.experience.flatMap(exp => [
                  new Paragraph({
                    text: exp.title,
                    heading: HeadingLevel.HEADING_2,
                  }),
                  ...(exp.bullets?.map(
                    bullet =>
                      new Paragraph({
                        text: bullet,
                        bullet: { level: 0 },
                      })
                  ) || []),
                  new Paragraph({ text: "" }),
                ]),
              ]
            : []),
          
          // Education
          ...(r.education?.length
            ? [
                new Paragraph({
                  text: "EDUCATION",
                  heading: HeadingLevel.HEADING_1,
                }),
                ...r.education.flatMap(edu => [
                  new Paragraph({
                    text: edu.degree,
                    heading: HeadingLevel.HEADING_2,
                  }),
                  new Paragraph({
                    text: `${edu.institution} | ${edu.start} - ${edu.end}`,
                  }),
                  new Paragraph({ text: "" }),
                ]),
              ]
            : []),
          
          // Certifications
          ...(r.certifications?.length
            ? [
                new Paragraph({
                  text: "CERTIFICATIONS",
                  heading: HeadingLevel.HEADING_1,
                }),
                ...r.certifications.map(
                  cert =>
                    new Paragraph({
                      text: `${cert.name} - ${cert.issuer} (${cert.date})`,
                      bullet: { level: 0 },
                    })
                ),
              ]
            : []),
        ],
      },
    ],
  });
  
  const blob = await import("docx").then(({ Packer }) => Packer.toBlob(doc));
  saveAs(blob, "resume.docx");
}

export function downloadJSON() {
  const blob = new Blob([JSON.stringify(resume, null, 2)], { type: "application/json" });
  saveAs(blob, "resume.json");
}
