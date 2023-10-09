import { Address } from '@commercetools/platform-sdk';
import { useState } from 'react';
import trash from '../../assets/icons/trash.svg';
import edit from '../../assets/icons/edit.svg';

import { removeCustomerAddress } from '../../commercetools/removeCustomerAddress';
import { getCountry } from '../../commercetools/getCountry';

export function AddressesListView(props: {
    typeAddresses: Address[] | undefined;
    setTypeAddresses: CallableFunction;
    currentSelectedAddress: Address;
    setCurrentSelectedFullAddress: CallableFunction;
    userId: string;
    version: number;
    setVersion: CallableFunction;
    defaultAddress: Address[] | undefined;
    setDefaultAddresses: CallableFunction;
    setAddAddressFormView: CallableFunction;
    setIsEdit: CallableFunction;
    setChangeAddressIndex: CallableFunction;
    setResultMessageAddress: CallableFunction;
}): JSX.Element {
    const {
        typeAddresses,
        setTypeAddresses,
        currentSelectedAddress,
        setCurrentSelectedFullAddress,
        userId,
        version,
        setVersion,
        defaultAddress,
        setDefaultAddresses,
        setAddAddressFormView,
        setIsEdit,
        setChangeAddressIndex,
        setResultMessageAddress,
    } = props;

    const [toggleDropdownMenu, setToggleDropdownMenu] = useState(true);
    const [isSelectAddress, setIsSelectAddress] = useState(false);

    const removeAddress = (id: string): Address[] | undefined => {
        return typeAddresses?.filter((typeAddress) => typeAddress.id !== id);
    };

    function removeCustomerAddressDOM(address: Address): void {
        const addressID = address.id;

        if (addressID) {
            setTypeAddresses(removeAddress(address.id));
            removeCustomerAddress(userId, address.id, version, setVersion)
                .then(() => {
                    setResultMessageAddress('адрес успешно удален');
                    setTimeout(() => {
                        setResultMessageAddress('');
                    }, 1500);
                })
                .catch((err) => {
                    if (err.cause === 'ServerError') {
                        document.body.textContent = err.message;
                        document.body.classList.add('error-connection');
                    }
                });
        }

        if (addressID === defaultAddress?.[0]?.id) setDefaultAddresses('');
    }

    return (
        <div className="dropdown">
            <button
                type="button"
                className={
                    toggleDropdownMenu ? 'select' : 'select select-clicked'
                }
                onClick={(): void => setToggleDropdownMenu((prev) => !prev)}
            >
                <span className="selected">
                    {isSelectAddress && currentSelectedAddress.postalCode !== ''
                        ? `${currentSelectedAddress.postalCode}, ${currentSelectedAddress.country}, ${currentSelectedAddress.region}, ${currentSelectedAddress.city}, ${currentSelectedAddress.streetName}`
                        : 'список доступных адресов'}
                </span>
                <div
                    className={
                        toggleDropdownMenu ? 'caret' : 'caret caret-rotate'
                    }
                />
            </button>
            <ul className={toggleDropdownMenu ? 'menu' : 'menu menu-open'}>
                {typeAddresses?.map((address, index) => (
                    <div className="menu__wrapper" key={address.id}>
                        <button
                            type="button"
                            onClick={(): void => {
                                setToggleDropdownMenu((prev) => !prev);
                                setIsSelectAddress(true);
                                setCurrentSelectedFullAddress({
                                    id: `${address.id}`,
                                    postalCode: `${address.postalCode}`,
                                    country: `${address.country}`,
                                    region: `${address.region}`,
                                    city: `${address.city}`,
                                    streetName: `${address.streetName}`,
                                });
                            }}
                        >
                            {`${address?.postalCode}, ${getCountry(
                                address?.country
                            )}, ${address?.region}, ${address?.city}, ${address?.streetName}`}
                        </button>

                        <div className="menu__wrapper">
                            <button
                                type="button"
                                className="menu__button_edit"
                                onClick={(): void => {
                                    setChangeAddressIndex(index);
                                    setAddAddressFormView(false);
                                    setIsEdit(true);
                                    setCurrentSelectedFullAddress({
                                        id: `${address.id}`,
                                        postalCode: `${address.postalCode}`,
                                        country: `${address.country}`,
                                        region: `${address.region}`,
                                        city: `${address.city}`,
                                        streetName: `${address.streetName}`,
                                    });
                                }}
                            >
                                <img src={edit} alt="edit" />
                            </button>

                            <button
                                type="button"
                                className="menu__button_trash"
                                onClick={(): void => {
                                    removeCustomerAddressDOM(address);
                                }}
                            >
                                <img src={trash} alt="trash" />
                            </button>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
}
