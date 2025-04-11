import { localStorageLoad, localStorageSave } from "./localStorage";
import { LS_KEY_FAVORITE } from "./const";

export const addFavorite = async (data) => {
  const favoriteList = localStorageLoad(LS_KEY_FAVORITE);
  const list = document.querySelector('.goods__list');

  if (list) {
    list.addEventListener('click', (e) => {
      if (e.target.closest('.card__like-btn')) {
        const id = Number(e.target.parentNode.parentNode.dataset.id || e.target.parentNode.dataset.id);
        const item = data.find(item => item.id === id);
        const likeBtn = document.querySelector(`.card__like-btn[data-id="${item.id}"]`);
        console.log(likeBtn);

        if (favoriteList.length === 0) {
          favoriteList.push(item);
          localStorageSave(LS_KEY_FAVORITE, favoriteList);
        } else {
          let thereIs = false;
          favoriteList.forEach((favoriteItem, index) => {
            if (favoriteItem.id === id) {
              thereIs = true;
              favoriteList.splice(index, 1);
              localStorageSave(LS_KEY_FAVORITE, favoriteList);
              likeBtn.classList.remove('card__like-btn_active');
            }
          });
          if (!thereIs) {
            favoriteList.push(item);
            localStorageSave(LS_KEY_FAVORITE, favoriteList);
            likeBtn.classList.add('card__like-btn_active');
          }
        }
      }
    });
  }
}