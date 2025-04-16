import { IMAGE_API_URL, LS_KEY_FAVORITE } from "../js/const";
import { layout } from "./Layout";
import { main } from "./Main";
import { localStorageLoad } from "../js/localStorage";
import { router } from "../js/router";

let rendered = false;

export const productsList = (action, title = "", data, parent = main()) => {
  if (action === "remove" && document.querySelector(".goods")) {
    document.querySelector(".goods").remove();
    rendered = false;
    return;
  }

  console.log("data: ", data);
  if (rendered) return "";

  const favoriteList = localStorageLoad(LS_KEY_FAVORITE);

  const isFavorite = (id) => favoriteList.find(item => item.id === id);

  let goodsItem = "";

  const renderGoodsItem = (data) => {
    goodsItem = "";
    data.forEach((item) => {
      return (
        goodsItem += `
          <li class="goods__item">
            <article class="goods__card card">
              <a class="card__link" href="/product?id=${item.id}">
                <img class="card__image" src="${IMAGE_API_URL}/${item.mainImage[0]}" title="${item.name}" alt="${item.name}">
              </a>
              <button class="card__like-btn ${isFavorite(item.id) ? "card__like-btn_active" : ""} like-btn" data-id="${item.id}">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.41301 13.8733C8.18634 13.9533 7.81301 13.9533 7.58634 13.8733C5.65301 13.2133 1.33301 10.46 1.33301 5.79332C1.33301 3.73332 2.99301 2.06665 5.03967 2.06665C6.25301 2.06665 7.32634 2.65332 7.99967 3.55998C8.67301 2.65332 9.75301 2.06665 10.9597 2.06665C13.0063 2.06665 14.6663 3.73332 14.6663 5.79332C14.6663 10.46 10.3463 13.2133 8.41301 13.8733Z"
                    fill="white" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
              <div class="card__info">
                <h3 class="card__title">${item.name}</h3>
                <p class="card__price">${item.price.toLocaleString()}&nbsp;₽</p>
              </div>
              <button class="card__btn btn">В корзину</button>
            </article>
          </li>
        `
      );
    });
  };

  renderGoodsItem(data);

  const el = document.createElement("section");
  el.classList.add("goods");

  const child = `
    ${title ? `<h2 class="goods__title title">${title}</h2>` : ""}
    <ul class="goods__list">
      ${goodsItem}
    </ul>
  `;

  el.append(layout(child, "goods__container"));
  parent.append(el);

  rendered = true;

  const catalogButton = document.querySelector(".catalog");
  if (catalogButton) {
    catalogButton.addEventListener("click", (e) => {
      if (e.target.matches("a")) {
        e.preventDefault();
        catalogButton.querySelectorAll("a").forEach((btn) => {
          btn.classList.remove("catalog__link_active");
        });
        e.target.classList.add("catalog__link_active");

        const refreshList = data.filter((item) => item.type.trim() === e.target.textContent.trim());
        // console.log("refreshList: ", refreshList);

        const list = document.querySelector(".goods__list");
        list.textContent = "";

        renderGoodsItem(refreshList);

        if (e.target.textContent.trim() === "Все") {
          renderGoodsItem(data);
        }

        list.innerHTML = goodsItem;
        router.updatePageLinks();
      }
    });
  }

  return el;
};
