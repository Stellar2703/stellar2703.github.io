# Auto-fetch Images

You can auto-download project and certification images and update paths by running:

```powershell
npm run fetch:images
```

What it does:
- Downloads GitHub Open Graph images for your repo-based projects
- Downloads logos for certifications (SimpleIcons/Wikipedia)
- Saves them into `public/projects` and `public/certifications`
- Updates `src/data/resume.json` to use local image files

If you want to use your own custom images instead, place them according to `IMAGE_PLACEMENT_GUIDE.md` and keep the same names.
