const header = document.getElementById("siteHeader");
const progress = document.getElementById("scrollProgress");
const backTop = document.getElementById("backTop");
const projectSubnav = document.getElementById("projectSubnav");
const saveProject = document.getElementById("saveProject");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

async function loadDiscSprite() {
  const targets = [...document.querySelectorAll(".disc-sprite-image")];
  if (!targets.length) return;

  try {
    const parts = await Promise.all(
      Array.from({ length: 7 }, (_, index) =>
        fetch(`assets/projects/sandpaper-sprite-${index + 1}.txt`, { cache: "force-cache" })
          .then((response) => {
            if (!response.ok) throw new Error("Sprite chunk failed: " + response.status);
            return response.text();
          })
      )
    );

    const dataUri = "data:image/webp;base64," + parts.join("");
    targets.forEach((image) => {
      image.setAttribute("href", dataUri);
      image.setAttributeNS("http://www.w3.org/1999/xlink", "href", dataUri);
    });

    document.body.classList.add("sprite-ready");
  } catch (error) {
    console.error("Photo sprite could not be loaded.", error);
    document.body.classList.add("sprite-failed");
  }
}

loadDiscSprite();

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

document.querySelectorAll(".interactive-callout").forEach((callout) => {
  callout.addEventListener("click", (event) => {
    event.stopPropagation();
    const willOpen = !callout.classList.contains("active");

    document.querySelectorAll(".interactive-callout.active").forEach((item) => {
      if (item !== callout) item.classList.remove("active");
    });

    callout.classList.toggle("active", willOpen);
  });
});

if (saveProject) {
  const storageKey = "vychytavky:sanding-discs:saved";
  const applySavedState = (saved) => {
    saveProject.classList.toggle("saved", saved);
    saveProject.innerHTML = saved
      ? "<span>♥</span> Projekt uložený"
      : "<span>♡</span> Uložiť projekt";
  };

  let saved = false;
  try {
    saved = localStorage.getItem(storageKey) === "1";
  } catch (_) {}

  applySavedState(saved);

  saveProject.addEventListener("click", () => {
    const next = !saveProject.classList.contains("saved");
    applySavedState(next);

    try {
      localStorage.setItem(storageKey, next ? "1" : "0");
    } catch (_) {}
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

const stepCards = [...document.querySelectorAll(".step-card")];
if (stepCards.length && "IntersectionObserver" in window) {
  const stepObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-current", entry.isIntersecting);
      });
    },
    { threshold: 0.52 }
  );

  stepCards.forEach((step) => stepObserver.observe(step));
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

  if (!event.target.closest(".interactive-callout")) {
    document.querySelectorAll(".interactive-callout.active").forEach((item) => {
      item.classList.remove("active");
    });
  }
});