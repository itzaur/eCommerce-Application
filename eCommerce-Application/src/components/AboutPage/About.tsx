/*
 * This is a stub page
 */
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

function About(): JSX.Element {
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
                About Page
            </h1>
        </section>
    );
}

export default About;
