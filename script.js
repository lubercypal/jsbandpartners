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

const counters = Array.from(document.querySelectorAll("[data-count]"));
let countersStarted = false;

function formatCounter(value) {
  return value >= 1000 ? value.toLocaleString("en-US") : String(value);
}

function animateCounters() {
  if (countersStarted) return;
  countersStarted = true;

  counters.forEach((counter) => {
    const target = Number(counter.dataset.count);
    const suffix = counter.dataset.suffix || "";
    const duration = 1500;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      counter.textContent = `${formatCounter(current)}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  });
}

if ("IntersectionObserver" in window && counters.length) {
  const counterObserver = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      animateCounters();
      counterObserver.disconnect();
    }
  }, { threshold: 0.35 });

  counterObserver.observe(document.querySelector(".stats-band"));
} else {
  animateCounters();
}

const testimonialSlides = Array.from(document.querySelectorAll(".testimonial-slide"));
const testimonialDots = Array.from(document.querySelectorAll(".testimonial-dots button"));
let activeTestimonial = 0;
let testimonialTimer;

function showTestimonial(index) {
  activeTestimonial = index % testimonialSlides.length;
  testimonialSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === activeTestimonial);
  });
  testimonialDots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === activeTestimonial);
  });
}

function startTestimonials() {
  clearInterval(testimonialTimer);
  testimonialTimer = setInterval(() => {
    showTestimonial(activeTestimonial + 1);
  }, 5200);
}

testimonialDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showTestimonial(index);
    startTestimonials();
  });
});

if (testimonialSlides.length) {
  startTestimonials();
}
