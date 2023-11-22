import { getPhotographers } from "../utils/data.js";
import { photographerCardTemplate } from "./../templates/photographerCard.js";

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographers");

  for (const photographer of photographers) {
    photographersSection.appendChild(photographerCardTemplate(photographer));
  }
}

async function init() {
  // Récupération de la liste des photographes
  const photographers = await getPhotographers();
  // Affichage de la liste
  displayData(photographers);
}

init();
