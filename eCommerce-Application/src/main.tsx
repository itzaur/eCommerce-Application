import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import './index.scss';
import LoginForm from './components/LoginForm/LoginForm';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <LoginForm />
    </React.StrictMode>
);
