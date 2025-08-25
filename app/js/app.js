document.addEventListener("DOMContentLoaded", () => {
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach(drop => {
    const toggle = drop.querySelector(".dropdown__toggle");

    toggle.addEventListener("click", (e) => {
      e.preventDefault();

      dropdowns.forEach(d => {
        if (d !== drop) d.classList.remove("active");
      });

      drop.classList.toggle("active");
    });
  });

  document.addEventListener("click", (e) => {
    dropdowns.forEach(drop => {
      if (!drop.contains(e.target)) {
        drop.classList.remove("active");
      }
    });
  });
});


const burger = document.querySelector(".burger");
const mobileMenu = document.querySelector(".mobile-menu");
const overlay = document.querySelector(".mobile-menu-overlay");
const closeBtn = document.querySelector(".mobile-menu__close");

function closeMenu() {
  burger.classList.remove("active");
  mobileMenu.classList.remove("active");
  overlay.classList.remove("active");
}

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  mobileMenu.classList.toggle("active");
  overlay.classList.toggle("active");
});

closeBtn.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);
