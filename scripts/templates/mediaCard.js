import { PATH_ASSETS, PATH_MEDIA } from "../utils/consts.js";

export async function mediaCardTemplate({
  id,
  photographerId,
  title,
  image,
  video,
  likes,
}) {
  const article = document.createElement("article");
  article.className = "card";
  article.dataset.id = id;

  let media;
  if (image) {
    media = document.createElement("img");
    media.src = `${PATH_MEDIA}/${photographerId}/${image}`;
    media.alt = title;
    media.className = "media picture";
  } else if (video) {
    media = document.createElement("video");
    media.src = `${PATH_MEDIA}/${photographerId}/${video}`;
    media.alt = title;
    media.className = "media video";
  } else {
    media = document.createElement("img");
    media.src = `${PATH_ASSETS}/images/no-media.jpg`;
    media.alt = title;
    media.className = "media picture";
  }
  const lightboxLink = document.createElement("a");
  lightboxLink.href = media.src;
  lightboxLink.appendChild(media);

  const div = document.createElement("div");
  div.className = "card-body";
  div.style.display = "flex";
  div.style.justifyContent = "space-between";
  div.style.alignItems = "center";

  const h3 = document.createElement("h3");
  h3.className = "title";
  h3.innerText = title;

  const likesDiv = document.createElement("div");
  likesDiv.className = "likes";
  likesDiv.innerHTML = `<span class="likes-info">${likes}</span>&nbsp;<button class="btn-like" type="button" aria-label="">LIKE</button>`;

  div.appendChild(h3);
  div.appendChild(likesDiv);

  article.appendChild(lightboxLink);
  article.appendChild(div);

  return article;
}
