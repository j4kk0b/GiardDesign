// searchbar in navigation
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

// scroll animation
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries
      .filter((e) => e.isIntersecting)
      .forEach((entry) => {
        entry.target.classList.add("scrolled");
        observer.unobserve(entry.target);
      });
  },
  {
    threshold: 0.2,
    marginRoot: "40px",
  }
);

document.querySelectorAll(".section-to-scroll").forEach((e) => {
  observer.observe(e);
});

// update year in footer
const yearContainer = document.querySelector(".current-year");
const currYear = new Date().getFullYear();

yearContainer.innerHTML = currYear;

// macy initalizaion - gallery
window.onload = () => {
  const macy = Macy({
    container: ".grid",
    trueOrder: true,
    waitForImages: false,
    margin: 30,
    columns: 5,
    breakAt: {
      1500: 3,
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

// Popup
class Popup {
  layout;
  closeBtn;
  nextBtn;
  prevBtn;
  imgs;
  currImgIndex;

  constructor() {
    this.imgs = document.querySelectorAll(".img-gallery");
  }

  createPopup() {
    const markup = this.createMarkup(
      this.imgs[this.currImgIndex].src,
      this.imgs[this.currImgIndex].alt
    );
    document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
    this.addEventListenerToRemovePopup();
    this.addEventListenersToControls();

    document.querySelector("body").classList.add("stop-scroll");
  }

  createMarkup(src, alt) {
    return `<div class="popup-container">
      <div class="popup">
        <div class="popup-img-container">
          <img class="popup-img" src="${src}" alt="${alt}" />
          <div class="gallery-controls">
            <button class="btn-gallery-prev"><img src="assets/slides/arrow-left.png" /></button>
            <button class="btn-close-popup">Schowaj</button>
            <button class="btn-gallery-next"><img src="assets/slides/arrow-right.png" /></button>
          </div>
        </div>
      </div>
      <div class="popup-layout layout"></div>
    </div>`;
  }

  removePopup() {
    document.querySelector("body").classList.remove("stop-scroll");
    document.querySelector(".popup-container").remove();
  }

  changeImgInPopUp() {
    const img = document.querySelector(".popup-img");

    img.src = `assets/gallery/img${this.currImgIndex + 1}-min.webp`;
    img.alt = `Zdjęcie ${
      this.currImgIndex + 1
    } przedstawiające realizacje ogrodu`;
  }

  addEventListenerToRemovePopup() {
    this.closeBtn = document.querySelector(".btn-close-popup");
    this.layout = document.querySelector(".popup-layout");

    this.closeBtn.addEventListener("click", this.removePopup);
    this.layout.addEventListener("click", this.removePopup);
  }

  addEventListenersToControls() {
    this.prevBtn = document.querySelector(".btn-gallery-prev");
    this.nextBtn = document.querySelector(".btn-gallery-next");

    this.prevBtn.addEventListener("click", () => {
      this.changeImgInGallery(-1);
    });
    this.nextBtn.addEventListener("click", () => {
      this.changeImgInGallery(1);
    });
  }

  changeImgInGallery(position) {
    if (this.currImgIndex + position === this.imgs.length)
      this.currImgIndex = 0;

    if (this.currImgIndex + position === -1)
      this.currImgIndex = this.imgs.length;

    if (position === 1) this.currImgIndex += 1;
    else this.currImgIndex -= 1;

    this.changeImgInPopUp();
  }

  addEventListeners() {
    this.imgs.forEach((img, i) => {
      img.addEventListener("click", () => {
        this.currImgIndex = i;
        this.createPopup();
      });
    });
  }

  init() {
    this.addEventListeners();
  }
}

const popup = new Popup();
popup.init();
