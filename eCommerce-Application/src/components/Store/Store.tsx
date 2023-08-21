/*
 * This is a stub page
 */
import { Link, Outlet } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

function Store(): JSX.Element {
    return (
        <section
            style={{
                display: 'grid',
                height: '100vh',
                backgroundColor: '#000000',
            }}
        >
            <header className="header">
                <Link to="/">
                    <img src={logo} alt="logo" className="logo_big" />
                </Link>
            </header>
            <h1
                style={{
                    color: 'white',
                    fontSize: '5rem',
                    textAlign: 'center',
                }}
            >
                Store Page
            </h1>
            <Link to="/store/products">Товары</Link>
            <Outlet />
        </section>
    );
}

export default Store;
