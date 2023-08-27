import { useState, useEffect } from 'react';
// import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ProductProjection } from '@commercetools/platform-sdk';
import { Category } from '../../types';
import Header from './Header';
import { Cards, SideBar, Parameters } from './index';
import { getCategories } from '../../commercetools/getCategories';
import { getProductsByProductType } from '../../commercetools/getProductsByType';
import { getProductsBySubcategory } from '../../commercetools/getProductsBySubcategory';
import { getAllProducts } from '../../commercetools/getAllProducts';

function Store({ type }: Record<'type', string>): JSX.Element {
    const [selectedType, setSelectedType] = useState(type);
    const [selectedTypePath, setSelectedTypePath] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCategoryPath, setSelectedCategoryPath] = useState('');
    const [cards, setCards] = useState<ProductProjection[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getCategories().then((data) => {
            if (data) setCategories(data);
        });

        if (selectedCategory) {
            getProductsBySubcategory(selectedCategory).then((data) => {
                if (data) setCards(data);
            });
        } else if (selectedType) {
            getProductsByProductType(selectedType).then((data) => {
                if (data) setCards(data);
            });
        } else {
            getAllProducts().then((data) => {
                if (data) setCards(data);
            });
        }
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
                        <Link
                            to="/store"
                            onClick={(): void => {
                                setSelectedType('');
                                setSelectedCategory('');
                            }}
                        >
                            Каталог
                        </Link>
                    </li>
                    {selectedType && (
                        <li>
                            <Link
                                to={`/store/${selectedTypePath}`}
                                onClick={(): void => setSelectedCategory('')}
                            >
                                / {selectedType}{' '}
                            </Link>
                        </li>
                    )}
                    {selectedCategory && (
                        <li>
                            <Link
                                to={`/store/${selectedTypePath}/${selectedCategoryPath}`}
                            >
                                / {selectedCategory}
                            </Link>
                        </li>
                    )}
                </ul>
                <section className="store__content">
                    <SideBar
                        categories={categories}
                        setSelectedType={setSelectedType}
                        setSelectedTypePath={setSelectedTypePath}
                        setSelectedCategory={setSelectedCategory}
                        setSelectedCategoryPath={setSelectedCategoryPath}
                    />
                    <div>
                        <Parameters
                            cards={cards}
                            categories={categories}
                            selectedType={selectedType}
                            selectedCategory={selectedCategory}
                        />
                        {cards.length && <Cards cards={cards} />}
                    </div>
                </section>
            </section>
        </>
    );
}

export default Store;
