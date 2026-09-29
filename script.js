const searchInput = document.getElementById("searchInput");
const chips = [...document.querySelectorAll(".chip")];
const cards = [...document.querySelectorAll(".project-card")];
const emptyState = document.getElementById("emptyState");
const resultCount = document.getElementById("resultCount");

let activeCategory = "all";

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

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    activeCategory = chip.dataset.filter;

    chips.forEach((item) => item.classList.remove("active"));
    chip.classList.add("active");

    updateProjects();
  });
});

searchInput.addEventListener("input", updateProjects);
updateProjects();
