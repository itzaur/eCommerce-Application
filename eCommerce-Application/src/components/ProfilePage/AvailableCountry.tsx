import { useState } from 'react';
import { checkIncorrectCountry } from '../../utils/validation/checkShippingCountry';

const countries = ['Россия', 'Беларусь', 'Польша'];

export function AvailableCountry(props: {
    errorCountry: boolean;
    errorMessageCountry: string;
    setErrorCountry: CallableFunction;
    setErrorMessageCountry: CallableFunction;
    setCountry: CallableFunction;
}): JSX.Element {
    const {
        errorCountry,
        errorMessageCountry,
        setErrorCountry,
        setErrorMessageCountry,
        setCountry,
    } = props;
    const [toggle, setToggle] = useState(true);
    const [selectedValue, setSelectedValue] = useState('Выберите страну');

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
                    {countries.map((country, index) => (
                        <button
                            type="button"
                            key={country[index]}
                            onClick={(): void => {
                                setToggle((prev) => !prev);
                                setSelectedValue(country);

                                setErrorCountry(
                                    checkIncorrectCountry(country).incorrect
                                );
                                setErrorMessageCountry(
                                    checkIncorrectCountry(country).message
                                );
                                setCountry(country);
                            }}
                        >
                            {`${country}`}
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
