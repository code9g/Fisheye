import { PATH_MEDIA } from "../utils/consts.js";
import { getData } from "../utils/data.js";
import { showModal } from "../utils/modal.js";
import { photographerAboutTemplate } from "../templates/photographerAbout.js";
import { mediaCardTemplate } from "../templates/mediaCard.js";

async function displayAbout(photographer) {
  const section = document.querySelector(".photograph-header");
  const about = photographerAboutTemplate(photographer);
  section.innerHTML = "";
  for (const item of about) {
    section.appendChild(item);
  }
  document.querySelector("#photographer-name").innerHTML = photographer.name;
}

async function displayMedia(photographer) {
  const cards = document.querySelector(".photograph-media");
  cards.innerHTML = "";
  for (let i = 0; i < photographer.media.length; i++) {
    const media = photographer.media[i];

    const card = await mediaCardTemplate(media);
    card.dataset.key = i;

    card.querySelector(".btn-like").addEventListener("click", (e) => {
      e.preventDefault();
      const heart = e.currentTarget.querySelector(".fa-heart");
      if (media.liked) {
        media.liked = false;
        media.likes--;
        photographer.likes--;
        heart.classList.remove("fa-solid");
        heart.classList.add("fa-regular");
      } else {
        media.liked = true;
        media.likes++;
        photographer.likes++;
        heart.classList.remove("fa-regular");
        heart.classList.add("fa-solid");
      }
      totalLikes.innerText = photographer.likes;
      card.querySelector(".likes-info").innerText = media.likes;
    });

    card.querySelector(".link").addEventListener("click", (e) => {
      e.preventDefault();
      updateLightbox(i);
      showModal(lightbox);
    });
    cards.appendChild(card);
  }
}

async function displayResume(photographer) {
  totalLikes.innerText = photographer.likes;
  price.innerText = photographer.price;
}

async function displayData(photographer) {
  await displayAbout(photographer);
  await displayMedia(photographer);
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

  sortSelect.addEventListener("change", () => {
    sort(sortSelect.value);
    displayMedia(photographer);
  });
  sort(sortSelect.value);

  displayData(photographer, photographer.media);

  lbPrevious.addEventListener("click", (e) => {
    e.preventDefault();
    previousLightbox();
  });

  lbNext.addEventListener("click", (e) => {
    e.preventDefault();
    nextLightbox();
  });

  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowLeft":
        if (lightbox.open) {
          previousLightbox();
        }
        break;
      case "ArrowRight":
        if (lightbox.open) {
          nextLightbox();
        }
        break;
    }
  });
}

const totalLikes = document.querySelector("#totalLikes");
const price = document.querySelector("#price");

const lightbox = document.querySelector("#lightbox");
const lbMedia = lightbox.querySelector(".lightbox-figure");
const lbPrevious = lightbox.querySelector(".btn-previous");
const lbNext = lightbox.querySelector(".btn-next");
let current = -1;

function sort(column) {
  switch (column) {
    case "likes":
      photographer.media.sort((item1, item2) => {
        return item1.likes - item2.likes;
      });
      break;
    default:
      photographer.media.sort((item1, item2) => {
        if (item1[column] > item2[column]) {
          return +1;
        } else if (item1[column] < item2[column]) {
          return -1;
        }
        return 0;
      });
  }
}

function nextLightbox() {
  updateLightbox(current + 1);
}

function previousLightbox() {
  updateLightbox(current - 1);
}

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
      content = `<img class="media" src="${PATH_MEDIA}/${photographer.id}/${media.image}" alt="${media.title}">`;
    } else if (media.video) {
      content = `<video class="media" src="${PATH_MEDIA}/${photographer.id}/${media.video}" title="${media.title}" controls></video>`;
    } else {
      // ...
    }
    lbMedia.innerHTML = `${content}<figcaption tabindex="3" class="caption">${media.title}</figcaption>`;
    if (index > 0) {
      lbPrevious.disabled = false;
    } else {
      lbPrevious.disabled = true;
    }
    if (index < photographer.media.length - 1) {
      lbNext.classList.remove("hidden");
    } else {
      lbNext.classList.add("hidden");
    }
  }
}

let photographer;

init();
