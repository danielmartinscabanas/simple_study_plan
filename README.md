# Simple Study Plan: Minimal Client‑Side Planner

Simple Study Plan is a tiny, no‑frills study planner you can open and use instantly.

## Objective:

- A very minimal client‑side planner. No backend, no API calls, no accounts. Data is kept locally in your browser (localStorage) and never leaves your device.

## Why it exists

- Created by Daniel Cabanas, as the result of a procrastination period. Might be useful to you, you tell me.

## Features

- Add subjects with a test date and description.
- Auto‑generated daily plan with configurable total study blocks per day and “specificity” to focus on nearer exams.
- Export your plan as a URL for fast sync; opening the URL on another device imports the data and redirects back to the app.
- Light/Dark theme toggle.
- Mobile‑friendly sizing; 100% client‑side — no servers or endpoints.
- Installable PWA on mobile/desktop with offline support.

## Usage

- Open `https://danielmartinscabanas.github.io/simple_study_plan/` in your browser. Use the header buttons to toggle theme or export.
- To sync: click Export to get a shareable URL. Open that URL on another device; it will load the data and route back to the app automatically.

## PWA

- The app includes a `manifest.webmanifest` and a `sw.js` service worker. When hosted at `https://danielmartinscabanas.github.io/simple_study_plan/`, modern browsers will offer “Install app”.
- The service worker caches core assets for offline use. After making changes, bump `CACHE_NAME` in `sw.js` to force an update.

## License

- Free forever and for all.

I hope you enjoy it as much as I do!
