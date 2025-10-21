# Image Placement Guide for Your Portfolio

## 📁 Directory Structure

All images go in the `public` folder. Here's the complete structure:

```
web/public/
├── resume.pdf                          # Your resume PDF
├── projects/                           # Project thumbnails/icons
│   ├── terminus.svg (or .png/.jpg)
│   ├── lanturn.svg (or .png/.jpg)
│   ├── finsense.svg (or .png/.jpg)
│   ├── react-fullstack.svg (or .png/.jpg)
│   ├── medical-bot.svg (or .png/.jpg)
│   ├── jenkins.svg (or .png/.jpg)
│   ├── kubernetes.svg (or .png/.jpg)
│   ├── proxmox.svg (or .png/.jpg)
│   ├── portfolio.svg (or .png/.jpg)
│   ├── react-crud.svg (or .png/.jpg)
│   ├── pdf-splitter.svg (or .png/.jpg)
│   └── db-migration.svg (or .png/.jpg)
└── certifications/                     # Certification badges/logos
    ├── gcp-architect.png
    ├── gcp-leader.png
    ├── github.png
    ├── oci-architect.png
    └── oci-foundations.png
```

---

## 🎨 Project Images (12 images)

**Location:** `web/public/projects/`

**Recommended Size:** 400x400px or 600x600px (square format works best)

**Supported Formats:** `.svg`, `.png`, `.jpg`, `.webp`

| File Name | Project Name | Notes |
|-----------|-------------|-------|
| `terminus.svg` | Terminus Assess | Interactive test portal |
| `lanturn.svg` | LANtern | Network power management |
| `finsense.svg` | FinSense | Financial analytics |
| `react-fullstack.svg` | React Full-Stack App | Full-stack demo |
| `medical-bot.svg` | Medical Chatbot | AI chatbot |
| `jenkins.svg` | Jenkins CI/CD | CI/CD pipeline |
| `kubernetes.svg` | Kubernetes Deployment | K8s project |
| `proxmox.svg` | Proxmox Frontend | VM management |
| `portfolio.svg` | Portfolio Website | Portfolio template |
| `react-crud.svg` | React CRUD App | CRUD operations |
| `pdf-splitter.svg` | PDF Splitter Tool | PDF utility |
| `db-migration.svg` | Database Migration | DB scripts |

**Tips:**
- Use screenshots of your projects
- Use relevant icons/logos (e.g., Kubernetes logo for K8s project)
- Keep consistent styling across all images
- If using SVG, they'll scale perfectly at any size

---

## 🏆 Certification Images (5 images)

**Location:** `web/public/certifications/`

**Recommended Size:** Original certification badge size (usually 200x200px to 400x400px)

**Supported Formats:** `.png`, `.jpg`, `.webp` (PNG preferred for badges)

| File Name | Certification | Issuer |
|-----------|--------------|--------|
| `gcp-architect.png` | Professional Cloud Architect | Google Cloud |
| `gcp-leader.png` | Google Cloud Digital Leader | Google Cloud |
| `github.png` | GitHub Foundations | GitHub |
| `oci-architect.png` | OCI MultiCloud Architect | Oracle |
| `oci-foundations.png` | OCI Foundations Associate | Oracle |

**Tips:**
- Download official badge images from certification provider
- Use PNG format with transparent background if available
- Keep original aspect ratio

---

## 📄 Resume PDF

**Location:** `web/public/resume.pdf`

**File Name:** Must be exactly `resume.pdf` (lowercase)

**Format:** PDF only

---

## 🔄 How to Add/Change Images

1. **Navigate to the public folder:**
   ```
   E:\VSCode\Projects\portfo\web\public\
   ```

2. **Place images in correct subfolder:**
   - Project images → `projects/`
   - Certification images → `certifications/`
   - Resume → root of `public/`

3. **Use exact file names** as listed above

4. **If you want to use different file extensions:**
   - You can use `.png` or `.jpg` instead of `.svg`
   - Just update the extension in `resume.json`
   - Example: Change `"image": "/projects/terminus.svg"` to `"image": "/projects/terminus.png"`

---

## ✅ Checklist

- [ ] Place resume.pdf in public/ folder
- [ ] Create projects/ folder (if not exists)
- [ ] Add all 12 project images
- [ ] Create certifications/ folder (if not exists)
- [ ] Add all 5 certification images
- [ ] Verify all file names match exactly
- [ ] Test by refreshing your portfolio

---

## 🎯 Quick Tips

- **Image Quality:** Use high-resolution images (at least 400x400px for projects)
- **File Size:** Optimize images to keep them under 500KB each for faster loading
- **Format Priority:** SVG > PNG > JPG (for quality vs size)
- **Consistency:** Keep similar style/theme across all project images
- **Backup:** Keep originals in a separate folder before optimizing

---

## 🔧 Troubleshooting

**Image not showing?**
1. Check the file name matches exactly (case-sensitive)
2. Verify the file is in the correct folder
3. Hard refresh browser (Ctrl + Shift + R)
4. Check browser console for 404 errors

**Wrong image displayed?**
1. Clear browser cache
2. Check if multiple files have similar names
3. Restart the dev server

---

Need help? All image paths are defined in:
- `web/src/data/resume.json` (projects & certifications)
- `web/src/lib/downloadResume.ts` (resume PDF)
