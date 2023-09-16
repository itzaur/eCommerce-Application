import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Transition from '../Transition/Transition';

function Title(): JSX.Element {
    const timeline = gsap.timeline();
    const homeTimeline = useRef(null);

    useEffect(() => {
        timeline
            .from(
                homeTimeline.current,
                {
                    x: -100,

                    duration: 0.9,
                    ease: 'back.out',
                },
                '<0.2'
            )
            .from(
                '.home__btns .btn',
                {
                    x: -40,
                    autoAlpha: 0,
                    stagger: { each: 0.2 },
                    duration: 0.5,
                    ease: 'back.out',
                },
                '<0'
            )
            .from(
                '.arrow',
                {
                    y: -10,
                    autoAlpha: 0,
                    duration: 0.9,
                    ease: 'power1.in',
                    onComplete: () => {
                        gsap.to('.arrow img', {
                            y: 10,
                            yoyo: true,
                            repeat: -1,
                        });
                    },
                },
                '-=1.5'
            )
            .from(
                '.home__text',
                {
                    '--scaleY': 0,
                    transformOrigin: 'top',
                    autoAlpha: 0,

                    duration: 1.6,
                    ease: 'back.out',
                },
                '<0'
            )
            .from(
                '.home__text > *',
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
            );
    });

    return (
        <>
            <Transition timeline={timeline} />
            <div className="home__title" ref={homeTimeline}>
                <h1 className="title">
                    space <br /> odyssey <br /> <span>4165</span>
                </h1>
            </div>
        </>
    );
}

export default Title;
