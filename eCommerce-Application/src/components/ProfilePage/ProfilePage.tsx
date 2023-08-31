import { Address, Customer } from '@commercetools/platform-sdk';

import { useEffect, useState } from 'react';
import userPhoto from '../../assets/images/user.png';
import banner from '../../assets/images/banner.png';
import favorite from '../../assets/images/favorite.png';
import { getCustomer } from '../../commercetools/getCustomer';
import { AddressesListView } from './AddressesListView';
import { getCountry } from '../../commercetools/getCountry';
// import { getDefaultShippingAddress } from '../../commercetools/getDefaultShippingAddress';
// import { getDefaultBillingAddress } from '../../commercetools/getDefaultBillingAddress';
import { AddAddressFormView } from './AddAddressFormView';
// import { removeCustomerAddress } from '../../commercetools/removeCustomerAddress';

function ProfilePage(): JSX.Element {
    const user = localStorage.getItem('user') as string;
    const userId = JSON.parse(user).id;

    const [passwordView, setPasswordView] = useState('password');
    const [customer, setCustomer] = useState<Customer>();
    const [addressTypeView, setAddressTypeView] = useState(true);
    const [addAddressFormView, setAddAddressFormView] = useState(true);
    const [shippingAddresses, setShippingAddresses] = useState<Address[]>();
    const [billingAddresses, setBillingAddresses] = useState<Address[]>();
    const [defaultShippingAddress, setDefaultShippingAddresses] =
        useState<Address[]>();

    const [defaultBillingAddress, setDefaultBillingAddresses] =
        useState<Address[]>();

    const [version, setVersion] = useState(1);

    const [
        currentSelectedShippingAddress,
        setCurrentSelectedShippingFullAddress,
    ] = useState({
        id: '',
        postalCode: '',
        country: '',
        region: '',
        city: '',
        streetName: '',
    });

    const [
        currentSelectedBillingAddress,
        setCurrentSelectedBillingFullAddress,
    ] = useState({
        id: '',
        postalCode: '',
        country: '',
        region: '',
        city: '',
        streetName: '',
    });

    const [isEdit, setIsEdit] = useState(false);

    const changePasswordView = (): void => {
        setPasswordView(passwordView === 'password' ? 'text' : 'password');
    };

    const getShippingAddresses = (data: Customer): Address[] => {
        return data.addresses.filter((item) => {
            const addressesId = item.id;
            if (addressesId) {
                return data.shippingAddressIds?.includes(item.id);
            }
            return undefined;
        });
    };

    const getBillingAddresses = (data: Customer): Address[] => {
        return data.addresses.filter((item) => {
            const addressesId = item.id;
            if (addressesId) {
                return data.billingAddressIds?.includes(item.id);
            }
            return undefined;
        });
    };

    const getDefaultShippingAddress = (data: Customer): Address[] => {
        return data.addresses.filter((item) => {
            const addressesId = item.id;
            if (addressesId) {
                return data.defaultShippingAddressId?.includes(addressesId);
            }
            return undefined;
        });
        // if (shippingAddresses?.length) {
        //     return `${shippingAddresses[0].postalCode}, ${shippingAddresses[0].country}, ${shippingAddresses[0].region}, ${shippingAddresses[0].city}, ${shippingAddresses[0].streetName}`;
        // }
        // return undefined;
    };

    const getDefaultBillingAddress = (data: Customer): Address[] => {
        return data.addresses.filter((item) => {
            const addressesId = item.id;
            if (addressesId) {
                return data.defaultBillingAddressId?.includes(addressesId);
            }
            return undefined;
        });
        // if (shippingAddresses?.length) {
        //     return `${shippingAddresses[0].postalCode}, ${shippingAddresses[0].country}, ${shippingAddresses[0].region}, ${shippingAddresses[0].city}, ${shippingAddresses[0].streetName}`;
        // }
        // return undefined;
    };

    useEffect(() => {
        getCustomer(userId).then((data) => {
            if (data) {
                setShippingAddresses(getShippingAddresses(data));
                setBillingAddresses(getBillingAddresses(data));
                setCustomer(data);
                setVersion(data.version);
                // console.log('data', getDefaultShippingAddress(data));
                setDefaultShippingAddresses(getDefaultShippingAddress(data));
                setDefaultBillingAddresses(getDefaultBillingAddress(data));
            }
        });
    }, [userId]);
    // console.log(customer);

    // console.log(shippingAddresses);
    // console.log(defaultShippingAddress ? defaultShippingAddress[0].id : '');
    // console.log(defaultShippingAddress);
    // console.log(defaultBillingAddress);

    // console.log('edit', isEdit);

    return (
        <div>
            <section className="profile">
                <h2 className="profile__title">Привет</h2>
                <div className="profile__wrapper">
                    <img
                        src={userPhoto}
                        alt="UserPhoto"
                        className="profile__photo"
                    />
                    <div className="profile__address">
                        {addAddressFormView ? (
                            <div className="profile__address-wrapper">
                                <div className="profile__address-header">
                                    <button
                                        type="button"
                                        className={
                                            addressTypeView
                                                ? 'btn_action profile__button'
                                                : 'btn_action profile__button btn_un-action'
                                        }
                                        onClick={(): void =>
                                            setAddressTypeView(true)
                                        }
                                    >
                                        доставить по адресу
                                    </button>
                                    <button
                                        type="button"
                                        className={
                                            addressTypeView
                                                ? 'btn_action profile__button btn_un-action'
                                                : 'btn_action profile__button'
                                        }
                                        onClick={(): void =>
                                            setAddressTypeView(false)
                                        }
                                    >
                                        выставить счет
                                    </button>
                                </div>
                                <div className="profile__address-content">
                                    <div className="profile__info-line">
                                        <div className="profile__info-title">
                                            {addressTypeView
                                                ? 'Адрес доставки по умолчанию:'
                                                : 'Адрес выставления счета по умолчанию'}
                                        </div>
                                        <div className="profile__info-name">
                                            <span>
                                                {addressTypeView &&
                                                defaultShippingAddress &&
                                                defaultShippingAddress.length
                                                    ? `${defaultShippingAddress[0]?.postalCode} ${defaultShippingAddress[0]?.country}, ${defaultShippingAddress[0]?.region}, ${defaultShippingAddress[0]?.city}, ${defaultShippingAddress[0]?.streetName}`
                                                    : ''}
                                                {
                                                    !addressTypeView &&
                                                    defaultBillingAddress &&
                                                    defaultBillingAddress.length
                                                        ? `${defaultBillingAddress[0]?.postalCode} ${defaultBillingAddress[0]?.country}, ${defaultBillingAddress[0]?.region}, ${defaultBillingAddress[0]?.city}, ${defaultBillingAddress[0]?.streetName}`
                                                        : ''

                                                    // ? getDefaultShippingAddress(
                                                    //       customer
                                                    //   )
                                                    // : getDefaultBillingAddress(
                                                    //       customer
                                                    //   )}
                                                }
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile__address-select">
                                        <AddressesListView
                                            typeAddresses={
                                                addressTypeView
                                                    ? shippingAddresses
                                                    : billingAddresses
                                            }
                                            setTypeAddresses={
                                                addressTypeView
                                                    ? setShippingAddresses
                                                    : setBillingAddresses
                                            }
                                            currentSelectedAddress={
                                                addressTypeView
                                                    ? currentSelectedShippingAddress
                                                    : currentSelectedBillingAddress
                                            }
                                            setCurrentSelectedFullAddress={
                                                addressTypeView
                                                    ? setCurrentSelectedShippingFullAddress
                                                    : setCurrentSelectedBillingFullAddress
                                            }
                                            userId={userId}
                                            version={version}
                                            setVersion={setVersion}
                                            defaultAddress={
                                                addressTypeView
                                                    ? defaultShippingAddress
                                                    : defaultBillingAddress
                                            }
                                            setDefaultAddresses={
                                                addressTypeView
                                                    ? setDefaultShippingAddresses
                                                    : setDefaultBillingAddresses
                                            }
                                            // addAddressFormView={
                                            //     addAddressFormView
                                            // }
                                            setAddAddressFormView={
                                                setAddAddressFormView
                                            }
                                            // isEdit={isEdit}
                                            setIsEdit={setIsEdit}
                                        />

                                        {/* {addressTypeView ? (
                                            <AddressesListView
                                                typeAddresses={
                                                    shippingAddresses
                                                }
                                                setTypeAddresses={
                                                    setShippingAddresses
                                                }
                                                currentSelectedShippingAddress={
                                                    currentSelectedShippingAddress
                                                }
                                                setCurrentSelectedShippingFullAddress={
                                                    setCurrentSelectedShippingFullAddress
                                                }
                                                userId={userId}
                                                version={version}
                                                setVersion={setVersion}
                                            />
                                        ) : (
                                            <AddressesListView
                                                typeAddresses={billingAddresses}
                                                setTypeAddresses={
                                                    setBillingAddresses
                                                }
                                                currentSelectedShippingAddress={
                                                    currentSelectedShippingAddress
                                                }
                                                setCurrentSelectedShippingFullAddress={
                                                    setCurrentSelectedShippingFullAddress
                                                }
                                                userId={userId}
                                                version={version}
                                                setVersion={setVersion}
                                            />
                                        )} */}
                                    </div>

                                    <div className="profile__address-action">
                                        <button
                                            type="button"
                                            className="btn_action profile__button profile__button_small"
                                            onClick={(): void =>
                                                setAddAddressFormView(false)
                                            }
                                        >
                                            добавить новый адрес
                                        </button>
                                        {/* <button
                                            type="button"
                                            className="btn_action btn_un-action profile__button profile__button_small"
                                            onClick={(): Promise<void> =>
                                                removeCustomerAddress(
                                                    userId,
                                                    currentSelectedShippingAddress.id
                                                )
                                            }
                                        >
                                            удалить
                                        </button> */}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <AddAddressFormView
                                userId={userId}
                                setAddAddressFormView={setAddAddressFormView}
                                addressTypeView={addressTypeView}
                                version={version}
                                setVersion={setVersion}
                                setTypeAddresses={
                                    addressTypeView
                                        ? setShippingAddresses
                                        : setBillingAddresses
                                }
                                setDefaultAddresses={
                                    addressTypeView
                                        ? setDefaultShippingAddresses
                                        : setDefaultBillingAddresses
                                }
                                isEdit={isEdit}
                                setIsEdit={setIsEdit}
                            />
                        )}
                    </div>

                    <div className="profile__info">
                        <div className="profile__info-line">
                            <div className="profile__info-title">имя:</div>
                            <div className="profile__info-name">
                                <span>{customer?.firstName}</span>
                            </div>
                        </div>
                        <div className="profile__info-line">
                            <div className="profile__info-title">фамилия:</div>
                            <div className="profile__info-name">
                                <span>{customer?.lastName}</span>
                            </div>
                        </div>
                        <div className="profile__info-line">
                            <div className="profile__info-title">
                                дата рождения:
                            </div>
                            <div className="profile__info-name">
                                <span>{customer?.dateOfBirth}</span>
                            </div>
                        </div>
                        <div className="profile__info-line">
                            <div className="profile__info-title">страна:</div>
                            <div className="profile__info-name">
                                <span>
                                    {getCountry(
                                        customer?.addresses[0]?.country
                                    )}
                                </span>
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
                            <div className="profile__info-title">
                                форма жизни:
                            </div>
                            <div className="profile__info-name">
                                <span>
                                    {customer?.salutation
                                        ?.split(' ')
                                        .slice(1, 2)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="profile__banner">
                        <img
                            src={banner}
                            alt="banner"
                            className="banner__photo"
                        />
                    </div>
                    <div className="profile__favorite">
                        <div className="profile__favorite-wrapper">
                            <div className="profile__favorite-header btn_action profile__button">
                                Избранное
                            </div>
                            <img
                                src={favorite}
                                alt="favorite"
                                className="profile__favorite-img"
                            />
                        </div>
                    </div>
                    <div className="profile__private">
                        <div className="profile__private-wrapper">
                            <div className="profile__private-header">
                                <span className="btn_action profile__button">
                                    конфиденциальные данные
                                </span>
                                <span className="btn_action btn_un-action profile__button ">
                                    изменить
                                </span>
                            </div>
                            <div className="profile__content">
                                <div className="profile__content-email">
                                    <span className="profile__content-email-name">
                                        e-mail:
                                    </span>
                                    <label
                                        className="placeholder"
                                        htmlFor="name"
                                    >
                                        <input
                                            className="profile__content-email-input"
                                            value={customer?.email || 'loading'}
                                            type="text"
                                            id="email"
                                            disabled
                                        />
                                        <div className="placeholder__input form_big-first-letter">
                                            Email<span>*</span>
                                        </div>
                                    </label>
                                </div>

                                <div className="profile__content-password">
                                    <span>пароль:</span>

                                    <label
                                        className="placeholder"
                                        htmlFor="password"
                                    >
                                        <input
                                            className="profile__content-password-input"
                                            value={
                                                customer?.password || 'loading'
                                            }
                                            type={passwordView}
                                            id="password"
                                            disabled
                                        />
                                        <button
                                            type="button"
                                            className={`profile__password password-view password-view_${passwordView}`}
                                            onClick={(): void =>
                                                changePasswordView()
                                            }
                                            onKeyDown={(): void =>
                                                changePasswordView()
                                            }
                                        >
                                            &nbsp;
                                        </button>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ProfilePage;
