import resume from "@/data/resume.json";

export function generatePersonSchema() {
  const r = resume;
  
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: r.basics?.name || "Your Name",
    email: r.basics?.email,
    url: r.basics?.urls?.portfolio || "https://yourwebsite.com",
    jobTitle: r.skills?.slice(0, 3).join(" • ") || "Full Stack Developer",
    description: r.basics?.summary,
    sameAs: [
      r.basics?.urls?.github,
      r.basics?.urls?.linkedin,
    ].filter(Boolean),
    alumniOf: r.education?.map(edu => ({
      "@type": "EducationalOrganization",
      name: edu.institution,
    })),
    hasCredential: r.certifications?.map(cert => ({
      "@type": "EducationalOccupationalCredential",
      name: cert.name,
      credentialCategory: "certificate",
    })),
    knowsAbout: r.skills,
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Portfolio",
    url: "https://yourwebsite.com",
    description: "Full Stack Developer Portfolio",
  };
}
