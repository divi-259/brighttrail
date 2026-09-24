# BrightTrail

A job application tracker with a kanban board and a stats dashboard, styled in a warm
"butter yellow + charcoal" theme.

## Features

- **Dashboard** — total applications, in-progress count, interviews, and offers at a
  glance, plus a table of your most recently updated applications.
- **Applications board** — a kanban view with columns for Wishlist, Applied, Screening,
  Interview, Offer, and Rejected. Drag cards between columns as your status changes.
- **Application details** — company, job title, job URL, status, application date,
  location, salary range, contact name/email/LinkedIn, source, tags, and notes.
- **Search & filter** — search by company or role, filter by status, source, or tag.
- **Export** — download all applications as a CSV or Excel (.xlsx) file, ready to import
  into Google Sheets whenever you want.
- **Reset** — clear all stored data in one click, with a confirmation prompt first.

## How data storage works

All application data lives in your browser's `localStorage` — nothing is sent to a
server or stored anywhere else. Data persists across reloads and browser restarts, but
is tied to this specific browser on this specific device. Clearing your browser's site
data, or using the in-app **Reset** button, permanently deletes everything, so export a
backup first if you want to keep a copy.
