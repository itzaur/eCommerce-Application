import { useState } from 'react';
import logo from '../../assets/img/logo.png';
import './LoginForm.scss';
import { checkIncorrectEmail } from '../../utils/validation/checkCorrectEmail';
import { checkIncorrectPassword } from '../../utils/validation/checkPassword';
import { loginCustomer } from '../../commercetools/loginCustomer';

// let user = null;

function LoginForm(): JSX.Element {
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorMessageEmail, setErrorMessageEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorMessagePassword, setErrorMessagePassword] = useState('');
    const [passwordView, setPasswordView] = useState('password');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorWithLogin, setErrorWithLogin] = useState(false);

    const changePasswordView = (): void => {
        setPasswordView(passwordView === 'password' ? 'text' : 'password');
    };

    const loginUser = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): void => {
        e.preventDefault();
        if (errorEmail || errorPassword || !email || !password) return;
        loginCustomer(email, password)
            .then(() => {
                setErrorWithLogin(false);
                // user = data?.body.customer;
            })
            .catch((err) => {
                setErrorWithLogin(true);
                if (err.cause === 'passwordError') {
                    setErrorPassword(true);
                    setErrorMessagePassword(err.message);
                } else if (err.cause === 'emailError') {
                    setErrorEmail(true);
                    setErrorMessageEmail(err.message);
                }
            });
    };

    return (
        <>
            <img className="logo-big" src={logo} alt="logo" />
            <section className="form login">
                <h2 className="form__title">
                    Добро пожаловать <br /> На Борт Космической Одиссеи!
                </h2>
                <div className="form__content">
                    <div className="form__question">
                        Путешествуете с нами впервые?&nbsp;
                        <a href="##">Зарегистрируйтесь!</a>
                    </div>
                    <form className="form__inputs">
                        <div className="placeinput">
                            <input
                                className={
                                    errorEmail
                                        ? 'form__input form__input_invalid'
                                        : 'form__input'
                                }
                                type="text"
                                id="email"
                                required
                                onBlur={(e): void => {
                                    setErrorEmail(
                                        checkIncorrectEmail(e).incorrect
                                    );
                                    setErrorMessageEmail(
                                        checkIncorrectEmail(e).message
                                    );
                                }}
                                onChange={(e): void => {
                                    if (errorWithLogin) {
                                        setErrorPassword(false);
                                        setErrorMessagePassword('');
                                    }
                                    setErrorEmail(
                                        checkIncorrectEmail(e, true).incorrect
                                    );
                                    setErrorMessageEmail(
                                        checkIncorrectEmail(e, true).message
                                    );
                                    setEmail(e.target.value);
                                }}
                            />
                            <div className="place_holder">
                                Email<span>*</span>
                            </div>
                        </div>
                        <p className="error-message">
                            {errorEmail ? errorMessageEmail : ''}
                        </p>
                        <div className="placeinput">
                            <input
                                className={
                                    errorPassword
                                        ? 'form__input form__input_invalid'
                                        : 'form__input'
                                }
                                type={passwordView}
                                id="password"
                                required
                                onBlur={(e): void => {
                                    setErrorPassword(
                                        checkIncorrectPassword(e).incorrect
                                    );
                                    setErrorMessagePassword(
                                        checkIncorrectPassword(e).message
                                    );
                                }}
                                onChange={(e): void => {
                                    setErrorPassword(
                                        checkIncorrectPassword(e, true)
                                            .incorrect
                                    );
                                    setErrorMessagePassword(
                                        checkIncorrectPassword(e, true).message
                                    );
                                    setPassword(e.target.value);
                                }}
                            />
                            <div className="place_holder">
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
                        </div>
                        <p className="error-message">
                            {errorPassword ? errorMessagePassword : ''}
                        </p>
                        <button
                            className="button-action"
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

export default LoginForm;
