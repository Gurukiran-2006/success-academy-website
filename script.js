
  // ── NAV SCROLL ──
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ── MOBILE MENU ──
  function openMobile() { document.getElementById('mobileMenu').classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeMobile() { document.getElementById('mobileMenu').classList.remove('open'); document.body.style.overflow = ''; }

  // ── SCROLL REVEAL ──
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));

  // ── COUNTER ANIMATION ──
  function animateCounter(el) {
    const target = +el.dataset.target;
    const dur = 1800;
    const step = target / (dur / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current);
      if (current >= target) clearInterval(timer);
    }, 16);
  }
  const counters = document.querySelectorAll('.counter-val');
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { animateCounter(e.target); counterObs.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObs.observe(c));

  // ── FAQ TOGGLE ──
  function toggleFaq(btn) {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  }

  // ── FORM SUBMIT VIA WHATSAPP ──
  function submitForm() {
    const inputs = document.querySelectorAll('#admission-form .form-control');
    const student = inputs[0].value || 'N/A';
    const parent = inputs[1].value || 'N/A';
    const phone = inputs[2].value || 'N/A';
    const email = inputs[3].value || 'N/A';
    const cls = inputs[4].value || 'N/A';
    const board = inputs[5].value || 'N/A';
    const msg = inputs[6].value || '';
    const text = `Hello Success Academy,\n\n✏️ *Admission Enquiry*\n\n👤 Student: ${student}\n👨‍👩‍👦 Parent: ${parent}\n📞 Phone: ${phone}\n📧 Email: ${email}\n📚 Class: ${cls}\n🏫 Board: ${board}\n💬 Message: ${msg}\n\nPlease confirm the admission slot. Thank you!`;
    window.open(`https://wa.me/919449522380?text=${encodeURIComponent(text)}`, '_blank');
  }
