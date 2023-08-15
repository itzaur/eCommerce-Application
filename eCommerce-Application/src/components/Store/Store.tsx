import { Link, Outlet } from 'react-router-dom';

/*
 * This is a stub page
 */
function Store(): JSX.Element {
    return (
        <section style={{ backgroundColor: '#000000' }}>
            <h1
                style={{
                    color: 'white',
                    fontSize: '5rem',
                    textAlign: 'center',
                    lineHeight: '100vh',
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
