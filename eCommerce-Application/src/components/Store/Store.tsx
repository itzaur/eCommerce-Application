import { useState, useEffect } from 'react';
// import { Routes, Route } from 'react-router-dom';
import Header from './Header';
// import Filters from './Filters';
import { Cards, SearchBar, SideBar } from './index';

import { getProductsByProductType } from '../../commercetools/getProductsByType';

function Store(): JSX.Element {
    // const categories = [
    //     {
    //         parent: 'Космотуры',
    //         children: ['Релакс', 'Хобби', 'Активный отдых'],
    //     },
    // ];
    const [selectedCategory, setSelectedCategory] = useState('Космотуры');
    const [cards, setCards] = useState([]);

    useEffect(() => {
        getProductsByProductType('Космотуры').then((data) => setCards(data));
    }, [selectedCategory]);

    return (
        <>
            <Header />
            <div>
                Тест изменения видов товаров/услуг при клике. Это{' '}
                {selectedCategory}
            </div>
            <SearchBar />
            <SideBar
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />
            <Cards cards={cards} />
            {/* <Filters categories={categories} /> */}
        </>
    );
}

export default Store;
