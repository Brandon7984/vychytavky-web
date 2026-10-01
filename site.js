// Vychytávky – drobné interakcie. Stránka funguje aj bez JavaScriptu.

const store = {
  get(key) {
    try { return JSON.parse(localStorage.getItem(key) || "null"); } catch { return null; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* súkromný režim – nevadí */ }
  }
};

// Filter kategórií na hlavnej stránke
const chips = [...document.querySelectorAll(".chip[data-filter]")];
const cards = [...document.querySelectorAll("#projectGrid .card")];
const emptyState = document.getElementById("emptyState");

function applyFilter(filter) {
  let visible = 0;
  cards.forEach((card) => {
    const show = filter === "all" || card.dataset.category === filter;
    card.hidden = !show;
    if (show) visible += 1;
  });
  chips.forEach((chip) => chip.setAttribute("aria-pressed", String(chip.dataset.filter === filter)));
  if (emptyState) emptyState.hidden = visible > 0;
}

chips.forEach((chip) => chip.addEventListener("click", () => applyFilter(chip.dataset.filter)));

// Zoznam materiálu na odškrtnutie – pamätá si stav v tomto prehliadači
document.querySelectorAll("[data-checklist]").forEach((list) => {
  const key = "vychytavky:" + list.dataset.checklist;
  const boxes = [...list.querySelectorAll("input[type=checkbox]")];
  const saved = store.get(key) || [];
  boxes.forEach((box, index) => {
    box.checked = saved.includes(index);
    box.addEventListener("change", () => {
      store.set(key, boxes.flatMap((b, i) => (b.checked ? [i] : [])));
    });
  });
});

// Zvýraznenie aktuálnej sekcie v navigácii návodu
const navLinks = [...document.querySelectorAll(".guide-nav a[href^='#']")];
if (navLinks.length && "IntersectionObserver" in window) {
  const sections = navLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === "#" + entry.target.id));
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((section) => observer.observe(section));
}

// Krátke video v kroku – spustí sa až na kliknutie
document.querySelectorAll("[data-video]").forEach((figure) => {
  const button = figure.querySelector(".play");
  const image = figure.querySelector("img");
  const video = figure.querySelector("video");
  if (!button || !video) return;
  button.addEventListener("click", () => {
    const showVideo = video.hidden;
    video.hidden = !showVideo;
    if (image) image.hidden = showVideo;
    if (showVideo) {
      video.currentTime = 0;
      video.play().catch(() => {});
      button.textContent = "Zobraziť fotku";
    } else {
      video.pause();
      button.textContent = "▶ Pozrieť pohyb";
    }
  });
});
