import { useState } from 'react';
import { checkIncorrectCountry } from '../../utils/validation/checkShippingCountry';

const countries = ['Россия', 'Беларусь', 'Польша'];

export function AvailableCountry(props: {
    errorCountry: boolean;
    errorMessageCountry: string;
    setErrorCountry: CallableFunction;
    setErrorMessageCountry: CallableFunction;
    country: string;
    setCountry: CallableFunction;
    isEdit: boolean;
}): JSX.Element {
    const {
        errorCountry,
        errorMessageCountry,
        setErrorCountry,
        setErrorMessageCountry,
        country,
        setCountry,
        isEdit,
    } = props;
    const [toggle, setToggle] = useState(true);
    const [selectedValue, setSelectedValue] = useState(
        isEdit ? country : 'Выберите страну'
    );

    return (
        <>
            <div className="dropdown">
                <button
                    type="button"
                    className={
                        errorCountry
                            ? 'select profile__address-country profile__address_invalid'
                            : 'select profile__address-country'
                    }
                    onClick={(): void => setToggle((prev) => !prev)}
                >
                    <span>{selectedValue}</span>
                    <div className={toggle ? 'caret' : 'caret caret-rotate'} />
                </button>
                <ul
                    className={
                        toggle
                            ? 'menu profile__address-menu'
                            : 'menu menu-open  profile__address-menu'
                    }
                >
                    {countries.map((currentCountry, index) => (
                        <button
                            type="button"
                            key={currentCountry[index]}
                            onClick={(): void => {
                                setToggle((prev) => !prev);
                                setSelectedValue(currentCountry);

                                setErrorCountry(
                                    checkIncorrectCountry(currentCountry)
                                        .incorrect
                                );
                                setErrorMessageCountry(
                                    checkIncorrectCountry(currentCountry)
                                        .message
                                );
                                setCountry(currentCountry);
                            }}
                        >
                            {`${currentCountry}`}
                        </button>
                    ))}
                </ul>
            </div>
            <p className="error-message">
                {errorCountry ? errorMessageCountry : ''}
            </p>
        </>
    );
}
