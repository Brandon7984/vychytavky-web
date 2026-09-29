const searchInput = document.getElementById("searchInput");
const searchPanel = document.getElementById("searchPanel");
const searchToggle = document.getElementById("searchToggle");
const searchClose = document.getElementById("searchClose");
const filters = [...document.querySelectorAll(".filter")];
const rows = [...document.querySelectorAll(".project-row")];
const emptyState = document.getElementById("emptyState");
const resultCount = document.getElementById("resultCount");
const randomProjectButton = document.getElementById("randomProjectButton");
const siteHeader = document.getElementById("siteHeader");
const hoverOrb = document.getElementById("hoverOrb");
const heroWord = document.getElementById("heroWord");

const projectDialog = document.getElementById("projectDialog");
const dialogClose = document.getElementById("dialogClose");
const dialogIntro = document.querySelector(".dialog-intro");
const dialogNumber = document.getElementById("dialogNumber");
const dialogCategory = document.getElementById("dialogCategory");
const dialogTitle = document.getElementById("dialogTitle");
const dialogLead = document.getElementById("dialogLead");
const dialogStats = document.getElementById("dialogStats");
const dialogMaterials = document.getElementById("dialogMaterials");
const dialogSteps = document.getElementById("dialogSteps");
const dialogTip = document.getElementById("dialogTip");

let activeCategory = "all";

const projects = {
  entryway: {
    number: "01",
    color: "#ff6b3d",
    category: "Domácnosť",
    title: "Mini odkladacia stanica pri dverách",
    lead: "Úzka polička s miestom na kľúče, okuliare a poštu. Zaberie minimum priestoru a odstráni klasické ranné hľadanie.",
    time: "35 min",
    difficulty: "Ľahké",
    price: "€",
    materials: [
      "Doska približne 45 × 12 cm",
      "3–4 háčiky na kľúče",
      "2 konzoly alebo skryté držiaky",
      "Brúsny papier a povrchová úprava"
    ],
    steps: [
      "Dosku skráť na šírku, ktorá sa zmestí pri dvere, a zaobli ostré hrany.",
      "Rozmeraj háčiky tak, aby pod nimi ostalo miesto aj na väčší zväzok kľúčov.",
      "Povrch prebrús a natri olejom, voskom alebo farbou podľa interiéru.",
      "Namontuj konzoly a poličku vyrovnaj vodováhou.",
      "Na spodnú stranu pripevni háčiky a vyskúšaj, či sa veci navzájom nebijú."
    ],
    tip: "Ak nechceš vŕtať do peknej dosky zhora, použi skryté policové nosníky. Výsledok pôsobí omnoho čistejšie."
  },
  sandpaper: {
    number: "02",
    color: "#d9ff46",
    category: "Dielňa",
    title: "Stojan na brúsny papier zo zvyškov dreva",
    lead: "Jednoduchý dielenský organizér, v ktorom má každá zrnitosť vlastnú priehradku. Žiadne prehrabávanie medzi P80 a P240.",
    time: "60 min",
    difficulty: "Stredné",
    price: "€",
    materials: [
      "Odrezky preglejky alebo dosiek",
      "Tenké priečky z preglejky alebo HDF",
      "Lepidlo na drevo",
      "Skrutky podľa potreby",
      "Fixka alebo štítky zrnitosti"
    ],
    steps: [
      "Zmeraj najväčší formát brúsneho papiera, ktorý používaš, a pridaj približne centimeter rezervy.",
      "Vyrob zadnú dosku, dno a bočnice tak, aby vznikla plytká otvorená skrinka.",
      "Rozdeľ vnútro priečkami na zrnitosti, ktoré reálne používaš.",
      "Priečky prilep a podľa materiálu ich môžeš poistiť malými klinčekmi.",
      "Na prednú hranu dopíš P60, P80, P120, P180 a ďalšie zrnitosti."
    ],
    tip: "Priehradky nerob tesné. Papier sa pri používaní zvlňuje a pár milimetrov navyše spraví vyberanie výrazne pohodlnejšie."
  },
  herbs: {
    number: "03",
    color: "#78d69d",
    category: "Záhrada",
    title: "Kompaktný stojan na bylinky",
    lead: "Vertikálny stojan pre tri menšie nádoby. Hodí sa tam, kde je málo miesta, ale dosť svetla.",
    time: "45 min",
    difficulty: "Ľahké",
    price: "€€",
    materials: [
      "2 bočné laty",
      "3 priečne poličky",
      "Skrutky do dreva",
      "Ochranný náter do exteriéru",
      "3 kvetináče podobného priemeru"
    ],
    steps: [
      "Podľa kvetináčov si urči šírku poličiek a rozostupy medzi nimi.",
      "Bočné laty polož vedľa seba a označ výšku všetkých troch úrovní.",
      "Poličky priskrutkuj medzi bočnice a skontroluj pravý uhol.",
      "Celý stojan prebrús a ošetri náterom vhodným do vlhka.",
      "Kvetináče polož od najťažšieho dole a stojan umiestni na stabilný podklad."
    ],
    tip: "Spodná polička môže byť o pár centimetrov hlbšia. Stojan bude stabilnejší bez toho, aby pôsobil masívne."
  },
  cables: {
    number: "04",
    color: "#ffb0c3",
    category: "Tvorenie",
    title: "Papierový organizér na káble",
    lead: "Malý projekt z pevného kartónu, ktorý rozdelí nabíjačky a krátke káble bez ďalšej plastovej krabičky.",
    time: "25 min",
    difficulty: "Ľahké",
    price: "€",
    materials: [
      "Pevná kartónová škatuľa",
      "Kartón na deliace priečky",
      "Nožík a pravítko",
      "Lepidlo alebo papierová páska",
      "Popisovač"
    ],
    steps: [
      "Vyber škatuľu, ktorá sa zmestí do zásuvky alebo police, kde káble skladuješ.",
      "Z kartónu narež priečky o pár milimetrov nižšie než je škatuľa.",
      "Do priečok sprav polovicu zárezu zhora a zospodu tak, aby sa dali zasunúť do seba.",
      "Vytvor mriežku podľa počtu káblov a vlož ju do škatule.",
      "Priehradky označ podľa zariadení alebo typu konektora."
    ],
    tip: "Káble nesťahuj úplne natesno. Voľná slučka má menší polomer ohybu a menej namáha miesto pri konektore."
  },
  drawer: {
    number: "05",
    color: "#9dbbff",
    category: "Domácnosť",
    title: "Nastaviteľné priečky do zásuvky",
    lead: "Deliaci systém bez lepidla a bez vŕtania. Rozloženie si vieš neskôr zmeniť podľa toho, čo pribudne.",
    time: "30 min",
    difficulty: "Ľahké",
    price: "€",
    materials: [
      "Tenká preglejka, HDF alebo pevný plast",
      "Meter a ceruzka",
      "Pílka alebo odlamovací nôž podľa materiálu",
      "Brúsny papier"
    ],
    steps: [
      "Zmeraj vnútornú šírku, hĺbku a výšku zásuvky.",
      "Narež dlhé a priečne pásy približne o 5 mm nižšie než je vnútorná výška.",
      "Na miestach kríženia vyrež do polovice výšky presné zárezy.",
      "Priečky do seba zasuň a vlož ich do zásuvky bez lepenia.",
      "Rozostupy uprav podľa príboru, náradia alebo drobností, ktoré v zásuvke reálne máš."
    ],
    tip: "Najskôr si rozloženie nasucho vyskladaj z pásov kartónu. Až keď sedí, prenes rozmery na finálny materiál."
  },
  drills: {
    number: "06",
    color: "#f2d15e",
    category: "Dielňa",
    title: "Prehľadný stojan na vrtáky",
    lead: "Blok s presne označenými otvormi, vďaka ktorému je správny priemer viditeľný a po ruke.",
    time: "75 min",
    difficulty: "Stredné",
    price: "€€",
    materials: [
      "Hranol alebo hrubšia drevená doska",
      "Sada vrtákov",
      "Ceruzka a pravítko",
      "Brúsny papier",
      "Popisovač alebo vypaľovačka"
    ],
    steps: [
      "Zoraď vrtáky od najmenšieho po najväčší a rozhodni, ktoré budú mať vlastné miesto.",
      "Na dreve si nakresli rovnú os a vyznač pravidelné rozostupy.",
      "Každý otvor vyvŕtaj vrtákom o trochu väčším než nástroj, ktorý v ňom bude stáť.",
      "Hornú hranu môžeš mierne zošikmiť, aby boli popisy lepšie viditeľné.",
      "Blok prebrús, označ priemery a postav ho na miesto, kde vrtáky najčastejšie používaš."
    ],
    tip: "Pred vŕtaním hlbokých otvorov si na vrták nalep pásku ako doraz. Všetky diery budú mať rovnakú hĺbku bez merania každej zvlášť."
  }
};

function normalize(value) {
  return value
    .toLocaleLowerCase("sk")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function updateProjects() {
  const query = normalize(searchInput.value.trim());
  let visible = 0;

  rows.forEach((row) => {
    const categoryMatches =
      activeCategory === "all" || row.dataset.category === activeCategory;

    const searchable = normalize(
      `${row.dataset.search} ${row.textContent}`
    );

    const searchMatches = !query || searchable.includes(query);
    const show = categoryMatches && searchMatches;

    row.hidden = !show;
    if (show) visible += 1;
  });

  emptyState.hidden = visible !== 0;
  resultCount.textContent = visible === 1 ? "1 projekt" : `${visible} projektov`;
}

function setSearchOpen(open) {
  searchPanel.classList.toggle("open", open);
  searchPanel.setAttribute("aria-hidden", String(!open));
  searchToggle.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("search-open", open);

  if (open) {
    window.setTimeout(() => searchInput.focus(), 50);
  }
}

function openProject(projectId) {
  const project = projects[projectId];
  if (!project) return;

  dialogIntro.style.background = project.color;
  dialogNumber.textContent = `VYCHYTÁVKA ${project.number}`;
  dialogCategory.textContent = project.category.toUpperCase();
  dialogTitle.textContent = project.title;
  dialogLead.textContent = project.lead;

  dialogStats.innerHTML = [
    `<span>ČAS · ${project.time}</span>`,
    `<span>NÁROČNOSŤ · ${project.difficulty}</span>`,
    `<span>ROZPOČET · ${project.price}</span>`
  ].join("");

  dialogMaterials.innerHTML = project.materials
    .map((item) => `<li>${item}</li>`)
    .join("");

  dialogSteps.innerHTML = project.steps
    .map((step) => `<li>${step}</li>`)
    .join("");

  dialogTip.textContent = project.tip;

  setSearchOpen(false);

  if (typeof projectDialog.showModal === "function") {
    projectDialog.showModal();
    document.body.classList.add("dialog-open");
  }
}

function closeProject() {
  if (projectDialog.open) projectDialog.close();
  document.body.classList.remove("dialog-open");
}

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    activeCategory = filter.dataset.filter;
    filters.forEach((item) => item.classList.remove("active"));
    filter.classList.add("active");
    updateProjects();
  });
});

searchToggle.addEventListener("click", () => setSearchOpen(true));
searchClose.addEventListener("click", () => setSearchOpen(false));
searchPanel.addEventListener("click", (event) => {
  if (event.target === searchPanel) setSearchOpen(false);
});
searchInput.addEventListener("input", updateProjects);

rows.forEach((row) => {
  row.addEventListener("click", () => openProject(row.dataset.project));

  row.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject(row.dataset.project);
    }
  });
});

document.querySelectorAll("[data-open-project]").forEach((button) => {
  button.addEventListener("click", () => openProject(button.dataset.openProject));
});

randomProjectButton.addEventListener("click", () => {
  const visibleRows = rows.filter((row) => !row.hidden);
  const pool = visibleRows.length ? visibleRows : rows;
  const pick = pool[Math.floor(Math.random() * pool.length)];
  openProject(pick.dataset.project);
});

dialogClose.addEventListener("click", closeProject);
projectDialog.addEventListener("click", (event) => {
  if (event.target === projectDialog) closeProject();
});
projectDialog.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
});

document.addEventListener("keydown", (event) => {
  const typing =
    document.activeElement instanceof HTMLInputElement ||
    document.activeElement instanceof HTMLTextAreaElement;

  if (event.key === "/" && !typing && !projectDialog.open) {
    event.preventDefault();
    setSearchOpen(true);
  }

  if (event.key === "Escape" && searchPanel.classList.contains("open")) {
    setSearchOpen(false);
  }
});

window.addEventListener(
  "scroll",
  () => {
    siteHeader.classList.toggle("scrolled", window.scrollY > 28);
  },
  { passive: true }
);

const finePointer = window.matchMedia("(pointer: fine)").matches;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (finePointer && hoverOrb) {
  window.addEventListener("pointermove", (event) => {
    hoverOrb.style.left = `${event.clientX}px`;
    hoverOrb.style.top = `${event.clientY}px`;
  });

  rows.forEach((row) => {
    row.addEventListener("pointerenter", () => hoverOrb.classList.add("visible"));
    row.addEventListener("pointerleave", () => hoverOrb.classList.remove("visible"));
  });
}

if (!reduceMotion && heroWord) {
  const words = ["VYLEPŠÍŠ.", "VYROBÍŠ.", "OPRAVÍŠ.", "UPRACEŠ."];
  let wordIndex = 0;

  window.setInterval(() => {
    heroWord.classList.remove("swap-in");
    heroWord.classList.add("swap-out");

    window.setTimeout(() => {
      wordIndex = (wordIndex + 1) % words.length;
      heroWord.textContent = words[wordIndex];
      heroWord.classList.remove("swap-out");
      heroWord.classList.add("swap-in");
    }, 250);
  }, 2400);
}

updateProjects();
