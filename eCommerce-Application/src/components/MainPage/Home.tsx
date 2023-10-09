import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';
import Transition from '../Transition/Transition';
import { Header, Title, Info, Attainments, Catalog, Footer } from '.';

gsap.registerPlugin(ScrollTrigger);

function Home(): JSX.Element {
    const timeline = gsap.timeline();
    const mainTimeline = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context((self) => {
            const text = self.selector?.('.home__text--scroll p');
            const attainment = self.selector?.('.attainment');
            const promocodes = self.selector?.('.attainment--promocodes');

            gsap.from(attainment, {
                height: 0,
                autoAlpha: 0,
                stagger: { each: 0.2 },
                scrollTrigger: {
                    trigger: attainment,
                    start: '100% bottom',
                    end: 'top 30%',
                    scrub: true,
                },
            });

            gsap.from(promocodes, {
                y: 200,
                autoAlpha: 0,
                skewX: 30,

                scrollTrigger: {
                    trigger: promocodes,
                    start: 'top bottom',
                    end: 'top 10%',
                    scrub: true,
                },
            });

            gsap.from(text, {
                y: 50,
                autoAlpha: 0,
                stagger: { each: 0.2 },
                skewX: 30,
                transformOrigin: 'right top',
                scrollTrigger: {
                    trigger: text,
                    start: 'center bottom',
                    end: 'top 40%',
                    scrub: true,
                },
            });

            gsap.from('.catalog__title', {
                x: -300,
                autoAlpha: 0,
                skewX: 30,
                transformOrigin: 'right top',
                scrollTrigger: {
                    trigger: '.catalog__title',
                    start: 'bottom bottom',
                    end: 'top 10%',
                    scrub: true,
                },
            });

            gsap.from('.catalog__item', {
                x: 100,
                autoAlpha: 0,
                stagger: { each: 0.2, from: 'center' },

                clearProps: 'all',
                scrollTrigger: {
                    trigger: '.catalog__item',
                    start: 'top center',
                    end: 'center 30%',
                    scrub: true,
                },
            });

            gsap.from('.catalog__decoration', {
                scaleX: 0,
                autoAlpha: 0,

                scrollTrigger: {
                    trigger: '.catalog__decoration',
                    start: 'top bottom',
                    end: 'top 30%',
                    scrub: true,
                },
            });
        }, mainTimeline);

        return () => ctx.revert();
    });

    return (
        <>
            <Transition timeline={timeline} />
            <div className="page" ref={mainTimeline}>
                <Header />
                <section className="home">
                    <Title />
                    <Info />
                </section>
                <Attainments />
                <Catalog />
            </div>
            <Footer />
        </>
    );
}

export default Home;
