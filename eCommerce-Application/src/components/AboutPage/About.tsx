import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';

import Header from '../Store/Header';
import Footer from '../MainPage/Footer';
import Transition from '../Transition/Transition';
import { aboutUsImages } from '../../utils/constants';
import logo from '../../assets/images/logo.svg';
import logoSchool from '../../assets/images/rsschool.svg';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

function About(): JSX.Element {
    const timeline = gsap.timeline();
    const aboutTimeline = useRef(null);
    const lineTimeline = useRef(null);

    useEffect(() => {
        timeline
            .from(
                aboutTimeline.current,
                {
                    x: -100,

                    duration: 0.9,
                    ease: 'expo.out',
                },
                '<0.2'
            )
            .from(
                '.about-us__text p',
                {
                    x: 100,
                    autoAlpha: 0,
                    stagger: { each: 0.1 },
                    skewX: 30,
                    transformOrigin: 'right top',
                    duration: 1,
                    ease: 'expo',
                },
                '<0'
            )
            .from(
                lineTimeline.current,
                {
                    scale: 0,
                    transformOrigin: 'top',

                    duration: 1.4,
                    ease: 'expo.out',
                },
                '<0'
            )
            .from(
                '.nav__item',
                {
                    xPercent: '100',
                    autoAlpha: 0,
                    stagger: { each: 0.2 },
                    duration: 1.5,
                    ease: 'expo.out',
                },
                '<0'
            )
            .from(
                ['.header-nav__logo', '.bread-crumbs', '.about-us__back'],
                {
                    xPercent: -100,
                    autoAlpha: 0,
                    duration: 1.5,
                    ease: 'expo.out',
                    clearProps: 'opacity',
                },
                '<0'
            );
    });

    return (
        <>
            <Transition timeline={timeline} />
            <section className="about-us">
                <Header withSearchValue={false} setSearchValue={undefined} />
                <div className="profile__container about-us__container">
                    <ul className="bread-crumbs">
                        <li>
                            <Link to="/">Главная /</Link>
                        </li>
                        <li>
                            <Link to="/about">О нас</Link>
                        </li>
                    </ul>
                    <button
                        className="product__back about-us__back"
                        type="button"
                        onClick={(): void => {
                            window.history.back();
                        }}
                    >
                        <span />
                        Назад
                    </button>
                    <div className="about-us__description">
                        <div className="about-us__school" ref={aboutTimeline}>
                            <figure className="about-us__logo">
                                <img src={logoSchool} alt="rsschool logo" />
                            </figure>
                            <p className="about-us__school-title">
                                Бесплатная образовательная программа на уровне
                                сообщества, проводимая сообществом разработчиков
                                The Rolling Scopes с 2013 года.
                            </p>
                        </div>

                        <div className="about-us__line">
                            <span className="circle" />
                            <span className="line" ref={lineTimeline} />
                        </div>
                        <div className="about-us__text">
                            <p className="about-us__text-title">
                                привет, друзья! <br /> мы рады, что вы здесь!
                            </p>
                            <p className="about-us__text-subtitle">
                                Мы - Межгалактическая объединенная корпорация,
                                созданная с целью расширения границ познания и
                                создания нерушимых добрососедских союзов со
                                всеми формами жизни Вселенной.
                            </p>
                            <p className="about-us__text-subtitle">
                                мы предоставляем вам возможность посетить самые
                                отдаленные уголки нашей необъятной вселенной,
                                бросая вызов своим страхам и сомнениям, делая
                                вас сильнее и открытыми к новым достижениям.
                            </p>
                            <p className="about-us__text-subtitle">
                                Являемся беспрецедентными представителями сферы
                                услуг развлечений и досуга.
                            </p>
                            <p className="about-us__text-subtitle">
                                <span>При поддержке</span> The Rolling Scopes.
                            </p>
                            <p className="about-us__text-detail">
                                Выбирая наши космотуры, Вы получаете ни с чем не
                                сравнимые впечатления, исключительный опыт и
                                непередаваемые эмоции. Вместе с тем, мы до
                                последней секунды заботимся о Вашем комфортном
                                пребывании на борту нашего космолета{' '}
                                <span>
                                    &quot;Космическая Одиссея-4165&quot;
                                </span>
                                , обеспечивая самые уютные номера для
                                полноценного отдыха, самые изысканные
                                развлечения для абсолютной ликвидации
                                беспросветной скуки, а также оригинальные
                                сувениры для бесценных воспоминаний о Вашем
                                путешествии. Во время Вашего приключения к Вашим
                                услугам будут предоставлены игровые залы,
                                шикарные бары, релакс-комнаты, просторные
                                бассейны, зажигательные танцполы и многое
                                другое.
                            </p>
                        </div>
                    </div>

                    <Swiper
                        effect="coverflow"
                        grabCursor
                        centeredSlides
                        slidesPerView="auto"
                        initialSlide={aboutUsImages.length / 2}
                        coverflowEffect={{
                            rotate: 40,
                            stretch: 0,
                            depth: 90,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        modules={[EffectCoverflow]}
                        className="about-us__slider"
                    >
                        {aboutUsImages.map((item) => (
                            <SwiperSlide key={item.id}>
                                <img src={item.src} alt="about-us-slider" />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="about-us__description">
                        <div className="about-us__school">
                            <span className="sr-only" />
                        </div>
                        <div className="about-us__foundation">
                            <figure>
                                <img src={logo} alt="logo" />
                            </figure>
                            <h1 className="about-us__foundation-title">
                                Основатели
                            </h1>
                            <h2 className="about-us__foundation-subtitle">
                                The space travel corporation
                            </h2>
                            <p className="about-us__foundation-text">
                                Команда некогда неуверенных в себе новичков, а
                                нынче, профессионалов, которых объединила общая
                                миссия - сделать космос доступным для всех. Не
                                останавляиваясь на достигнутом, стремятся
                                реализовывать смелые планы и интересные идеи.
                            </p>
                        </div>
                    </div>
                    <div className="about-us__cards">
                        <div className="about-us__card">
                            <figure className="about-us__card-img">
                                <img
                                    src="https://loremflickr.com/640/360"
                                    alt="founder
"
                                />
                            </figure>
                            <div className="about-us__card-info">
                                <h3 className="about-us__card-title">
                                    павел itzaur
                                </h3>
                                <h3 className="about-us__card-subtitle">
                                    Директор по общественным связям
                                </h3>
                                <p className="about-us__card-text">
                                    Выбирая наши космотуры, Вы получаете ни с
                                    чем не сравнимые впечатления, исключительный
                                    опыт и непередаваемые эмоции. Вместе с тем,
                                    мы до последней секунды заботимся о Вашем
                                    комфортном пребывании на борту нашего
                                    космолета{' '}
                                    <span>
                                        &quot;Космическая Одиссея-4165&quot;
                                    </span>
                                    , обеспечивая самые уютные номера для
                                    полноценного отдыха, самые изысканные
                                    развлечения для абсолютной ликвидации
                                    беспросветной скуки, а также оригинальные
                                    сувениры для бесценных воспоминаний о Вашем
                                    путешествии.
                                </p>
                            </div>
                        </div>
                        <div className="about-us__card">
                            <figure className="about-us__card-img">
                                <img
                                    src="https://loremflickr.com/640/360"
                                    alt="founder
"
                                />
                            </figure>
                            <div className="about-us__card-info">
                                <h3 className="about-us__card-title">
                                    павел itzaur
                                </h3>
                                <h3 className="about-us__card-subtitle">
                                    Директор по общественным связям
                                </h3>
                                <p className="about-us__card-text">
                                    Выбирая наши космотуры, Вы получаете ни с
                                    чем не сравнимые впечатления, исключительный
                                    опыт и непередаваемые эмоции. Вместе с тем,
                                    мы до последней секунды заботимся о Вашем
                                    комфортном пребывании на борту нашего
                                    космолета{' '}
                                    <span>
                                        &quot;Космическая Одиссея-4165&quot;
                                    </span>
                                    , обеспечивая самые уютные номера для
                                    полноценного отдыха, самые изысканные
                                    развлечения для абсолютной ликвидации
                                    беспросветной скуки, а также оригинальные
                                    сувениры для бесценных воспоминаний о Вашем
                                    путешествии.
                                </p>
                            </div>
                        </div>
                        <div className="about-us__card">
                            <figure className="about-us__card-img">
                                <img
                                    src="https://loremflickr.com/640/360"
                                    alt="founder
"
                                />
                            </figure>
                            <div className="about-us__card-info">
                                <h3 className="about-us__card-title">
                                    павел itzaur
                                </h3>
                                <h3 className="about-us__card-subtitle">
                                    Директор по общественным связям
                                </h3>
                                <p className="about-us__card-text">
                                    Выбирая наши космотуры, Вы получаете ни с
                                    чем не сравнимые впечатления, исключительный
                                    опыт и непередаваемые эмоции. Вместе с тем,
                                    мы до последней секунды заботимся о Вашем
                                    комфортном пребывании на борту нашего
                                    космолета{' '}
                                    <span>
                                        &quot;Космическая Одиссея-4165&quot;
                                    </span>
                                    , обеспечивая самые уютные номера для
                                    полноценного отдыха, самые изысканные
                                    развлечения для абсолютной ликвидации
                                    беспросветной скуки, а также оригинальные
                                    сувениры для бесценных воспоминаний о Вашем
                                    путешествии.
                                </p>
                            </div>
                        </div>
                        <div className="about-us__card">
                            <figure className="about-us__card-img">
                                <img
                                    src="https://loremflickr.com/640/360"
                                    alt="founder
"
                                />
                            </figure>
                            <div className="about-us__card-info">
                                <h3 className="about-us__card-title">
                                    павел itzaur
                                </h3>
                                <h3 className="about-us__card-subtitle">
                                    Директор по общественным связям
                                </h3>
                                <p className="about-us__card-text">
                                    Выбирая наши космотуры, Вы получаете ни с
                                    чем не сравнимые впечатления, исключительный
                                    опыт и непередаваемые эмоции. Вместе с тем,
                                    мы до последней секунды заботимся о Вашем
                                    комфортном пребывании на борту нашего
                                    космолета{' '}
                                    <span>
                                        &quot;Космическая Одиссея-4165&quot;
                                    </span>
                                    , обеспечивая самые уютные номера для
                                    полноценного отдыха, самые изысканные
                                    развлечения для абсолютной ликвидации
                                    беспросветной скуки, а также оригинальные
                                    сувениры для бесценных воспоминаний о Вашем
                                    путешествии.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="about-us__postscript">
                        <h2>Вместе открываем новые горизонты!</h2>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default About;
