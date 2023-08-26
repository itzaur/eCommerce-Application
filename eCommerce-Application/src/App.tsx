import { Routes, Route, useLocation } from 'react-router-dom';
import {
    Home,
    LoginPage,
    RegistrationPage,
    AboutPage,
    Store,
    NotFound,
} from './components';
import Tour from './components/Store/Tour';

function App(): JSX.Element {
    const location = useLocation();
    const root = document.querySelector('main');
    const paths = ['login', 'registration', 'store', 'about'];
    const categories = [
        'cosmotours',
        'hotel',
        'souvenirs',
        'relax',
        'hobby',
        'active',
        'hard',
        'classic',
        'glass',
        'robotic',
        'other',
    ];
    // const path = location.pathname.slice(1);
    const path = location.pathname
        .split('/')
        .filter((el) => el)
        .at(-1) as string;
    if (categories.includes(path)) {
        root?.setAttribute('id', 'store');
    } else if (paths.includes(path)) {
        root?.setAttribute('id', path);
    } else if (location.pathname === '/') {
        root?.setAttribute('id', 'main');
    } else {
        root?.setAttribute('id', 'error-page');
    }

    // localStorage.clear();
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/store" element={<Store type="Космотуры" />} />
            <Route
                path="/store/cosmotours"
                element={<Store type="Космотуры" />}
            />
            <Route
                path="/store/cosmotours/relax"
                element={<Store type="Космотуры" />}
            />
            <Route
                path="/store/cosmotours/hobby"
                element={<Store type="Космотуры" />}
            />
            <Route
                path="/store/cosmotours/active"
                element={<Store type="Космотуры" />}
            />
            <Route
                path="/store/souvenirs"
                element={<Store type="Сувениры" />}
            />
            <Route
                path="/store/souvenirs/glass"
                element={<Store type="Сувениры" />}
            />
            <Route
                path="/store/souvenirs/robotic"
                element={<Store type="Сувениры" />}
            />
            <Route
                path="/store/souvenirs/other"
                element={<Store type="Сувениры" />}
            />
            <Route
                path="/store/hotel"
                element={<Store type="Выбрать номер" />}
            />
            <Route
                path="/store/hotel/classic"
                element={<Store type="Выбрать номер" />}
            />
            <Route
                path="/store/hotel/hard"
                element={<Store type="Выбрать номер" />}
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/store/tours/:id" element={<Tour />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
