# Claimfox React

## Quick start
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
    npm run dev
   ```
   This starts Vite and the local PDF server in parallel. Open the printed local URL and log in with `Seven / 9021` or `Jürgen / 9021`.
3. Build for production:
   ```bash
   npm run build
   ```
   Deploy the generated `dist/` folder (already configured for Netlify SPA hosting).

## PDF server
- Dev: `npm run dev` starts Vite + the PDF API on `http://127.0.0.1:3001`.
- Prod: run `npm run start` to serve the PDF API (and `dist/` if present).
- Endpoint: `GET /api/pdf/business-model-antares?lang=de|en`
- Frontend uses `VITE_PDF_BASE_URL` to reach the API (set in `.env.development`).

## Netlify PDF (live)
- Live uses a Netlify Function at `/.netlify/functions/pdf-business-model-antares`.
- The public endpoint stays `GET /api/pdf/business-model-antares?lang=de|en` via redirect.

## CV PDF export
1. Generate the PDF:
   ```bash
   npm run pdf
   ```
2. Output files:
   - `dist/cv_rm.pdf`
   - `dist/preview.png`
