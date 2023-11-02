import { PATH_PHOTOGRAPHERS } from "../utils/consts.js";

export function photographerAboutTemplate({
  name,
  portrait,
  tagline,
  city,
  country,
}) {
  const about = document.createElement("div");
  about.className = "about";

  const h2 = document.createElement("h2");
  h2.className = "name";
  h2.innerText = name;
  const p1 = document.createElement("p");
  p1.className = "location";
  p1.innerText = `${city}, ${country}`;
  const p2 = document.createElement("p");
  p2.className = "tagline";
  p2.innerText = tagline;

  about.appendChild(h2);
  about.appendChild(p1);
  about.appendChild(p2);

  const contact = document.createElement("button");
  contact.className = "btn btn-primary";
  contact.innerText = "Contactez-moi";

  const img = document.createElement("img");
  img.className = "portrait";
  img.src = `${PATH_PHOTOGRAPHERS}/${portrait}`;
  img.alt = `Photo du photographe ${name}`;

  return [about, contact, img];
}
