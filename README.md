# LocalServe — Awareness Website

This is your landing page with a working waitlist form. Before it can collect real
signups, you need to connect it to a place where YOU can actually see them — right
now it's wired to a placeholder.

## Why this matters

A form that "saves to the browser" only saves data on each visitor's own device —
you, the site owner, would never see a single signup. So this version sends every
submission to a real destination instead. You have two good free options:

## Option A — Formspree (easiest, no code, recommended)

1. Go to https://formspree.io and sign up free (50 submissions/month free tier).
2. Create a new form. Formspree gives you a unique endpoint URL like:
   `https://formspree.io/f/abc12345`
3. Open `app.js` and replace this line near the top:
   ```
   const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
   ```
   with your real URL.
4. Every signup will now land directly in your email inbox, and you can also view
   all of them in your Formspree dashboard.
5. Done — no backend, no database, no server needed.

## Option B — Google Sheets (if you want a spreadsheet of signups)

1. Create a new Google Sheet.
2. Go to Extensions → Apps Script, and paste a simple script that accepts POST
   requests and appends a row (search "Google Apps Script form to sheet" for a
   step-by-step template — takes about 10 minutes).
3. Deploy it as a Web App and copy the URL it gives you.
4. Replace `FORM_ENDPOINT` in `app.js` with that URL.
5. Every signup becomes a new row in your sheet automatically.

## Option C — Upgrade later to a real database

Once you're ready to build the actual app, you'll want a proper backend (Supabase,
Firebase, or your own server) anyway — at that point, point this same form at your
new `/api/waitlist` endpoint instead. The frontend code won't need to change, only
the URL.

## Files in this project

- `index.html` — the page structure and content
- `style.css` — all visual design (colors, type, layout, animation)
- `app.js` — the waitlist form logic — **edit this to connect your backend**

## Local backup safety net

If the network request fails for any reason (no internet, wrong endpoint, etc.),
the form automatically saves a backup copy in the visitor's browser storage so no
signup is silently lost — but this is a fallback only. Set up Option A or B above
so you're not relying on it.

## Customizing

- Colors and fonts are all defined as CSS custom properties at the top of
  `style.css` under `:root` — change them once, they update everywhere.
- City and category options are in the `<select>` elements inside `index.html`.
