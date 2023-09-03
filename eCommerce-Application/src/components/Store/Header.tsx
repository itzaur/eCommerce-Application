import { Link } from 'react-router-dom';
import { useState } from 'react';
import SearchBar from './SearchBar';
import logo from '../../assets/images/logo.png';
import iconCatalog from '../../assets/images/icon-catalog.png';
import iconAbout from '../../assets/images/icon-about.png';
import iconSearch from '../../assets/images/icon-search.png';
import iconCart from '../../assets/images/icon-cart.png';
import iconUser from '../../assets/images/icon-user.png';

function Header({
    withSearchValue,
    setSearchValue,
}: {
    setSearchValue: React.Dispatch<React.SetStateAction<string>> | undefined;
    withSearchValue: boolean;
}): JSX.Element {
    const [searchBarOpen, setSearchBarOpen] = useState(false);
    return (
        <header className="header-nav">
            <Link className="header-nav__logo" to="/">
                <img src={logo} alt="logo" className="logo" />
            </Link>
            <nav className="nav">
                <ul className="nav__list">
                    <li className="nav__item">
                        <Link className="nav__link" to="/store">
                            <img src={iconCatalog} alt="icon-catalog" />
                            <h3 className="nav__title">Каталог</h3>
                        </Link>
                    </li>
                    <li className="nav__item">
                        <Link className="nav__link" to="/about">
                            <img src={iconAbout} alt="icon-about" />
                            <h3 className="nav__title">О нас</h3>
                        </Link>
                    </li>
                    {withSearchValue && (
                        <li className="nav__item">
                            <button
                                type="button"
                                onClick={(): void => {
                                    if (!searchBarOpen) {
                                        setSearchBarOpen(true);
                                    } else {
                                        setSearchBarOpen(false);
                                    }
                                }}
                            >
                                <img src={iconSearch} alt="icon-search" />
                                <h3 className="nav__title">Поиск</h3>
                            </button>
                            <SearchBar
                                setSearchValue={setSearchValue}
                                searchBarOpen={searchBarOpen}
                            />
                        </li>
                    )}
                    <li className="nav__item">
                        <Link className="nav__link" to="/profile">
                            <img src={iconUser} alt="icon-user" />
                            <h3 className="nav__title">Пользователь</h3>
                        </Link>
                    </li>
                    <li className="nav__item">
                        <Link className="nav__link" to="/cart">
                            <img src={iconCart} alt="icon-cart" />
                            <h3 className="nav__title">Корзина</h3>
                            <div id="purchases-number" />
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
