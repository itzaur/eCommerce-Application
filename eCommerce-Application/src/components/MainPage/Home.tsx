import gsap from 'gsap';
import Transition from '../Transition/Transition';
import { Header, Title, Info, Attainments, Catalog, Footer } from '.';

function Home(): JSX.Element {
    const timeline = gsap.timeline();

    return (
        <>
            <Transition timeline={timeline} />
            <Header />
            <section className="home">
                <Title />
                <Info />
            </section>
            <Attainments />
            <Catalog />
            <Footer />
        </>
    );
}

export default Home;
