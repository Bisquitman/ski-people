import { layout } from "./Layout";
import { main } from "./Main.js";

let rendered = false;

export const breadcrumbs = (action, parent = main(), data) => {
  if (action === "remove" && document.querySelector(".breadcrumbs")) {
    document.querySelector(".breadcrumbs").remove();
    rendered = false;
    return;
  }

  if (rendered) return "";

  const el = document.createElement("div");
  el.classList.add("breadcrumbs");

  const listItems = data
    .map((item) => `<li class="breadcrumbs__item"><a class="breadcrumbs__link" href="${item.href}">${item.text}</a></li>`)
    .join("");

  const child = `
    <nav class="breadcrumbs__navigation">
      <ul class="breadcrumbs__list">
        ${listItems}
      </ul>
    </nav>
  `;

  el.append(layout(child, "breadcrumbs__container"));
  parent.append(el);

  rendered = true;

  return el;
};
