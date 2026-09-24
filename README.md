# BrightTrail

A static job application tracker with a kanban board, a stats dashboard, and a warm
"butter yellow + charcoal" look. All data lives in your browser — nothing is sent to a
server. See `requirements.md` for the full spec and build log.

## Local development

```bash
npm install
npm run dev
```

Open the printed `localhost` URL. Routing uses hash-based paths (`/#/`, `/#/applications`)
so the app works correctly once deployed as a static site on GitHub Pages.

```bash
npm run build    # production build to dist/
npm run preview  # preview the production build locally
```

## How data storage works

- Every application you add is stored in your browser's `localStorage`, under the key
  `brighttrail.applications.v1`. Nothing leaves your machine.
- Data persists across reloads and browser restarts, but is tied to this browser on this
  device — it will not appear on another device or browser.
- Clearing your browser's site data for this URL (or using the in-app **Reset** button)
  permanently deletes everything. There is no undo, so export a backup first if you want
  to keep a copy.

## Export & Google Sheets

Use the **Export** menu in the top nav to download all applications as:

- **CSV** — plain, universally importable.
- **Excel (.xlsx)** — a real spreadsheet file.

To get your data into Google Sheets: export a CSV or Excel file, then in Google Sheets use
**File → Import → Upload** and choose the downloaded file. There is no live/automatic sync
to Google Sheets by design (see `requirements.md` §1.1) — this is a manual, on-demand
export so the app stays fully static with no external accounts or API keys.

## Known dependency advisory

`npm audit` flags the `xlsx` package for a prototype-pollution / ReDoS advisory. Both
issues are triggered by *parsing* an untrusted, maliciously crafted spreadsheet file.
BrightTrail only ever *writes* `.xlsx` files from data you entered yourself — it never
reads or parses spreadsheet files — so this advisory does not apply to how the app uses
the library. `xlsx` is also lazy-loaded (dynamic `import()`) so it's not part of the
initial page load.

## Deployment (GitHub Pages)

1. Set `base` in `vite.config.js` to match your repo name, e.g. `base: "/brighttrail/"`.
2. `npm run build`
3. Publish the `dist/` folder to the `gh-pages` branch (via the `gh-pages` npm package or
   a GitHub Actions workflow).
4. Enable GitHub Pages for the repo, pointing at the `gh-pages` branch.
