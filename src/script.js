const header = document.querySelector(".site-header");

window.addEventListener("scroll", function () {
  if (window.scrollY > 10) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

const hamburger = document.getElementById("hamburger");
const nav = document.querySelector(".site-nav");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("open");
});
