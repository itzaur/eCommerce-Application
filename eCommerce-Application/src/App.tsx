import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
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
import { Category } from './types';

function App(): JSX.Element {
    const location = useLocation();
    const root = document.querySelector('main');
    const paths = useMemo(
        () => [
            'login',
            'registration',
            'store',
            'about',
            ...products.map((product) => product.name),
        ],
        []
    );

    const [categories, setCategories] = useState<Category[]>([]);
    const [categoriesRoutes, setCategoriesRoutes] = useState<
        React.ReactElement[] | []
    >([]);
    const [pageLoaded, setPageLoaded] = useState(false);
    const path = location.pathname
        .split('/')
        .filter((el) => el)
        .at(-1) as string;

    useEffect(() => {
        if (!pageLoaded) {
            getCategories().then((data) => {
                if (data) {
                    setCategories(data);
                }
            });
            setPageLoaded(true);
        }
    }, [pageLoaded]);

    useEffect(() => {
        if (paths.includes(path)) {
            root?.setAttribute('id', path);
        } else if (categories) {
            categories.forEach((category) => {
                if (category.parent.path === path) {
                    root?.setAttribute('id', 'store');
                    return;
                }
                category.items.forEach((child) => {
                    if (child.path === path) {
                        root?.setAttribute('id', 'store');
                    }
                });
            });
        } else if (location.pathname === '/') {
            root?.setAttribute('id', 'main');
        } else {
            root?.setAttribute('id', 'error-page');
        }

        const tempArrCategories: React.ReactElement[] = [];
        categories.forEach((category) => {
            tempArrCategories.push(
                <Route
                    key={category.parent.name}
                    path={`/store/${category.parent.path}`}
                    element={<Store type={category.parent.name} category="" />}
                />,
                <Route
                    key=":key"
                    path={`/store/${category.parent.path}/:key`}
                    element={<ProductDetail />}
                />
            );

            category.items.forEach((item) => {
                tempArrCategories.push(
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
                    <Route
                        key=":key"
                        path={`/store/${category.parent.path}/${item.path}/:key`}
                        element={<ProductDetail />}
                    />
                );
            });
        });
        setCategoriesRoutes(tempArrCategories);
    }, [categories, location.pathname, path, paths, root]);

    return (
        <Routes>
            {categoriesRoutes.map((route) => {
                return route;
            })}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/store" element={<Store type="" category="" />} />
            <Route path="/store/:key" element={<ProductDetail />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
