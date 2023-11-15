import { PATH_PHOTOGRAPHERS } from "../utils/consts.js";
import { getData } from "../utils/data.js";
import { mediaCardTemplate } from "../templates/mediaCard.js";
import { showLightbox } from "../utils/lightbox.js";

let photographer;
const totalLikes = document.querySelector("#totalLikes");
const price = document.querySelector("#price");

async function displayAbout(photographer) {
  const section = document.querySelector(".photograph-header");
  section.querySelector(".name").innerText = photographer.name;
  section.querySelector(
    ".location"
  ).innerText = `${photographer.city}, ${photographer.country}`;
  section.querySelector(".tagline").innerText = photographer.tagline;
  const portrait = section.querySelector(".portrait");
  portrait.src = `${PATH_PHOTOGRAPHERS}/thumb/${photographer.portrait}`;
  portrait.alt = `Photo du photographe ${name}`;
  document.querySelector("#photographer-name").innerHTML = photographer.name;
}

async function displayMedia(photographer) {
  const cards = document.querySelector(".photograph-media");
  cards.innerHTML = "";
  for (let i = 0; i < photographer.media.length; i++) {
    const media = photographer.media[i];

    const card = await mediaCardTemplate(media);
    card.dataset.key = i;

    card.querySelector(".btn-like").addEventListener("click", (e) => {
      e.preventDefault();

      const heart = e.currentTarget.querySelector(".fa-heart");
      if (media.liked) {
        media.liked = false;
        media.likes--;
        photographer.likes--;
        heart.classList.remove("fa-solid");
        heart.classList.add("fa-regular");
      } else {
        media.liked = true;
        media.likes++;
        photographer.likes++;
        heart.classList.remove("fa-regular");
        heart.classList.add("fa-solid");
      }
      totalLikes.innerText = photographer.likes;
      card.querySelector(".likes-info").innerText = media.likes;
    });

    card.querySelector(".link").addEventListener("click", (e) => {
      e.preventDefault();
      showLightbox(photographer.media, i);
    });

    cards.appendChild(card);
  }
}

async function displayResume(photographer) {
  totalLikes.innerText = photographer.likes;
  price.innerText = photographer.price;
}

async function displayData(photographer) {
  await displayAbout(photographer);
  await displayMedia(photographer);
  await displayResume(photographer);
}

function sortMedia(column) {
  switch (column) {
    case "likes":
      photographer.media.sort((item1, item2) => {
        return item1.likes - item2.likes;
      });
      break;
    case "date":
    case "title":
    default:
      photographer.media.sort((item1, item2) => {
        if (item1[column] > item2[column]) {
          return +1;
        } else if (item1[column] < item2[column]) {
          return -1;
        }
        return 0;
      });
  }
}

// function nextLightbox() {
//   updateLightbox(current + 1);
// }

// function previousLightbox() {
//   updateLightbox(current - 1);
// }

// async function updateLightbox(index) {
//   if (index < 0) {
//     index = 0;
//   } else if (index >= photographer.media.length) {
//     index = photographer.media.length - 1;
//   }
//   if (current !== index) {
//     const item = photographer.media[(current = index)];

//     const { elem: media } = await getMediaFactory(item, false);

//     const caption = document.createElement("figcaption");
//     caption.tabIndex = 3;
//     caption.className = "caption";
//     caption.innerHTML = item.title;

//     lbMedia.innerHTML = "";
//     lbMedia.appendChild(media);
//     lbMedia.appendChild(caption);

//     lbPrevious.disabled = index <= 0;
//     lbNext.disabled = index >= photographer.media.length - 1;
//   }
// }

async function init() {
  const params = new URL(window.location).searchParams;
  const id = parseInt(params.get("id"));

  const data = await getData();

  photographer = data.photographers.find((item) => item.id === id);
  photographer.media = new Array();
  photographer.likes = 0;
  for (const item of data.media) {
    if (item.photographerId === id) {
      photographer.media.push(item);
      photographer.likes += item.likes ?? 0;
    }
  }

  const sortSelect = document.querySelector("#sort");

  sortSelect.addEventListener("change", () => {
    sortMedia(sortSelect.value);
    displayMedia(photographer);
  });
  sortMedia(sortSelect.value);

  await displayData(photographer, photographer.media);

  // lbPrevious.addEventListener("click", (e) => {
  //   e.preventDefault();
  //   previousLightbox();
  // });

  // lbNext.addEventListener("click", (e) => {
  //   e.preventDefault();
  //   nextLightbox();
  // });

  // document.addEventListener("keydown", (e) => {
  //   switch (e.key) {
  //     case "ArrowLeft":
  //       if (lightbox.open) {
  //         previousLightbox();
  //       }
  //       break;
  //     case "ArrowRight":
  //       if (lightbox.open) {
  //         nextLightbox();
  //       }
  //       break;
  //   }
  // });
}

init();
