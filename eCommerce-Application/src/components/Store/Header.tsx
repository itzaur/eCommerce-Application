import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

function Header(): JSX.Element {
    return (
        <header className="header">
            <Link to="/">
                <img src={logo} alt="logo" className="logo_big" />
            </Link>
            <nav />
        </header>
    );
}

export default Header;
