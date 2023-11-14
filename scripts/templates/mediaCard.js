import { PATH_ASSETS, PATH_MEDIA } from "../utils/consts.js";

async function mediaElement(media) {
  let elem;
  let href;
  if (media.image) {
    elem = document.createElement("img");
    elem.src = `${PATH_MEDIA}/${media.photographerId}/thumb/${media.image}`;
    href = `${PATH_MEDIA}/${media.photographerId}/${media.image}`;
    elem.alt = media.title;
    elem.className = "media picture";
  } else if (media.video) {
    elem = document.createElement("video");
    elem.src = `${PATH_MEDIA}/${media.photographerId}/${media.video}`;
    elem.alt = media.title;
    href = `${PATH_MEDIA}/${media.photographerId}/${media.video}`;
    elem.className = "media video";
  } else {
    elem = document.createElement("img");
    elem.src = `${PATH_ASSETS}/images/no-elem.jpg`;
    elem.alt = media.title;
    elem.className = "media picture";
  }

  const link = document.createElement("a");
  link.className = "link";
  link.ariaLabel = media.title;
  link.href = href;
  link.appendChild(elem);

  return link;
}

export async function mediaCardTemplate(media) {
  const { title, likes } = media;
  const article = document.createElement("article");
  article.className = "card";
  article.dataset.id = media.id;
  article.appendChild(await mediaElement(media));

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
