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
  link.href = href;
  link.appendChild(elem);

  return link;
}

export async function mediaCardTemplate(media) {
  const { id, title, likes } = media;
  const article = document.createElement("article");
  article.className = "card";
  article.dataset.id = id;

  article.appendChild(await mediaElement(media));

  const div = document.createElement("div");
  div.className = "card-body";
  div.style.display = "flex";
  div.style.justifyContent = "space-between";
  div.style.alignItems = "center";

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
  btn.classList.add(media.liked ? "heart-fill" : "heart-empty");

  btn.type = "button";
  btn.ariaLabel = "Ajouter un like";

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(media.liked);
    if (media.liked) {
      media.liked = false;
      media.likes--;
      e.target.classList.remove("heart-fill");
      e.target.classList.add("heart-empty");
    } else {
      media.liked = true;
      media.likes++;
      e.target.classList.remove("heart-empty");
      e.target.classList.add("heart-fill");
    }
    e.target.closest(".card-likes").querySelector(".likes-info").innerText =
      media.likes;
  });

  likesDiv.appendChild(btn);
  //likesDiv.innerHTML = `<span class="likes-info">${likes}</span><button class="btn-like" type="button" aria-label="Ajouter un like"><span class="heart"></span></button>`;

  div.appendChild(h3);
  div.appendChild(likesDiv);
  article.appendChild(div);

  return article;
}
