export function photographerTemplate({
  id,
  name,
  portrait,
  tagline,
  city,
  country,
  price,
}) {
  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    article.classList.add("card");
    article.innerHTML = `
        <a class="link" href="photographer.html?id=${id}">
            <img class="portrait" src="${picture}" alt="${name}">
            <h2 class="name">${name}</h2>
        </a>
        <p class="location">${city}, ${country}</p>
        <p class="tagline">${tagline}</p>
        <p class="price">${price}&nbsp;&euro;&nbsp;/&nbsp;jour</p>`;
    return article;
  }
  return { name, picture, getUserCardDOM };
}
