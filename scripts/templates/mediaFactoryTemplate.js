import { PATH_ASSETS, PATH_MEDIA } from "../utils/consts.js";

export function mediaFactoryTemplate(media, thumbnail = false) {
  let content;
  let src;
  if (media.image) {
    content = document.createElement("img");
    content.src = `${PATH_MEDIA}/${media.photographerId}${
      thumbnail ? "/thumb" : ""
    }/${media.image}`;
    src = `${PATH_MEDIA}/${media.photographerId}/${media.image}`;
    content.alt = media.title;
    content.className = "media picture";
  } else if (media.video) {
    content = document.createElement("video");
    content.src = `${PATH_MEDIA}/${media.photographerId}/${media.video}`;
    src = `${PATH_MEDIA}/${media.photographerId}/${media.video}`;
    if (!thumbnail) {
      content.setAttribute("controls", "");
    }
    content.className = "media video";
  } else {
    content = document.createElement("img");
    content.src = `${PATH_ASSETS}/images/no-content.jpg`;
    content.alt = media.title;
    src = `${PATH_ASSETS}/images/no-content.jpg`;
    content.className = "media picture";
  }

  return { src, content };
}
