import { URL_DATA } from "./consts.js";

export async function getData() {
  return await fetch(URL_DATA).then((res) => res.json());
}

export async function getPhotographers() {
  return (await getData()).photographers;
}

export async function getMedia({ id }) {
  return (await getData()).media.filter(
    (element) => element.photographerId === id
  );
}
