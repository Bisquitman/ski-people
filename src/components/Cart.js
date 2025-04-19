import { layout } from "./Layout";
import { main } from "./Main";
import { IMAGE_API_URL, LS_KEY_CART, LS_KEY_ORDER } from "../js/const";
import { router } from "../js/router";
import { localStorageSave } from "../js/localStorage";

let rendered = false;

const declOfNum = (n, titles) => n + ' ' + titles[n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];

export const cart = (title, cartList = [], parent = main()) => {
  // console.log("data: ", cartList);
  if (title === "remove" && document.querySelector(".cart")) {
    document.querySelector(".cart").remove();
    rendered = false;
    return;
  }

  if (rendered) return "";

  let cartItem = '';

  const totalPrice = cartList.reduce((sum, item) => sum + item.count * item.price, 0);

  const formSubmit = () => {
    const form = document.querySelector(".cart__form");

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(form));
        formData.orderNumber = Math.floor(Math.random() * (99999 - 1 + 1)) + 1;
        formData.totalPrice = totalPrice;
        localStorageSave(LS_KEY_ORDER, formData);

        router.navigate('/order');
        localStorage.removeItem(LS_KEY_CART);
      });
    }
  };

  const renderCartItem = (data) => {
    cartItem = "";
    data.forEach((item) => {
      return (cartItem += `
        <li class="cart__item cart-item" data-id="${item.id}">
          <img class="cart-item__image" src="${IMAGE_API_URL}/${item.mainImage[0]}" alt="${item.name}" title="${item.name}">
          <h3 class="cart-item__title">${item.name}</h3>
          <p class="cart-item__price">${item.price.toLocaleString()}&nbsp;₽</p>
          <p class="cart-item__id">арт.&nbsp;${item.article}</p>
          <div class="cart-item__counter counter">
            <button class="counter__btn counter__minus" type="button">-</button>
            <p class="counter__number">${item.count}</p>
            <button class="counter__btn counter__plus" type="button">+</button>
          </div>
        </li>
      `);
    });
  };

  renderCartItem(cartList);

  const el = document.createElement("section");
  el.classList.add("cart");

  const child = `
    ${title && title !== "remove" ? `<h2 class="cart__title title">${title}</h2>` : ""}
    <div class="cart__wrapper">
      <ul class="cart__list">
        ${cartList.length ? cartItem : `<h2 class="title">В корзине пока ничего нет...</h2>`}
      </ul>
      <div class="cart__order cart-order">
        <h3 class="cart-order__title">Оформление</h3>
        <div class="cart-order__info">
          <p class="cart-order__count">${declOfNum(cartList.length, ['товар', 'товара', 'товаров'])} на сумму:</p>
          <p class="cart-order__total-price">${totalPrice.toLocaleString()}&nbsp;₽</p>
        </div>
        <p class="cart-order__delivery">Доставка 0&nbsp;₽</p>
        <button class="cart-order__btn btn btn_filled" type="submit" form="cartForm" ${!cartList.length ? "disabled" : ""}>Оформить заказ</button>
      </div>
      <form class="cart__form cart-form" id="cartForm" action="#" method="POST">
        <h3 class="cart-form__title">Данные для доставки</h3>
        <fieldset class="cart-form__inputs">
          <input class="cart-form__input" placeholder="Фамилия Имя Отчество" type="text" name="fio" required>
          <input class="cart-form__input" placeholder="Телефон" type="tel" name="tel" required>
          <input class="cart-form__input" placeholder="E-mail" type="email" name="email" required>
          <input class="cart-form__input" placeholder="Адрес доставки" type="text" name="address" required>
          <textarea class="cart-form__input" placeholder="Комментарий к заказу" name="comment"
            id="comment"></textarea>
        </fieldset>
        <fieldset class="cart-form__fieldset">
          <legend class="cart-form__legend">Доставка</legend>
          <label class="cart-form__label">
            <input class="cart-form__radio" type="radio" name="delivery" value="delivery" />
            Доставка
          </label>
          <label class="cart-form__label">
            <input class="cart-form__radio" type="radio" name="delivery" value="pickup" checked />
            Самовывоз
          </label>
        </fieldset>
        <fieldset class="cart-form__fieldset">
          <legend class="cart-form__legend">Оплата</legend>
          <label class="cart-form__label">
            <input class="cart-form__radio" type="radio" name="payment" value="card" checked />
            Картой при получении
          </label>
          <label class="cart-form__label">
            <input class="cart-form__radio" type="radio" name="payment" value="cash" />
            Наличными при получении
          </label>
        </fieldset>
      </form>
    </div>
  `;

  el.append(layout(child, "cart__container"));
  parent.append(el);

  formSubmit();

  rendered = true;

  return el;
};
