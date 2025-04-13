import { API_URL } from "./const";

export const getData = async (query) => {
  try {
    const response = await fetch(API_URL);
    const obj = await response.json();

    if (query !== "" && query !== undefined && query !== null) {
      return obj.filter((item) => item.name.toLowerCase() === query.toLowerCase() || item.type.toLowerCase() === query.toLowerCase());
    }

    return obj;
  } catch (e) {
    console.error(e);
  }
};
