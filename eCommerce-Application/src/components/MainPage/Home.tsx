import { Header, Title, Info, Attainments, Catalog, Footer } from '.';

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
            <Footer />
        </>
    );
}

export default Home;
