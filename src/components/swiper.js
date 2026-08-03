import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export function initSwiper() {

  new Swiper(".testimonialSwiper", {

    modules: [Navigation, Pagination, Autoplay],

    slidesPerView: 3,

    spaceBetween: 30,

    loop: true,

    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints: {

      320: {
        slidesPerView: 1,
      },

      768: {
        slidesPerView: 2,
      },

      1024: {
        slidesPerView: 3,
      }

    }

  });

}