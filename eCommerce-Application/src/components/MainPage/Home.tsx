import { Header, Title, Info, Attainments, Catalog } from '.';

function Home(): JSX.Element {
    return (
        <>
            <Header />
            <section className="home">
                <Title />
                <Info />
            </section>
            <Attainments />
            <Catalog />
        </>
    );
}

export default Home;
