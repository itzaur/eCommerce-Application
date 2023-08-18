import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import {
    Home,
    LoginPage,
    RegistrationPage,
    AboutPage,
    Store,
    NotFound,
} from './components';

function App(): JSX.Element {
    const location = useLocation();
    const root = document.querySelector('main');
    const paths = ['login', 'registration', 'store', 'about'];
    const path = location.pathname.slice(1);

    useEffect(() => {
        // console.log('Current location is ', location);
    }, [location]);

    if (paths.includes(path)) {
        root?.setAttribute('id', path);
    } else if (path === '') {
        root?.setAttribute('id', 'main');
    } else {
        root?.setAttribute('id', 'error-page');
    }

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/store" element={<Store />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
