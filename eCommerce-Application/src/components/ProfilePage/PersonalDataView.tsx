import { Customer } from '@commercetools/platform-sdk';
import { useState } from 'react';
import edit from '../../assets/icons/edit.svg';
import check from '../../assets/icons/check.svg';

import { checkIncorrectName } from '../../utils/validation/checkName';
import { editCustomerName } from '../../commercetools/editCustomerName';
import { checkIncorrectSurname } from '../../utils/validation/checkSurname';
import { editCustomerSurName } from '../../commercetools/editCustomerSurname';

import {
    checkIncorrectAge,
    checkIncorrectBirthDay,
    checkIncorrectBirthMonth,
    checkIncorrectBirthYear,
    getAge,
} from '../../utils/validation/checkFullYears';
import { editCustomerAge } from '../../commercetools/editCustomerAge';
import { getCountry } from '../../commercetools/getCountry';

export function PersonalDataView(props: {
    userId: string;
    version: number;
    setVersion: CallableFunction;
    name: string;
    setName: CallableFunction;
    surname: string;
    setSurname: CallableFunction;
    birthDayValue: string;
    setBirthDayValue: CallableFunction;
    birthMonthValue: string;
    setBirthMonthValue: CallableFunction;
    birthYearValue: string;
    setBirthYearValue: CallableFunction;
    customer: Customer | undefined;
}): JSX.Element {
    const {
        version,
        setVersion,
        userId,
        name,
        setName,
        surname,
        setSurname,
        birthDayValue,
        setBirthDayValue,
        birthMonthValue,
        setBirthMonthValue,
        birthYearValue,
        setBirthYearValue,
        customer,
    } = props;

    const [errorName, setErrorName] = useState(false);
    const [errorMessageName, setErrorMessageName] = useState('');

    const [errorSurname, setErrorSurname] = useState(false);
    const [errorMessageSurname, setErrorMessageSurname] = useState('');

    const [errorBirthDay, setErrorBirthDay] = useState(false);
    const [errorMessageBirthDay, setErrorMessageBirthDay] = useState('');

    const [errorBirthMonth, setErrorBirthMonth] = useState(false);
    const [errorMessageBirthMonth, setErrorMessageBirthMonth] = useState('');

    const [errorBirthYear, setErrorBirthYear] = useState(false);
    const [errorMessageBirthYear, setErrorMessageBirthYear] = useState('');

    const [isEditName, setIsEditName] = useState(false);
    const [isEditSurname, setIsEditSurname] = useState(false);
    const [isEditBirth, setIsEditBirth] = useState(false);

    const [errorAge, setErrorAge] = useState(false);
    const [errorMessageAge, setErrorMessageAge] = useState('');

    return (
        <div className="profile__info">
            <div className="profile__info-line">
                <div className="profile__info-title">имя:</div>
                <div className="profile__info-name">
                    <label className="placeholder" htmlFor="name">
                        <input
                            disabled={!isEditName}
                            value={name}
                            type="text"
                            id="name"
                            className={
                                errorName
                                    ? 'form__input form__input_invalid'
                                    : 'form__input'
                            }
                            onChange={(e): void => {
                                setErrorName(checkIncorrectName(e).incorrect);
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
                    {isEditName ? (
                        <button
                            type="submit"
                            className="menu__button_edit"
                            onClick={(e): void => {
                                e.preventDefault();
                                setIsEditName(false);
                                if (!name) {
                                    setErrorName(true);
                                    setErrorMessageName(
                                        'Это обязатальное поле'
                                    );
                                }
                                if (errorName || !name) return;
                                editCustomerName(
                                    userId,
                                    name,
                                    version,
                                    setVersion
                                );
                            }}
                        >
                            <img src={check} alt="check" />
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="menu__button_edit"
                            onClick={(): void => {
                                setIsEditName(true);
                            }}
                        >
                            <img src={edit} alt="edit" />
                        </button>
                    )}
                </div>
            </div>
            <div className="profile__info-line">
                <div className="profile__info-title">фамилия:</div>
                <div className="profile__info-name">
                    <label className="placeholder" htmlFor="surname">
                        <input
                            disabled={!isEditSurname}
                            value={surname}
                            type="text"
                            id="surname"
                            className={
                                errorName
                                    ? 'form__input form__input_invalid'
                                    : 'form__input'
                            }
                            onChange={(e): void => {
                                setErrorSurname(
                                    checkIncorrectSurname(e).incorrect
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
                            {errorSurname ? errorMessageSurname : ''}
                        </p>
                    </label>
                    {isEditSurname ? (
                        <button
                            type="submit"
                            className="menu__button_edit"
                            onClick={(e): void => {
                                e.preventDefault();
                                setIsEditSurname(false);
                                if (!surname) {
                                    setErrorSurname(true);
                                    setErrorMessageSurname(
                                        'Это обязатальное поле'
                                    );
                                }
                                if (errorName || !name) return;
                                editCustomerSurName(
                                    userId,
                                    surname,
                                    version,
                                    setVersion
                                );
                            }}
                        >
                            <img src={check} alt="check" />
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="menu__button_edit"
                            onClick={(): void => {
                                setIsEditSurname(true);
                            }}
                        >
                            <img src={edit} alt="edit" />
                        </button>
                    )}
                </div>
            </div>

            <div className="form__input-trio">
                <div className="form__inputs-wrapper">
                    <label className="placeholder" htmlFor="birth-day">
                        <input
                            disabled={!isEditBirth}
                            value={birthDayValue}
                            type="text"
                            id="birth-day"
                            className={
                                errorBirthDay
                                    ? 'form__input form__input_invalid'
                                    : 'form__input'
                            }
                            onChange={(e): void => {
                                setErrorBirthDay(
                                    checkIncorrectBirthDay(e).incorrect
                                );
                                setErrorMessageBirthDay(
                                    checkIncorrectBirthDay(e).message
                                );
                                setBirthDayValue(e.target.value);
                            }}
                        />
                        <div className="placeholder__input form_big-first-letter">
                            число<span>*</span>
                        </div>
                        <p className="error-message">
                            {errorBirthDay ? errorMessageBirthDay : ''}
                        </p>
                    </label>
                </div>
                <div className="form__inputs-wrapper">
                    <label className="placeholder" htmlFor="birth-month">
                        <input
                            disabled={!isEditBirth}
                            value={birthMonthValue}
                            type="text"
                            id="birth-month"
                            className={
                                errorBirthMonth
                                    ? 'form__input form__input_invalid'
                                    : 'form__input'
                            }
                            onChange={(e): void => {
                                setErrorBirthMonth(
                                    checkIncorrectBirthMonth(e).incorrect
                                );
                                setErrorMessageBirthMonth(
                                    checkIncorrectBirthMonth(e).message
                                );
                                setBirthMonthValue(e.target.value);
                            }}
                        />
                        <div className="placeholder__input form_big-first-letter">
                            месяц<span>*</span>
                        </div>
                        <p className="error-message">
                            {errorBirthMonth ? errorMessageBirthMonth : ''}
                        </p>
                    </label>
                </div>
                <div className="form__inputs-wrapper">
                    <label className="placeholder" htmlFor="birth-year">
                        <input
                            disabled={!isEditBirth}
                            value={birthYearValue}
                            type="text"
                            id="birth-year"
                            className={
                                errorBirthYear
                                    ? 'form__input form__input_invalid'
                                    : 'form__input'
                            }
                            onChange={(e): void => {
                                setErrorBirthYear(
                                    checkIncorrectBirthYear(e).incorrect
                                );
                                setErrorMessageBirthYear(
                                    checkIncorrectBirthYear(e).message
                                );
                                setBirthYearValue(e.target.value);
                            }}
                        />
                        <div className="placeholder__input form_big-first-letter">
                            год<span>*</span>
                        </div>
                        <p className="error-message">
                            {errorBirthYear ? errorMessageBirthYear : ''}
                        </p>
                    </label>
                </div>
                <p className="error-message error-message--age">
                    {errorAge ? errorMessageAge : ''}
                </p>
            </div>

            {isEditBirth ? (
                <button
                    type="submit"
                    className="menu__button_edit"
                    onClick={(e): void => {
                        e.preventDefault();
                        setIsEditBirth(false);
                        setErrorAge(checkIncorrectAge().incorrect);
                        setErrorMessageAge(checkIncorrectAge().message);

                        if (!birthDayValue) {
                            setErrorBirthDay(true);
                            setErrorMessageBirthDay('Это обязатальное поле');
                        }
                        if (!birthMonthValue) {
                            setErrorBirthMonth(true);
                            setErrorMessageBirthMonth('Это обязатальное поле');
                        }
                        if (!birthYearValue) {
                            setErrorBirthYear(true);
                            setErrorMessageBirthYear('Это обязатальное поле');
                        }

                        if (
                            errorBirthDay ||
                            !birthDayValue ||
                            errorBirthMonth ||
                            !birthMonthValue ||
                            errorBirthYear ||
                            !birthYearValue ||
                            getAge() < 19
                        )
                            return;
                        editCustomerAge(
                            userId,
                            birthDayValue,
                            birthMonthValue,
                            birthYearValue,
                            version,
                            setVersion
                        );
                    }}
                >
                    <img src={check} alt="check" />
                </button>
            ) : (
                <button
                    type="button"
                    className="menu__button_edit"
                    onClick={(): void => {
                        setIsEditBirth(true);
                    }}
                >
                    <img src={edit} alt="edit" />
                </button>
            )}

            <div className="profile__info-line">
                <div className="profile__info-title">дата рождения:</div>
                <div className="profile__info-name">
                    <span>{customer?.dateOfBirth}</span>
                </div>
            </div>
            <div className="profile__info-line">
                <div className="profile__info-title">страна:</div>
                <div className="profile__info-name">
                    <span>{getCountry(customer?.addresses[0]?.country)}</span>
                </div>
            </div>
            <div className="profile__info-line">
                <div className="profile__info-title">регион:</div>
                <div className="profile__info-name">
                    <span>{customer?.addresses[0]?.region}</span>
                </div>
            </div>
            <div className="profile__info-line">
                <div className="profile__info-title">город:</div>
                <div className="profile__info-name">
                    <span>{customer?.addresses[0]?.city}</span>
                </div>
            </div>
            <div className="profile__info-line">
                <div className="profile__info-title">форма жизни:</div>
                <div className="profile__info-name">
                    <span>{customer?.salutation?.split(' ').slice(1, 2)}</span>
                </div>
            </div>
        </div>
    );
}
