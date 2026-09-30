const header = document.getElementById("siteHeader");
const progress = document.getElementById("scrollProgress");
const backTop = document.getElementById("backTop");
const projectSubnav = document.getElementById("projectSubnav");
const saveProject = document.getElementById("saveProject");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

async function loadChunkedWebp(paths, selector, readyClass) {
  const targets = [...document.querySelectorAll(selector)];
  if (!targets.length) return;

  try {
    const parts = await Promise.all(
      paths.map((path) =>
        fetch(path, { cache: "force-cache" }).then((response) => {
          if (!response.ok) throw new Error("Image chunk failed: " + response.status + " " + path);
          return response.text();
        })
      )
    );

    const dataUri = "data:image/webp;base64," + parts.join("");
    targets.forEach((image) => {
      image.src = dataUri;
      image.classList.add("is-loaded");
    });
    document.body.classList.add(readyClass);
  } catch (error) {
    console.error("Project photography could not be loaded.", error);
  }
}

loadChunkedWebp(
  [
    "assets/photos/rack-mood-v5-01.txt",
    "assets/photos/rack-mood-v5-01b.txt",
    "assets/photos/rack-mood-v5-02.txt",
    "assets/photos/rack-mood-v5-03.txt",
    "assets/photos/rack-mood-v5-04.txt"
  ],
  ".rack-mood-image",
  "rack-mood-ready"
);

loadChunkedWebp(
  [
    "assets/photos/rack-product-v5-01.txt",
    "assets/photos/rack-product-v5-02.txt",
    "assets/photos/rack-product-v5-03.txt",
    "assets/photos/rack-product-v5-04.txt",
    "assets/photos/rack-product-v5-05.txt"
  ],
  ".rack-product-image",
  "rack-product-ready"
);

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

/* 20-compartment tower selector */
const diameterButtons = [...document.querySelectorAll(".diameter-button")];
const discTower = document.getElementById("discTower");

if (diameterButtons.length && discTower) {
  const applyDiameter = (mode) => {
    discTower.classList.remove("mode-125", "mode-150");
    if (mode === "125") discTower.classList.add("mode-125");
    if (mode === "150") discTower.classList.add("mode-150");

    diameterButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.diameter === mode);
    });
  };

  diameterButtons.forEach((button) => {
    button.addEventListener("click", () => applyDiameter(button.dataset.diameter));
  });

  applyDiameter("125");
}

document.querySelectorAll(".tower-slot").forEach((slot) => {
  slot.addEventListener("click", () => {
    document.querySelectorAll(".tower-slot.is-selected").forEach((item) => {
      if (item !== slot) item.classList.remove("is-selected");
    });
    slot.classList.toggle("is-selected");
  });
});


/* Step 01 scroll-open animation */
const expandableStep = document.querySelector("[data-step-expand]");
const expandableFrame = expandableStep?.querySelector(".step-one-frame");

function updateStepOneMotion() {
  if (!expandableStep || !expandableFrame || reduceMotion || window.innerWidth <= 820) return;

  const rect = expandableStep.getBoundingClientRect();
  const start = window.innerHeight * 0.92;
  const end = window.innerHeight * 0.18;
  const raw = (start - rect.top) / Math.max(1, start - end);
  const p = Math.min(1, Math.max(0, raw));

  const scale = 0.94 + p * 0.06;
  const shift = 28 - p * 28;
  const crop = 5 - p * 5;
  const photoY = 14 - p * 26;

  expandableFrame.style.setProperty("--step-scale", scale.toFixed(3));
  expandableFrame.style.setProperty("--step-shift", shift.toFixed(1) + "px");
  expandableFrame.style.setProperty("--step-crop", crop.toFixed(2) + "%");
  expandableFrame.style.setProperty("--photo-y", photoY.toFixed(1) + "px");
}

if (expandableStep && expandableFrame) {
  window.addEventListener("scroll", updateStepOneMotion, { passive: true });
  window.addEventListener("resize", updateStepOneMotion);
  updateStepOneMotion();
}


/* Step 02 scroll-open animation */
const expandableStepTwo = document.querySelector("[data-step2-expand]");
const expandableFrameTwo = expandableStepTwo?.querySelector(".step-two-frame");

function updateStepTwoMotion() {
  if (!expandableStepTwo || !expandableFrameTwo || reduceMotion || window.innerWidth <= 820) return;

  const rect = expandableStepTwo.getBoundingClientRect();
  const start = window.innerHeight * 0.92;
  const end = window.innerHeight * 0.18;
  const raw = (start - rect.top) / Math.max(1, start - end);
  const p = Math.min(1, Math.max(0, raw));

  const scale = 0.94 + p * 0.06;
  const shift = 30 - p * 30;
  const crop = 5 - p * 5;
  const photoY = 16 - p * 30;

  expandableFrameTwo.style.setProperty("--step2-scale", scale.toFixed(3));
  expandableFrameTwo.style.setProperty("--step2-shift", shift.toFixed(1) + "px");
  expandableFrameTwo.style.setProperty("--step2-crop", crop.toFixed(2) + "%");
  expandableFrameTwo.style.setProperty("--step2-photo-y", photoY.toFixed(1) + "px");
}

if (expandableStepTwo && expandableFrameTwo) {
  window.addEventListener("scroll", updateStepTwoMotion, { passive: true });
  window.addEventListener("resize", updateStepTwoMotion);
  updateStepTwoMotion();
}
