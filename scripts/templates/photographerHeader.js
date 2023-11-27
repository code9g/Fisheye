import { photographerPortraitTemplate } from "./photographerPortrait.js";

// Retourne une section contenant les informations d'un photographe
// (Nom, ville, pays, tagline, bouton "contact" et portrait )
export const photographerHeaderTemplate = (photographer) => {
  const about = document.createElement("div");
  about.className = "about";

  const name = document.createElement("h2");
  name.className = "name";
  name.textContent = photographer.name;

  const location = document.createElement("p");
  location.className = "location";
  location.textContent = `${photographer.city}, ${photographer.country}`;

  const tagline = document.createElement("p");
  tagline.className = "tagline";
  tagline.textContent = photographer.tagline;

  about.appendChild(name);
  about.appendChild(location);
  about.appendChild(tagline);

  const button = document.createElement("button");
  button.type = "button";
  button.className = "btn-primary";
  button.dataset.toggle = "dialog";
  button.dataset.target = "#contact";
  button.textContent = "Contactez-moi";

  const portrait = photographerPortraitTemplate(photographer);

  const header = document.createElement("section");
  header.className = "photograph-header";
  header.appendChild(about);
  header.appendChild(button);
  header.appendChild(portrait);
  return header;
};
