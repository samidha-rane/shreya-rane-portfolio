# Shreya Rane – Portfolio Website

A static site (HTML, CSS, JavaScript) with one Vercel Serverless Function for the contact form.
No build step and no npm packages.

## What's in the folder
- `index.html`, `about.html`, `services.html`, `portfolio.html`, `contact.html`, `case-study-*.html` – the pages
- `404.html` – shown automatically by Vercel for any page that doesn't exist
- `api/contact.js` – the contact form handler (runs on Vercel at `/api/contact`)
- `vercel.json` – clean URLs (`/about` instead of `/about.html`) and caching headers
- `css/style.css` – all styling (colours at the top)
- `js/main.js` – menu, hero animation, portfolio, slide viewer, contact form
- `js/projects.js` – **your portfolio projects. Edit this file to add work.**
- `assets/` – resume PDF, certificates, screenshots, plan slides and images
- `sitemap.xml`, `robots.txt` – for Google Search Console

## Deploy on Vercel
1. Put this folder in a GitHub repository (upload the files, keeping the folders as they are).
2. On vercel.com: **Add New → Project**, pick the repository, and click **Deploy**.
   Framework preset: **Other**. Leave the build command and output directory empty.
   (Or, without GitHub: install the Vercel CLI and run `vercel` inside this folder.)
3. Your site is live at `https://<project-name>.vercel.app`.

## Turn on the contact form (about 5 minutes)
The form emails you through **Resend** (free plan: 3,000 emails a month).
1. Sign up at resend.com **with shreyarane14@gmail.com**.
2. In Resend: **API Keys → Create API Key**, copy it.
3. In Vercel: **Project → Settings → Environment Variables**, add
   `RESEND_API_KEY` = the key you copied. Save, then **Redeploy** the project.
4. Open `/contact` on your live site and send yourself a test message.

Optional variables:
- `CONTACT_TO` – a different inbox for enquiries (default: shreyarane14@gmail.com).
  Until you verify a domain in Resend, it can only send to the email you signed up with.
- `CONTACT_FROM` – once you verify your own domain in Resend, set e.g.
  `Shreya Rane Website <hello@yourdomain.com>`.

Replies are easy: each enquiry email has the visitor's address as Reply-To.

## Before or after going live
1. **Domain:** search all files for `yourdomain.com` and replace it with your real address
   (your `.vercel.app` address, or your own domain once connected in Vercel → Settings → Domains).
   It appears in canonical tags, social sharing tags, `sitemap.xml`, `robots.txt` and the home page hero.
2. **Photo:** save your photo as `assets/img/profile.jpg` (portrait, about 800 x 1000 px).
   Until then a placeholder shows automatically.
3. **Projects:** edit `js/projects.js`. Each project's `caseStudy` link uses clean URLs, e.g. `/case-study-eleve-seo`.
4. Add the site to Google Search Console and submit `sitemap.xml`.
5. Add GA4 or Google Tag Manager: paste the snippet just before `</head>` on each page.

## Colours
- Dark theme only. All colours are variables at the top of `css/style.css`.
- SEO = teal, Google Ads = amber, plans and reporting = violet, websites = pink
  (`--c-seo`, `--c-ads`, `--c-data`, `--c-web`).

## One-time SEO list
The websites in the SEO section are in `portfolio.html` inside `<ul id="site-chips">`.
Add one with `<li>Name</li>`.
