import {
  getPhotographer,
  getMedias,
  getMedia,
  toggleLikesOnMedia,
} from "../utils/data.js";
import { photographerHeaderTemplate } from "../templates/photographerHeader.js";
import { mediaFactoryTemplate } from "../templates/mediaFactoryTemplate.js";
import { mediaCardTemplate } from "../templates/mediaCard.js";
import { initModal } from "../utils/modal.js";
import { initLightbox, showLightbox } from "../utils/lightbox.js";

const sortSelect = document.querySelector("#sort");
const totalLikes = document.querySelector("#totalLikes");
const price = document.querySelector("#price");
const cards = document.querySelector(".photograph-media");

async function displayHeader(photographer) {
  document
    .querySelector(".photograph-header")
    .replaceWith(photographerHeaderTemplate(photographer));
}

async function updateMedia(media) {
  const card = document.querySelector(`article.card[data-id="${media.id}"]`);
  if (card) {
    const heart = card.querySelector(".fa-heart");
    if (media.liked) {
      heart.classList.remove("fa-regular");
      heart.classList.add("fa-solid");
    } else {
      heart.classList.remove("fa-solid");
      heart.classList.add("fa-regular");
    }
    card.querySelector(".likes-info").textContent = media.likes;
  }
}

async function updateResume(photographer) {
  totalLikes.textContent = photographer.likes;
}

async function displayMedia(photographer, medias) {
  cards.innerHTML = "";

  for (let i = 0; i < medias.length; i++) {
    const media = medias[i];

    const card = await mediaCardTemplate(media);
    card.dataset.key = i;

    card.querySelector(".link").addEventListener("click", (e) => {
      e.preventDefault();
      showLightbox(medias, i);
    });

    cards.appendChild(card);
  }

  document.querySelectorAll("article.card").forEach((element) => {
    element.addEventListener("click", async (e) => {
      e.preventDefault();
      const card = e.currentTarget.closest(".card");
      const mediaId = parseInt(card.dataset.id);
      if (await toggleLikesOnMedia(mediaId)) {
        const media = await getMedia(mediaId);
        updateMedia(media);
        const photographer = await getPhotographer(media.photographerId);
        updateResume(photographer);
      } else {
        console.error("Impossible de basculer le like !");
      }
    });
  });
}

async function displayResume(photographer) {
  totalLikes.innerText = photographer.likes;
  price.innerText = photographer.price;
}

async function updateMedias(photographer) {
  const medias = await getMedias(photographer.id, sortSelect.value);
  await displayMedia(photographer, medias);
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

  await displayHeader(photographer);
  await updateMedias(photographer);
  await displayResume(photographer);

  document.querySelector("#photographer-name").textContent = photographer.name;

  sortSelect.addEventListener("change", () => {
    updateMedias(photographer);
  });

  initModal();

  initLightbox(async (media) => {
    return {
      caption: media.title,
      content: mediaFactoryTemplate(media, false).content,
    };
  }, "#lightbox");
}

init();
