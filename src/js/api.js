import { API_URL } from "./const";
import { paginationData } from "./paginationData";

export const getData = async (query) => {
  try {
    const response = await fetch(API_URL);
    const obj = await response.json();

    if (query !== "" && query !== undefined && query !== null) {
      const querySearch = obj.filter(
        (item) => item.name.toLowerCase() === query.toLowerCase() || item.type.toLowerCase() === query.toLowerCase(),
      );
      return paginationData(querySearch, 12);
    }

    return paginationData(obj, 12);
  } catch (e) {
    console.error(e);
  }
};
