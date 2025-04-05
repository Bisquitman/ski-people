import { layout } from "./Layout";

export const order = () => {
  const orderEl = document.createElement("section");
  orderEl.classList.add("order");

  const child = `
    <div class="order__body">
      <div class="order__header">
        <h2 class="order__title">Заказ успешно размещён</h2>
        <div class="order__total-price">20&nbsp;000&nbsp;&#8381;</div>
      </div>
      <div class="order__number">№43435</div>
      <h3 class="order__subtitle">Данные доставки</h3>
      <table class="order__table table">
        <tr class="table__row">
          <td class="table__field">Получатель</td>
          <td class="table__value">Иванов Пётр Александрович</td>
        </tr>
        <tr class="table__row">
          <td class="table__field">Телефон</td>
          <td class="table__value">+7 (737) 346 23 00</td>
        </tr>
        <tr class="table__row">
          <td class="table__field">E-mail</td>
          <td class="table__value">Ivanov84@gmail.com</td>
        </tr>
        <tr class="table__row">
          <td class="table__field">Адрес доставки</td>
          <td class="table__value">Москва, ул. Ленина, 21, кв. 33</td>
        </tr>
        <tr class="table__row">
          <td class="table__field">Способ оплаты</td>
          <td class="table__value">Картой при получении</td>
        </tr>
        <tr class="table__row">
          <td class="table__field">Способ получения</td>
          <td class="table__value">Доставка</td>
        </tr>
      </table>
      <a class="order__btn btn btn_filled" href="/">На главную</a>
    </div>
  `;
  orderEl.append(layout(child, "order__container"));
  return orderEl;
};
