import { layout } from "./Layout";
import { main } from "./Main";

let rendered = false;

export const order = (action, data = [], parent = main()) => {
  console.log(data);
  const payment =
    {
      "cash": "Наличными при получении",
      "card": "Картой при получении"
    };
  const delivery =
    {
      "delivery": "Доставка",
      "pickup": "Самовывоз"
    };

  if (action === "remove" && document.querySelector(".order")) {
    document.querySelector(".order").remove();
    rendered = false;
    return;
  }

  if (rendered) return "";

  const el = document.createElement("section");
  el.classList.add("order");

  if (data.length === 0) return "";

  const child = `
    <div class="order__body">
      <div class="order__header">
        <h2 class="order__title">Заказ успешно размещён</h2>
        <div class="order__total-price">${data.totalPrice.toLocaleString()}&nbsp;&#8381;</div>
      </div>
      <div class="order__number">№${data.orderNumber}</div>
      <h3 class="order__subtitle">Данные доставки</h3>
      <table class="order__table table">
        <tr class="table__row">
          <td class="table__field">Получатель</td>
          <td class="table__value">${data.fio}</td>
        </tr>
        <tr class="table__row">
          <td class="table__field">Телефон</td>
          <td class="table__value">${data.tel}</td>
        </tr>
        <tr class="table__row">
          <td class="table__field">E-mail</td>
          <td class="table__value">${data.email}</td>
        </tr>
        <tr class="table__row">
          <td class="table__field">Адрес доставки</td>
          <td class="table__value">${data.address}</td>
        </tr>
        <tr class="table__row">
          <td class="table__field">Способ оплаты</td>
          <td class="table__value">${payment[data.payment]}</td>
        </tr>
        <tr class="table__row">
          <td class="table__field">Способ получения</td>
          <td class="table__value">${delivery[data.delivery]}</td>
        </tr>
      </table>
      <a class="order__btn btn btn_filled" href="/">На главную</a>
    </div>
  `;
  el.append(layout(child, "order__container"));
  parent.append(el);

  rendered = true;

  return el;
};
