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

const projectDialog = document.getElementById("projectDialog");
const dialogClose = document.getElementById("dialogClose");
const dialogImage = document.getElementById("dialogImage");
const dialogNumber = document.getElementById("dialogNumber");
const dialogCategory = document.getElementById("dialogCategory");
const dialogTitle = document.getElementById("dialogTitle");
const dialogLead = document.getElementById("dialogLead");
const dialogStats = document.getElementById("dialogStats");
const dialogMaterials = document.getElementById("dialogMaterials");
const dialogTools = document.getElementById("dialogTools");
const dialogVisualSteps = document.getElementById("dialogVisualSteps");
const dialogStepCount = document.getElementById("dialogStepCount");
const dialogTip = document.getElementById("dialogTip");

let activeCategory = "all";

const projects = {
  entryway: {
    number: "01",
    accent: "#b85f35",
    image: "assets/projects/entryway.svg",
    category: "Domácnosť",
    title: "Mini odkladacia stanica pri dverách",
    lead: "Úzka drevená polička s oceľovými háčikmi na kľúče, okuliare a poštu. Minimum miesta, maximum každodenného úžitku.",
    time: "35 min",
    difficulty: "Ľahké",
    price: "€",
    materials: ["Doska približne 45 × 12 cm", "3–4 kovové háčiky", "2 konzoly alebo skryté držiaky", "Olej, vosk alebo farba na drevo"],
    tools: ["Meter a ceruzka", "Píla", "Brúska alebo brúsny papier", "Vŕtačka / skrutkovač", "Vodováha"],
    steps: [
      {title:"Zameraj miesto", text:"Odmeraj voľnú šírku pri dverách a na doske si vyznač konečný rozmer.", scene:"measure"},
      {title:"Skráť a zabrús", text:"Dosku odrež, hrany zjemni a povrch prebrús aspoň do zrnitosti P180.", scene:"cut"},
      {title:"Rozlož háčiky", text:"Háčiky si najprv rozlož nasucho. Nechaj dosť miesta aj pre väčší zväzok kľúčov.", scene:"layout"},
      {title:"Povrch uprav", text:"Naneste olej, vosk alebo farbu. Pred montážou nechaj povrch úplne vyschnúť.", scene:"finish"},
      {title:"Namontuj", text:"Poličku vyrovnaj vodováhou, upevni a až potom priskrutkuj háčiky.", scene:"mount"}
    ],
    tip: "Ak chceš čistý vzhľad bez viditeľných konzol, použi skryté policové nosníky. Polička potom vyzerá, akoby vyrastala zo steny."
  },
  sandpaper: {
    number: "02",
    accent: "#a96539",
    image: "assets/projects/sandpaper.svg",
    category: "Dielňa",
    title: "Stojan na brúsny papier zo zvyškov dreva",
    lead: "Každá zrnitosť má vlastnú priehradku. Malý dielenský organizér zo zvyškov dreva, ktorý odstráni večné prehrabávanie.",
    time: "60 min",
    difficulty: "Stredné",
    price: "€",
    materials: ["Odrezky preglejky alebo dosiek", "Tenká preglejka / HDF na priečky", "Lepidlo na drevo", "Malé skrutky alebo klinčeky", "Štítky zrnitosti"],
    tools: ["Meter a uholník", "Stolová alebo ručná píla", "Brúska", "Vŕtačka / klincovačka podľa spojov", "Ceruzka alebo popisovač"],
    steps: [
      {title:"Urči vnútorný rozmer", text:"Zmeraj najväčší brúsny papier a pridaj približne centimeter vôle.", scene:"measure"},
      {title:"Narež korpus", text:"Priprav zadnú dosku, dno a bočnice. Rezy drž kolmé, aby priehradky nesadali krivo.", scene:"cut"},
      {title:"Vyrob priečky", text:"Tenké priečky narež všetky naraz podľa jednej šablóny, aby mali rovnaký rozmer.", scene:"repeat"},
      {title:"Zlep a zaisti", text:"Korpus a priečky zlep. Podľa materiálu ich môžeš poistiť malými klinčekmi.", scene:"assemble"},
      {title:"Označ zrnitosti", text:"Na prednú hranu napíš P60, P80, P120, P180… podľa toho, čo naozaj používaš.", scene:"label"}
    ],
    tip: "Priehradky nerob tesné. Použitý brúsny papier sa zvlní a pár milimetrov rezervy výrazne uľahčí vyberanie."
  },
  herbs: {
    number: "03",
    accent: "#6f7656",
    image: "assets/projects/herbs.svg",
    category: "Záhrada",
    title: "Kompaktný stojan na bylinky",
    lead: "Vertikálny drevený stojan s tromi úrovňami pre bylinky. Teplý materiál, malý pôdorys a dosť zelene aj na menšej terase.",
    time: "45 min",
    difficulty: "Ľahké",
    price: "€€",
    materials: ["2 bočné laty", "3 priečne poličky", "Skrutky do dreva", "Exteriérový olej alebo lazúra", "3 kvetináče"],
    tools: ["Meter a ceruzka", "Píla", "Vŕtačka / skrutkovač", "Brúsny papier", "Uholník"],
    steps: [
      {title:"Zmeraj kvetináče", text:"Podľa reálneho priemeru kvetináčov urči šírku poličiek a rozostupy medzi nimi.", scene:"measure"},
      {title:"Narež drevo", text:"Priprav dve bočnice a tri poličky. Ostré rohy zjemni brúsením.", scene:"cut"},
      {title:"Predvŕtaj spoje", text:"Otvory predvŕtaj, najmä ak pracuješ s tenšími latami. Drevo tak menej praská.", scene:"drill"},
      {title:"Zostav rám", text:"Poličky priskrutkuj medzi bočnice a pri každej úrovni skontroluj pravý uhol.", scene:"assemble"},
      {title:"Ochráň a osaď", text:"Drevo ošetri do exteriéru. Po vyschnutí vlož kvetináče, najťažší daj dole.", scene:"plant"}
    ],
    tip: "Spodnú poličku môžeš spraviť o pár centimetrov hlbšiu. Stojan bude stabilnejší bez toho, aby pôsobil ťažkopádne."
  },
  cables: {
    number: "04",
    accent: "#98614b",
    image: "assets/projects/cables.svg",
    category: "Tvorenie",
    title: "Papierový organizér na káble",
    lead: "Pevný kartón, jednoduchá mriežka a žiadna ďalšia plastová krabica. Nabíjačky aj krátke káble dostanú vlastné miesto.",
    time: "25 min",
    difficulty: "Ľahké",
    price: "€",
    materials: ["Pevná kartónová škatuľa", "Kartón na deliace priečky", "Papierová páska alebo lepidlo", "Štítky / popisovač"],
    tools: ["Kovové pravítko", "Odlamovací nôž", "Rezacia podložka", "Ceruzka"],
    steps: [
      {title:"Zmeraj škatuľu", text:"Odmeraj vnútornú šírku, dĺžku a výšku. Priečky nech sú o pár milimetrov nižšie.", scene:"measure"},
      {title:"Narež pásy", text:"Z pevného kartónu narež dlhé a priečne pásy. Kovové pravítko pomôže udržať rez rovný.", scene:"cut"},
      {title:"Sprav zárezy", text:"Do krížiacich sa pásov vyrež zárezy do polovice výšky.", scene:"slot"},
      {title:"Zlož mriežku", text:"Pásy do seba zasuň bez lepidla a mriežku vlož do škatule.", scene:"assemble"},
      {title:"Roztrieď a označ", text:"Káble stoč voľne, rozdeľ podľa typu a jednotlivé priehradky si označ.", scene:"label"}
    ],
    tip: "Káble nesťahuj do veľmi malých slučiek. Väčší polomer ohybu menej namáha miesto pri konektore."
  },
  drawer: {
    number: "05",
    accent: "#8a6548",
    image: "assets/projects/drawer.svg",
    category: "Domácnosť",
    title: "Nastaviteľné priečky do zásuvky",
    lead: "Jednoduché preglejkové priečky bez lepidla. Rozloženie vieš meniť podľa toho, čo sa v zásuvke práve nachádza.",
    time: "30 min",
    difficulty: "Ľahké",
    price: "€",
    materials: ["Tenká preglejka alebo HDF", "Voliteľne tenká filcová podložka"],
    tools: ["Meter", "Ceruzka", "Píla alebo jemná priamočiara píla", "Brúsny papier", "Uholník"],
    steps: [
      {title:"Zmeraj zásuvku", text:"Odmeraj presný vnútorný rozmer a skontroluj, či sa zásuvka smerom dozadu nezužuje.", scene:"measure"},
      {title:"Naplánuj bunky", text:"Najskôr si rozloženie načrtni podľa vecí, ktoré v zásuvke naozaj máš.", scene:"layout"},
      {title:"Narež pásy", text:"Dlhé aj priečne pásy narež o pár milimetrov nižšie než je vnútorná výška zásuvky.", scene:"cut"},
      {title:"Vyrež krížové zárezy", text:"Na miestach kríženia sprav presné zárezy do polovice výšky materiálu.", scene:"slot"},
      {title:"Zlož bez lepidla", text:"Priečky do seba zasuň a vlož do zásuvky. Rozloženie môžeš kedykoľvek prestavať.", scene:"assemble"}
    ],
    tip: "Pred rezaním preglejky si prvú verziu vyskladaj z obyčajného kartónu. Chyba v kartóne stojí pár centov, chyba v preglejke už nie."
  },
  drills: {
    number: "06",
    accent: "#75624f",
    image: "assets/projects/drills.svg",
    category: "Dielňa",
    title: "Prehľadný stojan na vrtáky",
    lead: "Masívnejší drevený blok s označenými priemermi. Vrták chytíš na prvý pokus a hneď vidíš, čo chýba.",
    time: "75 min",
    difficulty: "Stredné",
    price: "€€",
    materials: ["Hranol alebo hrubšia drevená doska", "Olej alebo vosk na drevo", "Popisovač / vypaľované označenie"],
    tools: ["Sada vrtákov", "Stojanová alebo ručná vŕtačka", "Meter a uholník", "Brúska", "Doraz alebo maliarska páska"],
    steps: [
      {title:"Zoraď priemery", text:"Vrtáky si rozlož od najmenšieho po najväčší a vyber tie, ktoré chceš mať v stojane.", scene:"sort"},
      {title:"Rozmeraj os", text:"Na dreve si vyznač rovnú čiaru a pravidelné rozostupy medzi jednotlivými otvormi.", scene:"measure"},
      {title:"Predznač otvory", text:"Stred každého otvoru jemne jamkuj, aby vrták pri rozbehu neutiekol do strany.", scene:"layout"},
      {title:"Vyvŕtaj hĺbku", text:"Použi doraz alebo pásku na vrtáku. Každý otvor sprav o trochu väčší než priemer uloženého vrtáka.", scene:"drill"},
      {title:"Zabrús a označ", text:"Blok prebrús, ošetri povrch a ku každému otvoru dopíš presný priemer.", scene:"label"}
    ],
    tip: "Ak máš stojanovú vŕtačku, nastav si pevný hĺbkový doraz. Všetky otvory potom skončia v rovnakej hĺbke a stojan pôsobí profesionálnejšie."
  }
};

function normalize(value) {
  return value.toLocaleLowerCase("sk").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function updateProjects() {
  const query = normalize(searchInput.value.trim());
  let visible = 0;

  rows.forEach((row) => {
    const categoryMatches = activeCategory === "all" || row.dataset.category === activeCategory;
    const searchable = normalize(`${row.dataset.search} ${row.textContent}`);
    const show = categoryMatches && (!query || searchable.includes(query));
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
  if (open) setTimeout(() => searchInput.focus(), 40);
}

function sceneSvg(scene, accent) {
  const wood = "#a96b43";
  const woodDark = "#6b432c";
  const steel = "#7d8585";
  const paper = "#ead9c3";
  const ink = "#302820";
  const base = `<rect width="360" height="220" fill="#d6c2aa"/><rect y="158" width="360" height="62" fill="#6a5545"/><ellipse cx="180" cy="176" rx="118" ry="18" fill="#2b241f" opacity=".14"/>`;

  const scenes = {
    measure: `<rect x="78" y="88" width="205" height="54" rx="5" fill="${wood}"/><path d="M82 118h196" stroke="${woodDark}" stroke-width="3"/><rect x="104" y="58" width="156" height="24" rx="4" fill="#d6a442"/><g stroke="${ink}" stroke-width="2">${Array.from({length:12},(_,i)=>`<path d="M${116+i*11} 58v${i%5===0?15:9}"/>`).join("")}</g><path d="M275 64l35 32" stroke="${ink}" stroke-width="7" stroke-linecap="round"/>`,
    cut: `<rect x="68" y="95" width="218" height="48" rx="4" fill="${wood}"/><circle cx="236" cy="104" r="48" fill="${steel}" stroke="${ink}" stroke-width="6"/><circle cx="236" cy="104" r="9" fill="${ink}"/><path d="M236 56v96M188 104h96M202 70l68 68M270 70l-68 68" stroke="#e8eceb" stroke-width="4"/><path d="M74 151h205" stroke="${accent}" stroke-width="6"/>`,
    layout: `<rect x="68" y="72" width="230" height="86" rx="6" fill="${wood}"/><g fill="${ink}"><circle cx="105" cy="116" r="8"/><circle cx="165" cy="116" r="8"/><circle cx="225" cy="116" r="8"/></g><path d="M94 55h142" stroke="${accent}" stroke-width="5" stroke-dasharray="10 8"/><path d="M105 83v65M165 83v65M225 83v65" stroke="#f6eadc" stroke-width="2" stroke-dasharray="5 5"/>`,
    finish: `<rect x="72" y="102" width="220" height="50" rx="6" fill="${wood}"/><rect x="226" y="48" width="58" height="48" rx="8" fill="${accent}"/><path d="M226 86c-35 6-62 22-86 50" stroke="${accent}" stroke-width="10" stroke-linecap="round"/><path d="M113 92c48 8 83 6 123-5" stroke="#e8b87f" stroke-width="5" opacity=".7"/>`,
    mount: `<rect x="88" y="72" width="190" height="52" rx="6" fill="${wood}"/><path d="M112 124v45M250 124v45" stroke="${steel}" stroke-width="9"/><circle cx="112" cy="147" r="8" fill="${ink}"/><circle cx="250" cy="147" r="8" fill="${ink}"/><path d="M64 58h235" stroke="${accent}" stroke-width="4"/><circle cx="181" cy="58" r="15" fill="none" stroke="${ink}" stroke-width="4"/>`,
    repeat: `<g fill="${paper}" stroke="${woodDark}" stroke-width="3"><rect x="74" y="76" width="36" height="92"/><rect x="124" y="76" width="36" height="92"/><rect x="174" y="76" width="36" height="92"/><rect x="224" y="76" width="36" height="92"/></g><path d="M66 61h204" stroke="${accent}" stroke-width="6"/><path d="M284 62v106" stroke="${steel}" stroke-width="12"/>`,
    assemble: `<rect x="70" y="74" width="220" height="92" rx="6" fill="${wood}"/><path d="M125 74v92M180 74v92M235 74v92" stroke="${woodDark}" stroke-width="8"/><path d="M54 174l52-30M306 174l-52-30" stroke="${steel}" stroke-width="10" stroke-linecap="round"/><circle cx="94" cy="151" r="8" fill="${accent}"/><circle cx="266" cy="151" r="8" fill="${accent}"/>`,
    label: `<rect x="70" y="76" width="220" height="86" rx="6" fill="${wood}"/><g font-family="system-ui" font-size="24" font-weight="900" fill="#f2dfc7"><text x="88" y="128">P80</text><text x="151" y="128">120</text><text x="222" y="128">240</text></g><path d="M276 53l34 22-48 67-34-22z" fill="${ink}"/><path d="M268 85l-29 41" stroke="${accent}" stroke-width="5"/>`,
    drill: `<rect x="62" y="118" width="236" height="42" rx="6" fill="${wood}"/><path d="M185 45v76" stroke="${steel}" stroke-width="14"/><path d="M176 75h18l-18 18h18l-18 18" fill="none" stroke="${ink}" stroke-width="4"/><path d="M210 46h60v38h-60z" fill="${accent}"/><rect x="225" y="82" width="32" height="50" rx="8" fill="${ink}"/><circle cx="185" cy="139" r="10" fill="#3e3027"/>`,
    plant: `<path d="M94 116h80l-9 48h-62z" fill="#b96944" stroke="${woodDark}" stroke-width="4"/><path d="M184 116h80l-9 48h-62z" fill="#b96944" stroke="${woodDark}" stroke-width="4"/><g stroke="#506f4f" stroke-width="7" fill="#6f8d64"><path d="M134 116c-9-42 20-69 45-84"/><ellipse cx="171" cy="45" rx="25" ry="11" transform="rotate(-30 171 45)"/><ellipse cx="126" cy="72" rx="24" ry="10" transform="rotate(28 126 72)"/><path d="M224 116c8-38-19-65-38-78"/><ellipse cx="190" cy="52" rx="24" ry="10" transform="rotate(25 190 52)"/></g>`,
    slot: `<g fill="${paper}" stroke="${woodDark}" stroke-width="4"><rect x="80" y="70" width="80" height="96"/><rect x="200" y="70" width="80" height="96"/></g><path d="M120 70v50M240 116v50" stroke="${accent}" stroke-width="10"/><path d="M166 118h28" stroke="${ink}" stroke-width="5" stroke-dasharray="5 4"/>`,
    sort: `<rect x="56" y="142" width="248" height="24" rx="5" fill="${wood}"/><g fill="${steel}" stroke="${ink}" stroke-width="3"><path d="M84 142V78l9-24 9 24v64z"/><path d="M130 142V62l9-28 9 28v80z"/><path d="M176 142V88l9-21 9 21v54z"/><path d="M222 142V52l9-30 9 30v90z"/><path d="M268 142V98l9-18 9 18v44z"/></g><path d="M77 177h215" stroke="${accent}" stroke-width="5"/>`
  };
  return `<svg viewBox="0 0 360 220" role="img" aria-hidden="true">${base}${scenes[scene] || scenes.layout}</svg>`;
}

function openProject(projectId) {
  const project = projects[projectId];
  if (!project) return;

  dialogImage.src = project.image;
  dialogImage.alt = `Hotový projekt: ${project.title}`;
  dialogNumber.textContent = `VYCHYTÁVKA ${project.number}`;
  dialogCategory.textContent = project.category.toUpperCase();
  dialogTitle.textContent = project.title;
  dialogLead.textContent = project.lead;
  dialogStats.innerHTML = `<span>⏱ ${project.time}</span><span>◆ ${project.difficulty}</span><span>€ ${project.price}</span>`;
  dialogMaterials.innerHTML = project.materials.map(item => `<li>${item}</li>`).join("");
  dialogTools.innerHTML = project.tools.map(item => `<li>${item}</li>`).join("");
  dialogStepCount.textContent = `${project.steps.length} krokov`;
  dialogVisualSteps.innerHTML = project.steps.map((step,index) => `
    <article class="visual-step" style="--step-accent:${project.accent}">
      <div class="step-image">${sceneSvg(step.scene, project.accent)}</div>
      <div class="step-copy"><span>KROK ${String(index + 1).padStart(2,"0")}</span><h4>${step.title}</h4><p>${step.text}</p></div>
    </article>`
  ).join("");
  dialogTip.textContent = project.tip;

  setSearchOpen(false);
  if (typeof projectDialog.showModal === "function") {
    projectDialog.showModal();
    document.body.classList.add("dialog-open");
    projectDialog.scrollTop = 0;
  }
}

function closeProject() {
  if (projectDialog.open) projectDialog.close();
  document.body.classList.remove("dialog-open");
}

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    activeCategory = filter.dataset.filter;
    filters.forEach(item => item.classList.remove("active"));
    filter.classList.add("active");
    updateProjects();
  });
});

searchToggle.addEventListener("click", () => setSearchOpen(true));
searchClose.addEventListener("click", () => setSearchOpen(false));
searchPanel.addEventListener("click", event => {
  if (event.target === searchPanel) setSearchOpen(false);
});
searchInput.addEventListener("input", updateProjects);

rows.forEach(row => {
  row.addEventListener("click", () => openProject(row.dataset.project));
  row.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject(row.dataset.project);
    }
  });
});

document.querySelectorAll("[data-open-project]").forEach(button => {
  button.addEventListener("click", () => openProject(button.dataset.openProject));
});

randomProjectButton.addEventListener("click", () => {
  const visibleRows = rows.filter(row => !row.hidden);
  const pool = visibleRows.length ? visibleRows : rows;
  openProject(pool[Math.floor(Math.random() * pool.length)].dataset.project);
});

dialogClose.addEventListener("click", closeProject);
projectDialog.addEventListener("click", event => {
  if (event.target === projectDialog) closeProject();
});
projectDialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));

document.addEventListener("keydown", event => {
  const typing = document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement;
  if (event.key === "/" && !typing && !projectDialog.open) {
    event.preventDefault();
    setSearchOpen(true);
  }
  if (event.key === "Escape" && searchPanel.classList.contains("open")) setSearchOpen(false);
});

window.addEventListener("scroll", () => siteHeader.classList.toggle("scrolled", window.scrollY > 24), {passive:true});

updateProjects();