import { URL_DATA } from "./consts.js";

let data = null;

export async function getData() {
  if (data) {
    return data;
  }
  return (data = await fetch(URL_DATA).then((res) => res.json()));
}

export async function getPhotographers() {
  return (await getData()).photographers;
}

export async function getMedia({ id }) {
  return (await getData()).media.filter(
    (element) => element.photographerId === id
  );
}
