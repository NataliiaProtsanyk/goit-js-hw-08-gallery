import * as moduleGallery from "./app.js";
const imgCount = moduleGallery.galleryItems.length;

// Посилання на елементи HTML
const refs = {
  gallery: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".js-lightbox"),
  btnClose: document.querySelector('button[data-action="close-lightbox"]'),
  lightboxImage: document.querySelector(".lightbox__image"),
  lightboxOgverlay: document.querySelector(".lightbox__overlay"),
};

// Сформувати массив шаблоних стрічок з розміткою згідно шаблону
const imgMarkup = new Array(imgCount)
  .fill(0)
  .map((_, i) => {
    return `
    <li class="gallery__item">
    <a
      class="gallery__link"
      href=${moduleGallery.galleryItems[i].original}
    >
      <img
        class="gallery__image"
        src=${moduleGallery.galleryItems[i].preview}
        data-source=${moduleGallery.galleryItems[i].original}
        alt=${moduleGallery.galleryItems[i].description}
      />
    </a>
  </li>
  `;
  })
  .join("");

refs.gallery.insertAdjacentHTML("afterbegin", imgMarkup);
refs.gallery.addEventListener("click", handlerClick);

function handlerClick(e) {
  if (e.target.nodeName !== "IMG") return;

  e.preventDefault();

  openModal(e.target);
}

// Відкриття модального вікна
function openModal(e) {
  refs.lightbox.classList.add("is-open");

  uploadPictures(e.dataset.source, e.alt);

  addModalListener();
}

function addModalListener() {
  refs.btnClose.addEventListener("click", closeModal);
  refs.lightboxOgverlay.addEventListener("click", closeModal);
}

function removeModalListener() {
  refs.btnClose.removeEventListener("click", closeModal);
  refs.lightboxOgverlay.removeEventListener("click", closeModal);
}

// Загрузка картинки
function uploadPictures(src, alt) {
  refs.lightboxImage.src = src;
  refs.lightboxImage.alt = alt;
}

// Закриття модалки
function closeModal(e) {
  const triggers = [
    "Escape",
    "ArrowRight",
    "ArrowLeft",
    "lightbox__button",
    "lightbox__overlay",
  ];

  if (!triggers.includes(e.key || e.target.className)) return;

  if (e.key === "ArrowRight" || e.key === "ArrowLeft") return leafOver(e.key);

  refs.lightbox.classList.remove("is-open");

  removeModalListener();

  uploadPictures("", "");
}