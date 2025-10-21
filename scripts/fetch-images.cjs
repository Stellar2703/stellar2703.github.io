// Downloads project and certification images and updates resume.json image paths
// Usage: npm run fetch:images

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const PROJECTS_DIR = path.join(PUBLIC_DIR, 'projects');
const CERTS_DIR = path.join(PUBLIC_DIR, 'certifications');
const RESUME_JSON = path.join(ROOT, 'src', 'data', 'resume.json');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    const req = proto.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // follow redirect
        const redirected = res.headers.location.startsWith('http')
          ? res.headers.location
          : new URL(res.headers.location, url).toString();
        res.resume();
        return resolve(downloadFile(redirected, dest));
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`Failed to download ${url}: ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve(dest)));
    });
    req.on('error', reject);
  });
}

async function tryDownload(urls, dest) {
  for (const url of urls) {
    try {
      await downloadFile(url, dest);
      return true;
    } catch (e) {
      // try next
    }
  }
  return false;
}

async function main() {
  ensureDir(PROJECTS_DIR);
  ensureDir(CERTS_DIR);

  // Map of project names in resume.json to download URL and local filename
  const projectImages = [
    {
      name: 'Terminus Assess – Interactive Student Test Portal',
      urls: ['https://opengraph.githubassets.com/1/stellar2703/Linux-Test_Portal-Backend'],
      file: 'terminus.png',
    },
    {
      name: 'LANtern – Network Power Management System',
      urls: ['https://opengraph.githubassets.com/1/stellar2703/LANtern'],
      file: 'lanturn.png',
    },
    {
      name: 'FinSense – Financial Analytics Platform',
      urls: ['https://opengraph.githubassets.com/1/stellar2703/FinSense_Code_Cubicle'],
      file: 'finsense.png',
    },
    {
      name: 'Sample React Full-Stack App',
      urls: ['https://opengraph.githubassets.com/1/stellar2703/Sample-ReactApp-with-frontend-backend-and-db-connection'],
      file: 'react-fullstack.png',
    },
    {
      name: 'Medical Chatbot with AI',
      urls: ['https://opengraph.githubassets.com/1/stellar2703/Medical_Chatbot'],
      file: 'medical-bot.png',
    },
    {
      name: 'Jenkins CI/CD Pipeline',
      urls: [
        'https://www.jenkins.io/images/logos/jenkins/jenkins.svg',
        'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/jenkins.svg',
        'https://unpkg.com/simple-icons@latest/icons/jenkins.svg',
      ],
      file: 'jenkins.svg',
    },
    {
      name: 'Kubernetes Deployment',
      urls: [
        'https://raw.githubusercontent.com/cncf/artwork/master/projects/kubernetes/icon/color/kubernetes-icon-color.svg',
        'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/kubernetes.svg',
        'https://unpkg.com/simple-icons@latest/icons/kubernetes.svg',
      ],
      file: 'kubernetes.svg',
    },
    {
      name: 'Proxmox Management Frontend',
      urls: [
        'https://upload.wikimedia.org/wikipedia/commons/5/58/Proxmox_logo_%28plain_text%29.svg',
        'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/proxmox.svg',
        'https://unpkg.com/simple-icons@latest/icons/proxmox.svg',
      ],
      file: 'proxmox.svg',
    },
    {
      name: 'Personal Portfolio Website',
      urls: ['https://opengraph.githubassets.com/1/stellar2703/personal-portfolio-template'],
      file: 'portfolio.png',
    },
    {
      name: 'React CRUD Application',
      urls: ['https://opengraph.githubassets.com/1/stellar2703/React-CRUD-App'],
      file: 'react-crud.png',
    },
    {
      name: 'PDF Page Splitter Tool',
      urls: ['https://opengraph.githubassets.com/1/stellar2703/PDF_file_page_splitter'],
      file: 'pdf-splitter.png',
    },
    {
      name: 'Database Migration Utility',
      urls: ['https://opengraph.githubassets.com/1/stellar2703/database-migration'],
      file: 'db-migration.png',
    },
  ];

  const certImages = [
    {
      name: 'Professional Cloud Architect',
      urls: [
        'https://upload.wikimedia.org/wikipedia/commons/5/5f/Google_Cloud_logo.svg',
        'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/googlecloud.svg',
        'https://unpkg.com/simple-icons@latest/icons/googlecloud.svg',
      ],
      file: 'gcp-architect.svg',
    },
    {
      name: 'Google Cloud Digital Leader',
      urls: [
        'https://upload.wikimedia.org/wikipedia/commons/5/5f/Google_Cloud_logo.svg',
        'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/googlecloud.svg',
        'https://unpkg.com/simple-icons@latest/icons/googlecloud.svg',
      ],
      file: 'gcp-leader.svg',
    },
    {
      name: 'GitHub Foundations',
      urls: [
        'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/github.svg',
        'https://unpkg.com/simple-icons@latest/icons/github.svg',
      ],
      file: 'github.svg',
    },
    {
      name: 'OCI MultiCloud Architect',
      urls: [
        'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg',
        'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/oracle.svg',
        'https://unpkg.com/simple-icons@latest/icons/oracle.svg',
      ],
      file: 'oci-architect.svg',
    },
    {
      name: 'OCI Foundations Associate',
      urls: [
        'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/oracle.svg',
        'https://unpkg.com/simple-icons@latest/icons/oracle.svg',
      ],
      // Use existing JPEG if present; updater will only change path when file exists
      file: 'oci-foundations.jpeg',
    },
  ];

  for (const p of projectImages) {
    const dest = path.join(PROJECTS_DIR, p.file);
    console.log('Downloading project image:', p.name);
    const ok = await tryDownload(p.urls, dest);
    if (!ok) console.warn('All sources failed for project image:', p.name);
  }
  for (const c of certImages) {
    const dest = path.join(CERTS_DIR, c.file);
    console.log('Downloading cert image:', c.name);
    const ok = await tryDownload(c.urls, dest);
    if (!ok) console.warn('All sources failed for cert image:', c.name);
  }

  // Update resume.json image paths to local files
  const resume = JSON.parse(fs.readFileSync(RESUME_JSON, 'utf-8'));

  if (Array.isArray(resume.projects)) {
    resume.projects = resume.projects.map((proj) => {
      const m = projectImages.find((p) => p.name === proj.name);
      if (m) {
        const localPath = path.join(PROJECTS_DIR, m.file);
        if (fs.existsSync(localPath)) {
          proj.image = `/projects/${m.file}`;
        }
      }
      return proj;
    });
  }

  if (Array.isArray(resume.certifications)) {
    resume.certifications = resume.certifications.map((cert) => {
      const m = certImages.find((c) => c.name === cert.name);
      if (m) {
        const localPath = path.join(CERTS_DIR, m.file);
        if (fs.existsSync(localPath)) {
          cert.image = `/certifications/${m.file}`;
        }
      }
      return cert;
    });
  }

  fs.writeFileSync(RESUME_JSON, JSON.stringify(resume, null, 2));
  console.log('Updated', path.relative(ROOT, RESUME_JSON), 'to use local image paths.');
  console.log('Done.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
