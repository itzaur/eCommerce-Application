import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import {
    Home,
    LoginPage,
    RegistrationPage,
    AboutPage,
    Store,
} from './components';
// import { getProject } from './commercetools/Client';

function App(): JSX.Element {
    // getProject().then(console.log).catch(console.error);

    const location = useLocation();

    useEffect(() => {
        // console.log('Current location is ', location);
    }, [location]);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/store" element={<Store />} />
            <Route path="/about" element={<AboutPage />} />
        </Routes>
    );
}

export default App;
