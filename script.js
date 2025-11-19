// Sélections principales pour manipuler le DOM (thème, cartes, fond étoilé, etc.)
const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const cards = document.querySelectorAll(".panel, .project-card, .reveal");
const stars = document.querySelector(".stars");
const timelines = Array.from(document.querySelectorAll(".timeline"));
const timelineGroups = timelines.map(timeline => ({
  timeline,
  cards: Array.from(timeline.querySelectorAll(".timeline-card")),
  active: null,
}));
const slider = document.querySelector(".timeline-slides");
const sliderPanels = slider ? Array.from(slider.querySelectorAll(".panel")) : [];
const sliderDots = document.querySelectorAll(".timeline-dot");

// Préférences système + stockage local pour charger la bonne variante dès l'arrivée
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
const storedTheme = localStorage.getItem("theme");
if (storedTheme === "light" || (!storedTheme && prefersLight)) {
  body.classList.add("light");
}

// Met à jour le libellé du bouton selon l'état actuel
const updateThemeLabel = () => {
  themeToggle.textContent = body.classList.contains("light") ? "Mode nuit" : "Mode jour";
};

updateThemeLabel();

// Inversion du thème avec mémorisation de la préférence
themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");
  localStorage.setItem("theme", body.classList.contains("light") ? "light" : "dark");
  updateThemeLabel();
});

// Observer pour déclencher l'animation d'apparition des cartes quand elles entrent dans le viewport
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

cards.forEach(card => {
  observer.observe(card);
});

const updateTimelineProgress = (timeline, card) => {
  if (!timeline) return;
  const progress = timeline.querySelector(".timeline-progress");
  if (!progress) return;
  if (!card) {
    progress.style.height = "0px";
    return;
  }
  const offset = card.offsetTop + card.offsetHeight * 0.5;
  progress.style.height = `${offset}px`;
};

const setActiveTimelineCard = (group, card) => {
  if (!card || group.active === card) return;
  group.cards.forEach(c => c.classList.toggle("active", c === card));
  group.active = card;
  updateTimelineProgress(group.timeline, card);
};

const chooseActiveCard = group => {
  if (!group.cards.length) return;
  const viewportCenter = window.innerHeight / 2;
  let candidate = null;
  let bestScore = Infinity;
  group.cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const inView = rect.bottom > 0 && rect.top < window.innerHeight;
    const cardCenter = rect.top + rect.height / 2;
    const distance = Math.abs(viewportCenter - cardCenter);
    if (inView && distance < bestScore) {
      bestScore = distance;
      candidate = card;
    }
  });
  if (!candidate) {
    const timelineRect = group.timeline.getBoundingClientRect();
    candidate = timelineRect.top > viewportCenter ? group.cards[0] : group.cards[group.cards.length - 1];
  }
  setActiveTimelineCard(group, candidate);
};

const refreshTimelines = () => {
  timelineGroups.forEach(group => chooseActiveCard(group));
};

refreshTimelines();
window.addEventListener("scroll", refreshTimelines);
window.addEventListener("resize", refreshTimelines);

const updateSliderDots = index => {
  sliderDots.forEach((dot, i) => dot.classList.toggle("active", i === index));
};

if (slider && sliderDots.length === sliderPanels.length) {
  sliderDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      sliderPanels[index]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      updateSliderDots(index);
    });
  });

  const handleSliderScroll = () => {
    if (!sliderPanels.length) return;
    const width = slider.clientWidth || 1;
    const index = Math.round(slider.scrollLeft / width);
    updateSliderDots(Math.min(sliderDots.length - 1, Math.max(0, index)));
  };

  slider.addEventListener("scroll", handleSliderScroll, { passive: true });
  window.addEventListener("resize", handleSliderScroll);
  handleSliderScroll();
}

// Effet parallax / tilt en fonction de la position du pointeur + déplacement de la couche d'étoiles
window.addEventListener("pointermove", e => {
  const { innerWidth, innerHeight } = window;
  const tiltStrength = 5;
  const x = (e.clientX / innerWidth - 0.5) * tiltStrength;
  const y = (e.clientY / innerHeight - 0.5) * tiltStrength;
  cards.forEach(card => {
    card.style.setProperty("--tiltX", `${y}deg`);
    card.style.setProperty("--tiltY", `${-x}deg`);
  });
  stars.style.transform = `translate(${x * -1}px, ${y * -1}px)`;
});
