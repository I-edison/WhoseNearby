# whoseNearby — Waitlist Backend

Everything you need to run the admin dashboard, collect real signups,
and send emails to your waitlist.

---

## What's in this folder

```
server.js          — the Node.js backend (runs on your server)
admin.html         — the admin dashboard (open in browser)
app.js             — updated website form (replace the one on your live site)
package.json       — Node dependencies
.env.example       — copy this to .env and fill in your real values
data/              — created automatically, stores signups.json
```

---

## Step 1 — Install Node.js (if you haven't already)

Download from https://nodejs.org — install the LTS version.

Check it worked:

```bash
node --version
npm --version
```

---

## Step 2 — Install dependencies

In this folder, run:

```bash
npm install
```

This installs Express, CORS, and Nodemailer automatically.

---

## Step 3 — Set up your environment variables

Copy the example file:

```bash
cp .env.example .env
```

Open `.env` and fill in:

```
ADMIN_PASSWORD=pick_a_strong_password
TEAM_PASSWORD=pick_another_one
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-char-google-app-password
```

**Getting a Google App Password:**

1. Go to myaccount.google.com
2. Security → 2-Step Verification (enable this first if not already on)
3. Search "App passwords" → create one → name it "whoseNearby"
4. Copy the 16-character code into EMAIL_PASS (no spaces)

---

## Step 4 — Run the server locally to test

```bash
node server.js
```

You should see:

```
whoseNearby backend running on port 3000
Admin dashboard: http://localhost:3000/admin.html
```

Open http://localhost:3000/admin.html in your browser.
Log in with username `admin` and whatever you set as ADMIN_PASSWORD.

---

## Step 5 — Test the full flow

1. Open your waitlist website and submit a test signup
   (remember to update API_URL in app.js to http://localhost:3000 for local testing)
2. Check the admin dashboard — the signup should appear
3. Click "Export CSV" — a spreadsheet should download
4. Go to "Send email" → compose a test message → send to yourself

---

## Step 6 — Deploy to a real server

You need a server that runs Node.js 24/7. The easiest free/cheap options:

**Render (recommended — free tier available)**

1. Push this folder to a GitHub repo
2. Go to render.com → New Web Service → connect your repo
3. Build command: `npm install`
4. Start command: `node server.js`
5. Add your .env values under "Environment Variables" in Render's dashboard
6. Render gives you a URL like `https://whosenearby-api.onrender.com`

**Railway**

1. Similar to Render — go to railway.app, connect GitHub repo
2. Add environment variables in the dashboard
3. Railway auto-detects Node.js and deploys

**DigitalOcean / VPS (most control)**

1. Create a $6/month Droplet
2. SSH in, install Node.js, clone your repo
3. Use PM2 to keep it running: `npm install -g pm2 && pm2 start server.js`

---

## Step 7 — Update your live website

Once deployed, update two things:

**In app.js** (the one on your whoseNearby website):

```js
const API_URL = "http://localhost:3000/admin.html";
```

**In admin.html**:

```js
const API = "https://your-actual-backend-url.com";
```

Then redeploy your website with the updated app.js.

---

## Step 8 — Add admin.html to your site

Copy admin.html into your website's folder (same place as index.html).
It will be accessible at:
`https://i-edison.github.io/WhoseNearby/admin.html`

Since it requires a username + password to show anything, it's safe
to have it publicly accessible — nothing is visible without logging in.

---

## Admin dashboard features

**Waitlist users tab**

- See all signups with name, contact, city, role, and date
- Search by name or contact
- Filter by city or role
- Export the full list as a CSV spreadsheet
- Click "Email" next to any user to open a pre-filled email composer

**Send email tab**

- Send to all users at once (only reaches those who provided an email)
- Or send to a single email address
- Use {{name}} anywhere in the message — it gets replaced with each
  person's first name automatically
- Supports basic HTML in the message body for formatting

---

## Security notes

- Never commit your .env file to GitHub — it contains your passwords
- Add `.env` to your .gitignore file
- Change the default passwords in .env before deploying
- Admin sessions expire when the browser tab is closed
- The data/signups.json file is stored on your server — back it up
  periodically, or switch to a proper database (PostgreSQL/Supabase)
  once you have significant data

---

## Switching to a real database later

The server currently stores signups in a JSON file (data/signups.json).
This is fine for hundreds of signups. When you're ready to scale:

1. Set up a Supabase project (free tier is generous)
2. Replace the readSignups() and writeSignups() functions in server.js
   with Supabase queries — the rest of the server stays identical
3. Your admin dashboard doesn't need to change at all
