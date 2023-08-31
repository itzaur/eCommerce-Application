import { Address } from '@commercetools/platform-sdk';
import { useState } from 'react';
import trash from '../../assets/icons/trash.svg';
import edit from '../../assets/icons/edit.svg';

import { removeCustomerAddress } from '../../commercetools/removeCustomerAddress';
// import { EditAddressFormView } from './EditAddressFormView';

export function AddressesListView(props: {
    typeAddresses: Address[] | undefined;
    setTypeAddresses: CallableFunction;
    currentSelectedAddress: Address;
    setCurrentSelectedFullAddress: CallableFunction;
    // currentSelectedShippingAddress: Address;
    // setCurrentSelectedShippingFullAddress: CallableFunction;
    userId: string;
    version: number;
    setVersion: CallableFunction;
    defaultAddress: Address[] | undefined;
    setDefaultAddresses: CallableFunction;
    // addAddressFormView: boolean;
    setAddAddressFormView: CallableFunction;
    // isEdit: boolean;
    setIsEdit: CallableFunction;
}): JSX.Element {
    const {
        typeAddresses,
        setTypeAddresses,
        currentSelectedAddress,
        setCurrentSelectedFullAddress,
        // currentSelectedShippingAddress,
        // setCurrentSelectedShippingFullAddress,
        userId,
        version,
        setVersion,
        defaultAddress,
        setDefaultAddresses,
        // addAddressFormView,
        setAddAddressFormView,
        // isEdit,
        setIsEdit,
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
                {typeAddresses?.map((address) => (
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
                            {`${address?.postalCode}, ${address?.country}, ${address?.region}, ${address?.city}, ${address?.streetName}`}
                        </button>

                        <div className="menu__wrapper">
                            <button
                                type="button"
                                className="menu__button_edit"
                                onClick={(): void => {
                                    setAddAddressFormView(false);
                                    setIsEdit(true);
                                    // console.log(address.city);
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
                                        );
                                    }
                                    // console.log(add);
                                    // console.log(defaultAddress[0].id);
                                    // console.log(add === defaultAddress[0].id);
                                    // const defaultAddress = defaultAddress[0].id;
                                    if (defaultAddress?.length) {
                                        if (add === defaultAddress[0].id)
                                            setDefaultAddresses('');
                                    }
                                    // console.log(true);
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
