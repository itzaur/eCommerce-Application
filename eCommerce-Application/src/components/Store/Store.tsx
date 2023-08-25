import { useState, useEffect } from 'react';
// import { Routes, Route } from 'react-router-dom';
import { ProductProjection } from '@commercetools/platform-sdk';
import Header from './Header';
import { Cards, SearchBar, SideBar } from './index';

import { getProductsByProductType } from '../../commercetools/getProductsByType';
import { getProductsBySubcategory } from '../../commercetools/getProductsBySubcategory';

function Store(): JSX.Element {
    const [selectedType, setSelectedType] = useState('Космотуры');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [cards, setCards] = useState<ProductProjection[]>([]);

    useEffect(() => {
        if (selectedCategory) {
            getProductsBySubcategory(selectedCategory).then((data) => {
                if (data) setCards(data);
            });
            return;
        }
        getProductsByProductType(selectedType).then((data) => {
            if (data) setCards(data);
        });
    }, [selectedCategory, selectedType]);

    return (
        <>
            <Header />
            <SearchBar />
            <section className="store__content">
                <SideBar
                    setSelectedType={setSelectedType}
                    setSelectedCategory={setSelectedCategory}
                />

                {cards.length && <Cards cards={cards} />}
            </section>
        </>
    );
}

export default Store;
