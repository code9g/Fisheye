import { PATH_ASSETS, PATH_MEDIA } from "../utils/consts.js";

export async function getMediaFactory(media, thumbnail = false) {
  let elem;
  let src;
  if (media.image) {
    elem = document.createElement("img");
    elem.src = `${PATH_MEDIA}/${media.photographerId}${
      thumbnail ? "/thumb" : ""
    }/${media.image}`;
    src = `${PATH_MEDIA}/${media.photographerId}/${media.image}`;
    elem.alt = media.title;
    elem.className = "media picture";
  } else if (media.video) {
    elem = document.createElement("video");
    elem.src = `${PATH_MEDIA}/${media.photographerId}/${media.video}`;
    src = `${PATH_MEDIA}/${media.photographerId}/${media.video}`;
    if (!thumbnail) {
      elem.setAttribute("controls", "");
    }
    elem.className = "media video";
  } else {
    elem = document.createElement("img");
    elem.src = `${PATH_ASSETS}/images/no-elem.jpg`;
    elem.alt = media.title;
    src = `${PATH_ASSETS}/images/no-elem.jpg`;
    elem.className = "media picture";
  }

  return { src, DOM: elem };
}

export async function mediaCardTemplate(media) {
  const { title, likes } = media;
  const article = document.createElement("article");
  article.className = "card";
  article.dataset.id = media.id;

  const { src, DOM } = await getMediaFactory(media, true);
  const link = document.createElement("a");
  link.className = "link";
  link.ariaLabel = media.title;
  link.href = src;
  link.appendChild(DOM);

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
