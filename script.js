const heroButtons = Array.from(document.querySelectorAll(".hero-index button"));
const heroSlides = Array.from(document.querySelectorAll(".hero-slide"));
let heroSlide = 0;
let heroTimer;

function showHeroSlide(index) {
  heroSlide = index;
  heroButtons.forEach((button, buttonIndex) => {
    button.classList.toggle("is-active", buttonIndex === index);
  });
  heroSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === index);
  });
}

function startHeroTimer() {
  clearInterval(heroTimer);
  heroTimer = setInterval(() => {
    showHeroSlide((heroSlide + 1) % heroSlides.length);
  }, 6500);
}

heroButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showHeroSlide(Number(button.dataset.slide));
    startHeroTimer();
  });
});

startHeroTimer();

const testimonialButtons = Array.from(document.querySelectorAll(".testimonial-dots button"));
const testimonials = Array.from(document.querySelectorAll(".testimonial"));
let activeTestimonial = 0;
let testimonialTimer;

function showTestimonial(index) {
  activeTestimonial = index;
  testimonials.forEach((testimonial, testimonialIndex) => {
    testimonial.classList.toggle("is-active", testimonialIndex === index);
  });
  testimonialButtons.forEach((button, buttonIndex) => {
    button.classList.toggle("is-active", buttonIndex === index);
  });
}

function startTestimonialTimer() {
  clearInterval(testimonialTimer);
  testimonialTimer = setInterval(() => {
    showTestimonial((activeTestimonial + 1) % testimonials.length);
  }, 5200);
}

testimonialButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showTestimonial(Number(button.dataset.testimonial));
    startTestimonialTimer();
  });
});

startTestimonialTimer();
