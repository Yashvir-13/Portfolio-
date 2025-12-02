---
description: how to deploy the cv-website
---

# Deployment Guide for CV Website

This Next.js application can be deployed using several platforms. Here are the recommended options:

## Option 1: Vercel (Recommended - Easiest)

Vercel is the company behind Next.js and offers the smoothest deployment experience.

### Steps:

1. **Create a Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub, GitLab, or Bitbucket account

2. **Push Your Code to Git (if not already done)**
   ```bash
   git init
   git add .
   git commit -m "Ready for deployment"
   git remote add origin <your-git-repo-url>
   git push -u origin main
   ```

3. **Import Project to Vercel**
   - Click "Add New Project" in Vercel dashboard
   - Import your Git repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

4. **Configure Environment Variables (if needed)**
   - If you're using EmailJS or other services, add environment variables in Vercel:
     - Go to Project Settings → Environment Variables
     - Add your `NEXT_PUBLIC_EMAILJS_*` variables

5. **Done!**
   - Your site will be live at `https://your-project-name.vercel.app`
   - Every push to main branch will auto-deploy

### Custom Domain (Optional)
- Go to Project Settings → Domains
- Add your custom domain and follow DNS instructions

---

## Option 2: Netlify

Netlify is another excellent option with generous free tier.

### Steps:

1. **Create a Netlify Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with Git provider

2. **Add Site from Git**
   - Click "Add new site" → "Import an existing project"
   - Connect your repository

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Base directory: (leave empty)

4. **Add Environment Variables**
   - Go to Site settings → Environment variables
   - Add your environment variables

5. **Deploy**
   - Click "Deploy site"
   - Your site will be live at `https://random-name.netlify.app`

---

## Option 3: GitHub Pages (Static Export)

For GitHub Pages, you'll need to export your Next.js app as static HTML.

### Steps:

1. **Update `next.config.ts`**
   Add output and basePath configuration:
   ```typescript
   import type { NextConfig } from "next";

   const nextConfig: NextConfig = {
     output: 'export',
     basePath: '/cv-website2', // Replace with your repo name
     images: {
       unoptimized: true,
     },
     reactCompiler: true,
   };

   export default nextConfig;
   ```

2. **Update `package.json` scripts**
   Add export script:
   ```json
   "scripts": {
     "dev": "next dev",
     "build": "next build",
     "start": "next start",
     "lint": "eslint",
     "export": "next build && next export"
   }
   ```

3. **Build Static Site**
   ```bash
   npm run build
   ```

4. **Create GitHub Pages Deployment**
   - Create `.github/workflows/deploy.yml` with GitHub Actions workflow
   - Push to GitHub
   - Enable GitHub Pages in repo settings

5. **Access Your Site**
   - Your site will be at `https://your-username.github.io/cv-website2`

---

## Option 4: Self-Hosted (Node.js Server)

Deploy on your own server or VPS.

### Steps:

1. **Build the Application**
   ```bash
   npm run build
   ```

2. **Upload to Server**
   - Transfer your entire project to the server
   - Make sure Node.js is installed (v18+ recommended)

3. **Install Dependencies on Server**
   ```bash
   npm ci --production
   ```

4. **Start the Application**
   ```bash
   npm start
   ```
   - This runs on port 3000 by default

5. **Use Process Manager (Recommended)**
   Install PM2 to keep the app running:
   ```bash
   npm install -g pm2
   pm2 start npm --name "cv-website" -- start
   pm2 save
   pm2 startup
   ```

6. **Set Up Reverse Proxy**
   - Use Nginx or Apache to proxy requests to your Next.js app
   - Configure SSL with Let's Encrypt

---

## Pre-Deployment Checklist

Before deploying, make sure to:

- [ ] Test the production build locally:
  ```bash
  npm run build
  npm start
  ```
  Then visit http://localhost:3000

- [ ] Ensure all environment variables are properly set
- [ ] Check that the resume file is in the correct location (`/public/resume.pdf`)
- [ ] Verify all EmailJS credentials are configured
- [ ] Test contact form functionality
- [ ] Optimize images in `/public` folder if needed
- [ ] Update metadata in your pages (title, description, OG tags)
- [ ] Test on different browsers and devices

---

## Recommended: Vercel

For this project, I strongly recommend **Vercel** because:
- ✅ Zero configuration needed
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Automatic deployments on git push
- ✅ Free for personal projects
- ✅ Built by the Next.js team
- ✅ Excellent performance optimization

