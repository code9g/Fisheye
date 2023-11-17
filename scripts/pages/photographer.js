import { PATH_PHOTOGRAPHERS } from "../utils/consts.js";
import { getPhotographer, getMedias } from "../utils/data.js";
import { mediaCardTemplate } from "../templates/mediaCard.js";
import { showLightbox } from "../utils/lightbox.js";

const totalLikes = document.querySelector("#totalLikes");
const price = document.querySelector("#price");
const cards = document.querySelector(".photograph-media");

async function displayAbout(photographer) {
  const section = document.querySelector(".photograph-header");
  section.querySelector(".name").innerText = photographer.name;
  section.querySelector(
    ".location"
  ).innerText = `${photographer.city}, ${photographer.country}`;
  section.querySelector(".tagline").innerText = photographer.tagline;
  const portrait = section.querySelector(".portrait");
  portrait.src = `${PATH_PHOTOGRAPHERS}/thumb/${photographer.portrait}`;
  portrait.alt = `Photo du photographe ${name}`;
  document.querySelector("#photographer-name").innerHTML = photographer.name;
}

async function displayMedia(photographer, medias) {
  cards.innerHTML = "";
  for (let i = 0; i < medias.length; i++) {
    const media = medias[i];

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
      showLightbox(medias, i);
    });

    cards.appendChild(card);
  }
}

async function displayResume(photographer) {
  totalLikes.innerText = photographer.likes;
  price.innerText = photographer.price;
}

async function displayData(photographer, medias) {
  await displayAbout(photographer);
  await displayMedia(photographer, medias);
  await displayResume(photographer);
}

function sortMedia(medias, column) {
  switch (column) {
    case "likes":
      medias.sort((item1, item2) => {
        return item1.likes - item2.likes;
      });
      break;
    case "date":
    case "title":
    default:
      medias.sort((item1, item2) => {
        if (item1[column] > item2[column]) {
          return +1;
        } else if (item1[column] < item2[column]) {
          return -1;
        }
        return 0;
      });
  }
}

async function init() {
  // Récupération des paramètres de l'URL
  const params = new URL(window.location).searchParams;
  const id = parseInt(params.get("id"));

  const photographer = await getPhotographer(id);
  if (!photographer) {
    document.querySelector(".photograph-header").innerHTML =
      "<h2>Impossible de trouver des informations sur ce photographe !</h2>";
    return false;
  }
  const medias = await getMedias(id);
  photographer.likes = 0;
  medias.map((item) => {
    photographer.likes += item.likes ?? 0;
  });

  const sortSelect = document.querySelector("#sort");

  sortSelect.addEventListener("change", () => {
    sortMedia(medias, sortSelect.value);
    displayMedia(photographer, medias);
  });
  sortMedia(medias, sortSelect.value);

  await displayData(photographer, medias);
}

init();
