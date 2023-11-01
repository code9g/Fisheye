import { photographerTemplate } from "./../templates/photographer.js";

async function getPhotographers() {
  return (await fetch("data/photographers.json").then((res) => res.json()))
    .photographers;
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  for (const photographer of photographers) {
    photographersSection.appendChild(photographerTemplate(photographer));
  }
}

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();
  displayData(photographers);
}

init();
