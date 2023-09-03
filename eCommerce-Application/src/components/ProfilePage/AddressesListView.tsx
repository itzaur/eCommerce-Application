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
    const [toggle, setToggle] = useState(true);
    const [isSelectAddress, setIsSelectAddress] = useState(false);

    const removeAddress = (id: string): Address[] | undefined => {
        return typeAddresses?.filter((typeAddress) => typeAddress.id !== id);
    };

    return (
        <div className="dropdown">
            <button
                type="button"
                className={toggle ? 'select' : 'select select-clicked'}
                onClick={(): void => setToggle((prev) => !prev)}
            >
                <span className="selected">
                    {isSelectAddress && currentSelectedAddress.postalCode !== ''
                        ? `${currentSelectedAddress.postalCode}, ${currentSelectedAddress.country}, ${currentSelectedAddress.region}, ${currentSelectedAddress.city}, ${currentSelectedAddress.streetName}`
                        : 'список доступных адресов'}
                </span>
                <div className={toggle ? 'caret' : 'caret caret-rotate'} />
            </button>
            <ul className={toggle ? 'menu' : 'menu menu-open'}>
                {typeAddresses?.map((address, index) => (
                    <div className="menu__wrapper" key={address.id}>
                        <button
                            type="button"
                            onClick={(): void => {
                                setToggle((prev) => !prev);
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
                                    const add = address.id;
                                    if (add) {
                                        setTypeAddresses(
                                            removeAddress(address.id)
                                        );
                                        removeCustomerAddress(
                                            userId,
                                            address.id,
                                            version,
                                            setVersion
                                        ).then(() => {
                                            setResultMessageAddress(
                                                'адрес успешно удален'
                                            );
                                            setTimeout(() => {
                                                setResultMessageAddress('');
                                            }, 1500);
                                        });
                                    }
                                    if (defaultAddress?.length) {
                                        if (add === defaultAddress[0].id)
                                            setDefaultAddresses('');
                                    }
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
