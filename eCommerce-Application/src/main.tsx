import ReactDOM from 'react-dom/client';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store/store';
import App from './App';
import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('main')!).render(
    // <React.StrictMode>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
    // {/* </React.StrictMode> */}
);
