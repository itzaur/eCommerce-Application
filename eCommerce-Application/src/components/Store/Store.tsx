import { Link, Outlet } from 'react-router-dom';

function Store(): JSX.Element {
    return (
        <section>
            <h1 style={{ color: 'white', fontSize: '5rem' }}>Store Page</h1>
            <Link to="/store/products">Товары</Link>
            <Outlet />
        </section>
    );
}

export default Store;
