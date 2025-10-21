export type Resume = {
  basics: {
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
    urls?: {
      linkedin?: string;
      github?: string;
      portfolio?: string;
      leetcode?: string;
      [k: string]: string | undefined;
    };
    summary?: string;
  };
  skills: string[];
  skillsByCategory?: Record<string, string[]>;
  education: Array<{
    institution?: string;
    degree?: string;
    start?: string;
    end?: string;
    location?: string;
  }>;
  experience: Array<{
    title?: string; // e.g., Role at Company (Dates)
    bullets?: string[];
  }>;
  projects: Array<{
    name: string;
    description?: string;
    url?: string;
    image?: string;
    tags?: string[];
  }>;
  certifications?: Array<{ 
    name: string; 
    issuer?: string; 
    date?: string;
    image?: string;
  }>;
  languages?: string[];
  leadership?: string[];
  generatedAt?: string;
  sourcePdf?: string;
};
