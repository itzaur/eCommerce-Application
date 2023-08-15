import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import rsschoolLogo from '../../assets/images/rsschool.svg';
import githubLogo from '../../assets/images/github.svg';

function Footer(): JSX.Element {
    return (
        <footer className="footer">
            <div className="footer__logo">
                <img src={logo} alt="logo" />
            </div>
            <div className="footer__icons">
                <div className="footer__social">
                    <figure className="school-logo">
                        <Link to="https://rs.school/js/">
                            <img src={rsschoolLogo} alt="logo" />
                        </Link>
                    </figure>
                    <div className="social-logo">
                        <Link to="/">
                            <img src={githubLogo} alt="logo" />
                        </Link>
                        <Link to="/">
                            <img src={githubLogo} alt="logo" />
                        </Link>
                        <Link to="/">
                            <img src={githubLogo} alt="logo" />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="footer__title">
                <p>
                    Межгалактическая объединенная организация, созданная с целью
                    расширения границ познания и создания нерушимых
                    добрососедских союзов со всеми формами жизни Вселенной.
                    Является беспрецедентным представителем сферы услуг
                    развлечений и досуга.
                </p>
            </div>
            <nav className="footer__nav">
                <ul className="footer__nav-list">
                    <li className="footer__nav-item">
                        <Link to="/about">
                            <span>О нас</span>
                        </Link>
                    </li>
                    <li className="footer__nav-item">
                        <Link to="/store">
                            <span>Сувениры</span>
                        </Link>
                    </li>
                    <li className="footer__nav-item">
                        <Link to="/store">
                            <span>Выбрать космотур</span>
                        </Link>
                    </li>
                    <li className="footer__nav-item">
                        <Link to="/store">
                            <span>Выбрать номер</span>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="footer__accent">
                <span className="sr-only">null</span>
                <span>2023</span>
            </div>
        </footer>
    );
}

export default Footer;
