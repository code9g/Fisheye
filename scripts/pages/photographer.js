import { mediaCardTemplate } from "../templates/mediaCard.js";
import { photographerAboutTemplate } from "../templates/photographerAbout.js";
import { PATH_MEDIA } from "../utils/consts.js";
import { getData, getMedia } from "../utils/data.js";
import { showModal } from "../utils/modal.js";

async function displayAbout(photographer) {
  const section = document.querySelector(".photograph-header");
  const about = photographerAboutTemplate(photographer);
  section.innerHTML = "";
  for (const item of about) {
    section.appendChild(item);
  }
}

async function displayMedia(media) {
  const lightbox = document.querySelector("#lightbox");
  const cards = document.querySelector(".photograph-media");
  cards.innerHTML = "";
  for (let i = 0; i < media.length; i++) {
    const card = await mediaCardTemplate(media[i]);
    //card.dataset.key = i;
    card.querySelector(".link").addEventListener("click", (e) => {
      e.preventDefault();
      updateLightbox(i);
      lightbox.showModal();
    });
    cards.appendChild(card);
  }
}

async function displayResume(photographer) {
  // ...
  console.log(photographer);
}

async function displayData(photographer, media) {
  await displayAbout(photographer);
  await displayMedia(media);
  await displayResume(photographer);
}

async function init() {
  const params = new URL(window.location).searchParams;
  const id = parseInt(params.get("id"));

  const data = await getData();

  photographer = data.photographers.find((item) => item.id === id);
  photographer.media = new Array();
  photographer.likes = 0;
  for (const item of data.media) {
    if (item.photographerId === id) {
      photographer.media.push(item);
      photographer.likes += item.likes ?? 0;
    }
  }

  const sortSelect = document.querySelector("#sort");

  sortSelect.addEventListener("change", async () => {
    photographer.media = await getMedia(photographer, 0, -1, sortSelect.value);
    displayMedia(photographer.media);
  });
  photographer.media = await getMedia(photographer, 0, -1, sortSelect.value);

  displayData(photographer, photographer.media);

  lbPrevious.addEventListener("click", (e) => {
    e.preventDefault();
    updateLightbox(current - 1);
  });
  lbNext.addEventListener("click", (e) => {
    e.preventDefault();
    updateLightbox(current + 1);
  });
}

const lightbox = document.querySelector("#lightbox");
const lbMedia = lightbox.querySelector(".lightbox-figure");
const lbPrevious = lightbox.querySelector(".btn-previous");
const lbNext = lightbox.querySelector(".btn-next");
let current = -1;

function updateLightbox(index) {
  if (index < 0) {
    index = 0;
  } else if (index >= photographer.media.length) {
    index = photographer.media.length - 1;
  }
  current = index;
  const media = photographer.media[index] ?? null;
  if (media) {
    let content = "";
    if (media.image) {
      content = `<img src="${PATH_MEDIA}/${photographer.id}/${media.image}" alt="${media.title}">`;
    } else if (media.video) {
      content = `<video src="${PATH_MEDIA}/${photographer.id}/${media.video}" title="${media.title}" controls></video>`;
    } else {
      // ...
    }
    lbMedia.innerHTML = `${content}<figcaption>${media.title}</figcaption>`;
    if (index > 0) {
      lbPrevious.classList.remove("hidden");
    } else {
      lbPrevious.classList.add("hidden");
    }
    if (index < photographer.media.length - 1) {
      lbNext.classList.remove("hidden");
    } else {
      lbNext.classList.add("hidden");
    }
    if (!lightbox.open) {
      lightbox.showModal();
    }
  }
}

let photographer;

init();
