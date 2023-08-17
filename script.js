const searchBar = document.getElementById("search-bar");
const searchToggler = document.getElementById("search-icon-toggler");

searchToggler.addEventListener("click", () => {
  searchBar.classList.remove("hidden-custom");
  searchBar.classList.add("active-custom");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    searchBar.classList.add("hidden-custom");
    searchBar.classList.remove("active-custom");
  }
});

// update year in footer
const yearContainer = document.querySelector(".current-year");
const currYear = new Date().getFullYear();

yearContainer.innerHTML = currYear;
