import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { checkIncorrectEmail } from '../../utils/validation/checkCorrectEmail';
import { checkIncorrectPassword } from '../../utils/validation/checkPassword';
import { loginCustomer, user } from '../../commercetools/loginCustomer';

function LoginPage(): JSX.Element {
    const [errorEmail, setErrorEmail] = useState({ error: false, message: '' });
    const [errorPassword, setErrorPassword] = useState({
        error: false,
        message: '',
    });
    const [passwordView, setPasswordView] = useState('password');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorWithLogin, setErrorWithLogin] = useState(false);
    const navigate = useNavigate();

    const changePasswordView = (): void => {
        setPasswordView(passwordView === 'password' ? 'text' : 'password');
    };

    const loginUser = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): void => {
        e.preventDefault();
        if (!email) {
            setErrorEmail({ error: true, message: 'Это обязательное поле' });
        }
        if (!password) {
            setErrorPassword({
                error: true,
                message: 'Это обязательное поле',
            });
        }
        if (errorEmail.error || errorPassword.error || !email || !password)
            return;
        loginCustomer(email, password)
            .then(() => {
                setErrorWithLogin(false);
                navigate('/');
            })
            .catch((err) => {
                setErrorWithLogin(true);
                if (err.cause === 'passwordError') {
                    setErrorPassword({ error: true, message: err.message });
                } else if (err.cause === 'emailError') {
                    setErrorEmail({ error: true, message: err.message });
                }
            });
    };
    useEffect(() => {
        if (user) navigate('/');
    });

    return (
        <>
            <header className="header">
                <img src={logo} alt="logo" className="logo_big" />
            </header>
            <section className="form login">
                <h2 className="form__title">
                    Добро пожаловать <br /> На Борт Космической Одиссеи!
                </h2>
                <div className="form__content">
                    <div className="form__question">
                        Путешествуете с нами впервые?&nbsp;
                        <Link to="/registration">Зарегистрируйтесь!</Link>
                    </div>
                    <form className="form__inputs">
                        <div className="form__inputs-wrapper">
                            <label className="placeholder" htmlFor="name">
                                <input
                                    className={
                                        errorEmail.error
                                            ? 'form__input form__input_invalid'
                                            : 'form__input'
                                    }
                                    type="text"
                                    id="email"
                                    required
                                    onBlur={(e): void => {
                                        setErrorEmail({
                                            error: checkIncorrectEmail(e)
                                                .incorrect,
                                            message:
                                                checkIncorrectEmail(e).message,
                                        });
                                    }}
                                    onChange={(e): void => {
                                        if (errorWithLogin) {
                                            setErrorPassword({
                                                error: false,
                                                message: '',
                                            });
                                        }
                                        setErrorEmail({
                                            error: checkIncorrectEmail(e, true)
                                                .incorrect,
                                            message: checkIncorrectEmail(
                                                e,
                                                true
                                            ).message,
                                        });
                                        setEmail(e.target.value);
                                    }}
                                />
                                <div className="placeholder__input form_big-first-letter">
                                    Email<span>*</span>
                                </div>
                                <p className="error-message ">
                                    {errorEmail ? errorEmail.message : ''}
                                </p>
                            </label>
                        </div>

                        <div className="form__inputs-wrapper">
                            <label className="placeholder" htmlFor="password">
                                <input
                                    className={
                                        errorPassword.error
                                            ? 'form__input form__input_invalid'
                                            : 'form__input'
                                    }
                                    type={passwordView}
                                    id="password"
                                    required
                                    onBlur={(e): void => {
                                        setErrorPassword({
                                            error: checkIncorrectPassword(e)
                                                .incorrect,
                                            message:
                                                checkIncorrectPassword(e)
                                                    .message,
                                        });
                                    }}
                                    onChange={(e): void => {
                                        setErrorPassword({
                                            error: checkIncorrectPassword(
                                                e,
                                                true
                                            ).incorrect,
                                            message: checkIncorrectPassword(
                                                e,
                                                true
                                            ).message,
                                        });
                                        setPassword(e.target.value);
                                    }}
                                />
                                <div className="placeholder__input form_big-first-letter">
                                    Password<span>*</span>
                                </div>
                                <button
                                    type="button"
                                    className={`password-view password-view_${passwordView}`}
                                    onClick={(): void => changePasswordView()}
                                    onKeyDown={(): void => changePasswordView()}
                                >
                                    &nbsp;
                                </button>
                                <p className="error-message">
                                    {errorPassword ? errorPassword.message : ''}
                                </p>
                            </label>
                        </div>

                        <button
                            className="btn_action"
                            type="submit"
                            onClick={(e): void => {
                                loginUser(e);
                            }}
                        >
                            Войти
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
}

export default LoginPage;
