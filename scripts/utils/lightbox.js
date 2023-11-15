import { getMediaFactory } from "../templates/mediaCard.js";

const lightbox = document.querySelector("#lightbox");

const lbMedia = lightbox.querySelector(".lightbox-figure");
const lbPrevious = lightbox.querySelector(".btn-previous");
const lbNext = lightbox.querySelector(".btn-next");

let list = null;
let current = -1;

export function showLightbox(medias, index) {
  list = medias;
  current = -1;
  if (index < 0 || index >= medias.length) {
    console.error("Valeur d'index non valide !");
    return false;
  }
  updateLightbox(index);
  return lightbox.showModal();
}

export function closeLightbox() {
  lightbox.close();
}

export function previousLightbox() {
  if (current > 0) {
    updateLightbox(current - 1);
  }
}

export function nextLightbox() {
  if (current < list.length - 1) {
    updateLightbox(current + 1);
  }
}

async function updateLightbox(index) {
  if (index < 0) {
    index = 0;
  } else if (index >= list.length) {
    index = list.length - 1;
  }
  if (current !== index) {
    const item = list[(current = index)];

    const { elem: media } = await getMediaFactory(item, false);

    const caption = document.createElement("figcaption");
    caption.tabIndex = 3;
    caption.className = "caption";
    caption.innerHTML = item.title;

    lbMedia.innerHTML = "";
    lbMedia.appendChild(media);
    lbMedia.appendChild(caption);

    lbPrevious.disabled = index <= 0;
    lbNext.disabled = index >= list.length - 1;
  }
}

lbPrevious.addEventListener("click", (e) => {
  e.preventDefault();
  previousLightbox();
});

lbNext.addEventListener("click", (e) => {
  e.preventDefault();
  nextLightbox();
});

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      if (lightbox.open) {
        previousLightbox();
      }
      break;
    case "ArrowRight":
      if (lightbox.open) {
        nextLightbox();
      }
      break;
  }
});
