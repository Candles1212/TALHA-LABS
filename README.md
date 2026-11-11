# Talha Labs website

A multi-page website for Talha Labs, a diagnostic laboratory in Sadiqabad, Punjab, Pakistan.

## Project structure

```text
TALHA-LABS/
├── api/
│   └── chat.js                 # Vercel serverless endpoint for TL AI
├── assets/
│   ├── css/
│   │   ├── home.css            # Homepage-specific styles
│   │   ├── interior.css        # Shared styles for inner pages
│   │   └── assistant.css       # Shared TL AI widget styles
│   ├── images/
│   │   └── taha.jpg            # Existing Talha Labs image/logo asset
│   └── js/
│       ├── navigation.js       # Mobile navigation and reveal animations
│       ├── analytics.js        # Google Analytics and contact-click events
│       └── tl-ai.js            # TL AI website assistant interface
├── index.html                  # Homepage
├── about.html                  # About the laboratory
├── services.html               # Laboratory services
├── contact.html                # Contact details and location
├── health-tips.html            # Health information
├── rates.html                  # Test rates page (currently under construction)
├── robots.txt                  # Crawler instructions
├── sitemap.xml                 # Search-engine sitemap
├── vercel.json                 # Vercel redirects
├── README.md
└── [Google/Bing verification files]
```

## Technology

- HTML for page structure and metadata
- CSS split into shared and page-specific stylesheets
- Vanilla JavaScript split by responsibility
- Tailwind CSS loaded from its CDN
- Vercel serverless function at `/api/chat` for the TL AI endpoint

## Local preview

Run a local static server from the repository root so root-relative asset paths and the `/api` route resolve as expected. Static pages can be previewed with a local server; the serverless chat endpoint requires a Vercel-compatible local environment and its configured environment variables.

## TL AI configuration

The serverless endpoint in `api/chat.js` requires the `ANTHROPIC_API_KEY` environment variable in Vercel. The optional `TLAI_MODEL` variable controls model selection. Never put API keys in HTML or browser-side JavaScript.

## Maintenance notes

- Keep page-specific content and SEO metadata in the corresponding root-level HTML file.
- Put reusable styles in `assets/css/` and browser-side behavior in `assets/js/`.
- Store local images and other static media in `assets/images/`.
- Keep Vercel serverless functions inside `api/`.
- Verify laboratory hours, home-sampling coverage, test availability, staff credentials and historical claims with the laboratory before changing them.
- The website assistant must not diagnose, interpret personal test results, or provide treatment advice.
- Confirm the correct Google Maps listing before changing the existing map URLs.
- The Test Rates page currently includes a `noindex` directive while it is under construction. Remove that directive only when the page is ready for public indexing.

## Deployment

Vercel serves the root-level HTML routes and the `api/` serverless function. Review the proposed changes before merging them into `main`. A branch or pull request is not the same as a production deployment.
