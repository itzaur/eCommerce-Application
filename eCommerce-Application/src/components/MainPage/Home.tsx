import { Header, Title, Info } from '.';

function Home(): JSX.Element {
    return (
        <>
            <Header />
            <section className="home">
                <Title />
                <Info />
            </section>
        </>
    );
}

export default Home;
