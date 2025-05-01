import { router } from "./router";
import { productsList } from "../components/Goods";

export const paginationCount = (data, currentCount) => {
  try {
    const buttons = document.querySelector(".pagination__count");
    const maxCount = data ? data.length : 0;

    const paginationActiveElements = (index) => {
      const paginationElements = document.querySelectorAll(".pagination__item");

      paginationElements.forEach((element) => {
        element.classList.remove("pagination__item_active");
      });

      paginationElements[index].classList.add("pagination__item_active");
    };

    function changePagination({ target }) {
      if (target.matches('button')) {
        if (target.textContent === "<") {
          if (currentCount > 0 && currentCount <= maxCount - 1) {
            currentCount--;
          } else {
            return;
          }
        }
        if (target.textContent === ">") {
          if (currentCount >= 0 && currentCount < maxCount - 1) {
            currentCount++;
          } else {
            return;
          }
        }
      }
      productsList("remove");
      paginationActiveElements(currentCount);
      router.navigate(`/?pagination=${currentCount}`);
      buttons.removeEventListener("click", changePagination);
    }

    buttons.addEventListener("click", changePagination);
  } catch (error) {
    console.error(error);
  }
};
