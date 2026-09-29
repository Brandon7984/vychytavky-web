const searchInput = document.getElementById("searchInput");
const chips = [...document.querySelectorAll(".chip")];
const cards = [...document.querySelectorAll(".project-card")];
const emptyState = document.getElementById("emptyState");
const resultCount = document.getElementById("resultCount");
const siteHeader = document.getElementById("siteHeader");
const randomProjectButton = document.getElementById("randomProjectButton");
const projectDialog = document.getElementById("projectDialog");
const dialogClose = document.getElementById("dialogClose");
const featuredCard = document.querySelector(".featured-card");

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

  cards.forEach((card) => {
    const categoryMatches =
      activeCategory === "all" || card.dataset.category === activeCategory;

    const searchable = normalize(
      `${card.dataset.search} ${card.textContent}`
    );

    const searchMatches = !query || searchable.includes(query);
    const show = categoryMatches && searchMatches;

    card.hidden = !show;
    if (show) visible += 1;
  });

  emptyState.hidden = visible !== 0;
  resultCount.textContent =
    visible === 1 ? "1 projekt" : `${visible} projektov`;
}

function openProject(projectId) {
  const project = projects[projectId];
  if (!project) return;

  dialogNumber.textContent = `Vychytávka ${project.number}`;
  dialogCategory.textContent = project.category;
  dialogTitle.textContent = project.title;
  dialogLead.textContent = project.lead;
  dialogStats.innerHTML = [
    `<span>⏱ ${project.time}</span>`,
    `<span>● ${project.difficulty}</span>`,
    `<span>Rozpočet ${project.price}</span>`
  ].join("");

  dialogMaterials.innerHTML = project.materials
    .map((item) => `<li>${item}</li>`)
    .join("");

  dialogSteps.innerHTML = project.steps
    .map((step) => `<li>${step}</li>`)
    .join("");

  dialogTip.textContent = project.tip;

  if (typeof projectDialog.showModal === "function") {
    projectDialog.showModal();
    document.body.classList.add("dialog-open");
  }
}

function closeProject() {
  projectDialog.close();
  document.body.classList.remove("dialog-open");
}

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    activeCategory = chip.dataset.filter;
    chips.forEach((item) => item.classList.remove("active"));
    chip.classList.add("active");
    updateProjects();
  });
});

searchInput.addEventListener("input", updateProjects);

document.addEventListener("keydown", (event) => {
  if (event.key === "/" && document.activeElement !== searchInput) {
    event.preventDefault();
    searchInput.focus();
  }
});

cards.forEach((card) => {
  card.addEventListener("click", () => openProject(card.dataset.project));

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject(card.dataset.project);
    }
  });
});

document.querySelectorAll("[data-open-project]").forEach((button) => {
  button.addEventListener("click", () => openProject(button.dataset.openProject));
});

randomProjectButton.addEventListener("click", () => {
  const visibleCards = cards.filter((card) => !card.hidden);
  const pool = visibleCards.length ? visibleCards : cards;
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

window.addEventListener(
  "scroll",
  () => siteHeader.classList.toggle("scrolled", window.scrollY > 20),
  { passive: true }
);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

if (!reduceMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
  );

  document.querySelectorAll("[data-reveal]").forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index * 35, 180)}ms`;
    observer.observe(element);
  });
} else {
  document.querySelectorAll("[data-reveal]").forEach((element) => {
    element.classList.add("is-visible");
  });
}

if (!reduceMotion && finePointer && featuredCard) {
  featuredCard.addEventListener("pointermove", (event) => {
    const rect = featuredCard.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    featuredCard.style.transform =
      `rotate(2.5deg) perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-3px)`;
  });

  featuredCard.addEventListener("pointerleave", () => {
    featuredCard.style.transform = "rotate(2.5deg)";
  });
}

updateProjects();
