import { getPhotographers } from "../utils/data.js";
import { photographerCardTemplate } from "./../templates/photographerCard.js";

const displayData = (photographers) => {
  const photographersSection = document.querySelector(".photographers");

  for (const photographer of photographers) {
    photographersSection.appendChild(photographerCardTemplate(photographer));
  }
};

const init = async () => {
  // Récupération de la liste des photographes
  const photographers = await getPhotographers();
  // Affichage de la liste
  displayData(photographers);
};

init();
