import { localStorageSave } from "./localStorage";
import { LS_KEY_CART } from "./const";

export const cartCount = (cartList) => {
  const list = document.querySelector(".cart__list");

  if (list) {
    list.addEventListener("click", (e) => {
      if (e.target.classList.contains("counter__btn")) {
        const idNumber = Number(e.target.closest(".cart-item[data-id]").dataset.id);
        const counterText = e.target.closest(".counter").querySelector(".counter__number");

        cartList.map((item, index) => {
          if (item.id === idNumber) {
            if (e.target.closest(".counter__plus")) {
              cartList[index].count++;
              counterText.textContent = cartList[index].count;
            }
            if (e.target.closest(".counter__minus")) {
              cartList[index].count--;
              counterText.textContent = cartList[index].count;

              if (cartList[index].count <= 0) {
                cartList.splice(index, 1);
              }
            }
          }
        });
        localStorageSave(LS_KEY_CART, cartList);
      }
    });
  }
};