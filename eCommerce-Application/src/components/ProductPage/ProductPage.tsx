import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { Product, Cart, LineItem } from '@commercetools/platform-sdk';
import ClipLoader from 'react-spinners/RingLoader';
import CircleLoader from 'react-spinners/CircleLoader';
import gsap from 'gsap';
import {
    products,
    serverErrorMessage,
    setErrorBodyDOM,
} from '../../utils/constants';
import { ProductOptions, UpdateCartMode } from '../../types';

import { getProductKey } from '../../commercetools/getProductKey';
import { Header } from '../Store';
import { Footer } from '../MainPage';
import Transition from '../Transition/Transition';
import starEmpty from '../../assets/images/review-star-empty.png';
import avatar from '../../assets/images/user.png';
import star from '../../assets/images/review-star.png';
import Modal from '../NotFoundPage/Modal';
import BreadCrumbs from '../Store/BreadCrumbs';
import createSlider from '../Slider/Slider';
import { addNewProductInCartOrUpdateQuantity } from '../../commercetools/updateCart';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

function ProductDetail({
    type,
    category,
    typePath,
    categoryPath,
}: {
    type: string;
    category: string;
    typePath: string;
    categoryPath: string;
}): JSX.Element {
    const [selectedType, setSelectedType] = useState(type);
    const selectedTypePath = typePath;
    const [selectedCategory, setSelectedCategory] = useState(category || '');
    const selectedCategoryPath = categoryPath;
    const [card, setCard] = useState<Product>();
    const location = useLocation().pathname.split('/').at(-1) as string;
    const cardOptions = card?.masterData.current;
    const cardDetails = card?.masterData.current.masterVariant;
    const [isFetching, setIsFetching] = useState(true);

    const [activeCart, setActiveCart] = useState<Cart | null>(
        localStorage.getItem('activeCart')
            ? JSON.parse(localStorage.getItem('activeCart') as string)
            : null
    );
    const [cardInCart, setCardInCart] = useState(false);
    const [cartLoading, setCartLoading] = useState(false);

    const timeline = gsap.timeline();

    useEffect(() => {
        getProductKey(location)
            .then((result) => {
                setCard(result);
                if (activeCart)
                    setCardInCart(
                        activeCart.lineItems
                            .map((el: LineItem) => el.productId)
                            .includes(result.id)
                    );
                setIsFetching(false);
            })
            .catch((err: Error) => {
                setErrorBodyDOM(err);
            });
    }, [location, activeCart]);

    const product: ProductOptions = {
        title: cardOptions?.name ? cardOptions?.name['ru-RU'] : '',
        description: cardOptions?.description
            ? cardOptions.description['ru-RU']
            : '',
        currency: cardDetails?.prices
            ? cardDetails.prices[0].value.currencyCode
            : '',
        images: cardDetails?.images?.map((el) => el.url),
        imageSrc: cardDetails?.images ? cardDetails.images[0].url : '',
        imageAlt: cardDetails?.images ? cardDetails.images[0].label : '',
        detailsTitle: '',
        detailsItems: [],
        reviews: [],
    };

    const foundProduct = products.find((el) => el.name === card?.key);
    product.detailsTitle = foundProduct?.details.title;
    product.detailsItems = foundProduct?.details.name;
    product.reviews = foundProduct?.reviews;

    product.price = cardDetails?.prices
        ? ((cardDetails.prices[0].value.centAmount || 0) / 100).toLocaleString(
              'ru'
          )
        : '';
    product.discount = cardDetails?.prices
        ? (cardDetails.prices[0].discounted?.value.centAmount || 0) / 100
        : '';

    const [modalActive, setModalActive] = useState(false);

    // Slider functionality
    const [slideIndex, setSlideIndex] = useState(0);

    function handleClickSlideIndex(event: React.MouseEvent<HTMLElement>): void {
        const target = event.target as HTMLElement;

        setSlideIndex(Number(target.dataset.num));
    }

    const slider = createSlider('.swiper-container2', slideIndex);

    const sliderState = (): void => {
        if (modalActive) {
            slider.destroy();
        } else {
            slider.init();
        }
    };

    function addRemoveProductInCartDOM(mode: UpdateCartMode): void {
        const quantity = Number(mode === 'new');
        if (card) {
            setCartLoading(true);

            addNewProductInCartOrUpdateQuantity({
                cartData: activeCart,
                mode,
                cardId: card.id,
                quantity,
                firstFunctionCall: true,
            })
                .then((data) => {
                    if (data) setActiveCart(data);
                    setCardInCart(mode === 'new');
                })
                .catch((err) => {
                    if (
                        err instanceof Error &&
                        err.message === serverErrorMessage
                    ) {
                        setErrorBodyDOM(err);
                    }
                })
                .finally(() => {
                    setCartLoading(false);
                });
        }
    }

    return (
        <>
            <Transition timeline={timeline} />
            <Header withSearchValue={false} setSearchValue={undefined} />
            <Modal
                active={modalActive}
                setActive={setModalActive}
                onClick={sliderState}
            >
                <div className="swiper-container2">
                    <div className="swiper-wrapper">
                        {product.images?.map((img, i) => (
                            <div className="swiper-slide" key={img}>
                                <img
                                    src={img}
                                    alt="product illustration"
                                    data-num={i}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="swiper-button-prev slider-arrow" />
                    <div className="swiper-button-next slider-arrow" />
                    <div className="swiper-scrollbar" />
                </div>
            </Modal>

            <section className="product">
                <BreadCrumbs
                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                    selectedTypePath={selectedTypePath}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedCategoryPath={selectedCategoryPath}
                    selectedProduct={
                        card?.masterData.current.name['ru-RU'] || ''
                    }
                    selectedProductPath={card?.key || ''}
                />

                <button
                    className="product__back"
                    type="button"
                    onClick={(): void => {
                        window.history.back();
                    }}
                >
                    <span />
                    Назад
                </button>

                <div className="product__box">
                    {isFetching ? (
                        <ClipLoader
                            color="#4fe1e3"
                            loading={isFetching}
                            size={150}
                            className="store__loader store__loader_product"
                        />
                    ) : (
                        <>
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
                                                key={img}
                                                onClick={(e): void => {
                                                    setModalActive(true);
                                                    handleClickSlideIndex(e);
                                                    sliderState();
                                                }}
                                            >
                                                <img
                                                    src={img}
                                                    alt="product illustration"
                                                    data-num={i}
                                                />
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
                                            onKeyDown={undefined}
                                            key={img}
                                            onClick={(e): void => {
                                                setModalActive(true);
                                                handleClickSlideIndex(e);
                                                sliderState();
                                            }}
                                        >
                                            <img
                                                src={img}
                                                alt="product illustration"
                                                data-num={i}
                                            />
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
                                            product.discount === 0
                                                ? 'info-discount--inactive'
                                                : 'info-discount'
                                        }
                                    >
                                        <span>Цена со скидкой</span>
                                        <span>-15%</span>
                                    </div>
                                    <div
                                        className={
                                            product.discount === 0
                                                ? 'info-value info-value--active'
                                                : 'info-value--inactive'
                                        }
                                    >
                                        <span>Ваша цена:</span>
                                    </div>
                                    <div className="info-value">
                                        <span className="info-value__discount">
                                            {product.discount === 0
                                                ? ''
                                                : `$ ${product.discount.toLocaleString(
                                                      'ru'
                                                  )}`}
                                        </span>
                                        <span
                                            className={
                                                product.discount === 0
                                                    ? 'info-value__price info-value__price-active'
                                                    : 'info-value__price'
                                            }
                                        >
                                            {`$ ${product.price}`}
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
                                    <Link to="/store">
                                        <button
                                            className="btn btn--product"
                                            type="button"
                                        >
                                            Продолжить покупки
                                        </button>
                                    </Link>

                                    <button
                                        className={
                                            cardInCart
                                                ? 'btn--product'
                                                : 'btn btn--product btn--basket'
                                        }
                                        type="button"
                                        disabled={!!cardInCart}
                                        onClick={(): void => {
                                            addRemoveProductInCartDOM('new');
                                        }}
                                    >
                                        {!cartLoading && <span>В корзину</span>}
                                        {cartLoading && (
                                            <CircleLoader
                                                color="hsl(0, 0%, 100%)"
                                                loading={cartLoading}
                                                size={40}
                                            />
                                        )}
                                    </button>

                                    {cardInCart && !cartLoading && (
                                        <button
                                            className="btn btn--product btn--basket"
                                            type="button"
                                            onClick={(): void => {
                                                addRemoveProductInCartDOM(
                                                    'update'
                                                );
                                            }}
                                        >
                                            {!cartLoading && (
                                                <span>Удалить из корзины</span>
                                            )}
                                            {cartLoading && (
                                                <CircleLoader
                                                    color="hsl(252, 12%, 40%);"
                                                    loading={cartLoading}
                                                    size={40}
                                                />
                                            )}
                                        </button>
                                    )}
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
                        </>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
}
export default ProductDetail;
