import Header from './Header';
import Filters from './Filters';

function Store(): JSX.Element {
    const categories = [
        {
            parent: 'Космотуры',
            children: ['Релакс', 'Хобби', 'Активный отдых'],
        },
    ];
    return (
        <>
            <Header />
            <Filters categories={categories} />
        </>
    );
}

export default Store;
