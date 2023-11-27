import { PATH_PHOTOGRAPHERS } from "../utils/consts.js";

// Retourne un élément IMG contenant le portrait d'un photographe
export const photographerPortraitTemplate = ({ name, portrait }) => {
  const img = document.createElement("img");
  img.className = "portrait";
  img.src = `${PATH_PHOTOGRAPHERS}/thumb/${portrait}`;
  img.alt = `Portrait du photographe ${name}`;
  return img;
};
