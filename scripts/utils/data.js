import { URL_DATA } from "./consts.js";

let data = null;

export async function getData(forceUpdate = false) {
  if (data === null || forceUpdate) {
    data = await fetch(URL_DATA).then((res) => res.json());
  }
  return data;
}

export async function getPhotographers() {
  return (await getData()).photographers;
}

export async function getPhotographer(id) {
  const result = (await getData()).photographers.find((item) => item.id === id);
  if (result) {
    result.likes = 0;
    (await getMedias(id)).map((item) => {
      result.likes += item.likes ?? 0;
    });
  }
  return result;
}

export async function getMedias(
  photographerId,
  column = null,
  direction = "ASC"
) {
  const result = (await getData()).media.filter(
    (item) => item.photographerId === photographerId
  );
  switch (column) {
    case "likes":
      if (direction === "ASC") {
        result.sort((item1, item2) => item1[column] - item2[column]);
      } else {
        result.sort((item1, item2) => item2[column] - item1[column]);
      }
      break;
    case "date":
    case "title":
      if (direction === "ASC") {
        result.sort((item1, item2) => {
          if (item1[column] > item2[column]) {
            return +1;
          } else if (item1[column] < item2[column]) {
            return -1;
          }
          return 0;
        });
      } else {
        result.sort((item1, item2) => {
          if (item1[column] < item2[column]) {
            return +1;
          } else if (item1[column] > item2[column]) {
            return -1;
          }
          return 0;
        });
      }
      break;
  }
  return result;
}

export async function getMedia(id) {
  return (await getData()).media.find((item) => item.id === id);
}

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
