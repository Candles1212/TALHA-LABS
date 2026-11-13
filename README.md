# Talha Labs website

A responsive, multi-page website for **Talha Labs**, a diagnostic laboratory in Sadiqabad, Punjab, Pakistan.

**Live website:** https://talhalabs.vercel.app  
**Repository:** https://github.com/Candles1212/TALHA-LABS

## Website pages

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Laboratory overview, departments, visitor journey and contact links |
| Services | `services.html` | Diagnostic departments, service discovery and test enquiry tools |
| Test Rates | `rates.html` | Test enquiry builder; currently marked `noindex` while rates are being finalised |
| Health Tips & Careers | `health-tips.html` | General health-awareness notes, visit-preparation checklist and career enquiries |
| About Us | `about.html` | Laboratory background and team information |
| Contact | `contact.html` | Contact details, location and enquiry options |

## Project structure

```text
TALHA-LABS/
├── api/
│   └── chat.js                    # Vercel serverless chat endpoint
├── assets/
│   ├── css/
│   │   ├── home.css               # Homepage-specific styles
│   │   ├── interior.css           # Base styling for interior pages
│   │   ├── brand-refresh.css      # Shared visual identity and component styles
│   │   ├── site-polish.css        # Shared responsive, accessibility and page refinements
│   │   └── assistant.css          # TL AI assistant widget
│   ├── images/
│   │   └── taha.jpg               # Existing Talha Labs logo/image asset
│   └── js/
│       ├── navigation.js          # Mobile navigation and reveal behavior
│       ├── analytics.js           # Analytics integration and contact-click events
│       ├── tl-ai.js               # TL AI assistant interface
│       └── interactive-tools.js   # Service filters, enquiry builders, FAQs and reading progress
├── index.html
├── services.html
├── rates.html
├── health-tips.html
├── about.html
├── contact.html
├── robots.txt                     # Crawler rules and sitemap reference
├── sitemap.xml                    # Canonical, indexable page URLs
├── vercel.json                    # Vercel redirects
└── README.md
```

## Design and user experience

- Responsive layouts for desktop and mobile screens.
- Shared colour, card, border and spacing styles across the site.
- Animated icon treatments and hover states, with reduced-motion preferences respected.
- Accessible skip links, visible keyboard focus and mobile navigation state attributes.
- Health Tips page includes illustrated topic cards, a career section and a visit-preparation checklist.
- WhatsApp and email links provide direct enquiry routes.

## Technology

- HTML5 for page structure and metadata.
- CSS for shared and page-specific presentation.
- Vanilla JavaScript for navigation and interactive tools.
- Tailwind CSS loaded from its CDN.
- Vercel serverless function under `api/`.

## Local preview

Run a local static server from the repository root so root-relative paths such as `/assets/...` resolve correctly. Static pages can be previewed with any suitable local web server.

The serverless chat endpoint requires a Vercel-compatible local environment and its configured environment variables. A plain static server will not run the `/api/chat` function.

## TL AI configuration

The serverless endpoint in `api/chat.js` uses the `ANTHROPIC_API_KEY` environment variable in Vercel. The optional `TLAI_MODEL` variable controls model selection.

**Security:** never place API keys or other secrets in HTML, committed files or browser-side JavaScript. Configure secrets through the Vercel project environment settings.

The assistant is an information aid, not a substitute for a qualified healthcare professional. It must not diagnose conditions, interpret personal test results or recommend treatment.

## SEO and indexing

- Each public page should keep its own descriptive title, meta description and canonical URL.
- `robots.txt` points crawlers to `https://talhalabs.vercel.app/sitemap.xml`.
- `sitemap.xml` lists the current indexable public pages.
- The Test Rates page is intentionally excluded from the sitemap while it carries a `noindex` directive. Add it only after the page is ready for public indexing and the directive is removed.
- Keep canonical URLs aligned with the production domain.

## Content and maintenance

- Preserve existing page content and working interactions when making design changes.
- Put reusable styles in `assets/css/` and browser-side behavior in `assets/js/`.
- Store local images and other static media in `assets/images/`.
- Keep Vercel serverless functions inside `api/`.
- Verify opening hours, home-sampling coverage, test availability, staff credentials, rates and historical claims with the laboratory before publishing changes.
- Health information is general awareness content. Keep preparation guidance cautious and direct visitors to their doctor or the laboratory for test-specific instructions.
- Confirm the correct Google Maps listing before changing existing map URLs.

## Deployment

The project is configured for Vercel. When the connected GitHub branch is updated, Vercel may start a deployment according to the project's integration settings. A successful GitHub commit alone does not prove that the production deployment completed; check the Vercel deployment status and test the live pages after changes.


## Guest access and optional customer portal

- The homepage offers **Continue as Guest** as the default route. Visitors can browse public pages without creating an account.
- **Customer Login (Optional)** opens `account.html`, a non-indexed portal information page.
- The customer portal is currently a front-end placeholder. Do not collect passwords or personal medical information through it until a real authentication provider, server-side authorization, secure report storage and privacy controls have been configured and tested.
- The portal page provides a route back to guest browsing and a general contact route for portal updates. It does not authenticate users or expose medical reports.
- Keep personal laboratory reports private and accessible only after identity verification and authorization. Never put report files or credentials in public website assets.
