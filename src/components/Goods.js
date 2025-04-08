import { IMAGE_API_URL } from "../js/const";
import { layout } from "./Layout";

let rendered = false;

export const goods = (title, data, parent) => {
  console.log("data: ", data);
  // if (remove) {
  //   console.log("remove: ", document.querySelector(".goods"));
  //   rendered = false;
  //   return "";
  // }

  if (rendered) return "";

  let goodsItem = "";

  data.forEach(({ title, price, image }) => {
    goodsItem += `
      <li class="goods__item">
        <article class="goods__card card">
          <a class="card__link" href="/product">
            <img class="card__image" src="${IMAGE_API_URL}/${image}" title="${title}" alt="${title}">
          </a>
          <button class="card__like-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.41301 13.8733C8.18634 13.9533 7.81301 13.9533 7.58634 13.8733C5.65301 13.2133 1.33301 10.46 1.33301 5.79332C1.33301 3.73332 2.99301 2.06665 5.03967 2.06665C6.25301 2.06665 7.32634 2.65332 7.99967 3.55998C8.67301 2.65332 9.75301 2.06665 10.9597 2.06665C13.0063 2.06665 14.6663 3.73332 14.6663 5.79332C14.6663 10.46 10.3463 13.2133 8.41301 13.8733Z"
                fill="white" stroke="#1C1C1C" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <div class="card__info">
            <h3 class="card__title">${title}</h3>
            <p class="card__price">${price}&nbsp;₽</p>
          </div>
          <button class="card__btn btn">В корзину</button>
        </article>
      </li>
    `;
  });

  const goodsEl = document.createElement("section");
  goodsEl.classList.add("goods");

  const child = `
    ${title ? `<h2 class="goods__title title">${title}</h2>` : ""}
    <ul class="goods__list">
      ${goodsItem}
    </ul>
  `;

  goodsEl.append(layout(child, "goods__container"));
  parent.append(goodsEl);

  rendered = true;

  const catalogButton = document.querySelector(".catalog");
  if (catalogButton) {
    catalogButton.addEventListener("click", (e) => {
      if (e.target.matches("a")) {
        catalogButton.querySelectorAll("a").forEach((btn) => {
          btn.classList.remove("catalog__link_active");
        });
        e.target.classList.add("catalog__link_active");

        const refreshList = data.filter((item) => item.type.trim() === e.target.textContent.trim());
        console.log("refreshList: ", refreshList);

        const list = document.querySelector(".goods__list");
        list.textContent = "";
        goodsItem = "";

        refreshList.forEach(({ price, title, image }) => {
          goodsItem += `
            <li class="goods__item">
              <article class="goods__card card">
                <a class="card__link" href="/product">
                  <img class="card__image" src="${IMAGE_API_URL}/${image}" title="${title}" alt="${title}">
                </a>
                <button class="card__like-btn">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8.41301 13.8733C8.18634 13.9533 7.81301 13.9533 7.58634 13.8733C5.65301 13.2133 1.33301 10.46 1.33301 5.79332C1.33301 3.73332 2.99301 2.06665 5.03967 2.06665C6.25301 2.06665 7.32634 2.65332 7.99967 3.55998C8.67301 2.65332 9.75301 2.06665 10.9597 2.06665C13.0063 2.06665 14.6663 3.73332 14.6663 5.79332C14.6663 10.46 10.3463 13.2133 8.41301 13.8733Z"
                      fill="white" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>
                <div class="card__info">
                  <h3 class="card__title">${title}</h3>
                  <p class="card__price">${price}&nbsp;₽</p>
                </div>
                <button class="card__btn btn">В корзину</button>
              </article>
            </li>
          `;
        });

        if (e.target.textContent.trim() === "Все") {
          data.forEach(({ title, price, image }) => {
            goodsItem += `
              <li class="goods__item">
                <article class="goods__card card">
                  <a class="card__link" href="/product">
                    <img class="card__image" src="${IMAGE_API_URL}/${image}" title="${title}" alt="${title}">
                  </a>
                  <button class="card__like-btn">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8.41301 13.8733C8.18634 13.9533 7.81301 13.9533 7.58634 13.8733C5.65301 13.2133 1.33301 10.46 1.33301 5.79332C1.33301 3.73332 2.99301 2.06665 5.03967 2.06665C6.25301 2.06665 7.32634 2.65332 7.99967 3.55998C8.67301 2.65332 9.75301 2.06665 10.9597 2.06665C13.0063 2.06665 14.6663 3.73332 14.6663 5.79332C14.6663 10.46 10.3463 13.2133 8.41301 13.8733Z"
                        fill="white" stroke="#1C1C1C" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </button>
                  <div class="card__info">
                    <h3 class="card__title">${title}</h3>
                    <p class="card__price">${price}&nbsp;₽</p>
                  </div>
                  <button class="card__btn btn">В корзину</button>
                </article>
              </li>
            `;
          });
        }

        list.innerHTML = goodsItem;
      }
    });
  }

  return goodsEl;
};
