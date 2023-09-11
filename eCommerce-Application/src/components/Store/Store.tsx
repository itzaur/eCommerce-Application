import { useState, useEffect } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import { CategoryCustom } from '../../types';
import Header from './Header';
import { Cards, SideBar, Parameters, BreadCrumbs } from './index';
import { getCategories } from '../../commercetools/getCategories';
import { getProductsByProductType } from '../../commercetools/getProductsByType';
import {
    getProductsBySubcategory,
    getSubCategoryId,
} from '../../commercetools/getProductsBySubcategory';
import { getAllProducts } from '../../commercetools/getAllProducts';
import { checkFilterVariants } from '../../utils/checkFilterVariants';
import { checkMinMaxPrice } from '../../utils/checkMinMaxPrice';
import { setErrorBodyDOM } from '../../utils/constants';

function Store({
    type,
    category,
    typePath,
    categoryPath,
}: {
    type: string;
    category: string;
    typePath: string;
    categoryPath: string;
}): JSX.Element {
    const [selectedType, setSelectedType] = useState(type);
    const [selectedTypePath, setSelectedTypePath] = useState(typePath);
    const [selectedCategory, setSelectedCategory] = useState(category || '');
    const [selectedCategoryId, setSelectedCategoryId] = useState(categoryPath);
    const [selectedCategoryPath, setSelectedCategoryPath] = useState('');
    const [cards, setCards] = useState<ProductProjection[]>([]);
    const [categories, setCategories] = useState<CategoryCustom[]>([]);
    const [filterVariants, setFilterVariants] = useState<string[]>([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [minSelectedPrice, setMinSelectedPrice] = useState(0);
    const [maxSelectedPrice, setMaxSelectedPrice] = useState(0);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        getCategories()
            .then((data) => {
                if (data) setCategories(data);
            })
            .catch((err: Error) => {
                setErrorBodyDOM(err);
            });
        if (category)
            getSubCategoryId(category)
                .then((data) => {
                    if (data) setSelectedCategoryId(data);
                })
                .catch((err: Error) => {
                    setErrorBodyDOM(err);
                });

        if (selectedCategory) {
            getProductsBySubcategory(selectedCategory)
                .then((data) => {
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
                })
                .catch((err: Error) => {
                    setErrorBodyDOM(err);
                });
        } else if (selectedType) {
            getProductsByProductType(selectedType)
                .then((data) => {
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
                })
                .catch((err: Error) => {
                    setErrorBodyDOM(err);
                });
        } else {
            getAllProducts()
                .then((data) => {
                    if (data) {
                        setCards(data);
                        setSelectedCategoryId('');
                        setMinPrice(checkMinMaxPrice(data)[0]);
                        setMaxPrice(checkMinMaxPrice(data)[1]);
                        setMinSelectedPrice(checkMinMaxPrice(data)[0]);
                        setMaxSelectedPrice(checkMinMaxPrice(data)[1]);
                    }
                })
                .catch((err: Error) => {
                    setErrorBodyDOM(err);
                });
        }
    }, [selectedCategory, selectedType, category]);

    return (
        <>
            <Header setSearchValue={setSearchValue} withSearchValue />
            <section className="store__main">
                <BreadCrumbs
                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                    selectedTypePath={selectedTypePath}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedCategoryPath={selectedCategoryPath}
                    selectedProduct=""
                    selectedProductPath=""
                />
                <section className="store__content">
                    <SideBar
                        categories={categories}
                        setSelectedType={setSelectedType}
                        setSelectedTypePath={setSelectedTypePath}
                        setSelectedCategory={setSelectedCategory}
                        setSelectedCategoryId={setSelectedCategoryId}
                        setSelectedCategoryPath={setSelectedCategoryPath}
                    />
                    <div className="store__cards">
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
                            searchValue={searchValue}
                        />
                        {!cards.length && (
                            <h2 className="no-cards">
                                Вселенная бесконечна, а наши продукты нет. Мы
                                ничего не нашли :(
                            </h2>
                        )}
                        {cards.length > 0 && <Cards cards={cards} />}
                    </div>
                </section>
            </section>
        </>
    );
}

export default Store;
