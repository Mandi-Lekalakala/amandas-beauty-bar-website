const header = document.querySelector(".site-header");

window.addEventListener("scroll", function () {
  if (window.scrollY > 10) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
