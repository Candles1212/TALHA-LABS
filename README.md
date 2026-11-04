# Talha Labs website

A static multi-page website for Talha Labs, a diagnostic laboratory in Sadiqabad, Punjab, Pakistan.

## Pages

- `index.html` — homepage and service overview
- `services.html` — laboratory services and test information
- `about.html` — laboratory and team information
- `contact.html` — contact details and location

## Project structure

- `assets/site.css` — shared responsive, accessibility and visual styles
- `taha.jpg` — existing Talha Labs image/logo asset
- `robots.txt` and `sitemap.xml` — search-engine discovery
- `vercel.json` — Vercel redirects

## Technology

The site is built with HTML, CSS and vanilla JavaScript. Tailwind CSS is currently loaded from its CDN, and Inter is loaded from Google Fonts. The TL AI panel is a preset, rule-based FAQ assistant; it is not a generative AI or medical-advice service.

## Preview locally

Open `index.html` in a browser, or serve the repository root with any static HTTP server. Keep the relative paths intact so the shared stylesheet and image load correctly.

## Content and safety notes

- Confirm laboratory hours, home-sampling coverage, test availability, team credentials and historical claims with the laboratory before changing or promoting them.
- Do not add diagnoses, treatment recommendations or interpretation of individual medical reports to the FAQ assistant.
- Never place private API keys or credentials in browser-side JavaScript.
- The FAQ analytics event records the selected preset label, not free-form health questions.
- Confirm the correct Google Maps listing before changing the structured-data map URL; the existing site currently contains two different map links.

## Deployment

The repository is configured for Vercel. Review and merge the upgrade branch before any production deployment. No deployment is triggered by editing this branch.
