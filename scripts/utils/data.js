import { URL_DATA } from "./consts.js";

export async function getData() {
  return await fetch(URL_DATA).then((res) => res.json());
}
