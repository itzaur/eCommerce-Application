import logo from '../../assets/images/logo.svg';

function Header(): JSX.Element {
    return (
        <header className="header">
            <img src={logo} className="logo" alt="logo" />
        </header>
    );
}

export default Header;
