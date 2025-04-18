import { localStorageLoad, localStorageSave } from "./localStorage";
import { LS_KEY_CART } from "./const";

export const addCart = async (data) => {
  console.log("data: ", data);
  const cartList = localStorageLoad(LS_KEY_CART) || [];
  const list = document.querySelector(".goods__list") || document.querySelector(".product__characteristics");

  if (list) {
    list.addEventListener("click", (e) => {
      if (e.target.classList.contains("card__btn") || e.target.classList.contains("product__btn")) {
        const cartBtn = e.target;
        const id = Number(cartBtn.dataset.id);
        console.log("id: ", id);
        const item = data.flat(Infinity).find((item) => item.id === id);
        console.log("item: ", item);

        let isInCart = false;
        cartList.forEach((cartItem, index) => {
          if (cartItem.id === id) {
            isInCart = true;
            // cartList.splice(index, 1);
            // localStorageSave(LS_KEY_CART, cartList);
            return;
          }
        });

        if (!isInCart) {
          cartList.push(item);
          localStorageSave(LS_KEY_CART, cartList);
        }
      }
    });
  }
};
