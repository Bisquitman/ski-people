import { layout } from "./Layout";
import { main } from "./Main";

let rendered = false;

export const paginationHtml = (action, data, parent = main()) => {
  if (action === "remove" && document.querySelector(".pagination")) {
    document.querySelector(".pagination").remove();
    rendered = false;
    return;
  }

  if (rendered) return "";

  const listItems = data.map((item) => `<li class="pagination__item"></li>`).join("");

  const el = document.createElement("div");
  el.className = "pagination";

  const child = `
    <ul class="pagination__list">
      ${listItems}
    </ul>
    <div class="pagination__count count-pagination">
      <button class="count-pagination__btn">&lt;</button>
      <p class="count-pagination__text">
        <span>12</span> из <span>31</span>
      </p>
      <button class="count-pagination__btn">&gt;</button>
    </div>
  `;

  el.append(layout(child, "pagination__container"));
  parent.append(el);

  document.querySelector(".pagination__item").classList.add("pagination__item_active");

  rendered = true;

  return el;
};
