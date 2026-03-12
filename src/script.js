// Year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Sticky header shadow
window.addEventListener("scroll", () => {
  document
    .querySelector(".site-header")
    .classList.toggle("scrolled", window.scrollY > 10);
});

// Hamburger menu toggle
const hamburger = document.getElementById("hamburger");
const nav = document.querySelector(".site-nav");
const overlay = document.getElementById("navOverlay");

function openMenu() {
  nav.classList.add("open");
  overlay.classList.add("active");
}

function closeMenu() {
  nav.classList.remove("open");
  overlay.classList.remove("active");
}

hamburger.addEventListener("click", () => {
  nav.classList.contains("open") ? closeMenu() : openMenu();
});

// Close when tapping overlay
overlay.addEventListener("click", closeMenu);

// Close when a nav link is clicked
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});
