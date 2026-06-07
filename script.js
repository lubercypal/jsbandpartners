const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");

if (menuToggle && header) {
  menuToggle.addEventListener("click", () => {
    header.classList.toggle("is-open");
  });
}
