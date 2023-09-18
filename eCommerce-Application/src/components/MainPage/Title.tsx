import { useRef } from 'react';
import gsap from 'gsap';
import Transition from '../Transition/Transition';

function Title(): JSX.Element {
    const timeline = gsap.timeline();

    const homeTimeline = useRef(null);

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
