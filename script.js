const searchBar = document.getElementById("search-bar");
const searchToggler = document.getElementById("search-icon-toggler");

searchToggler.addEventListener("click", () => {
  searchBar.classList.remove("hidden-custom");
  searchBar.classList.add("active-custom");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" || e.key === "Enter") {
    searchBar.classList.add("hidden-custom");
    searchBar.classList.remove("active-custom");
  }
});

// update year in footer
const yearContainer = document.querySelector(".current-year");
const currYear = new Date().getFullYear();

yearContainer.innerHTML = currYear;

// macy initalizaion - gallery
window.onload = () => {
  const macy = Macy({
    container: ".grid",
    trueOrder: false,
    waitForImages: false,
    margin: 30,
    columns: 3,
    breakAt: {
      900: 2,
      500: 1,
    },
  });
};

// Opening gallery
const openBtn = document.querySelector(".section-projects__gallery-btn");
const gallery = document.querySelector(".section-projects__gallery");

let btnCaptionChange = false;
openBtn.addEventListener("click", () => {
  btnCaptionChange = !btnCaptionChange;

  if (
    (openBtn.innerHTML = btnCaptionChange
      ? "Zwiń <span>&uarr;</span>"
      : "Rozwiń <span>&darr;</span>")
  );

  if (gallery.classList.contains("gallery-active")) {
    gallery.classList.add("gallery-hide");
    setTimeout(() => {
      gallery.classList.remove("gallery-hide");
    }, 1000);
  }
  gallery.classList.toggle("gallery-active");

  if (!openBtn.classList.contains("move-gallery-btn")) {
    openBtn.classList.add("move-gallery-btn");
  } else {
    setTimeout(() => {
      openBtn.classList.remove("move-gallery-btn");
    }, 500);
  }
});
