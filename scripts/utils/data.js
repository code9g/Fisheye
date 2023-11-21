import { URL_DATA } from "./consts.js";

let data = null;

// Récupère et met en cache les données
export async function getData(forceUpdate = false) {
  if (data === null || forceUpdate) {
    data = await fetch(URL_DATA).then((res) => res.json());
  }
  return data;
}

// Récupère la liste des photographes
export async function getPhotographers() {
  return (await getData()).photographers;
}

// Récupère les détails d'un photographe en incluant les likes
export async function getPhotographer(id) {
  const result = (await getData()).photographers.find((item) => item.id === id);
  if (result) {
    result.likes = (await getMedias(id)).reduce((accumulator, item) => {
      return accumulator + (item.likes ?? 0);
    }, 0);
  }
  return result;
}

// Récupère la liste des médias d'un photographe en triant si nécessaire
export async function getMedias(photographerId, column = null) {
  const result = (await getData()).media.filter(
    (item) => item.photographerId === photographerId
  );
  switch (column) {
    case "likes":
      result.sort((item1, item2) => item1[column] - item2[column]);
      break;
    case "date":
    case "title":
      result.sort((item1, item2) => {
        if (item1[column] > item2[column]) {
          return +1;
        } else if (item1[column] < item2[column]) {
          return -1;
        }
        return 0;
      });
      break;
  }
  return result;
}

// Récupère les informations sur un média
export async function getMedia(id) {
  return (await getData()).media.find((item) => item.id === id);
}

// Permet de faire basculer le "like" sur un média
// Note: Ici, cela fonctionne car on met en "cache" les données
export async function toggleLikesOnMedia(id) {
  const media = await getMedia(id);
  if (!media) {
    return false;
  }
  const photographer = await getPhotographer(media.photographerId);
  if (!photographer) {
    return false;
  }
  if (media.liked) {
    media.liked = false;
    media.likes--;
    photographer.likes--;
  } else {
    media.liked = true;
    media.likes++;
    photographer.likes++;
  }
  return true;
}
