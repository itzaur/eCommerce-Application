import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import ModalSwiper from 'swiper';
import {
    EffectCoverflow,
    Pagination,
    Navigation,
    Scrollbar,
} from 'swiper/modules';
import { Product } from '@commercetools/platform-sdk';
import { apiRoot } from '../../commercetools/Client';
import { Header } from '../Store';
import { Footer } from '../MainPage';
import { products } from '../../utils/constants';
import { ProductOptions } from '../../types';
import starEmpty from '../../assets/images/review-star-empty.png';
import avatar from '../../assets/images/user.png';
import star from '../../assets/images/review-star.png';
import Modal from '../NotFoundPage/Modal';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

function ProductDetail(): JSX.Element {
    const [card, setCard] = useState<Product>();
    const location = useLocation().pathname.split('/').at(-1) as string;

    useEffect(() => {
        async function getProductKey(key: string): Promise<void> {
            try {
                const result = await apiRoot
                    .products()
                    .withKey({ key })
                    .get()
                    .execute();

                setCard(result.body);
            } catch (error) {
                // throw Error('Product not found');
            }
        }
        getProductKey(location);
    }, [location]);

    const product: ProductOptions = {
        title: card?.masterData.current.name
            ? card.masterData.current.name['ru-RU']
            : '',
        description: card?.masterData.current.description
            ? card.masterData.current.description['ru-RU']
            : '',
        currency: card?.masterData.current.masterVariant.prices
            ? card?.masterData.current.masterVariant.prices[0].value
                  .currencyCode
            : '',
        images: card?.masterData.current.masterVariant.images?.map(
            (el) => el.url
        ),
        imageSrc: card?.masterData.current.masterVariant.images
            ? card?.masterData.current.masterVariant.images[0].url
            : '',
        imageAlt: card?.masterData.current.masterVariant.images
            ? card?.masterData.current.masterVariant.images[0].label
            : '',
        detailsTitle: products.find((el) => el.name === card?.key)?.details
            ?.title,
        detailsItems: products.find((el) => el.name === card?.key)?.details
            ?.name,
        reviews: products.find((el) => el.name === card?.key)?.reviews,
    };

    product.price = card?.masterData.current.masterVariant.prices
        ? (
              (card?.masterData.current.masterVariant.prices[0].value
                  .centAmount || 0) / 100
          ).toLocaleString(product.currency, {
              style: 'currency',
              currency: product.currency,
          })
        : '';
    product.discount = card?.masterData.current.masterVariant.prices
        ? (
              (card?.masterData.current.masterVariant.prices[0].discounted
                  ?.value.centAmount || 0) / 100
          ).toLocaleString(product.currency, {
              style: 'currency',
              currency: product.currency,
          })
        : '';

    const [modalActive, setModalActive] = useState(false);

    // Slider functionality
    const [index, setIndex] = useState(0);

    function handleClickSlideIndex(event: React.MouseEvent<HTMLElement>): void {
        const target = event.target as HTMLElement;

        setIndex(Number(target.dataset.num));
    }

    const modalSwiper = new ModalSwiper('.swiper-container2', {
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
        initialSlide: index,
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

    const sliderState = (): void => {
        if (modalActive) {
            modalSwiper.destroy();
        } else {
            modalSwiper.init();
        }
    };

    return (
        <>
            <Header
                setSearchValue={(): void => {
                    throw new Error('Function not implemented.');
                }}
            />
            <Modal
                active={modalActive}
                setActive={setModalActive}
                onClick={sliderState}
            >
                <div className="swiper-container2">
                    <div className="swiper-wrapper">
                        {product.images?.map((img, i) => (
                            <div className="swiper-slide" key={i}>
                                <img src={img} alt="img" data-num={i} />
                            </div>
                        ))}
                    </div>
                    <div className="swiper-button-prev slider-arrow" />
                    <div className="swiper-button-next slider-arrow" />
                    <div className="swiper-scrollbar" />
                </div>
            </Modal>
            <section className="product">
                <ul className="product__path">
                    <li>
                        <Link to="/">Главная / </Link>
                    </li>
                    <li>Каталог / </li>
                    <li>Космотуры / </li>
                    <li>{product.title}</li>
                </ul>

                <div className="product__back">
                    <span />
                    <Link to="/store">Назад</Link>
                </div>
                <div className="product__box">
                    <div className="product__imgs">
                        <div className="slider">
                            <Swiper
                                effect="coverflow"
                                grabCursor
                                slidesPerView={1}
                                spaceBetween={20}
                                coverflowEffect={{
                                    rotate: 0,
                                    stretch: 0,
                                    depth: 100,
                                    modifier: 2.5,
                                }}
                                pagination={{
                                    el: '.swiper-pagination',
                                    clickable: true,
                                }}
                                navigation={{
                                    nextEl: '.swiper-button-next',
                                    prevEl: '.swiper-button-prev',
                                }}
                                modules={[
                                    EffectCoverflow,
                                    Pagination,
                                    Navigation,
                                ]}
                                className="swiper-container"
                            >
                                {product.images?.map((img, i) => (
                                    <SwiperSlide
                                        key={i}
                                        onClick={(e): void => {
                                            setModalActive(true);
                                            handleClickSlideIndex(e);
                                            sliderState();
                                        }}
                                    >
                                        <img src={img} alt="img" data-num={i} />
                                    </SwiperSlide>
                                ))}

                                <div className="slider-controler">
                                    <div className="swiper-button-prev slider-arrow" />
                                    <div className="swiper-button-next slider-arrow" />
                                    <div className="swiper-pagination" />
                                </div>
                            </Swiper>
                        </div>
                        <div className="slider-details">
                            {product.images?.map((img, i) => (
                                <div
                                    tabIndex={0}
                                    role="button"
                                    onKeyDown={(): void => {
                                        // console.log(e);
                                    }}
                                    key={i}
                                    onClick={(e): void => {
                                        setModalActive(true);
                                        handleClickSlideIndex(e);
                                        sliderState();
                                    }}
                                >
                                    <img src={img} alt="" data-num={i} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="product__info">
                        <h1 className="info-title">{product.title}</h1>
                        <div className="info-text">
                            <p>{product.description}</p>
                        </div>
                        <div className="info-price">
                            <div
                                className={
                                    product.discount !== '$0.00'
                                        ? 'info-discount'
                                        : 'info-discount--inactive'
                                }
                            >
                                <span>Цена со скидкой</span>
                                <span>-15%</span>
                            </div>
                            <div
                                className={
                                    product.discount !== '$0.00'
                                        ? 'info-value--inactive'
                                        : 'info-value info-value--active'
                                }
                            >
                                <span>Ваша цена:</span>
                            </div>
                            <div className="info-value">
                                <span className="info-value__discount">
                                    {product.discount !== '$0.00'
                                        ? product.discount
                                        : ''}
                                </span>
                                <span
                                    className={
                                        product.discount !== '$0.00'
                                            ? 'info-value__price'
                                            : 'info-value__price info-value__price-active'
                                    }
                                >
                                    {product.price}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="product__details">
                        <h3 className="product__details-title">
                            {product.detailsTitle}
                        </h3>
                        <div className="product__details-items">
                            {product.detailsItems?.map((item) => (
                                <button
                                    className="btn btn--item"
                                    key={item}
                                    type="button"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                        <div className="product__details-btns">
                            <button className="btn btn--product" type="button">
                                Продолжить покупки
                            </button>
                            <button
                                className="btn btn--product btn--basket"
                                type="button"
                            >
                                В корзину
                            </button>
                        </div>
                    </div>
                    <div className="product__reviews">
                        <h2>Отзывы</h2>
                        {product.reviews?.map((el, i) => (
                            <div className="review" key={i}>
                                <div className="review__autor">
                                    <img src={avatar} alt="avatar" />
                                    <span>{el.autor}</span>
                                </div>
                                <div className="review__info">
                                    <div
                                        className={`review__text ${
                                            el.autor === 'Чужой'
                                                ? 'review__text--alien'
                                                : ''
                                        } ${
                                            el.autor === 'Хищник'
                                                ? 'review__text--predator'
                                                : ''
                                        }`}
                                    >
                                        {el.text}
                                    </div>
                                    <div className="review__stars">
                                        {Array(el.stars)
                                            .fill(el.stars)
                                            .map((_, j) => (
                                                <img
                                                    key={j}
                                                    src={star}
                                                    alt="star"
                                                />
                                            ))}
                                        {Array(el.starsEmpty)
                                            .fill(el.starsEmpty)
                                            .map((_, k) => (
                                                <img
                                                    key={k}
                                                    src={starEmpty}
                                                    alt="starEmpty"
                                                />
                                            ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
export default ProductDetail;
