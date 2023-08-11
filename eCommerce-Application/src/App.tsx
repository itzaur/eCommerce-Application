import { getProject } from './commercetools/Client';
import { Header, Title, Info } from './components/MainPage';

function App(): JSX.Element {
    getProject().then(console.log).catch(console.error);

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

export default App;
