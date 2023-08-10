import { useState } from 'react';
import logo from '../../assets/img/logo.png';
import '../../LoginForm.scss';
import { checkIncorrectEmail } from '../../utils/validation/checkCorrectEmail';
import { checkIncorrectPassword } from '../../utils/validation/checkPassword';

function LoginForm(): JSX.Element {
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorMessagePassword, setErrorMessagePassword] = useState('');
    const [passwordView, setPasswordView] = useState('password');

    const changePasswordView = () => {
        setPasswordView(passwordView === 'password' ? 'text' : 'password');
    };
    return (
        <section className="authorization login">
            <img src={logo} alt="logo" />
            <div className="authorization__div">
                <header className="authorization__header">
                    <h1 className="authorization__h1">
                        Добро пожаловать на борт космической одиссеи!
                    </h1>
                </header>
                <h2 className="authorization__h2">
                    Путешествуете с нами впервые?{' '}
                    <a href="#">Зарегистрируйтесь!</a>
                </h2>
                <form
                    className="authorization__form"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <div className="authorization__div__input">
                        <input
                            className="authorization__input authorization__input_login"
                            type="text"
                            placeholder="Email"
                            onBlur={(e) =>
                                setErrorEmail(checkIncorrectEmail(e))
                            }
                            onChange={(e) =>
                                setErrorEmail(checkIncorrectEmail(e, true))
                            }
                        />
                        {errorEmail && (
                            <p className="error-message">
                                Введите правильный e-mail.
                            </p>
                        )}
                    </div>
                    <div className="authorization__div__input">
                        <input
                            className="authorization__input authorization__input_password"
                            type={passwordView}
                            placeholder="Password"
                            onBlur={(e) => {
                                setErrorPassword(
                                    checkIncorrectPassword(e).incorrect
                                );
                                setErrorMessagePassword(
                                    checkIncorrectPassword(e).message
                                );
                            }}
                            onChange={(e) => {
                                setErrorPassword(
                                    checkIncorrectPassword(e, true).incorrect
                                );
                                setErrorMessagePassword(
                                    checkIncorrectPassword(e, true).message
                                );
                            }}
                        />
                        <button
                            className="authorization__btn_eye"
                            onClick={() => changePasswordView()}
                        >
                            Глаз
                        </button>
                        {errorPassword && (
                            <p className="error-message">
                                {errorMessagePassword}
                            </p>
                        )}
                    </div>
                    <button className="authorization__btn_submit" type="submit">
                        Войти
                    </button>
                </form>
            </div>
        </section>
    );
}

export default LoginForm;
