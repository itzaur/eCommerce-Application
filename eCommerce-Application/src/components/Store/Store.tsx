import { useState, useEffect } from 'react';
// import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ProductProjection } from '@commercetools/platform-sdk';
import Header from './Header';
import { Cards, SideBar, Parameters } from './index';

import { getProductsByProductType } from '../../commercetools/getProductsByType';
import { getProductsBySubcategory } from '../../commercetools/getProductsBySubcategory';

function Store({ type }: Record<'type', string>): JSX.Element {
    const [selectedType, setSelectedType] = useState(type);
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
            <section className="store__main">
                <ul className="bread-crumbs">
                    <li>
                        <Link to="/">Главная /</Link>
                    </li>
                    <li>
                        <Link to="/store">Каталог /</Link>
                    </li>
                    <li>
                        <Link to="/store">{selectedType} </Link>
                    </li>
                </ul>
                <section className="store__content">
                    <SideBar
                        setSelectedType={setSelectedType}
                        setSelectedCategory={setSelectedCategory}
                    />
                    <div>
                        <Parameters
                            cards={cards}
                            selectedType={selectedType}
                            // selectedCategory={selectedCategory}
                            // setSelectedType={setSelectedType}
                            // setSelectedCategory={setSelectedCategory}
                        />
                        {cards.length && <Cards cards={cards} />}
                    </div>
                </section>
            </section>
        </>
    );
}

export default Store;
