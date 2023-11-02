import { mediaCardTemplate } from "../templates/mediaCard.js";
import { photographerAboutTemplate } from "../templates/photographerAbout.js";
import { getData } from "../utils/data.js";

async function displayData(photographer, media) {
  const about = photographerAboutTemplate(photographer);
  const section = document.querySelector(".photograph-header");
  section.innerHTML = "";
  for (const item of about) {
    section.appendChild(item);
  }
  const cards = document.querySelector(".photograph-media");
  for (const item of media) {
    cards.appendChild(await mediaCardTemplate(item));
  }
  console.log(photographer, media);
}

async function init() {
  const params = new URL(window.location).searchParams;
  const id = parseInt(params.get("id"));

  const data = await getData();

  const photographer = data.photographers.find(
    (photographer) => photographer.id === id
  );
  const media = data.media.filter((item) => item.photographerId === id);
  displayData(photographer, media);
}

init();
