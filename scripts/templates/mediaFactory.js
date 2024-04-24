import { PATH_ASSETS, PATH_MEDIA } from "../utils/consts.js";

// Retourne soit une IMG soit une VIDEO, suivant le pattern
// Factory
export const mediaFactoryTemplate = (media, thumbnail = false) => {
  let content;
  let src;
  if (media.image) {
    content = document.createElement("img");
    content.src = `${PATH_MEDIA}/${media.photographerId}${
      thumbnail ? "/thumb" : ""
    }/${media.image}`;
    src = `${PATH_MEDIA}/${media.photographerId}/${media.image}`;
    content.alt = media.title;
    content.className = "picture";
  } else if (media.video) {
    content = document.createElement("video");
    content.src = `${PATH_MEDIA}/${media.photographerId}/${media.video}`;
    src = `${PATH_MEDIA}/${media.photographerId}/${media.video}`;
    if (!thumbnail) {
      content.controls = true;
      content.muted = true;
      content.autoplay = true;
    }
    content.className = "video";
  } else {
    content = document.createElement("img");
    content.src = `${PATH_ASSETS}/images/no-content.jpg`;
    content.alt = media.title;
    src = `${PATH_ASSETS}/images/no-content.jpg`;
    content.className = "picture";
  }
  content.classList.add("media");

  return { src, content };
};
