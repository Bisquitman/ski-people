import { layout } from "./Layout";
import { main } from "./Main";

let rendered = false;

export const catalog = (action, data = [], parent = main()) => {
  if (action === "remove" && document.querySelector(".catalog")) {
    document.querySelector(".catalog").remove();
    rendered = false;
    return;
  }

  if (rendered) return document.querySelector(".catalog");

  const catalogEl = document.createElement("div");
  catalogEl.className = "catalog";

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
