export const paginationCount = (data) => {
  try {
    const buttons = document.querySelectorAll(".count-pagination__btn");
    const maxCount = data?.length;
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
        console.log("currentCount: ", currentCount);
      }
    });

    buttons[1].addEventListener("click", (e) => {
      if (currentCount < maxCount - 1) {
        currentCount++;
        paginationActiveElements(currentCount);
        console.log("currentCount: ", currentCount);
      }
    });
  } catch (error) {
    console.error(error);
  }
};
