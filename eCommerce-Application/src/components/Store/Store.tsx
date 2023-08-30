import { useState, useEffect } from 'react';
// import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ProductProjection } from '@commercetools/platform-sdk';
import { Category } from '../../types';
import Header from './Header';
import { Cards, SideBar, Parameters } from './index';
import { getCategories } from '../../commercetools/getCategories';
import { getProductsByProductType } from '../../commercetools/getProductsByType';
import {
    getProductsBySubcategory,
    getSubCategoryId,
} from '../../commercetools/getProductsBySubcategory';
import { getAllProducts } from '../../commercetools/getAllProducts';
import { checkFilterVariants } from '../../utils/checkFilterVariants';
import { checkMinMaxPrice } from '../../utils/checkMinMaxPrice';

function Store({
    type,
    category,
}: {
    type: string;
    category: string;
}): JSX.Element {
    const [selectedType, setSelectedType] = useState(type);
    const [selectedTypePath, setSelectedTypePath] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(category || '');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [selectedCategoryPath, setSelectedCategoryPath] = useState('');
    const [cards, setCards] = useState<ProductProjection[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [filterVariants, setFilterVariants] = useState<string[]>([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [minSelectedPrice, setMinSelectedPrice] = useState(0);
    const [maxSelectedPrice, setMaxSelectedPrice] = useState(0);

    useEffect(() => {
        getCategories().then((data) => {
            if (data) setCategories(data);
        });
        if (category)
            getSubCategoryId(category).then((data) => {
                if (data) setSelectedCategoryId(data);
            });

        if (selectedCategory) {
            getProductsBySubcategory(selectedCategory).then((data) => {
                if (data) {
                    if (data.length) {
                        setFilterVariants(checkFilterVariants(data));
                    }

                    setCards(data);
                    setMinPrice(checkMinMaxPrice(data)[0]);
                    setMaxPrice(checkMinMaxPrice(data)[1]);
                    setMinSelectedPrice(checkMinMaxPrice(data)[0]);
                    setMaxSelectedPrice(checkMinMaxPrice(data)[1]);
                }
            });
        } else if (selectedType) {
            getProductsByProductType(selectedType).then((data) => {
                if (data) {
                    if (data.length) {
                        setFilterVariants(checkFilterVariants(data));
                    }
                    setCards(data);
                    setSelectedCategoryId('');
                    setMinPrice(checkMinMaxPrice(data)[0]);
                    setMaxPrice(checkMinMaxPrice(data)[1]);
                    setMinSelectedPrice(checkMinMaxPrice(data)[0]);
                    setMaxSelectedPrice(checkMinMaxPrice(data)[1]);
                }
            });
        } else {
            getAllProducts().then((data) => {
                if (data) {
                    setCards(data);
                    setSelectedCategoryId('');
                    setMinPrice(checkMinMaxPrice(data)[0]);
                    setMaxPrice(checkMinMaxPrice(data)[1]);
                    setMinSelectedPrice(checkMinMaxPrice(data)[0]);
                    setMaxSelectedPrice(checkMinMaxPrice(data)[1]);
                }
            });
        }
    }, [selectedCategory, selectedType, category]);

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
                        setSelectedCategoryId={setSelectedCategoryId}
                        setSelectedCategoryPath={setSelectedCategoryPath}
                    />
                    <div>
                        <Parameters
                            setCards={setCards}
                            selectedType={selectedType}
                            selectedCategory={selectedCategory || ''}
                            selectedCategoryId={selectedCategoryId}
                            filterVariants={filterVariants}
                            minPrice={minPrice}
                            maxPrice={maxPrice}
                            minSelectedPrice={minSelectedPrice}
                            maxSelectedPrice={maxSelectedPrice}
                            setMinSelectedPrice={setMinSelectedPrice}
                            setMaxSelectedPrice={setMaxSelectedPrice}
                        />
                        {cards.length && <Cards cards={cards} />}
                    </div>
                </section>
            </section>
        </>
    );
}

export default Store;
