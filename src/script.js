const header = document.querySelector(".site-header");

window.addEventListener("scroll", function () {
  if (window.scrollY > 10) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
const menuToggle = document.getElementById("menu-toggle");
const menuWrapper = document.getElementById("menu-wrapper");

menuToggle.addEventListener("click", () => {
  menuWrapper.classList.toggle("active");
});

document.querySelectorAll(".nav-list a, .top-right-btn").forEach((link) => {
  link.addEventListener("click", () => {
    menuWrapper.classList.remove("active");
  });
});
