import { Header, Title, Info, Attainments } from '.';

function Home(): JSX.Element {
    return (
        <>
            <Header />
            <section className="home">
                <Title />
                <Info />
            </section>
            <Attainments />
        </>
    );
}

export default Home;
