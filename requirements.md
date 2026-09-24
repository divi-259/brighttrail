# BrightTrail — Job Application Tracker

A static, local-first job application tracker with a warm "butter yellow + charcoal"
visual style, deployed on GitHub Pages. All data lives in the browser's `localStorage`
for the next 2–3 months, with manual export to CSV/Excel (which can then be imported
into Google Sheets whenever needed) and a one-click reset.

---

## 1. Decisions & Specs (locked in)

### 1.1 Product scope
- **Pages:** 2 — `Dashboard` (stats panel + recent applications table) and
  `Applications` (kanban board, the main working view).
- **Primary interaction model:** Kanban board with drag-and-drop cards across status
  columns.
- **Data persistence:** Browser `localStorage` only. No backend, no accounts, no auth.
- **Data lifetime:** Intended for ~2–3 months of local use before migrating fully to
  Google Sheets or another system.
- **Reset:** A "Reset all data" action (with confirmation) that clears `localStorage`.
- **Export:** CSV export and Excel (`.xlsx`) export of all applications, for manual
  import into Google Sheets whenever the user wants. No live Google Sheets API / OAuth
  sync — this is explicitly out of scope.

### 1.2 Data model (per application)
**Core fields**
- Company
- Job Title
- Job URL
- Status (see pipeline stages below)
- Application Date
- Location
- Salary Range

**Contact & source fields**
- Contact person / recruiter name
- Contact email or LinkedIn URL
- Source (LinkedIn, referral, company site, job board, other)

**Notes & tags fields**
- Free-text notes
- Custom tags/labels (e.g. "dream job", "remote", "urgent") — user-defined, stored as a
  list of strings per application

**Pipeline stages (kanban columns / status values)**
- Wishlist / Saved
- Applied
- Screening
- Interview
- Offer
- Rejected

(Exact column set can be refined during build, but this is the default set modeled on
the reference mockup.)

### 1.3 Visual design
- **Theme name:** Butter Yellow + Charcoal — warm, optimistic, playful.
- **Palette:**
  - Primary: `#EBB94F`
  - Dark (text/charcoal): `#30302C`
  - Background: `#FFFCF3`
  - Surface (cards): `#FFFFFF`
  - Accent: `#FFF0BB`
  - Secondary: `#8CA88E`
- **Mode:** Light mode only (no dark-mode toggle for v1).
- **Card style:** Rounded corners, soft shadows, pill-shaped status badges (color-coded
  per status).
- **Illustrations:** Custom, original SVG illustrations in a warm/hand-drawn style
  (sun character, plants, sticky-note accents) inspired by — but not copied from — the
  reference mockup. Used sparingly: dashboard hero area, empty states, reset
  confirmation, footer accent.
- **Icons:** A clean icon set (e.g. Lucide) for nav items, stat cards, and inline
  actions.
- **Stats panel (Dashboard):** Total Applications, In Progress, Interviews, Offers
  (cards with icon + number), plus a "Recent Applications" table (Company, Role,
  Status, Date Applied) linking into the Applications board.
- **Search & filter bar:** On the Applications page — search by company/title, filter
  by tag, source, or status.

### 1.4 Tech stack
- **Framework:** React + Vite (static build, no server).
- **Routing:** Client-side routing between Dashboard and Applications (e.g. React
  Router), configured for GitHub Pages' static hosting (hash routing or a configured
  base path — decide during setup based on repo name).
- **State/persistence:** React state backed by `localStorage`, no external state
  library needed at this scale.
- **Drag and drop:** A lightweight DnD library (e.g. `@dnd-kit/core`) for the kanban
  board.
- **Export:** CSV via a small in-browser serializer; Excel via a library such as
  `sheetjs`/`xlsx` to produce a real `.xlsx` file client-side.
- **Styling:** Plain CSS / CSS variables for the theme palette (or a lightweight
  utility approach) — no heavy UI framework, to keep the custom warm aesthetic fully
  controllable.

### 1.5 Deployment
- **Host:** GitHub Pages.
- **GitHub username:** `divi-259`
- **Repo name:** `brighttrail` (placeholder — confirm/rename before first deploy if you
  want a different repo name; this affects the Vite `base` config and final URL).
- **Expected URL:** `https://divi-259.github.io/brighttrail/` (update if repo name
  changes).
- **Deploy method:** Build with Vite, publish `dist/` to the `gh-pages` branch (via the
  `gh-pages` npm package or a GitHub Actions workflow).

### 1.6 Naming
- **Site name:** BrightTrail

---

## 2. Build Steps

1. **Initialize the project**
   - `npm create vite@latest brighttrail -- --template react`
   - Init git repo, create `.gitignore`, first commit.
   - Install core dependencies: `react-router-dom`, `@dnd-kit/core`, `xlsx`,
     `lucide-react`.

2. **Set up the design system**
   - Define CSS variables for the Butter Yellow + Charcoal palette (§1.3).
   - Set up base typography, spacing scale, border-radius, and shadow tokens.
   - Build shared primitives: `Card`, `Button`, `Badge` (status pill), `Modal`,
     `Input`, `Select`, `TagInput`.

3. **Define the data model & storage layer**
   - Define the `Application` TypeScript/JS shape (§1.2).
   - Build a `localStorage`-backed data hook/service: `getApplications`,
     `addApplication`, `updateApplication`, `deleteApplication`, `resetAllData`.
   - Seed with either an empty state or a couple of sample entries for first-run
     preview.

4. **Build the app shell & routing**
   - Top nav with BrightTrail logo/wordmark, links to Dashboard and Applications.
   - Configure routing (hash-based or base-path) so it works correctly once deployed
     under `/brighttrail/` on GitHub Pages.

5. **Build the Applications page (kanban board)**
   - Render columns per pipeline stage (§1.2).
   - Application cards showing company, title, date, status badge, tags.
   - Drag-and-drop cards between columns (updates status + persists to
     `localStorage`).
   - "+ Add Application" flow opening a modal/form with all fields (§1.2).
   - Click a card to open/edit its full details in the same modal.
   - Delete application (with confirmation).

6. **Build search & filtering**
   - Search input filtering by company/title across the board.
   - Filter controls for tag, source, and status.

7. **Build the Dashboard page**
   - Hero section with illustration + "+ Add Application" shortcut.
   - Stats cards: Total Applications, In Progress, Interviews, Offers (derived from
     stored data).
   - Recent Applications table (latest N entries) linking to full board.

8. **Build custom SVG illustrations**
   - Sun character, plant/leaf accents, sticky-note motif — for dashboard hero, empty
     states, and reset-confirmation screen.

9. **Build export functionality**
   - "Export CSV" — serialize all applications to a `.csv` file download.
   - "Export Excel" — use `xlsx` to generate a real `.xlsx` file download.
   - Confirm exported columns match all fields in §1.2, in a clean human-readable
     layout ready for pasting/importing into Google Sheets.

10. **Build reset functionality**
    - "Reset all data" button (e.g. in a settings/menu area) with a confirmation
      dialog before clearing `localStorage`.

11. **Responsive design pass**
    - Verify kanban board, dashboard, modals, and nav work well on mobile/tablet
      widths (horizontal scroll for columns on small screens, stacked stats cards,
      etc.).

12. **QA pass**
    - Test add/edit/delete/drag flows, search/filter combinations, export file
      correctness (open in Excel/Sheets), reset flow, and page reload persistence.
    - Test on at least one additional browser besides the primary dev browser.

13. **Write project README**
    - What the app is, local dev instructions, how data storage/export/reset work,
      and a note on the intended local-first + manual Google Sheets workflow.

14. **Deploy to GitHub Pages**
    - Set the correct Vite `base` path for the chosen repo name.
    - Push to GitHub under `divi-259/brighttrail` (or final repo name).
    - Build and publish `dist/` to GitHub Pages (via `gh-pages` package or GitHub
      Actions).
    - Verify the live URL loads correctly, including routing between pages after a
      hard refresh.

15. **Final review with you**
    - Walk through the live site together, confirm the look/feel matches the desired
      warm butter-yellow aesthetic, and note any follow-up polish items.

---

## 3. Explicitly out of scope for v1
- Live Google Sheets API sync / OAuth.
- User accounts, multi-device sync, or any backend/server.
- Dark mode toggle.
- Calendar and Goals pages (may be considered as a future addition).
- Push/browser notifications for follow-ups.
