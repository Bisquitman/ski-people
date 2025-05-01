import { layout } from "./Layout";
import { main } from "./Main";

let rendered = false;

export const paginationHtml = (action, data, parent = main(), pagination) => {
  const maxPagination = data.flat(Infinity).length;
  const currentPagination = (data, currentCount) => data.slice(0, currentCount + 1).reduce((acc, item) => acc + item.length, 0);

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
        ${currentPagination(data, Number(pagination))} из ${maxPagination}
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
