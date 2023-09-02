import { Address } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import {
    checkIncorrectAddressCity,
    checkIncorrectAddressRegion,
    checkIncorrectAddressStreet,
} from '../../utils/validation/checkAddress';
import { checkIncorrectAddressIndex } from '../../utils/validation/checkIndex';
import { AvailableCountry } from './AvailableCountry';
import { addCustomerAddress } from '../../commercetools/addCustomerAddress';
import { getCountry } from '../../commercetools/getCountry';
import { editCustomerAddress } from '../../commercetools/editCustomerAddress';

const countries = ['Выберите страну*', 'Россия', 'Беларусь', 'Польша'];

export function AddAddressFormView(props: {
    userId: string;
    setAddAddressFormView: CallableFunction;
    addressTypeView: boolean;
    version: number;
    setVersion: CallableFunction;
    setTypeAddresses: CallableFunction;
    setDefaultAddresses: CallableFunction;
    isEdit: boolean;
    setIsEdit: CallableFunction;
    currentSelectedAddress: Address;
}): JSX.Element {
    const {
        userId,
        setAddAddressFormView,
        addressTypeView,
        version,
        setVersion,
        setTypeAddresses,
        setDefaultAddresses,
        isEdit,
        setIsEdit,
        currentSelectedAddress,
    } = props;

    const [errorCountry, setErrorCountry] = useState(false);
    const [errorMessageCountry, setErrorMessageCountry] = useState('');
    const [country, setCountry] = useState(
        isEdit
            ? String(getCountry(currentSelectedAddress.country))
            : countries[0]
    );

    const [errorRegion, setErrorRegion] = useState(false);
    const [errorMessageRegion, setErrorMessageRegion] = useState('');
    const [regionValue, setRegionValue] = useState(
        isEdit ? currentSelectedAddress.region : ''
    );

    const [errorCity, setErrorCity] = useState(false);
    const [errorMessageCity, setErrorMessageCity] = useState('');
    const [cityValue, setCityValue] = useState(
        isEdit ? currentSelectedAddress.city : ''
    );

    const [errorIndex, setErrorIndex] = useState(false);
    const [errorMessageIndex, setErrorMessageIndex] = useState('');
    const [indexValue, setIndexValue] = useState(
        isEdit ? String(currentSelectedAddress.postalCode) : ''
    );

    const [errorStreet, setErrorStreet] = useState(false);
    const [errorMessageStreet, setErrorMessageStreet] = useState('');
    const [streetValue, setStreetValue] = useState(
        isEdit ? currentSelectedAddress.streetName : ''
    );

    const [checkboxUseAddressAsDefault, setCheckboxUseAddressAsDefault] =
        useState(false);

    useEffect(() => {
        setErrorIndex(
            checkIncorrectAddressIndex(indexValue, country).incorrect
        );
        setErrorMessageIndex(
            checkIncorrectAddressIndex(indexValue, country).message
        );
        // if (isEdit && currentSelectedAddress) {
        // setCountry(currentSelectedAddress?.country);
        // setRegionValue(currentSelectedAddress?.region);
        // setCityValue(currentSelectedAddress?.city);
        // setIndexValue(currentSelectedAddress?.postalCode);
        // setStreetValue(currentSelectedAddress?.streetName);
        // }
    }, [indexValue, country]);

    // console.log('123', currentSelectedAddress.region);

    // useEffect(() => {
    //     setStreetValue('12346');
    // }, []);

    return (
        <form className="profile__address-wrapper">
            <div className="form__input-pair">
                <div className="profile__info-title">
                    {addressTypeView
                        ? `${isEdit ? 'Изменить' : 'Добавить'} адрес доставки`
                        : `${
                              isEdit ? 'Изменить' : 'Добавить'
                          } адрес выставления счета`}
                </div>
                <button
                    type="button"
                    className="btn_action"
                    onClick={(): void => {
                        setAddAddressFormView(true);
                        setIsEdit(false);
                    }}
                >
                    Close
                </button>
            </div>

            <fieldset className="form__input-group profile__address-form">
                <div className="form__input-pair">
                    <div className="form__inputs-wrapper">
                        <AvailableCountry
                            errorCountry={errorCountry}
                            errorMessageCountry={errorMessageCountry}
                            setErrorCountry={setErrorCountry}
                            setErrorMessageCountry={setErrorMessageCountry}
                            country={country}
                            setCountry={setCountry}
                            isEdit={isEdit}
                        />
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
                                value={regionValue}
                                className={
                                    errorRegion
                                        ? 'form__input profile__address-input form__input_invalid'
                                        : 'form__input profile__address-input'
                                }
                                onChange={(e): void => {
                                    setErrorRegion(
                                        checkIncorrectAddressRegion(e).incorrect
                                    );
                                    setErrorMessageRegion(
                                        checkIncorrectAddressRegion(e).message
                                    );
                                    setRegionValue(e.target.value);
                                }}
                            />
                            <div className="placeholder__input form_big-first-letter">
                                регион<span>*</span>
                            </div>
                            <p className="error-message">
                                {errorRegion ? errorMessageRegion : ''}
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
                                value={cityValue}
                                className={
                                    errorCity
                                        ? 'form__input profile__address-input form__input_invalid'
                                        : 'form__input profile__address-input'
                                }
                                onChange={(e): void => {
                                    setErrorCity(
                                        checkIncorrectAddressCity(e).incorrect
                                    );
                                    setErrorMessageCity(
                                        checkIncorrectAddressCity(e).message
                                    );
                                    setCityValue(e.target.value);
                                }}
                            />
                            <div className="placeholder__input form_big-first-letter">
                                город<span>*</span>
                            </div>
                            <p className="error-message">
                                {errorCity ? errorMessageCity : ''}
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
                                value={indexValue}
                                className={
                                    errorIndex
                                        ? 'form__input profile__address-input form__input_invalid'
                                        : 'form__input profile__address-input'
                                }
                                onChange={(e): void => {
                                    setIndexValue(e.target.value);
                                }}
                            />
                            <div className="placeholder__input form_big-first-letter">
                                индекс<span>*</span>
                            </div>
                            <p className="error-message">
                                {errorIndex ? errorMessageIndex : ''}
                            </p>
                        </label>
                    </div>
                </div>
                <div className="form__inputs-wrapper">
                    <label className="placeholder" htmlFor="shipping-address">
                        <input
                            required
                            type="text"
                            id="shipping-address"
                            value={streetValue}
                            className={
                                errorStreet
                                    ? 'form__input profile__address-input form__input_invalid'
                                    : 'form__input profile__address-input'
                            }
                            onChange={(e): void => {
                                setErrorStreet(
                                    checkIncorrectAddressStreet(e).incorrect
                                );
                                setErrorMessageStreet(
                                    checkIncorrectAddressStreet(e).message
                                );
                                setStreetValue(e.target.value);
                            }}
                        />
                        <div className="placeholder__input form_big-first-letter">
                            адрес<span>*</span>
                        </div>
                        <p className="error-message">
                            {errorStreet ? errorMessageStreet : ''}
                        </p>
                    </label>
                </div>
                <div className="form__input-pair">
                    <label
                        className="form__input_checkbox"
                        htmlFor="shipping-address-checkbox"
                    >
                        <input
                            type="checkbox"
                            id="shipping-address-checkbox"
                            checked={checkboxUseAddressAsDefault}
                            onChange={(): void => {
                                setCheckboxUseAddressAsDefault(
                                    !checkboxUseAddressAsDefault
                                );
                            }}
                        />
                        Сделать по умолчанию
                    </label>
                    <button
                        className="btn_action"
                        type="submit"
                        onClick={(e): void => {
                            e.preventDefault();
                            if (country === 'Выберите страну*') {
                                setErrorCountry(true);
                                setErrorMessageCountry('Это обязатальное поле');
                            }
                            if (country === 'Россия') {
                                if (!/^\d{6}$/.test(indexValue)) {
                                    setErrorIndex(true);
                                    setErrorMessageIndex(
                                        'Формат индекса 6 цифр XXXYYY'
                                    );
                                }
                            }
                            if (country === 'Беларусь') {
                                if (!/^\d{6}$/.test(indexValue)) {
                                    setErrorIndex(true);
                                    setErrorMessageIndex(
                                        'Формат индекса 6 цифр XXXYYY'
                                    );
                                }
                            }
                            if (country === 'Польша') {
                                if (!/^\d{2}-\d{3}$/.test(indexValue)) {
                                    setErrorIndex(true);
                                    setErrorMessageIndex(
                                        'Формат индекса 5 цифр XY-ZZZ'
                                    );
                                }
                            }

                            if (!regionValue) {
                                setErrorRegion(true);
                                setErrorMessageRegion('Это обязатальное поле');
                            }
                            if (!cityValue) {
                                setErrorCity(true);
                                setErrorMessageCity('Это обязатальное поле');
                            }
                            if (!indexValue) {
                                setErrorIndex(true);
                                setErrorMessageIndex('Это обязатальное поле');
                            }
                            if (!streetValue) {
                                setErrorStreet(true);
                                setErrorMessageStreet('Это обязатальное поле');
                            }
                            if (
                                errorCountry ||
                                !country ||
                                errorRegion ||
                                !regionValue ||
                                errorCity ||
                                !cityValue ||
                                errorIndex ||
                                !indexValue ||
                                errorStreet ||
                                !streetValue
                            )
                                return;

                            if (isEdit) {
                                editCustomerAddress(
                                    userId,
                                    country,
                                    regionValue,
                                    cityValue,
                                    indexValue,
                                    streetValue,
                                    // checkboxUseAddressAsDefault,
                                    version,
                                    setVersion,
                                    setAddAddressFormView,
                                    setTypeAddresses,
                                    String(currentSelectedAddress.id)
                                    // addressTypeView
                                    // setDefaultAddresses
                                );
                            } else {
                                addCustomerAddress(
                                    userId,
                                    country,
                                    regionValue,
                                    cityValue,
                                    indexValue,
                                    streetValue,
                                    checkboxUseAddressAsDefault,
                                    version,
                                    setVersion,
                                    setAddAddressFormView,
                                    setTypeAddresses,
                                    addressTypeView,
                                    setDefaultAddresses
                                );
                            }
                        }}
                    >
                        ок
                    </button>
                </div>
            </fieldset>
        </form>
    );
}
