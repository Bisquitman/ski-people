// core version + navigation, pagination modules:
import Swiper from "swiper";
import { Navigation, Thumbs, EffectFade } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

// init Swiper:
const productThumbsSlider = new Swiper(".product__slider-thumbs", {
  // configure Swiper to use modules
  modules: [Navigation, Thumbs],
  spaceBetween: 14,
  slidesPerView: 4,
  // freeMode: true,
  watchSlidesProgress: true,

  breakpoints: {
    1024: {
      spaceBetween: 12,
    },
    1200: {
      spaceBetween: 16,
    },
  },
});

const productSlider = new Swiper(".product__slider-main", {
  modules: [Navigation, Thumbs, EffectFade],
  spaceBetween: 10,
  slidesPerView: 1,
  effect: "fade",
  crossFade: true,
  speed: 800,
  navigation: {
    prevEl: ".product__slider-arrow_prev",
    nextEl: ".product__slider-arrow_next",
  },
  thumbs: {
    swiper: productThumbsSlider,
  },
});
