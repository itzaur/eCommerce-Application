import { useState } from 'react';
import edit from '../../assets/icons/edit.svg';
import check from '../../assets/icons/check.svg';
import { checkIncorrectEmail } from '../../utils/validation/checkCorrectEmail';
import { checkIncorrectPassword } from '../../utils/validation/checkPassword';
import { editCustomerEmail } from '../../commercetools/editCustomerEmail';
import { editCustomerPassword } from '../../commercetools/editCustomerPassword';

export function EditAuthorizationDataView(props: {
    userId: string;
    email: string;
    setEmail: CallableFunction;
    version: number;
    setVersion: CallableFunction;
    setChangeAuthData: CallableFunction;
    setResultMessageEmail: CallableFunction;
    setResultMessagePassword: CallableFunction;
}): JSX.Element {
    const {
        userId,
        email,
        setEmail,
        version,
        setVersion,
        setChangeAuthData,
        setResultMessageEmail,
        setResultMessagePassword,
    } = props;

    const [errorEmail, setErrorEmail] = useState(false);
    const [errorMessageEmail, setErrorMessageEmail] = useState('');

    const [errorOldPassword, setErrorOldPassword] = useState(false);
    const [errorMessageOldPassword, setErrorMessageOldPassword] = useState('');
    const [passwordOld, setOldPassword] = useState('');

    const [errorPassword, setErrorPassword] = useState(false);
    const [errorMessagePassword, setErrorMessagePassword] = useState('');
    const [password, setPassword] = useState('');

    const [errorPasswordRepeat, setErrorPasswordRepeat] = useState(false);
    const [errorMessagePasswordRepeat, setErrorMessagePasswordRepeat] =
        useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const [isEditEmail, setIsEditEmail] = useState(false);
    const [isEditPassword, setIsEditPassword] = useState(false);

    const comparePassword = (
        passwordParam: string,
        passwordRepeatParam: string,
        currentTypePassword: string
    ): void => {
        if (!passwordRepeatParam || !passwordParam) {
            setErrorPasswordRepeat(false);
            setErrorPassword(false);
        } else if (passwordRepeatParam !== passwordParam) {
            if (currentTypePassword === 'First password') {
                setErrorPassword(true);
                setErrorMessagePassword('Пароли не совпадают');
            } else if (currentTypePassword === 'Second password') {
                setErrorPasswordRepeat(true);
                setErrorMessagePasswordRepeat('Пароли не совпадают');
            }
        } else {
            setErrorPasswordRepeat(false);
            setErrorPassword(false);
        }
    };

    return (
        <div className="profile__content">
            <div className="profile__content-email">
                <span className="profile__content-email-name">e-mail:</span>
                <label className="placeholder" htmlFor="name">
                    <input
                        className={
                            errorEmail
                                ? 'form__input form__input_invalid'
                                : 'form__input'
                        }
                        type="text"
                        id="email"
                        value={email}
                        disabled={!isEditEmail}
                        onChange={(e): void => {
                            setErrorEmail(checkIncorrectEmail(e).incorrect);
                            setErrorMessageEmail(
                                checkIncorrectEmail(e).message
                            );
                            setEmail(e.target.value);
                        }}
                    />
                    <p className="error-message">
                        {errorEmail ? errorMessageEmail : ''}
                    </p>
                    {isEditEmail ? (
                        <button
                            type="button"
                            className="menu__button_edit"
                            onClick={(e): void => {
                                e.preventDefault();
                                if (!email) {
                                    setErrorEmail(true);
                                    setErrorMessageEmail(
                                        'Это обязатальное поле'
                                    );
                                }
                                if (errorEmail || !email) return;
                                setIsEditEmail(false);
                                editCustomerEmail(
                                    userId,
                                    email,
                                    version,
                                    setVersion
                                )
                                    .then(() => {
                                        setChangeAuthData(true);
                                        setResultMessageEmail(
                                            'e-mail успешно обновлен'
                                        );
                                        setTimeout(() => {
                                            setResultMessageEmail('');
                                        }, 1500);
                                    })
                                    .catch((err) => {
                                        if (err.cause === 'emailError') {
                                            setErrorEmail(true);
                                            setErrorMessageEmail(
                                                'такая почта уже существует'
                                            );
                                        }
                                        if (err.cause === 'ServerError') {
                                            document.body.textContent =
                                                err.message;
                                            document.body.classList.add(
                                                'error-connection'
                                            );
                                        }
                                    });
                            }}
                        >
                            <img src={check} alt="check" />
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="menu__button_edit"
                            onClick={(): void => {
                                setIsEditEmail(true);
                            }}
                        >
                            <img src={edit} alt="edit" />
                        </button>
                    )}
                </label>
            </div>

            <div className="profile__content-password">
                <span>введите пароль:</span>
                <label className="placeholder" htmlFor="password">
                    <input
                        className={
                            errorOldPassword
                                ? 'form__input form__input_invalid form__password'
                                : 'form__input'
                        }
                        type="password"
                        id="password"
                        disabled={!isEditPassword}
                        onChange={(e): void => {
                            setErrorOldPassword(
                                checkIncorrectPassword(e).incorrect
                            );
                            setErrorMessageOldPassword(
                                checkIncorrectPassword(e).message
                            );
                            setOldPassword(e.target.value);
                        }}
                    />
                    <p className="error-message">
                        {errorOldPassword ? errorMessageOldPassword : ''}
                    </p>
                </label>
            </div>
            <div className="profile__content-password">
                <span>введите новый пароль:</span>
                <label className="placeholder" htmlFor="user-password">
                    <input
                        required
                        type="password"
                        id="user-password"
                        className={
                            errorPassword
                                ? 'form__input form__input_invalid form__password'
                                : 'form__input'
                        }
                        disabled={!isEditPassword}
                        onChange={(e): void => {
                            setPassword(e.target.value);

                            const checkPasswordError =
                                checkIncorrectPassword(e).incorrect;

                            if (checkPasswordError) {
                                setErrorPassword(checkPasswordError);

                                setErrorMessagePassword(
                                    checkIncorrectPassword(e).message
                                );
                            } else {
                                comparePassword(
                                    e.target.value,
                                    passwordRepeat,
                                    'First password'
                                );
                            }
                        }}
                    />
                    <div className="placeholder__input form_big-first-letter">
                        создайте пароль<span>*</span>
                    </div>
                    <p className="error-message">
                        {errorPassword ? errorMessagePassword : ''}
                    </p>
                </label>
            </div>
            <div className="profile__content-password">
                <span>повторите пароль:</span>
                <label className="placeholder" htmlFor="user-password-repeat">
                    <input
                        required
                        type="password"
                        id="user-password-repeat"
                        className={
                            errorPasswordRepeat
                                ? 'form__input form__input_invalid'
                                : 'form__input'
                        }
                        disabled={!isEditPassword}
                        onChange={(e): void => {
                            setPasswordRepeat(e.target.value);

                            const checkPasswordError =
                                checkIncorrectPassword(e).incorrect;

                            if (checkPasswordError) {
                                setErrorPasswordRepeat(checkPasswordError);
                                setErrorMessagePasswordRepeat(
                                    checkIncorrectPassword(e).message
                                );
                            } else {
                                comparePassword(
                                    password,
                                    e.target.value,
                                    'Second password'
                                );
                            }
                        }}
                    />
                    <div className="placeholder__input form_big-first-letter">
                        повторите пароль<span>*</span>
                    </div>
                    <p className="error-message">
                        {errorPasswordRepeat ? errorMessagePasswordRepeat : ''}
                    </p>
                </label>
                {isEditPassword ? (
                    <button
                        type="submit"
                        className="menu__button_edit"
                        onClick={(e): void => {
                            e.preventDefault();
                            if (!passwordOld) {
                                setErrorOldPassword(true);
                                setErrorMessageOldPassword(
                                    'Это обязатальное поле'
                                );
                            }
                            if (!password) {
                                setErrorPassword(true);
                                setErrorMessagePassword(
                                    'Это обязатальное поле'
                                );
                            }
                            if (!passwordRepeat) {
                                setErrorPasswordRepeat(true);
                                setErrorMessagePasswordRepeat(
                                    'Это обязатальное поле'
                                );
                            }
                            if (password !== passwordRepeat) {
                                setErrorPasswordRepeat(true);
                                setErrorMessagePasswordRepeat(
                                    'Пароли не совпадают'
                                );
                            }
                            if (
                                errorOldPassword ||
                                !passwordOld ||
                                errorPassword ||
                                !password ||
                                errorPasswordRepeat ||
                                !passwordRepeat
                            )
                                return;
                            setIsEditPassword(false);

                            editCustomerPassword(
                                userId,
                                passwordOld,
                                passwordRepeat,
                                version,
                                setVersion
                            )
                                .then(() => {
                                    setChangeAuthData(true);
                                    setResultMessagePassword(
                                        'пароль успешно обновлен'
                                    );
                                    setTimeout(() => {
                                        setResultMessagePassword('');
                                    }, 1500);
                                })
                                .catch((err) => {
                                    if (err.cause === 'passwordError') {
                                        setErrorOldPassword(true);
                                        setErrorMessageOldPassword(
                                            'текущий пароль не верный'
                                        );
                                    }
                                    if (err.cause === 'ServerError') {
                                        document.body.textContent = err.message;
                                        document.body.classList.add(
                                            'error-connection'
                                        );
                                    }
                                });
                        }}
                    >
                        <img src={check} alt="check" />
                    </button>
                ) : (
                    <button
                        type="button"
                        className="menu__button_edit"
                        onClick={(): void => {
                            setIsEditPassword(true);
                        }}
                    >
                        <img src={edit} alt="edit" />
                    </button>
                )}
            </div>
        </div>
    );
}
