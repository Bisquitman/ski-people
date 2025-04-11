import { layout } from "./Layout";
import {main} from "./Main.js";

let rendered = false;

export const breadcrumbs = (parent = main()) => {
  if (rendered) return "";

  const breadcrumbsEl = document.createElement("div");
  breadcrumbsEl.classList.add("breadcrumbs");

  const child = `
    <nav class="breadcrumbs__navigation">
      <ul class="breadcrumbs__list">
        <li class="breadcrumbs__item"><a class="breadcrumbs__link" href="/">Главная</a></li>
        <li class="breadcrumbs__item"><a class="breadcrumbs__link" href="#">Лыжи</a></li>
        <li class="breadcrumbs__item"><a class="breadcrumbs__link" href="#">Горные лыжи</a></li>
      </ul>
    </nav>
  `;
  breadcrumbsEl.append(layout(child, "breadcrumbs__container"));
  parent.append(breadcrumbsEl);

  rendered = true;

  return breadcrumbsEl;
};
