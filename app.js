// LocalServe waitlist — uses EmailJS to send TWO emails on every signup:
//   1. A notification to YOU, so you see every signup land in your own inbox
//   2. A confirmation to the VISITOR, so they know they're on the list
//
// EmailJS sends real emails straight from this frontend code — no backend needed.
// Before this works, you must create a free EmailJS account and fill in the three
// values below. Full step-by-step instructions are in README.md.

// ───────────────────────────────────────────────────────────────────────────
// STEP 1: Replace these three values with your own from the EmailJS dashboard
// ───────────────────────────────────────────────────────────────────────────
const EMAILJS_PUBLIC_KEY = 'JWzdCijTRUnTtEfYn';
const EMAILJS_SERVICE_ID = 'service_yn056gp';
const EMAILJS_TEMPLATE_ID_OWNER = 'template_31enz0b';
const EMAILJS_TEMPLATE_ID_VISITOR = 'template_c102hph';

// The inbox where YOU want to receive every new signup notification.
const OWNER_EMAIL = 'iyaseeddyzin@gmail.com';

const form = document.getElementById('waitlist-form');
const successBox = document.getElementById('waitlist-success');
const successName = document.getElementById('success-name');
const submitBtn = document.getElementById('wl-submit');
const errorNote = document.getElementById('wl-note');

// Initialize EmailJS once the page loads.
(function initEmailJS() {
  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }
})();

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('wl-name').value.trim();
  const contact = document.getElementById('wl-contact').value.trim();
  const city = document.getElementById('wl-city').value;
  const role = document.getElementById('wl-role').value;

  if (!name || !contact || !city || !role) return;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitted';

  const ownerParams = {
    to_email: OWNER_EMAIL,
    signup_name: name,
    signup_contact: contact,
    signup_city: city,
    signup_role: role
  };

  const visitorParams = {
    to_email: contact,
    signup_name: name,
    signup_city: city
  };

  emailjs
    .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID_OWNER, ownerParams)
    .then(function () {
      return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID_VISITOR, visitorParams);
    })
    .then(function () {
      showSuccess(name);
    })
    .catch(function (err) {
      console.error('EmailJS error:', err);
      saveLocalBackup({ name, contact, city, role });
      errorNote.textContent =
        "Hmm, that didn't send. We saved your info locally — please also reach us directly if you can.";
      errorNote.style.color = '#D97706';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Try again';
    });
});

function showSuccess(name) {
  form.hidden = true;
  successBox.hidden = false;
  successName.textContent = name.split(' ')[0];
}

function saveLocalBackup(entry) {
  try {
    const key = 'localserve_waitlist_backup';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.push({ ...entry, timestamp: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(existing));
  } catch (e) {
    /* ignore */
  }
}

// Simple scroll-reveal for section elements
const revealEls = document.querySelectorAll('.how-card, .badge-demo-row, .providers-card');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
