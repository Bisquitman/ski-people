import { router } from "./router";

export const search = () => {
  const searchForm = document.querySelector('.header__search');
  const searchInput = searchForm.querySelector('input');

  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      router.navigate(`/search?query=${searchInput.value.trim()}`);
      // searchInput.value = "";
      // searchForm.reset();
    });
  }
}