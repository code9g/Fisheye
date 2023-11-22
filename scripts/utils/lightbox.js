const DEFAULT_TARGET_LIGHTBOX = "#lightbox";
const DEFAULT_TARGET_MEDIA = ".figure";
const DEFAULT_TARGET_PREVIOUS = ".previous";
const DEFAULT_TARGET_NEXT = ".next";

let lightbox = null;

let callback = null;

let lbMedia = null;
let lbPrevious = null;
let lbNext = null;

let list = null;
let current = -1;

// Affiche la boîte de dialogue de la lightbox
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

// Permet de fermer la boîte de dialogue de la lightbox
export function closeLightbox() {
  lightbox.close();
}

// Permet de passer au média précédent de la lightbox
export function previousLightbox() {
  if (current > 0) {
    updateLightbox(current - 1);
  }
}

// Permet de passer au média suivant de la lightbox
export function nextLightbox() {
  if (current < list.length - 1) {
    updateLightbox(current + 1);
  }
}

// Met à jour l'affichage de la lightbox
async function updateLightbox(index) {
  if (index < 0) {
    index = 0;
  } else if (index >= list.length) {
    index = list.length - 1;
  }
  if (current !== index) {
    const item = list[(current = index)];

    const { caption, content } = await callback(item);

    const captionElement = document.createElement("figcaption");
    captionElement.tabIndex = 3;
    captionElement.className = "caption";
    captionElement.innerHTML = caption;

    lbMedia.innerHTML = "";

    lbMedia.appendChild(content);
    lbMedia.appendChild(captionElement);

    lbPrevious.disabled = index <= 0;
    lbNext.disabled = index >= list.length - 1;
  }
}

// Initialise les variables de la lightbox, ainsi que le gestionnaire
// d'événement (précédent, suivant, navigation)
export function initLightbox(
  figureCallback = updateLightbox,
  targetLightbox = DEFAULT_TARGET_LIGHTBOX,
  targetMedia = DEFAULT_TARGET_MEDIA,
  targetPrevious = DEFAULT_TARGET_PREVIOUS,
  targetNext = DEFAULT_TARGET_NEXT
) {
  callback = figureCallback;
  lightbox = document.querySelector(targetLightbox);

  lbMedia = lightbox.querySelector(targetMedia);
  lbPrevious = lightbox.querySelector(targetPrevious);
  lbNext = lightbox.querySelector(targetNext);

  list = null;
  current = -1;

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
}
