import {
  getPhotographer,
  getMedias,
  getMedia,
  toggleLikesOnMedia,
} from "../utils/data.js";
import { photographerHeaderTemplate } from "../templates/photographerHeader.js";
import { mediaFactoryTemplate } from "../templates/mediaFactory.js";
import { mediaCardTemplate } from "../templates/mediaCard.js";
import { initModal } from "../utils/modal.js";
import { initLightbox, showLightbox } from "../utils/lightbox.js";

// Eléments du DOM qui sont régulièrement utilisés
const sortSelect = document.querySelector("#sort");
const totalLikes = document.querySelector("#totalLikes");
const price = document.querySelector("#price");
const cards = document.querySelector(".photograph-media");

// Permet d'afficher les informations sur un photographe
//(incluant le bouton contact)
async function displayHeader(photographer) {
  // On cible l'élément ayant la classe .photograph-header pour le remplacer
  document
    .querySelector(".photograph-header")
    .replaceWith(photographerHeaderTemplate(photographer));
}

// Permet d'actualiser les informations d'un média en se basant sur son id
// (ici c'est l'état du "like" et le nombre de likes)
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

// Permet d'actualiser le nombre de likes total d'un photographe
async function updateResume(photographer) {
  totalLikes.textContent = photographer.likes;
}

// Gestion du click sur un like
async function toggleLike(e) {
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
}

// Affiche la liste des médias et ajoute le ou les gestionnaires d'événement(s) adéquat(s)
async function displayMedias(medias) {
  // Gestionnaire d'événement pour lancer la modale
  // (on utilise la closure)
  function launchLightbox(e) {
    e.preventDefault();
    const key = e.currentTarget.closest(".card").dataset.key;
    showLightbox(medias, key);
  }

  cards.innerHTML = "";
  for (let i = 0; i < medias.length; i++) {
    const media = medias[i];

    const card = mediaCardTemplate(media);
    card.dataset.key = i;

    card.querySelector(".link").addEventListener("click", launchLightbox);
    card.querySelector(".btn-like").addEventListener("click", toggleLike);

    cards.appendChild(card);
  }
}

// Affichage des likes et du prix (en base de page) d'un photographe
async function displayResume(photographer) {
  totalLikes.innerText = photographer.likes;
  price.innerText = photographer.price;
}

// Mise à jour des informations sur les médias d'un photographe
async function updateMedias(photographer) {
  const medias = await getMedias(photographer.id, sortSelect.value);
  await displayMedias(photographer, medias);
}

// Initialisation
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

  const contact = document.querySelector("#contact");
  const form = contact.querySelector("form");
  const elements = form.querySelectorAll("input[required], textarea[required]");

  contact.addEventListener("open", () => {
    form.reset();
    elements.forEach((element) => {
      element.ariaInvalid = !element.validity.valid;
    });
  });

  // Initialisation des attributs aria-invalid
  elements.forEach((element) => {
    element.addEventListener("input", (e) => {
      e.currentTarget.ariaInvalid = !e.currentTarget.validity.valid;
    });
  });

  form.addEventListener("submit", (e) => {
    if (form.checkValidity()) {
      console.log(
        "Photographe: ",
        photographer.name,
        "(" + photographer.id + ")"
      );
      console.log("Prénom: ", form.firstname.value);
      console.log("Nom: ", form.lastname.value);
      console.log("Mél: ", form.email.value);
      console.log("Message: ", form.message.value);
    } else {
      e.preventDefault();
      form.reportValidity();
    }
  });

  // Gestion du changement du select
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
