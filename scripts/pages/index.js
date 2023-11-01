import { photographerTemplate } from "./../templates/photographer.js";

async function getPhotographers() {
  return (await fetch("data/photographers.json").then((res) => res.json()))
    .photographers;
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  displayData(await getPhotographers());
}

init();
