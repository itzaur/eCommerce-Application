import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect, ReactElement } from 'react';
import {
    Home,
    LoginPage,
    RegistrationPage,
    AboutPage,
    Store,
    NotFound,
    ProfilePage,
    CartPage,
} from './components';
import ProductDetail from './components/ProductPage/ProductPage';
import { products, setErrorBodyDOM } from './utils/constants';
import { getCategories } from './commercetools/getCategories';
import { getProductsByProductType } from './commercetools/getProductsByType';
import { getProductsBySubcategory } from './commercetools/getProductsBySubcategory';
import { CategoryCustom } from './types';

function App(): JSX.Element {
    const location = useLocation();
    const root = document.querySelector('main');
    const paths = [
        'login',
        'registration',
        'store',
        'about',
        'profile',
        'cart',
        ...products.map((product) => product.name),
    ];
    const tempArrCategoriesRoutes: React.ReactElement[] = [];
    const [categories, setCategories] = useState<CategoryCustom[]>([]);
    const [categoriesRoutes, setCategoriesRoutes] = useState<
        React.ReactElement[]
    >([]);
    const [pageLoaded, setPageLoaded] = useState(false);
    const path = location.pathname
        .split('/')
        .filter((el) => el)
        .at(-1) as string;

    function setMainId(categoriesArr: CategoryCustom[]): void {
        if (paths.includes(path)) {
            root?.setAttribute('id', path);
        } else if (location.pathname === '/') {
            root?.setAttribute('id', 'main');
        } else if (categoriesArr.length) {
            let categoryFound = false;
            const setIdAttribute = (): void => {
                categoryFound = true;
                root?.setAttribute('id', 'store');
            };
            categoriesArr.forEach((category) => {
                if (category.parent.path === path) {
                    setIdAttribute();
                }
                category.items.forEach((child) => {
                    if (child.path === path) {
                        setIdAttribute();
                    }
                });
            });
            if (!categoryFound) {
                root?.setAttribute('id', 'error-page');
            }
        }
    }

    async function getRoutes(
        categoriesArr: CategoryCustom[]
    ): Promise<ReactElement[]> {
        categoriesArr.forEach((category) => {
            tempArrCategoriesRoutes.push(
                <Route
                    key={category.parent.name}
                    path={`/store/${category.parent.path}`}
                    element={
                        <Store
                            type={category.parent.name}
                            typePath={category.parent.path}
                            category=""
                            categoryPath=""
                        />
                    }
                />
            );
            setCategoriesRoutes([
                ...tempArrCategoriesRoutes,
                <Route
                    key={category.parent.name}
                    path={`/store/${category.parent.path}`}
                    element={
                        <Store
                            type={category.parent.name}
                            typePath={category.parent.path}
                            category=""
                            categoryPath=""
                        />
                    }
                />,
            ]);
            getProductsByProductType(category.parent.name)
                .then((data) => {
                    data?.forEach((el) => {
                        tempArrCategoriesRoutes.push(
                            <Route
                                key={el.key}
                                path={`/store/${category.parent.path}/${el.key}`}
                                element={
                                    <ProductDetail
                                        type={category.parent.name}
                                        typePath={category.parent.path}
                                        category=""
                                        categoryPath=""
                                    />
                                }
                            />,
                            <Route
                                key={el.key}
                                path={`/store/${el.key}`}
                                element={
                                    <ProductDetail
                                        type=""
                                        typePath=""
                                        category=""
                                        categoryPath=""
                                    />
                                }
                            />
                        );
                        setCategoriesRoutes([
                            ...tempArrCategoriesRoutes,
                            <Route
                                key={el.key}
                                path={`/store/${category.parent.path}/${el.key}`}
                                element={
                                    <ProductDetail
                                        type={category.parent.name}
                                        typePath={category.parent.path}
                                        category=""
                                        categoryPath=""
                                    />
                                }
                            />,
                            <Route
                                key={el.key}
                                path={`/store/${el.key}`}
                                element={
                                    <ProductDetail
                                        type=""
                                        typePath=""
                                        category=""
                                        categoryPath=""
                                    />
                                }
                            />,
                        ]);
                    });
                })
                .catch((err: Error) => {
                    setErrorBodyDOM(err);
                });

            category.items.forEach((item) => {
                tempArrCategoriesRoutes.push(
                    <Route
                        key={item.name}
                        path={`/store/${category.parent.path}/${item.path}`}
                        element={
                            <Store
                                type={category.parent.name}
                                typePath={category.parent.path}
                                category={item.name}
                                categoryPath={item.name}
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
                                typePath={category.parent.path}
                                category={item.name}
                                categoryPath={item.name}
                            />
                        }
                    />,
                ]);
                getProductsBySubcategory(item.name)
                    .then((data) => {
                        data?.forEach((el) => {
                            tempArrCategoriesRoutes.push(
                                <Route
                                    key={el.key}
                                    path={`/store/${category.parent.path}/${item.path}/${el.key}`}
                                    element={
                                        <ProductDetail
                                            type={category.parent.name}
                                            typePath={category.parent.path}
                                            category={item.name}
                                            categoryPath={item.path}
                                        />
                                    }
                                />
                            );
                            setCategoriesRoutes([
                                ...tempArrCategoriesRoutes,
                                <Route
                                    key={el.key}
                                    path={`/store/${category.parent.path}/${item.path}/${el.key}`}
                                    element={
                                        <ProductDetail
                                            type={category.parent.name}
                                            typePath={category.parent.path}
                                            category={item.name}
                                            categoryPath={item.path}
                                        />
                                    }
                                />,
                            ]);
                        });
                    })
                    .catch((err: Error) => {
                        setErrorBodyDOM(err);
                    });
            });
        });

        return categoriesRoutes;
    }

    useEffect(() => {
        if (!pageLoaded) {
            getCategories()
                .then((data) => {
                    if (data) {
                        setCategories(data);
                        setMainId(data);
                        getRoutes(data)
                            .then((result) => {
                                setCategoriesRoutes(result);
                                setPageLoaded(true);
                            })
                            .catch((err: Error) => {
                                setErrorBodyDOM(err);
                            });
                    }
                })

                .catch((err: Error) => {
                    setErrorBodyDOM(err);
                });
        }
    });

    useEffect(() => {
        setMainId(categories);
    });
    // localStorage.removeItem('activeCart');
    // localStorage.removeItem('token');
    // localStorage.removeItem('refreshToken');
    // localStorage.removeItem('user');
    // localStorage.removeItem('version');

    return (
        <Routes>
            {categoriesRoutes.map((route) => {
                return route;
            })}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route
                path="/store"
                element={
                    <Store type="" category="" typePath="" categoryPath="" />
                }
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
