import { layout } from "./Layout";

let rendered = false;

export const catalog = (data = [], parent) => {
  if (rendered) return document.querySelector(".catalog");

  const catalogEl = document.createElement("div");
  catalogEl.classList.add("catalog");

  const typeList = [];
  data.map(({ type }) => typeList.push(type));

  let catalogItem = "";

  [...new Set(typeList)].forEach((item) => {
    catalogItem += `
      <li class="catalog__item">
        <a class="catalog__link" href="#">
          ${item}
        </a>
      </li>
    `;
  });

  const child = `
    <ul class="catalog__list">
      <li class="catalog__item">
        <a class="catalog__link catalog__link_active" href="#">
          Все
        </a>
      </li>
      ${catalogItem}
    </ul>
  `;
  catalogEl.append(layout(child, "catalog__container"));
  parent.append(catalogEl);

  rendered = true;

  return catalogEl;
};
