import { URL_DATA } from "./consts.js";

let data = null;

export async function getData() {
  return data ? data : (data = await fetch(URL_DATA).then((res) => res.json()));
}

export async function getPhotographers() {
  return (await getData()).photographers;
}

export async function getMedia(
  photographer,
  offset = 0,
  limit = -1,
  column = null
) {
  const result = (await getData()).media.filter(
    (element) => element.photographerId === photographer.id
  );
  switch (column) {
    case "likes":
      result.sort((item1, item2) => {
        return item1.likes - item2.likes;
      });
      break;
    default:
      result.sort((item1, item2) => {
        if (item1[column] > item2[column]) {
          return +1;
        } else if (item1[column] < item2[column]) {
          return -1;
        }
        return 0;
      });
  }
  if (offset > 0 || limit > 0) {
    offset = Math.max(0, offset);
    return result.slice(offset, limit);
  }
  return result;
}
