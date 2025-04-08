import { layout } from "./Layout";
let rendered = false;

export const cart = () => {
  if (rendered) return "";

  const cartEl = document.createElement("section");
  cartEl.classList.add("cart");

  const child = `
    <h2 class="cart__title title">Корзина</h2>
    <ul class="cart__list">
      <li class="cart__item cart-item">
        <img class="cart-item__image" src="./img/photo.jpg" alt="Горные лыжи" title="Горные лыжи">
        <h3 class="cart-item__title">Горные лыжи</h3>
        <p class="cart-item__price">5&nbsp;000&nbsp;₽</p>
        <p class="cart-item__id">арт.&nbsp;84348945757</p>
        <div class="cart-item__counter counter">
          <button class="counter__minus" type="button">-</button>
          <p class="counter__number">1</p>
          <button class="counter__plus" type="button">+</button>
        </div>
      </li>
    </ul>
    <div class="cart__order cart-order">
      <h3 class="cart-order__title">Оформление</h3>
      <div class="cart-order__info">
        <p class="cart-order__count"><span>4</span>товара на сумму:</p>
        <p class="cart-order__total-price">20&nbsp;000&nbsp;₽</p>
      </div>
      <p class="cart-order__delivery">Доставка 0&nbsp;₽</p>
      <button class="cart-order__btn btn btn_filled" type="submit" form="cartForm">Оформить заказ</button>
    </div>
    <form class="cart__form cart-form" id="cartForm" action="#" method="POST">
      <h3 class="cart-form__title">Данные для доставки</h3>
      <fieldset class="cart-form__inputs">
        <input class="cart-form__input" placeholder="Фамилия Имя Отчество" type="text" name="fio">
        <input class="cart-form__input" placeholder="Телефон" type="tel" name="tel">
        <input class="cart-form__input" placeholder="E-mail" type="email" name="email">
        <input class="cart-form__input" placeholder="Адрес доставки" type="text" name="address">
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
          <input class="cart-form__radio" type="radio" name="payment" value="card" />
          Картой при получении
        </label>
        <label class="cart-form__label">
          <input class="cart-form__radio" type="radio" name="payment" value="cash" checked />
          Наличными при получении
        </label>
      </fieldset>
    </form>
  `;
  cartEl.append(layout(child, "cart__container"));

  rendered = true;

  return cartEl;
};
