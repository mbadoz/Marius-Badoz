const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const themeLabel = themeToggle?.querySelector(".theme-label");
const themeIcon = themeToggle?.querySelector(".theme-icon");
const slider = document.querySelector(".timeline-slider");
const sliderPanels = slider ? Array.from(slider.querySelectorAll(".timeline-slide")) : [];
const sliderDots = document.querySelectorAll(".timeline-dot");
const hero = document.querySelector(".hero");
const cvButton = document.getElementById("cvButton");
let currentSlide = 0;
const cards = document.querySelectorAll(".panel, .project-card, .timeline-card");
const stars = document.querySelector(".stars");
const timelines = Array.from(document.querySelectorAll(".timeline"));
const timelineGroups = timelines.map(timeline => {
  const slideIndex = sliderPanels.findIndex(panel => panel.contains(timeline));
  return {
    timeline,
    cards: Array.from(timeline.querySelectorAll(".timeline-card")),
    active: null,
    slideIndex,
  };
});

const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
const storedTheme = localStorage.getItem("theme");
if (storedTheme === "light" || (!storedTheme && prefersLight)) {
  body.classList.add("light");
}

const updateThemeLabel = () => {
  if (!themeToggle) return;
  const isLight = body.classList.contains("light");
  if (themeLabel) themeLabel.textContent = isLight ? "Mode nuit" : "Mode jour";
  if (themeIcon) themeIcon.textContent = isLight ? "🌙" : "☀️";
};

updateThemeLabel();

themeToggle?.addEventListener("click", () => {
  body.classList.toggle("light");
  localStorage.setItem("theme", body.classList.contains("light") ? "light" : "dark");
  updateThemeLabel();
});

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

cards.forEach(card => observer.observe(card));

if (hero) {
  const heroObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const floating = !entry.isIntersecting;
        body.classList.toggle("cv-floating", floating);
        body.classList.toggle("theme-floating", floating);
      });
    },
    { threshold: 0.2 }
  );
  heroObserver.observe(hero);
}

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
  timelineGroups.forEach(group => {
    if (group.slideIndex !== -1 && group.slideIndex !== currentSlide) return;
    chooseActiveCard(group);
  });
};

refreshTimelines();
window.addEventListener("scroll", refreshTimelines);
window.addEventListener("resize", refreshTimelines);

const updateSliderDots = index => {
  sliderDots.forEach((dot, i) => dot.classList.toggle("active", i === index));
};

const goToSlide = index => {
  if (!slider || !sliderPanels.length) return;
  currentSlide = (index + sliderPanels.length) % sliderPanels.length;
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  updateSliderDots(currentSlide);
  refreshTimelines();
};

if (slider && sliderDots.length === sliderPanels.length) {
  sliderDots.forEach((dot, index) => {
    dot.addEventListener("click", () => goToSlide(index));
  });

  let touchStartX = 0;
  let touchEndX = 0;
  const swipeThreshold = 50;

  slider.addEventListener("touchstart", event => {
    touchStartX = event.changedTouches[0].clientX;
  });

  slider.addEventListener("touchend", event => {
    touchEndX = event.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) goToSlide(currentSlide + 1);
      else goToSlide(currentSlide - 1);
    }
  });

  goToSlide(0);
}

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
