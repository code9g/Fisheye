import { URL_DATA } from "./consts.js";

let data = null;

export async function getData() {
  if (data === null) {
    data = await fetch(URL_DATA).then((res) => res.json());
  }
  return data;
}

export async function getPhotographers() {
  return (await getData()).photographers;
}

export async function getPhotographer(id) {
  return (await getData()).photographers.find((item) => item.id === id);
}

export async function getMedias(photographerId) {
  return (await getData()).media.filter(
    (item) => item.photographerId === photographerId
  );
}
