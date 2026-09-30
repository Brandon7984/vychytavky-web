const header = document.getElementById("siteHeader");
const progress = document.getElementById("scrollProgress");
const backTop = document.getElementById("backTop");
const projectSubnav = document.getElementById("projectSubnav");
const saveProject = document.getElementById("saveProject");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

function updateScrollUI() {
  const y = window.scrollY;
  const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const percent = Math.min(100, Math.max(0, (y / max) * 100));

  if (progress) progress.style.width = percent + "%";
  if (header) header.classList.toggle("scrolled", y > 24);
  if (backTop) backTop.classList.toggle("visible", y > 650);
}

window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

if (backTop) {
  backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });
}

const revealItems = [...document.querySelectorAll("[data-reveal]")];

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.13, rootMargin: "0px 0px -6% 0px" }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

document.querySelectorAll(".hero-hotspot").forEach((hotspot) => {
  const button = hotspot.querySelector(".hotspot-dot");
  if (!button) return;

  button.addEventListener("click", (event) => {
    event.stopPropagation();
    document.querySelectorAll(".hero-hotspot.active").forEach((item) => {
      if (item !== hotspot) item.classList.remove("active");
    });
    hotspot.classList.toggle("active");
  });
});

if (saveProject) {
  saveProject.addEventListener("click", () => {
    const saved = saveProject.classList.toggle("saved");
    saveProject.innerHTML = saved
      ? "<span>♥</span> Projekt uložený"
      : "<span>♡</span> Uložiť projekt";
  });
}

if (projectSubnav) {
  const navLinks = [...projectSubnav.querySelectorAll("a[href^='#']")];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const setActiveLink = () => {
    const marker = window.scrollY + 150;
    let currentId = sections[0]?.id || "";

    sections.forEach((section) => {
      if (section.offsetTop <= marker) currentId = section.id;
    });

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + currentId);
    });
  };

  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();
}

if (!reduceMotion && finePointer) {
  const tiltTargets = [...document.querySelectorAll(".featured-visual, .project-hero-image")];

  tiltTargets.forEach((target) => {
    target.addEventListener("pointermove", (event) => {
      const rect = target.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      const rotateY = px * 2.6;
      const rotateX = py * -2.1;

      target.style.transform =
        "perspective(1100px) rotateX(" +
        rotateX +
        "deg) rotateY(" +
        rotateY +
        "deg) translateY(-3px)";
    });

    target.addEventListener("pointerleave", () => {
      target.style.transform = "";
    });
  });
}

document.addEventListener("click", (event) => {
  if (!event.target.closest(".hero-hotspot")) {
    document.querySelectorAll(".hero-hotspot.active").forEach((item) => {
      item.classList.remove("active");
    });
  }
});
