import ModalSwiper from 'swiper';
import {
    EffectCoverflow,
    Pagination,
    Navigation,
    Scrollbar,
} from 'swiper/modules';

function createSlider(container: string, slideIndex: number): ModalSwiper {
    const modalSwiper = new ModalSwiper(container, {
        observer: true,
        observeParents: true,
        slideToClickedSlide: true,
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
        },
        initialSlide: slideIndex,
        slidesPerView: 'auto',
        spaceBetween: 20,
        grabCursor: true,
        scrollbar: { el: '.swiper-scrollbar' },
        pagination: {
            el: '.swiper-pagination2',
            clickable: true,
            type: 'bullets',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        modules: [Navigation, Pagination, Scrollbar, EffectCoverflow],
    });

    modalSwiper.on('slideChange', () => {
        modalSwiper.pagination.render();
        modalSwiper.pagination.update();
        modalSwiper.navigation.update();
    });

    return modalSwiper;
}

export default createSlider;
