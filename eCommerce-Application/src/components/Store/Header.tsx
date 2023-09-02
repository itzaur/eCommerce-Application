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
    setSearchValue,
}: Record<
    'setSearchValue',
    React.Dispatch<React.SetStateAction<string>>
>): JSX.Element {
    const [searchBarOpen, setSearchBarOpen] = useState(false);
    return (
        <header className="header">
            <Link to="/">
                <img src={logo} alt="logo" className="logo" />
            </Link>
            <nav>
                <Link to="/store">
                    <img src={iconCatalog} alt="icon-catalog" />
                    <h3>Каталог</h3>
                </Link>
                <Link to="/">
                    <img src={iconAbout} alt="icon-about" />
                    <h3>О нас</h3>
                </Link>
                <div className="search-btn">
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
                        <h3>Поиск</h3>
                    </button>
                    <SearchBar
                        setSearchValue={setSearchValue}
                        searchBarOpen={searchBarOpen}
                    />
                </div>

                <Link to="/profile">
                    <img src={iconUser} alt="icon-user" />
                    <h3>Пользователь</h3>
                </Link>
                <Link to="/cart">
                    <img src={iconCart} alt="icon-cart" />
                    <h3>Корзина</h3>
                    <div id="purchases-number" />
                </Link>
            </nav>
        </header>
    );
}

export default Header;
