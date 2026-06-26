# Password Generator

A fast, free, and privacy-friendly online password generator built with [Astro](https://astro.build/), [Tailwind CSS](https://tailwindcss.com/), and deployed to [Vercel](https://vercel.com/).

## Features

- Generate secure passwords from 8 to 128 characters long
- Toggle uppercase, lowercase, numbers, and symbols
- Avoid ambiguous characters (`0`, `O`, `l`, `1`, `I`)
- Real-time entropy-based strength indicator
- One-click copy to clipboard
- SEO-ready pages: homepage, tool page, and keyword landing pages
- Google AdSense and affiliate link placeholders via env vars
- Sitemap and JSON-LD structured data included

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the dev server:

   ```bash
   npm run dev
   ```

3. Build for production:

   ```bash
   npm run build
   ```

## Customization Checklist

- [ ] Update `astro.config.mjs` with the real site URL
- [ ] Update `public/robots.txt` with the real sitemap URL
- [ ] Update `public/ads.txt` with your AdSense publisher ID
- [ ] Replace placeholder affiliate links with real URLs
- [ ] Set `PUBLIC_ADSENSE_CLIENT` and `PUBLIC_GA4_ID` in Vercel or `.env`

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
| --- | --- |
| `PUBLIC_ADSENSE_CLIENT` | Your AdSense publisher ID, e.g. `ca-pub-XXXXXXXXXXXXXXXX` |
| `PUBLIC_GA4_ID` | Your Google Analytics 4 measurement ID, e.g. `G-XXXXXXXXXX` |

## Project Structure

```
├── public/
│   ├── ads.txt
│   ├── robots.txt
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── AdSense.astro
│   │   ├── AffiliateLink.astro
│   │   ├── Layout.astro
│   │   └── ToolLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   └── tools/
│   │       ├── index.astro
│   │       ├── password-generator.astro
│   │       ├── strong-password-generator.astro
│   │       ├── random-password-generator.astro
│   │       └── secure-password-generator.astro
│   ├── scripts/
│   │   └── password-generator.js
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── package.json
├── tailwind.config.mjs
├── vercel.json
├── .env.example
└── README.md
```

## License

MIT
