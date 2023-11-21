import { getPhotographers } from "../utils/data.js";
import { photographerCardTemplate } from "./../templates/photographerCard.js";

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographers");

  for (const photographer of photographers) {
    photographersSection.appendChild(photographerCardTemplate(photographer));
  }
}

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();
  displayData(photographers);
}

init();
