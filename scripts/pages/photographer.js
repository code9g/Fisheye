import { mediaCardTemplate } from "../templates/mediaCard.js";
import { photographerAboutTemplate } from "../templates/photographerAbout.js";
import { getData } from "../utils/data.js";
import { showModal } from "../utils/modal.js";

async function displayAbout(photographer) {
  const section = document.querySelector(".photograph-header");
  const about = photographerAboutTemplate(photographer);
  section.innerHTML = "";
  for (const item of about) {
    section.appendChild(item);
  }
}

async function displayMedia(media) {
  const cards = document.querySelector(".photograph-media");
  cards.innerHTML = "";
  for (const item of media) {
    cards.appendChild(await mediaCardTemplate(item));
  }
  cards.querySelectorAll(".link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(e.target.closest(".card"));
    });
  });
}

async function displayResume(photographer) {
  // ...
  console.log(photographer);
}

async function displayData(photographer, media) {
  await displayAbout(photographer);
  await displayMedia(media);
  await displayResume(photographer);
}

function sortByLikes(item1, item2) {
  return item1.likes - item2.likes;
}

function sortByDate(item1, item2) {
  if (item1.date > item2.date) {
    return +1;
  } else if (item1.date < item2.date) {
    return -1;
  }
  return 0;
}

function sortByTitle(item1, item2) {
  if (item1.title > item2.title) {
    return +1;
  } else if (item1.title < item2.title) {
    return -1;
  }
  return 0;
}

async function init() {
  const params = new URL(window.location).searchParams;
  const id = parseInt(params.get("id"));

  const data = await getData();

  const photographer = data.photographers.find(
    (photographer) => photographer.id === id
  );
  const media = new Array();
  photographer.likes = 0;
  for (const item of data.media) {
    if (item.photographerId === id) {
      media.push(item);
      photographer.likes += item.likes ?? 0;
    }
  }

  const sortSelect = document.querySelector("#sort");

  function sort() {
    media.sort([sortByLikes, sortByDate, sortByTitle][sortSelect.value]);
  }

  sortSelect.addEventListener("change", () => {
    sort();
    displayMedia(media);
  });
  sort();

  displayData(photographer, media);
}

init();
