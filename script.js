// Sélections principales pour manipuler le DOM (thème, cartes, fond étoilé, etc.)
const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const cards = document.querySelectorAll(".panel, .project-card, .timeline-card");
const stars = document.querySelector(".stars");

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
