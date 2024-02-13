import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import Transition from '../Transition/Transition';
import { checkIncorrectUserName } from '../../utils/validation/checkUserName';
import { checkIncorrectEmail } from '../../utils/validation/checkCorrectEmail';
import { checkIncorrectPassword } from '../../utils/validation/checkPassword';
import { checkIncorrectName } from '../../utils/validation/checkName';
import { checkIncorrectSurname } from '../../utils/validation/checkSurname';
import {
    checkIncorrectAge,
    checkIncorrectBirthDay,
    checkIncorrectBirthMonth,
    checkIncorrectBirthYear,
    getAge,
} from '../../utils/validation/checkFullYears';

import logo from '../../assets/images/logo.png';
import {
    checkIncorrectAddressCity,
    checkIncorrectAddressRegion,
    checkIncorrectAddressStreet,
} from '../../utils/validation/checkAddress';
import { checkIncorrectAddressIndex } from '../../utils/validation/checkIndex';
import { checkIncorrectFormLife } from '../../utils/validation/checkFormLife';
import { checkIncorrectShippingCountry } from '../../utils/validation/checkShippingCountry';
import { checkIncorrectBillingCountry } from '../../utils/validation/checkBillingCountry';
import { signUpCustomer } from '../../commercetools/signUpCustomer';
import { loginCustomer } from '../../commercetools/loginCustomer';
import { countries } from '../../utils/constants';

function RegistrationDetail(): JSX.Element {
    const root = document.querySelector('main');
    if (root) root.id = 'registration';
    const [errorUserName, setErrorUserName] = useState(false);
    const [errorMessageUserName, setErrorMessageUserName] = useState('');
    const [userName, setUserName] = useState('');

    const [errorName, setErrorName] = useState(false);
    const [errorMessageName, setErrorMessageName] = useState('');
    const [name, setName] = useState('');

    const [errorSurname, setErrorSurname] = useState(false);
    const [errorMessageSurname, setErrorMessageSurname] = useState('');
    const [surname, setSurname] = useState('');

    const [errorPassword, setErrorPassword] = useState(false);
    const [errorMessagePassword, setErrorMessagePassword] = useState('');
    const [password, setPassword] = useState('');

    const [errorPasswordRepeat, setErrorPasswordRepeat] = useState(false);
    const [errorMessagePasswordRepeat, setErrorMessagePasswordRepeat] =
        useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const [errorEmail, setErrorEmail] = useState(false);
    const [errorMessageEmail, setErrorMessageEmail] = useState('');
    const [email, setEmail] = useState('');

    const [errorCountryShipping, setErrorCountryShipping] = useState(false);
    const [errorMessageCountryShipping, setErrorMessageCountryShipping] =
        useState('');
    const [countryShipping, setCountryShipping] = useState(countries[0]);

    const [errorShippingRegion, setErrorShippingRegion] = useState(false);
    const [errorMessageShippingRegion, setErrorMessageShippingRegion] =
        useState('');
    const [shippingRegionValue, setShippingRegionValue] = useState('');

    const [errorShippingCity, setErrorShippingCity] = useState(false);
    const [errorMessageShippingCity, setErrorMessageShippingCity] =
        useState('');
    const [shippingCityValue, setShippingCityValue] = useState('');

    const [errorShippingIndex, setErrorShippingIndex] = useState(false);
    const [errorMessageShippingIndex, setErrorMessageShippingIndex] =
        useState('');
    const [shippingIndexValue, setShippingIndexValue] = useState('');

    const [errorShippingStreet, setErrorShippingStreet] = useState(false);
    const [errorMessageShippingStreet, setErrorMessageShippingStreet] =
        useState('');
    const [shippingStreetValue, setShippingStreetValue] = useState('');

    const [errorCountryBilling, setErrorCountryBilling] = useState(false);
    const [errorMessageCountryBilling, setErrorMessageCountryBilling] =
        useState('');
    const [countryBilling, setCountryBilling] = useState(countries[0]);

    const [errorBillingRegion, setErrorBillingRegion] = useState(false);
    const [errorMessageBillingRegion, setErrorMessageBillingRegion] =
        useState('');
    const [billingRegionValue, setBillingRegionValue] = useState('');

    const [errorBillingCity, setErrorBillingCity] = useState(false);
    const [errorMessageBillingCity, setErrorMessageBillingCity] = useState('');
    const [billingCityValue, setBillingCityValue] = useState('');

    const [errorBillingIndex, setErrorBillingIndex] = useState(false);
    const [errorMessageBillingIndex, setErrorMessageBillingIndex] =
        useState('');
    const [billingIndexValue, setBillingIndexValue] = useState('');

    const [errorBillingStreet, setErrorBillingStreet] = useState(false);
    const [errorMessageBillingStreet, setErrorMessageBillingStreet] =
        useState('');
    const [billingStreetValue, setBillingStreetValue] = useState('');

    const [errorBirthDay, setErrorBirthDay] = useState(false);
    const [errorMessageBirthDay, setErrorMessageBirthDay] = useState('');
    const [birthDayValue, setBirthDayValue] = useState('');

    const [errorBirthMonth, setErrorBirthMonth] = useState(false);
    const [errorMessageBirthMonth, setErrorMessageBirthMonth] = useState('');
    const [birthMonthValue, setBirthMonthValue] = useState('');

    const [errorBirthYear, setErrorBirthYear] = useState(false);
    const [errorMessageBirthYear, setErrorMessageBirthYear] = useState('');
    const [birthYearValue, setBirthYearValue] = useState('');

    const [errorFormLife, setErrorFormLife] = useState(false);
    const [errorMessageFormLife, setErrorMessageFormLife] = useState('');
    const [formLifeValue, setFormLifeValue] = useState('');

    const [errorAge, setErrorAge] = useState(false);
    const [errorMessageAge, setErrorMessageAge] = useState('');
    const [resultMessage, setResultMessage] = useState('');
    const navigate = useNavigate();

    const timeline = gsap.timeline();
    const registrationTransition = useRef(null);
    const formTransition = useRef(null);

    useEffect(() => {
        if (localStorage.getItem('user')) navigate('/');
    });

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

    const [
        checkboxUseShippingAsBillingAddress,
        setCheckboxUseShippingAsBillingAddress,
    ] = useState(false);

    const [
        checkboxUseShippingAddressAsDefault,
        setCheckboxUseShippingAddressAsDefault,
    ] = useState(false);

    const [
        checkboxUseBillingAddressAsDefault,
        setCheckboxUseBillingAddressAsDefault,
    ] = useState(false);

    useEffect(() => {
        if (checkboxUseShippingAsBillingAddress) {
            setCountryBilling(countryShipping);
            setErrorCountryBilling(errorCountryShipping);
            setErrorMessageCountryBilling(errorMessageCountryShipping);
        }
    }, [
        checkboxUseShippingAsBillingAddress,
        countryShipping,
        errorCountryShipping,
        errorMessageCountryShipping,
    ]);

    useEffect(() => {
        if (checkboxUseShippingAsBillingAddress) {
            setBillingRegionValue(shippingRegionValue);
            setErrorBillingRegion(errorShippingRegion);
            setErrorMessageBillingRegion(errorMessageShippingRegion);
        }
    }, [
        checkboxUseShippingAsBillingAddress,
        shippingRegionValue,
        errorShippingRegion,
        errorMessageShippingRegion,
    ]);

    useEffect(() => {
        if (checkboxUseShippingAsBillingAddress) {
            setBillingCityValue(shippingCityValue);
            setErrorBillingCity(errorShippingCity);
            setErrorMessageBillingCity(errorMessageShippingCity);
        }
    }, [
        checkboxUseShippingAsBillingAddress,
        shippingCityValue,
        errorShippingCity,
        errorMessageShippingCity,
    ]);

    useEffect(() => {
        if (checkboxUseShippingAsBillingAddress) {
            setBillingIndexValue(shippingIndexValue);
            setErrorBillingIndex(errorShippingIndex);
            setErrorMessageBillingIndex(errorMessageShippingIndex);
        }
    }, [
        checkboxUseShippingAsBillingAddress,
        shippingIndexValue,
        errorShippingIndex,
        errorMessageShippingIndex,
    ]);

    useEffect(() => {
        if (checkboxUseShippingAsBillingAddress) {
            setBillingStreetValue(shippingStreetValue);
            setErrorBillingStreet(errorShippingStreet);
            setErrorMessageBillingStreet(errorMessageShippingStreet);
        }
    }, [
        checkboxUseShippingAsBillingAddress,
        shippingStreetValue,
        errorShippingStreet,
        errorMessageShippingStreet,
    ]);

    useEffect(() => {
        setErrorShippingIndex(
            checkIncorrectAddressIndex(shippingIndexValue, countryShipping)
                .incorrect
        );
        setErrorMessageShippingIndex(
            checkIncorrectAddressIndex(shippingIndexValue, countryShipping)
                .message
        );
    }, [shippingIndexValue, countryShipping]);

    useEffect(() => {
        setErrorBillingIndex(
            checkIncorrectAddressIndex(billingIndexValue, countryBilling)
                .incorrect
        );
        setErrorMessageBillingIndex(
            checkIncorrectAddressIndex(billingIndexValue, countryBilling)
                .message
        );
    }, [billingIndexValue, countryBilling]);

    return (
        <>
            <Transition timeline={timeline} />
            <header className="header" ref={registrationTransition}>
                <Link to="/">
                    <img src={logo} alt="logo" className="logo_big" />
                </Link>
            </header>
            <section className="form registration" ref={formTransition}>
                <h2 className="form__title form_big-first-letter">
                    добро пожаловать <br /> на борт космической одиссеи!
                </h2>
                <div className="form__content">
                    <div className="form__question form_big-first-letter">
                        уже есть аккаунт? <Link to="/login">войдите!</Link>
                    </div>
                    <form
                        className="form__inputs"
                        onSubmit={(e): void => e.preventDefault()}
                    >
                        <div className="form__inputs-wrapper">
                            <label className="placeholder" htmlFor="user-name">
                                <input
                                    required
                                    type="text"
                                    id="user-name"
                                    className={
                                        errorUserName
                                            ? 'form__input form__input_invalid'
                                            : 'form__input'
                                    }
                                    onChange={(e): void => {
                                        setErrorUserName(
                                            checkIncorrectUserName(e).incorrect
                                        );
                                        setErrorMessageUserName(
                                            checkIncorrectUserName(e).message
                                        );
                                        setUserName(e.target.value);
                                    }}
                                />
                                <div className="placeholder__input  form_big-first-letter">
                                    имя пользователя<span>*</span>
                                </div>
                                <p className="error-message">
                                    {errorUserName ? errorMessageUserName : ''}
                                </p>
                            </label>
                        </div>

                        <div className="form__input-pair">
                            <div className="form__inputs-wrapper">
                                <label className="placeholder" htmlFor="name">
                                    <input
                                        required
                                        type="text"
                                        id="name"
                                        className={
                                            errorName
                                                ? 'form__input form__input_invalid'
                                                : 'form__input'
                                        }
                                        onChange={(e): void => {
                                            setErrorName(
                                                checkIncorrectName(e).incorrect
                                            );
                                            setErrorMessageName(
                                                checkIncorrectName(e).message
                                            );
                                            setName(e.target.value);
                                        }}
                                    />
                                    <div className="placeholder__input form_big-first-letter">
                                        имя<span>*</span>
                                    </div>
                                    <p className="error-message">
                                        {errorName ? errorMessageName : ''}
                                    </p>
                                </label>
                            </div>
                            <div className="form__inputs-wrapper">
                                <label
                                    className="placeholder"
                                    htmlFor="surname"
                                >
                                    <input
                                        required
                                        type="text"
                                        id="surname"
                                        className={
                                            errorSurname
                                                ? 'form__input form__input_invalid'
                                                : 'form__input'
                                        }
                                        onChange={(e): void => {
                                            setErrorSurname(
                                                checkIncorrectSurname(e)
                                                    .incorrect
                                            );
                                            setErrorMessageSurname(
                                                checkIncorrectSurname(e).message
                                            );
                                            setSurname(e.target.value);
                                        }}
                                    />
                                    <div className="placeholder__input form_big-first-letter">
                                        фамилия<span>*</span>
                                    </div>
                                    <p className="error-message">
                                        {errorSurname
                                            ? errorMessageSurname
                                            : ''}
                                    </p>
                                </label>
                            </div>
                        </div>

                        <div className="form__inputs-wrapper">
                            <label
                                className="placeholder"
                                htmlFor="user-password"
                            >
                                <input
                                    required
                                    type="password"
                                    id="user-password"
                                    className={
                                        errorPassword
                                            ? 'form__input form__input_invalid form__password'
                                            : 'form__input'
                                    }
                                    onChange={(e): void => {
                                        setPassword(e.target.value);

                                        const checkPasswordError =
                                            checkIncorrectPassword(e).incorrect;

                                        if (checkPasswordError) {
                                            setErrorPassword(
                                                checkPasswordError
                                            );

                                            setErrorMessagePassword(
                                                checkIncorrectPassword(e)
                                                    .message
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
                        <div className="form__inputs-wrapper">
                            <label
                                className="placeholder"
                                htmlFor="user-password-repeat"
                            >
                                <input
                                    required
                                    type="password"
                                    id="user-password-repeat"
                                    className={
                                        errorPasswordRepeat
                                            ? 'form__input form__input_invalid'
                                            : 'form__input'
                                    }
                                    onChange={(e): void => {
                                        setPasswordRepeat(e.target.value);

                                        const checkPasswordError =
                                            checkIncorrectPassword(e).incorrect;

                                        if (checkPasswordError) {
                                            setErrorPasswordRepeat(
                                                checkPasswordError
                                            );
                                            setErrorMessagePasswordRepeat(
                                                checkIncorrectPassword(e)
                                                    .message
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
                                    {errorPasswordRepeat
                                        ? errorMessagePasswordRepeat
                                        : ''}
                                </p>
                            </label>
                        </div>
                        <div className="form__inputs-wrapper">
                            <label className="placeholder" htmlFor="user-email">
                                <input
                                    required
                                    type="text"
                                    id="user-email"
                                    className={
                                        errorEmail
                                            ? 'form__input form__input_invalid'
                                            : 'form__input'
                                    }
                                    onChange={(e): void => {
                                        setErrorEmail(
                                            checkIncorrectEmail(e).incorrect
                                        );
                                        setErrorMessageEmail(
                                            checkIncorrectEmail(e).message
                                        );
                                        setEmail(e.target.value);
                                    }}
                                />
                                <div className="placeholder__input form_big-first-letter">
                                    e-mail<span>*</span>
                                </div>
                                <p className="error-message">
                                    {errorEmail ? errorMessageEmail : ''}
                                </p>
                            </label>
                        </div>

                        <fieldset className="form__input-group ">
                            <legend>Адрес доставки</legend>

                            <div className="form__input-pair">
                                <div className="form__inputs-wrapper">
                                    <select
                                        id="shipping-country"
                                        className={
                                            errorCountryShipping
                                                ? 'form__input form__input_invalid form__select'
                                                : 'form__input'
                                        }
                                        defaultValue={countryShipping}
                                        onChange={(e): void => {
                                            setErrorCountryShipping(
                                                checkIncorrectShippingCountry(e)
                                                    .incorrect
                                            );
                                            setErrorMessageCountryShipping(
                                                checkIncorrectShippingCountry(e)
                                                    .message
                                            );
                                            setCountryShipping(e.target.value);
                                        }}
                                    >
                                        {countries.map((c, index) =>
                                            index === 0 ? (
                                                <option
                                                    key={c}
                                                    value={c}
                                                    disabled
                                                >
                                                    {c}
                                                </option>
                                            ) : (
                                                <option key={c} value={c}>
                                                    {c}
                                                </option>
                                            )
                                        )}
                                    </select>
                                    <p className="error-message">
                                        {errorCountryShipping
                                            ? errorMessageCountryShipping
                                            : ''}
                                    </p>
                                </div>
                                <div className="form__inputs-wrapper">
                                    <label
                                        className="placeholder"
                                        htmlFor="shipping-address-region"
                                    >
                                        <input
                                            required
                                            type="text"
                                            id="shipping-address-region"
                                            className={
                                                errorShippingRegion
                                                    ? 'form__input form__input_invalid'
                                                    : 'form__input'
                                            }
                                            onChange={(e): void => {
                                                setErrorShippingRegion(
                                                    checkIncorrectAddressRegion(
                                                        e
                                                    ).incorrect
                                                );
                                                setErrorMessageShippingRegion(
                                                    checkIncorrectAddressRegion(
                                                        e
                                                    ).message
                                                );
                                                setShippingRegionValue(
                                                    e.target.value
                                                );
                                            }}
                                        />
                                        <div className="placeholder__input form_big-first-letter">
                                            регион<span>*</span>
                                        </div>
                                        <p className="error-message">
                                            {errorShippingRegion
                                                ? errorMessageShippingRegion
                                                : ''}
                                        </p>
                                    </label>
                                </div>
                            </div>
                            <div className="form__input-pair">
                                <div className="form__inputs-wrapper">
                                    <label
                                        className="placeholder"
                                        htmlFor="shipping-address-city"
                                    >
                                        <input
                                            required
                                            type="text"
                                            id="shipping-address-city"
                                            className={
                                                errorShippingCity
                                                    ? 'form__input form__input_invalid'
                                                    : 'form__input'
                                            }
                                            onChange={(e): void => {
                                                setErrorShippingCity(
                                                    checkIncorrectAddressCity(e)
                                                        .incorrect
                                                );
                                                setErrorMessageShippingCity(
                                                    checkIncorrectAddressCity(e)
                                                        .message
                                                );
                                                setShippingCityValue(
                                                    e.target.value
                                                );
                                            }}
                                        />
                                        <div className="placeholder__input form_big-first-letter">
                                            город<span>*</span>
                                        </div>
                                        <p className="error-message">
                                            {errorShippingCity
                                                ? errorMessageShippingCity
                                                : ''}
                                        </p>
                                    </label>
                                </div>
                                <div className="form__inputs-wrapper">
                                    <label
                                        className="placeholder"
                                        htmlFor="shipping-address-index"
                                    >
                                        <input
                                            required
                                            type="text"
                                            id="shipping-address-index"
                                            className={
                                                errorShippingIndex
                                                    ? 'form__input form__input_invalid'
                                                    : 'form__input'
                                            }
                                            onChange={(e): void => {
                                                setShippingIndexValue(
                                                    e.target.value
                                                );
                                            }}
                                        />
                                        <div className="placeholder__input form_big-first-letter">
                                            индекс<span>*</span>
                                        </div>
                                        <p className="error-message">
                                            {errorShippingIndex
                                                ? errorMessageShippingIndex
                                                : ''}
                                        </p>
                                    </label>
                                </div>
                            </div>
                            <div className="form__inputs-wrapper">
                                <label
                                    className="placeholder"
                                    htmlFor="shipping-address"
                                >
                                    <input
                                        required
                                        type="text"
                                        id="shipping-address"
                                        className={
                                            errorShippingStreet
                                                ? 'form__input form__input_invalid'
                                                : 'form__input'
                                        }
                                        onChange={(e): void => {
                                            setErrorShippingStreet(
                                                checkIncorrectAddressStreet(e)
                                                    .incorrect
                                            );
                                            setErrorMessageShippingStreet(
                                                checkIncorrectAddressStreet(e)
                                                    .message
                                            );
                                            setShippingStreetValue(
                                                e.target.value
                                            );
                                        }}
                                    />
                                    <div className="placeholder__input form_big-first-letter">
                                        адрес<span>*</span>
                                    </div>
                                    <p className="error-message">
                                        {errorShippingStreet
                                            ? errorMessageShippingStreet
                                            : ''}
                                    </p>
                                </label>
                            </div>
                            <div className="form__inputs-wrapper">
                                <label
                                    className="form__input_checkbox"
                                    htmlFor="shipping-address-checkbox"
                                >
                                    <input
                                        type="checkbox"
                                        id="shipping-address-checkbox"
                                        checked={
                                            checkboxUseShippingAddressAsDefault
                                        }
                                        onChange={(): void => {
                                            setCheckboxUseShippingAddressAsDefault(
                                                !checkboxUseShippingAddressAsDefault
                                            );
                                        }}
                                    />
                                    Использовать адрес по умолчанию
                                </label>
                            </div>

                            <div className="form__inputs-wrapper">
                                <label
                                    className="form__input_checkbox"
                                    htmlFor="billing-address-default-checkbox"
                                >
                                    <input
                                        type="checkbox"
                                        id="billing-address-default-checkbox"
                                        checked={
                                            checkboxUseShippingAsBillingAddress
                                        }
                                        onChange={(): void => {
                                            setCheckboxUseShippingAsBillingAddress(
                                                !checkboxUseShippingAsBillingAddress
                                            );
                                        }}
                                    />
                                    Использовать как адрес выставления счета
                                </label>
                            </div>
                        </fieldset>
                        <fieldset
                            className="form__input-group"
                            style={
                                checkboxUseShippingAsBillingAddress
                                    ? { pointerEvents: 'none' }
                                    : { pointerEvents: 'auto' }
                            }
                        >
                            <legend>Адрес выставления счета</legend>

                            <div className="form__input-pair">
                                <div className="form__inputs-wrapper">
                                    <select
                                        value={
                                            checkboxUseShippingAsBillingAddress
                                                ? countryShipping
                                                : countryBilling
                                        }
                                        className={
                                            errorCountryBilling
                                                ? 'form__input form__input_invalid form__select'
                                                : 'form__input'
                                        }
                                        id="billing-country"
                                        onChange={(e): void => {
                                            setErrorCountryBilling(
                                                checkIncorrectBillingCountry(e)
                                                    .incorrect
                                            );
                                            setErrorMessageCountryBilling(
                                                checkIncorrectBillingCountry(e)
                                                    .message
                                            );
                                            setCountryBilling(e.target.value);
                                        }}
                                    >
                                        {countries.map((c, index) =>
                                            index === 0 ? (
                                                <option
                                                    key={c}
                                                    value={c}
                                                    disabled
                                                >
                                                    {c}
                                                </option>
                                            ) : (
                                                <option key={c} value={c}>
                                                    {c}
                                                </option>
                                            )
                                        )}
                                    </select>
                                    <p className="error-message">
                                        {errorCountryBilling
                                            ? errorMessageCountryBilling
                                            : ''}
                                    </p>
                                </div>
                                <div className="form__inputs-wrapper">
                                    <label
                                        className="placeholder"
                                        htmlFor="billing-address-region"
                                    >
                                        <input
                                            value={
                                                checkboxUseShippingAsBillingAddress
                                                    ? shippingRegionValue
                                                    : billingRegionValue
                                            }
                                            required
                                            type="text"
                                            id="billing-address-region"
                                            className={
                                                errorBillingRegion
                                                    ? 'form__input form__input_invalid'
                                                    : 'form__input'
                                            }
                                            onChange={(e): void => {
                                                setErrorBillingRegion(
                                                    checkIncorrectAddressRegion(
                                                        e
                                                    ).incorrect
                                                );
                                                setErrorMessageBillingRegion(
                                                    checkIncorrectAddressRegion(
                                                        e
                                                    ).message
                                                );
                                                setBillingRegionValue(
                                                    e.target.value
                                                );
                                            }}
                                        />
                                        <div className="placeholder__input form_big-first-letter">
                                            регион<span>*</span>
                                        </div>
                                        <p className="error-message">
                                            {errorBillingRegion
                                                ? errorMessageBillingRegion
                                                : ''}
                                        </p>
                                    </label>
                                </div>
                            </div>
                            <div className="form__input-pair">
                                <div className="form__inputs-wrapper">
                                    <label
                                        className="placeholder"
                                        htmlFor="billing-address-city"
                                    >
                                        <input
                                            value={
                                                checkboxUseShippingAsBillingAddress
                                                    ? shippingCityValue
                                                    : billingCityValue
                                            }
                                            required
                                            type="text"
                                            id="billing-address-city"
                                            className={
                                                errorBillingCity
                                                    ? 'form__input form__input_invalid'
                                                    : 'form__input'
                                            }
                                            onChange={(e): void => {
                                                setErrorBillingCity(
                                                    checkIncorrectAddressCity(e)
                                                        .incorrect
                                                );
                                                setErrorMessageBillingCity(
                                                    checkIncorrectAddressCity(e)
                                                        .message
                                                );
                                                setBillingCityValue(
                                                    e.target.value
                                                );
                                            }}
                                        />
                                        <div className="placeholder__input form_big-first-letter">
                                            город<span>*</span>
                                        </div>
                                        <p className="error-message">
                                            {errorBillingCity
                                                ? errorMessageBillingCity
                                                : ''}
                                        </p>
                                    </label>
                                </div>
                                <div className="form__inputs-wrapper">
                                    <label
                                        className="placeholder"
                                        htmlFor="billing-address-index"
                                    >
                                        <input
                                            value={
                                                checkboxUseShippingAsBillingAddress
                                                    ? shippingIndexValue
                                                    : billingIndexValue
                                            }
                                            required
                                            type="text"
                                            id="billing-address-index"
                                            className={
                                                errorBillingIndex
                                                    ? 'form__input form__input_invalid'
                                                    : 'form__input'
                                            }
                                            onChange={(e): void => {
                                                setBillingIndexValue(
                                                    e.target.value
                                                );
                                            }}
                                        />
                                        <div className="placeholder__input form_big-first-letter">
                                            индекс<span>*</span>
                                        </div>
                                        <p className="error-message">
                                            {errorBillingIndex
                                                ? errorMessageBillingIndex
                                                : ''}
                                        </p>
                                    </label>
                                </div>
                            </div>
                            <div className="form__inputs-wrapper">
                                <label
                                    className="placeholder"
                                    htmlFor="billing-address"
                                >
                                    <input
                                        value={
                                            checkboxUseShippingAsBillingAddress
                                                ? shippingStreetValue
                                                : billingStreetValue
                                        }
                                        required
                                        type="text"
                                        id="billing-address"
                                        className={
                                            errorBillingStreet
                                                ? 'form__input form__input_invalid'
                                                : 'form__input'
                                        }
                                        onChange={(e): void => {
                                            setErrorBillingStreet(
                                                checkIncorrectAddressStreet(e)
                                                    .incorrect
                                            );
                                            setErrorMessageBillingStreet(
                                                checkIncorrectAddressStreet(e)
                                                    .message
                                            );
                                            setBillingStreetValue(
                                                e.target.value
                                            );
                                        }}
                                    />
                                    <div className="placeholder__input form_big-first-letter">
                                        адрес<span>*</span>
                                    </div>
                                    <p className="error-message">
                                        {errorBillingStreet
                                            ? errorMessageBillingStreet
                                            : ''}
                                    </p>
                                </label>
                            </div>

                            <div
                                className="form__inputs-wrapper"
                                style={{ pointerEvents: 'auto' }}
                            >
                                <label
                                    className="form__input_checkbox"
                                    htmlFor="billing-address-checkbox"
                                >
                                    <input
                                        type="checkbox"
                                        id="billing-address-checkbox"
                                        checked={
                                            checkboxUseBillingAddressAsDefault
                                        }
                                        onChange={(): void => {
                                            setCheckboxUseBillingAddressAsDefault(
                                                !checkboxUseBillingAddressAsDefault
                                            );
                                        }}
                                    />
                                    Использовать адрес по умолчанию
                                </label>
                            </div>
                        </fieldset>
                        <div className="form__input-trio">
                            <div className="form__inputs-wrapper">
                                <label
                                    className="placeholder"
                                    htmlFor="birth-day"
                                >
                                    <input
                                        required
                                        type="text"
                                        id="birth-day"
                                        className={
                                            errorBirthDay
                                                ? 'form__input form__input_invalid'
                                                : 'form__input'
                                        }
                                        onChange={(e): void => {
                                            setErrorBirthDay(
                                                checkIncorrectBirthDay(e)
                                                    .incorrect
                                            );
                                            setErrorMessageBirthDay(
                                                checkIncorrectBirthDay(e)
                                                    .message
                                            );
                                            setBirthDayValue(e.target.value);
                                        }}
                                    />
                                    <div className="placeholder__input form_big-first-letter">
                                        число<span>*</span>
                                    </div>
                                    <p className="error-message">
                                        {errorBirthDay
                                            ? errorMessageBirthDay
                                            : ''}
                                    </p>
                                </label>
                            </div>
                            <div className="form__inputs-wrapper">
                                <label
                                    className="placeholder"
                                    htmlFor="birth-month"
                                >
                                    <input
                                        required
                                        type="text"
                                        id="birth-month"
                                        className={
                                            errorBirthMonth
                                                ? 'form__input form__input_invalid'
                                                : 'form__input'
                                        }
                                        onChange={(e): void => {
                                            setErrorBirthMonth(
                                                checkIncorrectBirthMonth(e)
                                                    .incorrect
                                            );
                                            setErrorMessageBirthMonth(
                                                checkIncorrectBirthMonth(e)
                                                    .message
                                            );
                                            setBirthMonthValue(e.target.value);
                                        }}
                                    />
                                    <div className="placeholder__input form_big-first-letter">
                                        месяц<span>*</span>
                                    </div>
                                    <p className="error-message">
                                        {errorBirthMonth
                                            ? errorMessageBirthMonth
                                            : ''}
                                    </p>
                                </label>
                            </div>
                            <div className="form__inputs-wrapper">
                                <label
                                    className="placeholder"
                                    htmlFor="birth-year"
                                >
                                    <input
                                        required
                                        type="text"
                                        id="birth-year"
                                        className={
                                            errorBirthYear
                                                ? 'form__input form__input_invalid'
                                                : 'form__input'
                                        }
                                        onChange={(e): void => {
                                            setErrorBirthYear(
                                                checkIncorrectBirthYear(e)
                                                    .incorrect
                                            );
                                            setErrorMessageBirthYear(
                                                checkIncorrectBirthYear(e)
                                                    .message
                                            );
                                            setBirthYearValue(e.target.value);
                                        }}
                                    />
                                    <div className="placeholder__input form_big-first-letter">
                                        год<span>*</span>
                                    </div>
                                    <p className="error-message">
                                        {errorBirthYear
                                            ? errorMessageBirthYear
                                            : ''}
                                    </p>
                                </label>
                            </div>
                            <p className="error-message error-message--age">
                                {errorAge ? errorMessageAge : ''}
                            </p>
                        </div>
                        <div className="form__inputs-wrapper form__inputs-wrapper--offset">
                            <label className="placeholder" htmlFor="life-form">
                                <input
                                    required
                                    type="text"
                                    id="life-form"
                                    className={
                                        errorFormLife
                                            ? 'form__input form__input_invalid'
                                            : 'form__input'
                                    }
                                    onChange={(e): void => {
                                        setErrorFormLife(
                                            checkIncorrectFormLife(e).incorrect
                                        );
                                        setErrorMessageFormLife(
                                            checkIncorrectFormLife(e).message
                                        );
                                        setFormLifeValue(e.target.value);
                                    }}
                                />
                                <div className="placeholder__input form_big-first-letter">
                                    форма жизни<span>*</span>
                                </div>
                                <p className="error-message">
                                    {errorFormLife ? errorMessageFormLife : ''}
                                </p>
                            </label>
                        </div>

                        <div className="form__inputs-wrapper">
                            <label
                                className="form__input_checkbox"
                                htmlFor="multi-passport-submit"
                            >
                                <input
                                    type="checkbox"
                                    id="multi-passport-submit"
                                />
                                Наличие мультипаспорта
                            </label>
                        </div>

                        <button
                            className="btn_action"
                            type="submit"
                            onClick={(e): void => {
                                e.preventDefault();
                                setErrorAge(
                                    checkIncorrectAge(
                                        +birthDayValue,
                                        +birthMonthValue,
                                        +birthYearValue
                                    ).incorrect
                                );
                                setErrorMessageAge(
                                    checkIncorrectAge(
                                        +birthDayValue,
                                        +birthMonthValue,
                                        +birthYearValue
                                    ).message
                                );
                                if (!userName) {
                                    setErrorUserName(true);
                                    setErrorMessageUserName(
                                        'Это обязатальное поле'
                                    );
                                }
                                if (!name) {
                                    setErrorName(true);
                                    setErrorMessageName(
                                        'Это обязатальное поле'
                                    );
                                }
                                if (!surname) {
                                    setErrorSurname(true);
                                    setErrorMessageSurname(
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
                                if (!email) {
                                    setErrorEmail(true);
                                    setErrorMessageEmail(
                                        'Это обязатальное поле'
                                    );
                                }
                                if (countryShipping === countries[0]) {
                                    setErrorCountryShipping(true);
                                    setErrorMessageCountryShipping(
                                        'Это обязатальное поле'
                                    );
                                }
                                if (countryShipping === 'Россия') {
                                    if (!/^\d{6}$/.test(shippingIndexValue)) {
                                        setErrorShippingIndex(true);
                                        setErrorMessageShippingIndex(
                                            'Формат индекса 6 цифр XXXYYY'
                                        );
                                    }
                                }
                                if (countryShipping === 'Беларусь') {
                                    if (!/^\d{6}$/.test(shippingIndexValue)) {
                                        setErrorShippingIndex(true);
                                        setErrorMessageShippingIndex(
                                            'Формат индекса 6 цифр XXXYYY'
                                        );
                                    }
                                }
                                if (countryShipping === 'Польша') {
                                    if (
                                        !/^\d{2}-\d{3}$/.test(
                                            shippingIndexValue
                                        )
                                    ) {
                                        setErrorShippingIndex(true);
                                        setErrorMessageShippingIndex(
                                            'Формат индекса 5 цифр XY-ZZZ'
                                        );
                                    }
                                }

                                if (!shippingRegionValue) {
                                    setErrorShippingRegion(true);
                                    setErrorMessageShippingRegion(
                                        'Это обязатальное поле'
                                    );
                                }
                                if (!shippingCityValue) {
                                    setErrorShippingCity(true);
                                    setErrorMessageShippingCity(
                                        'Это обязатальное поле'
                                    );
                                }
                                if (!shippingIndexValue) {
                                    setErrorShippingIndex(true);
                                    setErrorMessageShippingIndex(
                                        'Это обязатальное поле'
                                    );
                                }
                                if (!shippingStreetValue) {
                                    setErrorShippingStreet(true);
                                    setErrorMessageShippingStreet(
                                        'Это обязатальное поле'
                                    );
                                }
                                if (countryBilling === countries[0]) {
                                    setErrorCountryBilling(true);
                                    setErrorMessageCountryBilling(
                                        'Это обязатальное поле'
                                    );
                                }

                                if (countryBilling === 'Россия') {
                                    if (!/^\d{6}$/.test(billingIndexValue)) {
                                        setErrorBillingIndex(true);
                                        setErrorMessageBillingIndex(
                                            'Формат индекса 6 цифр XXXYYY'
                                        );
                                    }
                                }
                                if (countryBilling === 'Беларусь') {
                                    if (!/^\d{6}$/.test(billingIndexValue)) {
                                        setErrorBillingIndex(true);
                                        setErrorMessageBillingIndex(
                                            'Формат индекса 6 цифр XXXYYY'
                                        );
                                    }
                                }

                                if (countryBilling === 'Польша') {
                                    if (
                                        !/^\d{2}-\d{3}$/.test(billingIndexValue)
                                    ) {
                                        setErrorShippingIndex(true);
                                        setErrorMessageShippingIndex(
                                            'Формат индекса 5 цифр XY-ZZZ'
                                        );
                                    }
                                }

                                if (!billingRegionValue) {
                                    setErrorBillingRegion(true);
                                    setErrorMessageBillingRegion(
                                        'Это обязатальное поле'
                                    );
                                }
                                if (!billingCityValue) {
                                    setErrorBillingCity(true);
                                    setErrorMessageBillingCity(
                                        'Это обязатальное поле'
                                    );
                                }
                                if (!billingIndexValue) {
                                    setErrorBillingIndex(true);
                                    setErrorMessageBillingIndex(
                                        'Это обязатальное поле'
                                    );
                                }

                                if (!billingStreetValue) {
                                    setErrorBillingStreet(true);
                                    setErrorMessageBillingStreet(
                                        'Это обязатальное поле'
                                    );
                                }
                                if (!birthDayValue) {
                                    setErrorBirthDay(true);
                                    setErrorMessageBirthDay(
                                        'Это обязатальное поле'
                                    );
                                }
                                if (!birthMonthValue) {
                                    setErrorBirthMonth(true);
                                    setErrorMessageBirthMonth(
                                        'Это обязатальное поле'
                                    );
                                }
                                if (!birthYearValue) {
                                    setErrorBirthYear(true);
                                    setErrorMessageBirthYear(
                                        'Это обязатальное поле'
                                    );
                                }
                                if (!formLifeValue) {
                                    setErrorFormLife(true);
                                    setErrorMessageFormLife(
                                        'Это обязатальное поле'
                                    );
                                }

                                if (
                                    errorUserName ||
                                    !userName ||
                                    errorName ||
                                    !name ||
                                    errorSurname ||
                                    !surname ||
                                    errorPassword ||
                                    !password ||
                                    errorPasswordRepeat ||
                                    !passwordRepeat ||
                                    errorEmail ||
                                    !email ||
                                    errorShippingRegion ||
                                    !shippingRegionValue ||
                                    errorShippingCity ||
                                    !shippingCityValue ||
                                    errorShippingIndex ||
                                    !shippingIndexValue ||
                                    errorShippingStreet ||
                                    !shippingStreetValue ||
                                    errorBillingRegion ||
                                    !billingRegionValue ||
                                    errorBillingCity ||
                                    !billingCityValue ||
                                    errorBillingIndex ||
                                    !billingIndexValue ||
                                    errorBillingStreet ||
                                    !billingStreetValue ||
                                    errorBirthDay ||
                                    !birthDayValue ||
                                    errorBirthMonth ||
                                    !birthMonthValue ||
                                    errorBirthYear ||
                                    !birthYearValue ||
                                    errorFormLife ||
                                    !formLifeValue ||
                                    countryShipping === countries[0] ||
                                    countryBilling === countries[0] ||
                                    getAge(
                                        +birthDayValue,
                                        +birthMonthValue,
                                        +birthYearValue
                                    ) < 18 ||
                                    password !== passwordRepeat
                                )
                                    return;
                                signUpCustomer({
                                    userName,
                                    name,
                                    surname,
                                    password,
                                    email,
                                    countryShipping,
                                    shippingRegion: shippingRegionValue,
                                    shippingCity: shippingCityValue,
                                    shippingIndex: shippingIndexValue,
                                    shippingStreet: shippingStreetValue,
                                    countryBilling,
                                    billingRegion: billingRegionValue,
                                    billingCity: billingCityValue,
                                    billingIndex: billingIndexValue,
                                    billingStreet: billingStreetValue,
                                    birthDay: birthDayValue,
                                    birthMonth: birthMonthValue,
                                    birthYear: birthYearValue,
                                    formLife: formLifeValue,
                                    defaultShippingAddress:
                                        checkboxUseShippingAddressAsDefault,
                                    defaultBillingAddress:
                                        checkboxUseBillingAddressAsDefault,
                                })
                                    .then(() => {
                                        setResultMessage(
                                            'вы успешно зарегистрировались в системе'
                                        );
                                        setTimeout(() => {
                                            loginCustomer(email, password)
                                                .then(() => {
                                                    navigate('/');
                                                    window.scrollTo({ top: 0 });
                                                })
                                                .catch((err) =>
                                                    setResultMessage(
                                                        err.message
                                                    )
                                                );
                                        }, 2000);
                                    })
                                    .catch((err) => {
                                        if (err.cause === 'passwordError') {
                                            setErrorPassword(true);
                                            setErrorMessagePassword(
                                                err.message
                                            );
                                        } else if (err.cause === 'emailError') {
                                            setErrorEmail(true);
                                            setErrorMessageEmail(err.message);
                                        } else if (
                                            err.cause === 'serverError'
                                        ) {
                                            setResultMessage(err.message);
                                        }
                                    });
                            }}
                        >
                            Регистрация
                        </button>
                    </form>
                </div>
            </section>
            {resultMessage && (
                <div className="modal active ">
                    <div className="modal_registration">
                        <button
                            className="modal_registration__btn"
                            type="button"
                            onClick={(): void => {
                                setResultMessage('');
                            }}
                            onKeyDown={(): void => {
                                setResultMessage('');
                            }}
                        >
                            X
                        </button>
                        {resultMessage}
                    </div>
                </div>
            )}
        </>
    );
}

export default RegistrationDetail;
