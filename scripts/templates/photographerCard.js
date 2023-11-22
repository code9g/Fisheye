import { photographerPortraitTemplate } from "./photographerPortrait.js";

// Fournit un article contenant les informations d'un photographe
// Portrait, nom, ville, pays, prix
export function photographerCardTemplate({
  id,
  name,
  portrait,
  tagline,
  city,
  country,
  price,
}) {
  const article = document.createElement("article");
  article.className = "card";

  const link = document.createElement("a");
  link.className = "link";
  link.href = `photographer.html?id=${id}`;

  const img = photographerPortraitTemplate({ name, portrait });

  const h2 = document.createElement("h2");
  h2.className = "name";
  h2.innerText = name;

  link.appendChild(img);
  link.appendChild(h2);

  const p1 = document.createElement("p");
  p1.className = "location";
  p1.innerText = `${city}, ${country}`;

  const p2 = document.createElement("p");
  p2.className = "tagline";
  p2.innerText = tagline;

  const p3 = document.createElement("p");
  p3.className = "price";
  p3.innerText = `${price} € / jour`;

  article.appendChild(link);
  article.appendChild(p1);
  article.appendChild(p2);
  article.appendChild(p3);

  return article;
}
