import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';

import Header from '../Store/Header';
import Footer from '../MainPage/Footer';
import Transition from '../Transition/Transition';
import { aboutUsImages } from '../../utils/constants';
import logo from '../../assets/images/logo.svg';
import logoSchool from '../../assets/images/rsschool.svg';
import autor from '../../assets/images/autor.jpg';
import autor2 from '../../assets/images/autor2.jpg';
import autor3 from '../../assets/images/autor3.jpg';
import autor4 from '../../assets/images/autor4.jpg';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

gsap.registerPlugin(ScrollTrigger);

function About(): JSX.Element {
    const root = document.querySelector('main');
    if (root) root.id = 'about';

    const timeline = gsap.timeline();
    const mainTimeline = useRef(null);
    const aboutTimeline = useRef(null);
    const lineTimeline = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context((self) => {
            const cards = self.selector?.('.about-us__card');
            const text = self.selector?.('.about-us__foundation > *');

            cards.forEach((card: HTMLElement) => {
                gsap.from(card, {
                    x: 150,
                    autoAlpha: 0,

                    scrollTrigger: {
                        trigger: card,
                        start: 'top bottom',
                        end: 'top 5%',
                        scrub: true,
                    },
                });
            });

            gsap.from(text, {
                y: -100,
                autoAlpha: 0,
                stagger: { each: 0.2 },
                scrollTrigger: {
                    trigger: text,
                    start: 'top bottom',
                    end: 'top 5%',
                    scrub: true,
                },
            });

            gsap.from('.swiper-slide', {
                x: 50,
                autoAlpha: 0,
                stagger: { each: 0.2 },
                scrollTrigger: {
                    trigger: '.about-us__text',
                    start: 'bottom bottom',
                    end: 'bottom 10%',
                    scrub: true,
                },
            });

            gsap.from('.about-us__postscript', {
                y: -100,
                autoAlpha: 0,

                scrollTrigger: {
                    trigger: '.about-us__postscript',
                    start: 'bottom bottom',
                    end: 'top 10%',
                    scrub: true,
                },
            });
        }, mainTimeline);

        return () => ctx.revert();
    });

    return (
        <>
            <Transition timeline={timeline} />

            <section className="about-us">
                <Header withSearchValue={false} />
                <div
                    className="profile__container about-us__container"
                    ref={mainTimeline}
                >
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
                            <a
                                className="about-us__logo"
                                href="https://rs.school/js/"
                            >
                                <img src={logoSchool} alt="rsschool logo" />
                            </a>
                            <p className="about-us__school-title">
                                Бесплатная общественная образовательная
                                программа, проводимая сообществом разработчиков
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
                                    src={autor}
                                    alt="founder
"
                                />
                            </figure>
                            <div className="about-us__card-info">
                                <a
                                    className="about-us__card-title"
                                    href="https://github.com/itzaur"
                                >
                                    Павел &quot;itzaur&quot;
                                </a>
                                <h3 className="about-us__card-subtitle">
                                    Директор по общественным связям
                                </h3>
                                <p className="about-us__card-text">
                                    Павел отвечает за создание и реализацию
                                    стратегии развития корпорации, всесторонне
                                    изучая и внедряя новые технологии,
                                    поддержание отношений с существующими
                                    партнерами. Он также разрабатывает и
                                    реализует стратегии взаимодействия со всеми
                                    формами жизни, координирует мероприятия.
                                </p>
                                <p className="about-us__card-text">
                                    Обладает высокими коммуникативными и
                                    аналитическими навыками, следит за новыми
                                    трендами. Правда, не в отношении себя,
                                    потому что носит уже давно вышедшую из моды
                                    земную бороду и пытается учить английский
                                    вместо инопланетных языков. Пунктуален,
                                    педантичен и щепетилен, за что нередко бесит
                                    окружающих. Способен справляться с
                                    различными ситуациями, когда необходимо
                                    защищать репутацию компании от негативного
                                    воздействия, решает проблемы и конфликтные
                                    ситуации. Иногда успешно.
                                </p>
                            </div>
                        </div>
                        <div className="about-us__card">
                            <figure className="about-us__card-img">
                                <img
                                    src={autor2}
                                    alt="founder
"
                                />
                            </figure>
                            <div className="about-us__card-info">
                                <a
                                    className="about-us__card-title"
                                    href="https://github.com/ksu1ven"
                                >
                                    Оксана &quot;ksu1ven&quot;
                                </a>
                                <h3 className="about-us__card-subtitle">
                                    Директор по закупкам товаров, работ, услуг
                                </h3>
                                <p className="about-us__card-text">
                                    Оксана отвечает за планирование, организацию
                                    и контроль всех процессов, связанных с
                                    закупкой товаров и услуг, а также с
                                    доставкой и хранением продукции. Она
                                    устанавливает стратегию закупок,
                                    разрабатывает политику и процедуры в области
                                    закупок и логистики.
                                </p>
                                <p className="about-us__card-text">
                                    Генератор новых идей для решения любых видов
                                    проблем. Даже если решение кажется
                                    неправильным, она все равно найдет верный
                                    подход. Полностью заведует финансовой частью
                                    компании, за что уважаема и почитаема в
                                    организации, особенно в день выдачи
                                    зарплаты. Обеспечивает соблюдение
                                    нормативных требований и стандартов
                                    качества. Увлекается новыми языками
                                    программирования и фреймворками, такими как
                                    rhinoscript, plusha.js, oppa++. Способна
                                    достучаться и получить любые виды данных с
                                    самых удаленных серверов галактики.
                                </p>
                            </div>
                        </div>
                        <div className="about-us__card">
                            <figure className="about-us__card-img">
                                <img src={autor3} alt="founder" />
                            </figure>
                            <div className="about-us__card-info">
                                <a
                                    className="about-us__card-title"
                                    href="https://github.com/maxxx1mhr"
                                >
                                    Максим &quot;maxxx1mhr&quot;
                                </a>
                                <h3 className="about-us__card-subtitle">
                                    Директор по работе с клиентами
                                </h3>
                                <p className="about-us__card-text">
                                    Максим отвечает за удовлетворение
                                    потребностей и желаний клиентов, даже если
                                    они нереальны или абсурдны. Анализирует и
                                    решает сложные проблемы, связанные с
                                    обслуживанием клиентов, такие как
                                    регистрация, адреса доставки, конфликты и
                                    кризисы. Постоянно изучает рынок,
                                    конкурентов и потребительские тренды, чтобы
                                    предлагать клиентам самые лучшие решения и
                                    услуги.
                                </p>
                                <p className="about-us__card-text">
                                    Работая ранее в сфере добычи полезных
                                    ископаемых, привнес в организацию много
                                    новшеств и стартовый капитал. Первый
                                    человек, лично протестировавший все виды
                                    услуг организации. Владелец агроусадеб на
                                    Марсе и Сатурне, почетный гражданин Плутона.
                                </p>
                            </div>
                        </div>
                        <div className="about-us__card">
                            <figure className="about-us__card-img">
                                <img src={autor4} alt="founder" />
                            </figure>
                            <div className="about-us__card-info">
                                <a
                                    className="about-us__card-title"
                                    href="https://www.instagram.com/natallia_nid/"
                                >
                                    Наталья &quot;NID&quot;
                                </a>
                                <h3 className="about-us__card-subtitle">
                                    Креативный директор
                                </h3>
                                <p className="about-us__card-text">
                                    Наталья, самый незаметный член команды,
                                    сделавший заметным{' '}
                                    <span>The Space Travel Corporation</span> не
                                    только в нашей галактике, но и далеко за ее
                                    пределами. Отвечает за разработку и
                                    реализацию оригинальных и привлекательных
                                    идей для рекламных кампаний, дизайна,
                                    брендинга и других проектов. Поддерживает
                                    свежий и оригинальный взгляд на вещи. Иногда
                                    шутит, но не обижает никого.
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
