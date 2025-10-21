// Simple resume PDF -> JSON extractor
// Usage: node scripts/parse-resume.cjs [pathToPdf] [outJson]
// Defaults to: ../Shashwath_V_R_Resume.pdf -> src/data/resume.json

const fs = require("fs");
const path = require("path");
const pdf = require("pdf-parse");

const PDF_PATH = process.argv[2] || path.resolve(__dirname, "..", "..", "Shashwath_V_R_Resume.pdf");
const OUT_PATH = process.argv[3] || path.resolve(__dirname, "..", "src", "data", "resume.json");

function extractField(regex, text) {
  const m = text.match(regex);
  return m ? (m[1] || m[0]).trim() : undefined;
}

function extractAll(regex, text) {
  const m = text.match(regex);
  return m ? m.map((s) => s.trim()) : [];
}

(async () => {
  try {
    const dataBuffer = fs.readFileSync(PDF_PATH);
    const { text } = await pdf(dataBuffer);
    const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

    // Heuristic parsing
    const fullText = lines.join("\n");
    const name = lines[0] && lines[0].length < 80 ? lines[0] : extractField(/^(.*?)(?:\n|$)/, fullText);
    const email = extractField(/[\w.+-]+@[\w-]+\.[\w.-]+/i, fullText);
    const phone = extractField(/(?:\+?\d[\s-]?){8,15}/, fullText);
    const location = extractField(/\b([A-Z][a-zA-Z]+(?:,\s*[A-Z][a-zA-Z]+)+)\b/, fullText);
  const linkedin = extractField(/(https?:\/\/(?:[\w.-]+\.)?linkedin\.com\/[\w\/().#?=&%~\-]+)/i, fullText);
  const github = extractField(/(https?:\/\/(?:[\w.-]+\.)?github\.com\/[\w\/().#?=&%~\-]+)/i, fullText);
  const portfolio = extractField(/(https?:\/\/[^\s]+)/i, fullText);

    // Sections
    function sliceBetween(startRe, endRe) {
      const startIdx = lines.findIndex((l) => startRe.test(l));
      const endIdx = endRe ? lines.findIndex((l, i) => i > startIdx && endRe.test(l)) : -1;
      if (startIdx === -1) return [];
      return lines.slice(startIdx + 1, endIdx === -1 ? undefined : endIdx);
    }

    const skillsLines = sliceBetween(/skills?/i, /(projects?|experience|work|education)/i);
    const skills = extractAll(/([A-Za-z0-9+#.\-\/ ]{2,})/g, skillsLines.join(", "))
      .map((s) => s.trim())
      .filter((s) => /[A-Za-z]/.test(s))
      .slice(0, 60);

    const educationLines = sliceBetween(/education/i, /(projects?|experience|work|skills?)/i);
    const education = educationLines
      .join(" \n")
      .split(/\n+/)
      .filter(Boolean)
      .slice(0, 6)
      .map((l) => ({ institution: l }));

    const expLines = sliceBetween(/(experience|work)/i, /(projects?|education|skills?)/i);
    const experiences = [];
    for (let i = 0; i < expLines.length; i++) {
      const l = expLines[i];
      if (!l) continue;
      if (/\b(\d{4}|present|current|months?|years?)\b/i.test(l) || /\sat\s/i.test(l)) {
        experiences.push({ title: l, bullets: [] });
      } else if (experiences.length) {
        if (/-\s/.test(l) || /•/.test(l)) experiences[experiences.length - 1].bullets.push(l.replace(/^[-•]\s?/, ""));
      }
    }

    const projectsLines = sliceBetween(/projects?/i, /(experience|work|education|skills?)/i);
    const projects = [];
    for (const l of projectsLines) {
      if (!l) continue;
  const url = extractField(/(https?:\/\/[^\s]+)/i, l);
      projects.push({ name: l.split(" - ")[0].slice(0, 80), description: l, url });
    }

    const out = {
      basics: {
        name,
        email,
        phone,
        location,
        urls: { linkedin, github, portfolio },
      },
      skills,
      education,
      experience: experiences,
      projects,
      raw: undefined,
      generatedAt: new Date().toISOString(),
      sourcePdf: path.basename(PDF_PATH),
    };

    // Ensure dir
    fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
    fs.writeFileSync(OUT_PATH, JSON.stringify(out, null, 2));
    console.log("Wrote:", OUT_PATH);
  } catch (err) {
    console.error("Failed to parse resume:", err);
    process.exit(1);
  }
})();
