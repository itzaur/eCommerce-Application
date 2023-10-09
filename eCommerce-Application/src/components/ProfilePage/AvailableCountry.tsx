import { useState } from 'react';
import { checkIncorrectCountry } from '../../utils/validation/checkShippingCountry';
import { countries } from '../../utils/constants';

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

    const [toggleCaret, setToggleCaret] = useState(true);
    const [selectedValue, setSelectedValue] = useState(
        isEdit ? country : countries[0].slice(0, -1)
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
                    onClick={(): void => setToggleCaret((prev) => !prev)}
                >
                    <span>{selectedValue}</span>
                    <div
                        className={toggleCaret ? 'caret' : 'caret caret-rotate'}
                    />
                </button>
                <ul
                    className={
                        toggleCaret
                            ? 'menu profile__address-menu'
                            : 'menu menu-open  profile__address-menu'
                    }
                >
                    {countries.slice(1).map((currentCountry, index) => (
                        <button
                            type="button"
                            key={currentCountry[index]}
                            onClick={(): void => {
                                setToggleCaret((prev) => !prev);
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
