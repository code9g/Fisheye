import { QS_PHOTOGRAPHERS } from "../utils/consts.js";
import { getData } from "../utils/data.js";
import { photographerCardTemplate } from "./../templates/photographerCard.js";

async function displayData(photographers) {
  const photographersSection = document.querySelector(QS_PHOTOGRAPHERS);

  for (const photographer of photographers) {
    photographersSection.appendChild(photographerCardTemplate(photographer));
  }
}

async function init() {
  // Récupère les datas des photographes
  const photographers = (await getData()).photographers;
  displayData(photographers);
}

init();
