import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect, ReactElement } from 'react';
import {
    Home,
    LoginPage,
    RegistrationPage,
    AboutPage,
    Store,
    NotFound,
} from './components';
import ProductDetail from './components/ProductPage/ProductPage';
import { products } from './utils/constants';
import { getCategories } from './commercetools/getCategories';
import { getProductsByProductType } from './commercetools/getProductsByType';
import { getProductsBySubcategory } from './commercetools/getProductsBySubcategory';
import { Category } from './types';

function App(): JSX.Element {
    const location = useLocation();
    const root = document.querySelector('main');
    const paths = [
        'login',
        'registration',
        'store',
        'about',
        ...products.map((product) => product.name),
    ];
    const tempArrCategoriesRoutes: React.ReactElement[] = [];
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoriesRoutes, setCategoriesRoutes] = useState<
        React.ReactElement[]
    >([]);
    const [pageLoaded, setPageLoaded] = useState(false);
    const path = location.pathname
        .split('/')
        .filter((el) => el)
        .at(-1) as string;

    function setMainId(categoriesArr: Category[]): void {
        if (paths.includes(path)) {
            root?.setAttribute('id', path);
        } else if (location.pathname === '/') {
            root?.setAttribute('id', 'main');
        } else if (categoriesArr.length) {
            let categoryFound = false;
            categoriesArr.forEach((category) => {
                if (category.parent.path === path) {
                    categoryFound = true;
                    root?.setAttribute('id', 'store');
                    return;
                }
                category.items.forEach((child) => {
                    if (child.path === path) {
                        categoryFound = true;
                        root?.setAttribute('id', 'store');
                    }
                });
            });
            if (!categoryFound) {
                root?.setAttribute('id', 'error-page');
            }
        }
    }

    async function getRoutes(
        categoriesArr: Category[]
    ): Promise<ReactElement[]> {
        categoriesArr.forEach((category) => {
            tempArrCategoriesRoutes.push(
                <Route
                    key={category.parent.name}
                    path={`/store/${category.parent.path}`}
                    element={<Store type={category.parent.name} category="" />}
                />
            );
            setCategoriesRoutes([
                ...tempArrCategoriesRoutes,
                <Route
                    key={category.parent.name}
                    path={`/store/${category.parent.path}`}
                    element={<Store type={category.parent.name} category="" />}
                />,
            ]);
            getProductsByProductType(category.parent.name).then((data) => {
                data?.forEach((el) => {
                    tempArrCategoriesRoutes.push(
                        <Route
                            key={el.key}
                            path={`/store/${category.parent.path}/${el.key}`}
                            element={<ProductDetail />}
                        />,
                        <Route
                            key={el.key}
                            path={`/store/${el.key}`}
                            element={<ProductDetail />}
                        />
                    );
                    setCategoriesRoutes([
                        ...tempArrCategoriesRoutes,
                        <Route
                            key={el.key}
                            path={`/store/${category.parent.path}/${el.key}`}
                            element={<ProductDetail />}
                        />,
                        <Route
                            key={el.key}
                            path={`/store/${el.key}`}
                            element={<ProductDetail />}
                        />,
                    ]);
                });
            });

            category.items.forEach((item) => {
                tempArrCategoriesRoutes.push(
                    <Route
                        key={item.name}
                        path={`/store/${category.parent.path}/${item.path}`}
                        element={
                            <Store
                                type={category.parent.name}
                                category={item.name}
                            />
                        }
                    />
                );
                setCategoriesRoutes([
                    ...tempArrCategoriesRoutes,
                    <Route
                        key={item.name}
                        path={`/store/${category.parent.path}/${item.path}`}
                        element={
                            <Store
                                type={category.parent.name}
                                category={item.name}
                            />
                        }
                    />,
                ]);
                getProductsBySubcategory(item.name).then((data) => {
                    data?.forEach((el) => {
                        tempArrCategoriesRoutes.push(
                            <Route
                                key={el.key}
                                path={`/store/${category.parent.path}/${item.path}/${el.key}`}
                                element={<ProductDetail />}
                            />
                        );
                        setCategoriesRoutes([
                            ...tempArrCategoriesRoutes,
                            <Route
                                key={el.key}
                                path={`/store/${category.parent.path}/${item.path}/${el.key}`}
                                element={<ProductDetail />}
                            />,
                        ]);
                    });
                });
            });
        });

        return categoriesRoutes;
    }

    useEffect(() => {
        if (!pageLoaded) {
            getCategories().then((data) => {
                if (data) {
                    setCategories(data);
                    setMainId(data);
                    getRoutes(data).then((result) => {
                        setCategoriesRoutes(result);
                        setPageLoaded(true);
                    });
                }
            });
        }
    });

    useEffect(() => {
        setMainId(categories);
    });

    return (
        <Routes>
            {categoriesRoutes.map((route) => {
                return route;
            })}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/store" element={<Store type="" category="" />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
