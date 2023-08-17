import { useState } from 'react';
import logo from '../../assets/images/logo.png';
import { checkIncorrectEmail } from '../../utils/validation/checkCorrectEmail';
import { checkIncorrectPassword } from '../../utils/validation/checkPassword';
import { loginCustomer } from '../../commercetools/loginCustomer';

// let user = null;

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
                                    errorEmail.error
                                        ? 'form__input form__input_invalid'
                                        : 'form__input'
                                }
                                type="text"
                                id="email"
                                required
                                onBlur={(e): void => {
                                    setErrorEmail({
                                        error: checkIncorrectEmail(e).incorrect,
                                        message: checkIncorrectEmail(e).message,
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
                                        message: checkIncorrectEmail(e, true)
                                            .message,
                                    });
                                    setEmail(e.target.value);
                                }}
                            />
                            <div className="place_holder">
                                Email<span>*</span>
                            </div>
                        </div>
                        <p className="error-messages">
                            {errorEmail ? errorEmail.message : ''}
                        </p>
                        <div className="placeinput">
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
                                            checkIncorrectPassword(e).message,
                                    });
                                }}
                                onChange={(e): void => {
                                    setErrorPassword({
                                        error: checkIncorrectPassword(e, true)
                                            .incorrect,
                                        message: checkIncorrectPassword(e, true)
                                            .message,
                                    });
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
                            {errorPassword ? errorPassword.message : ''}
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

export default LoginPage;
