import {
    RouterProvider,
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import { useEffect } from 'react';
import ClipLoader from 'react-spinners/RingLoader';
import { Product } from '@commercetools/platform-sdk';
import {
    Home,
    LoginPage,
    RegistrationPage,
    AboutPage,
    Store,
    NotFound,
    ProfilePage,
    ProductDetail,
    CartPage,
} from './components';

import ErrorBoundary from './components/ErrorBoundary';

import { loaderStore } from './components/Store/loaderStore';
import { loaderProduct } from './components/ProductPage/loaderProduct';
import { categories } from './utils/constants';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route
                path="/"
                element={<Home />}
                errorElement={<ErrorBoundary />}
            />
            <Route
                path="/login"
                element={<LoginPage />}
                errorElement={<ErrorBoundary />}
            />
            <Route
                path="/cart"
                element={<CartPage />}
                errorElement={<ErrorBoundary />}
            />
            <Route
                path="/registration"
                element={<RegistrationPage />}
                errorElement={<ErrorBoundary />}
            />
            <Route path="/about" element={<AboutPage />} />
            <Route
                path="/profile"
                element={<ProfilePage />}
                errorElement={<ErrorBoundary />}
            />
            <Route path="/store" errorElement={<ErrorBoundary />}>
                <Route index loader={loaderStore} element={<Store />} />
                {categories.map((category, index) => {
                    return (
                        <Route key={`category-${index}`} path={category.path}>
                            <Route
                                index
                                loader={loaderStore}
                                element={<Store />}
                            />
                            {category.itemsPath.map((item, ind) => {
                                return (
                                    <Route key={`item${ind}`} path={item}>
                                        <Route
                                            index
                                            loader={loaderStore}
                                            element={<Store />}
                                        />
                                        <Route
                                            path=":id"
                                            loader={async ({
                                                params,
                                            }): Promise<Product | void> =>
                                                loaderProduct(params.id)
                                            }
                                            element={
                                                <ProductDetail
                                                    selectedType={{
                                                        parent: {
                                                            name: category.name,
                                                            path: category.path,
                                                            id: '',
                                                        },
                                                        items: [],
                                                    }}
                                                    selectedCategory={{
                                                        name: category.items[
                                                            ind
                                                        ],
                                                        path: item,
                                                        id: '',
                                                    }}
                                                />
                                            }
                                            errorElement={<ErrorBoundary />}
                                        />
                                    </Route>
                                );
                            })}
                            <Route
                                path=":id"
                                loader={async ({
                                    params,
                                }): Promise<Product | void> =>
                                    loaderProduct(params.id)
                                }
                                element={
                                    <ProductDetail
                                        selectedType={{
                                            parent: {
                                                name: category.name,
                                                path: category.path,
                                                id: '',
                                            },
                                            items: [],
                                        }}
                                        selectedCategory=""
                                    />
                                }
                                errorElement={<ErrorBoundary />}
                            />
                        </Route>
                    );
                })}
                <Route
                    path=":id"
                    loader={async ({ params }): Promise<Product | void> =>
                        loaderProduct(params.id)
                    }
                    element={
                        <ProductDetail selectedType="" selectedCategory="" />
                    }
                    errorElement={<ErrorBoundary />}
                />
            </Route>
            <Route path="*" element={<NotFound />} />
        </>
    )
);

function App(): JSX.Element {
    // Activate scroll smooth effect
    useEffect(() => {
        (async (): Promise<void> => {
            const LocomotiveScroll = (await import('locomotive-scroll'))
                .default;

            const locomotiveScroll = new LocomotiveScroll();
            locomotiveScroll.start();
        })();
    }, []);

    return (
        <RouterProvider
            router={router}
            fallbackElement={
                <ClipLoader
                    color="#4fe1e3"
                    size={150}
                    className="store__loader"
                />
            }
        />
    );
}
export default App;
