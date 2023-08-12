import { useState } from 'react';
import logo from '../../assets/img/logo.png';
import './LoginForm.scss';
import { checkIncorrectEmail } from '../../utils/validation/checkCorrectEmail';
import { checkIncorrectPassword } from '../../utils/validation/checkPassword';

function LoginForm(): JSX.Element {
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorMessagePassword, setErrorMessagePassword] = useState('');
    const [passwordView, setPasswordView] = useState('password');

    const changePasswordView = (): void => {
        setPasswordView(passwordView === 'password' ? 'text' : 'password');
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
                    <form
                        className="form__inputs"
                        onSubmit={(e): void => e.preventDefault()}
                    >
                        <div className="placeinput">
                            <input
                                className="form__input"
                                type="text"
                                required
                                onBlur={(e): void =>
                                    setErrorEmail(checkIncorrectEmail(e))
                                }
                                onChange={(e): void =>
                                    setErrorEmail(checkIncorrectEmail(e, true))
                                }
                            />
                            <div className="place_holder">
                                Email<span>*</span>
                            </div>
                        </div>
                        <p className="error-message">
                            {errorEmail ? 'Введите правильный e-mail.' : ''}
                        </p>
                        <div className="placeinput">
                            <input
                                className="form__input"
                                type={passwordView}
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
                        <button className="button-action" type="submit">
                            Войти
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
}

export default LoginForm;
