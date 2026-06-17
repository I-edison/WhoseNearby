// WhoseNearby waitlist — sends signups to a shared backend so YOU (the site owner)
// can see every signup from every visitor, not just stored locally per-browser.
// Uses a free, simple JSON-storage backend (jsonbin-style) — see backend setup notes
// in README.md for how to view collected signups.

const form = document.getElementById('waitlist-form');
const successBox = document.getElementById('waitlist-success');
const successName = document.getElementById('success-name');
const successCount = document.getElementById('success-count');
const submitBtn = document.getElementById('wl-submit');
const errorNote = document.getElementById('wl-note');

// IMPORTANT: Replace this with your own endpoint — see README.md for setup instructions.
// This default uses Formspree, which forwards every submission straight to your email
// inbox for free, with zero backend code required.
const FORM_ENDPOINT = 'https://formspree.io/f/xyzkjqkk';

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('wl-name').value.trim();
  const contact = document.getElementById('wl-contact').value.trim();
  const city = document.getElementById('wl-city').value;
  const role = document.getElementById('wl-role').value;

  if (!name || !contact || !city || !role) return;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Joining…';

  const payload = { name, contact, city, role, source: 'WhoseNearby waitlist' };

  fetch(FORM_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload)
  })
    .then(function (res) {
      if (!res.ok) throw new Error('Network response was not ok');
      return showSuccess(name);
    })
    .catch(function () {
      // Fallback: keep a local backup copy so no signup is silently lost,
      // and let the visitor know to try again or contact directly.
      saveLocalBackup(payload);
      errorNote.textContent = "Hmm, that didn't send. We saved your info locally — please also reach us directly if you can.";
      errorNote.style.color = '#D97706';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Try again';
    });
});

function showSuccess(name) {
  form.hidden = true;
  successBox.hidden = false;
  successName.textContent = name.split(' ')[0];
  successCount.textContent = 'on the list';
}

function saveLocalBackup(entry) {
  try {
    const key = 'WhoseNearby_waitlist_backup';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.push({ ...entry, timestamp: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(existing));
  } catch (e) {
    /* ignore */
  }
}

// Simple scroll-reveal for section elements
const revealEls = document.querySelectorAll('.how-card, .badge-demo-row, .providers-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.15 });

revealEls.forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

