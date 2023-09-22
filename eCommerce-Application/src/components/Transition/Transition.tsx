import { useEffect, useRef } from 'react';

function Transition({
    timeline,
}: {
    timeline: gsap.core.Timeline;
}): JSX.Element {
    const transition = useRef(null);
    const transition2 = useRef(null);

    useEffect(() => {
        timeline
            .to(transition.current, {
                xPercent: 100,
                duration: 2.5,

                ease: 'power1.out',
                autoAlpha: 0,
            })
            .to(
                transition2.current,
                {
                    xPercent: -100,
                    duration: 2.5,

                    ease: 'power1.out',
                    autoAlpha: 0,
                },
                '<0'
            );
    });

    return (
        <div className="overlay">
            <div className="transition-animation" ref={transition} />
            <div className="transition-animation-2" ref={transition2} />
        </div>
    );
}

export default Transition;
