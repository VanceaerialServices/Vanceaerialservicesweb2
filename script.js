const toggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const navCta = document.querySelector("[data-nav-cta]");

if (toggle && nav && navCta) {
  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    navCta.classList.toggle("open");
    toggle.setAttribute("aria-expanded", nav.classList.contains("open") ? "true" : "false");
  });
}

const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && reveals.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach((item) => observer.observe(item));
} else {
  reveals.forEach((item) => item.classList.add("in-view"));
}

const stickyCta = document.createElement("div");
stickyCta.className = "sticky-mobile-cta";
stickyCta.innerHTML = `
  <a href="tel:2604155069">Call Ethan</a>
  <a href="contact.html">Get a Quote</a>
`;
document.body.appendChild(stickyCta);

const conversionStyles = document.createElement("style");
conversionStyles.textContent = `
  .sticky-mobile-cta {
    position: fixed;
    left: 0.75rem;
    right: 0.75rem;
    bottom: 0.75rem;
    z-index: 50;
    display: none;
    grid-template-columns: 1fr 1fr;
    gap: 0.65rem;
    padding: 0.65rem;
    border: 1px solid rgba(255,255,255,0.35);
    border-radius: 999px;
    background: rgba(8, 27, 58, 0.92);
    box-shadow: 0 18px 45px rgba(8, 27, 58, 0.3);
    backdrop-filter: blur(14px);
  }
  .sticky-mobile-cta a {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    min-height: 2.8rem;
    border-radius: 999px;
    font-weight: 800;
    color: #fff;
  }
  .sticky-mobile-cta a:first-child { background: rgba(255,255,255,0.12); }
  .sticky-mobile-cta a:last-child { background: linear-gradient(135deg, #0e5bb5 0%, #2e8eff 100%); }
  .quote-helper {
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 16px;
    background: rgba(14, 91, 181, 0.08);
    color: #132235;
  }
  .quote-helper strong { display: block; margin-bottom: 0.35rem; }
  .estimate-box {
    margin-top: 1rem;
    padding: 1.2rem;
    border-radius: 18px;
    background: linear-gradient(135deg, rgba(14,91,181,.1), rgba(45,140,255,.12));
    border: 1px solid rgba(14,91,181,.18);
  }
  .estimate-box strong {
    display: block;
    font-size: 2rem;
    line-height: 1;
    margin: .35rem 0;
    color: #083e84;
  }
  .estimate-note { color: #566579; font-size: .95rem; }
  @media (max-width: 760px) {
    body { padding-bottom: 5.5rem; }
    .sticky-mobile-cta { display: grid; }
  }
`;
document.head.appendChild(conversionStyles);

const quoteForm = document.querySelector('form[name="quote-request"]');
if (quoteForm) {
  const helper = document.createElement("div");
  helper.className = "quote-helper";
  helper.innerHTML = "<strong>Fastest way to get quoted:</strong> Include the property address, preferred date, and whether you need photos, video, or both.";
  quoteForm.prepend(helper);
}

const estimator = document.querySelector("[data-quote-estimator]");
if (estimator) {
  const service = estimator.querySelector('[name="estimateService"]');
  const deliverables = estimator.querySelector('[name="estimateDeliverables"]');
  const urgency = estimator.querySelector('[name="estimateUrgency"]');
  const output = estimator.querySelector("[data-estimate-output]");
  const note = estimator.querySelector("[data-estimate-note]");

  const ranges = {
    realEstate: 199,
    construction: 349,
    land: 299,
    commercial: 499
  };

  const calculate = () => {
    let base = ranges[service.value] || 199;
    if (deliverables.value === "photoVideo") base += 150;
    if (deliverables.value === "videoOnly") base += 125;
    if (deliverables.value === "premium") base += 300;
    if (urgency.value === "rush") base += 100;
    if (urgency.value === "recurring") base = Math.max(base - 75, 199);
    const high = base + 175;
    output.textContent = `$${base.toLocaleString()}–$${high.toLocaleString()}+`;
    note.textContent = urgency.value === "recurring"
      ? "Recurring progress work can usually be packaged at a better per-visit rate."
      : "Final pricing depends on location, flight time, editing, property size, and FAA/site restrictions.";
  };

  [service, deliverables, urgency].forEach((field) => field.addEventListener("change", calculate));
  calculate();
}
