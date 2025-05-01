export const paginationCount = (data) => {
  try {
    const maxPagination = data.flat(Infinity).length;
    const currentPagination = (data, currentCount) => data.slice(0, currentCount + 1).reduce((acc, item) => acc + item.length, 0);

    const buttons = document.querySelectorAll(".count-pagination__btn");
    const maxCount = data ? data.length : 0;
    let currentCount = 0;

    const paginationActiveElements = (index) => {
      const paginationElements = document.querySelectorAll(".pagination__item");

      paginationElements.forEach((element) => {
        element.classList.remove("pagination__item_active");
      });

      paginationElements[index].classList.add("pagination__item_active");
    };

    buttons[0].addEventListener("click", (e) => {
      if (currentCount > 0) {
        currentCount--;
        paginationActiveElements(currentCount);
        document.querySelector(".count-pagination__text").innerHTML = `${currentPagination(data, Number(currentCount))} из ${maxPagination}`;
      }
    });

    buttons[1].addEventListener("click", (e) => {
      if (currentCount < maxCount - 1) {
        currentCount++;
        paginationActiveElements(currentCount);
        document.querySelector(".count-pagination__text").innerHTML = `${currentPagination(data, Number(currentCount))} из ${maxPagination}`;
      }
    });
  } catch (error) {
    console.error(error);
  }
};
