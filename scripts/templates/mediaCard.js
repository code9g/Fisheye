import { mediaFactoryTemplate } from "./mediaFactory.js";

// Retourne un article contant les informations sur un média
// (img ou video, titre, likes)
export function mediaCardTemplate(media) {
  const { title, likes } = media;
  const article = document.createElement("article");
  article.className = "card";
  article.dataset.id = media.id;

  const { src, content } = mediaFactoryTemplate(media, true);
  const link = document.createElement("a");
  link.className = "link";
  link.ariaLabel = media.title;
  link.href = src;
  link.appendChild(content);

  article.appendChild(link);

  const div = document.createElement("div");
  div.className = "card-body";

  const h3 = document.createElement("h3");
  h3.className = "title";
  h3.innerText = title;

  const likesDiv = document.createElement("div");
  likesDiv.className = "card-likes";

  const span = document.createElement("span");
  span.className = "likes-info";
  span.innerText = `${likes}`;
  likesDiv.appendChild(span);

  const btn = document.createElement("button");
  btn.className = "btn-like heart";

  btn.type = "button";
  btn.ariaLabel = "Ajouter un like";
  btn.innerHTML = `<i class="fa-${
    media.liked ? "solid" : "regular"
  } fa-heart"></i>`;

  likesDiv.appendChild(btn);

  div.appendChild(h3);
  div.appendChild(likesDiv);
  article.appendChild(div);

  return article;
}
