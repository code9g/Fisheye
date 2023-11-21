import { PATH_PHOTOGRAPHERS } from "../utils/consts.js";

export function photographerPortraitTemplate({ name, portrait }) {
  const img = document.createElement("img");
  img.className = "portrait";
  img.src = `${PATH_PHOTOGRAPHERS}/thumb/${portrait}`;
  img.alt = `Portrait du photographe ${name}`;
  return img;
}
