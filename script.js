const heroSlides = Array.from(document.querySelectorAll(".hero-slide"));
const heroControls = Array.from(document.querySelectorAll(".hero-index button"));
let activeHeroControl = 0;
let heroTimer;

function showHero(controlIndex) {
  const normalizedControl = controlIndex % heroControls.length;
  const slideIndex = normalizedControl % heroSlides.length;
  activeHeroControl = normalizedControl;

  heroSlides.forEach((slide, index) => {
    slide.classList.toggle("is-active", index === slideIndex);
  });

  heroControls.forEach((button, index) => {
    button.classList.toggle("is-active", index === normalizedControl);
  });
}

function startHeroCarousel() {
  clearInterval(heroTimer);
  heroTimer = setInterval(() => {
    showHero(activeHeroControl + 1);
  }, 5200);
}

heroControls.forEach((button, index) => {
  button.addEventListener("click", () => {
    showHero(index);
    startHeroCarousel();
  });
});

startHeroCarousel();
