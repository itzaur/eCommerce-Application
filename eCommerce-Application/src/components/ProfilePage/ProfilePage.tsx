import { Address, Customer } from '@commercetools/platform-sdk';

import { useEffect, useState } from 'react';
import userPhoto from '../../assets/images/user.png';
import banner from '../../assets/images/banner.png';
import favorite from '../../assets/images/favorite.png';
import { getCustomer } from '../../commercetools/getCustomer';
import { AddressesListView } from './AddressesListView';
import { getCountry } from '../../commercetools/getCountry';

import { AddAddressFormView } from './AddAddressFormView';
import { EditAuthorizationDataView } from './EditAuthorizationDataView';
import { PersonalDataView } from './PersonalDataView';

function ProfilePage(): JSX.Element {
    const user = localStorage.getItem('user') as string;
    const userId = JSON.parse(user).id;

    const [customer, setCustomer] = useState<Customer>();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    const [birthDayValue, setBirthDayValue] = useState('');
    const [birthMonthValue, setBirthMonthValue] = useState('');
    const [birthYearValue, setBirthYearValue] = useState('');

    const [addressTypeView, setAddressTypeView] = useState(true);
    const [addAddressFormView, setAddAddressFormView] = useState(true);
    const [shippingAddresses, setShippingAddresses] = useState<
        Address[] | undefined
    >();
    const [billingAddresses, setBillingAddresses] = useState<
        Address[] | undefined
    >();

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
    const [changeAddressIndex, setChangeAddressIndex] = useState(0);
    const [changeAuthData, setChangeAuthData] = useState(true);

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
    };

    const getDefaultBillingAddress = (data: Customer): Address[] => {
        return data.addresses.filter((item) => {
            const addressesId = item.id;
            if (addressesId) {
                return data.defaultBillingAddressId?.includes(addressesId);
            }
            return undefined;
        });
    };

    useEffect(() => {
        getCustomer(userId).then((data) => {
            if (data) {
                setShippingAddresses(getShippingAddresses(data));
                setBillingAddresses(getBillingAddresses(data));
                setCustomer(data);
                setVersion(data.version);
                setDefaultShippingAddresses(getDefaultShippingAddress(data));
                setDefaultBillingAddresses(getDefaultBillingAddress(data));
                setEmail(data.email);
                setName(String(data.firstName));
                setSurname(String(data.lastName));
                setBirthDayValue(String(data.dateOfBirth?.split('-')[2]));
                setBirthMonthValue(String(data.dateOfBirth?.split('-')[1]));
                setBirthYearValue(String(data.dateOfBirth?.split('-')[0]));
            }
        });
    }, [userId]);

    return (
        <div>
            <section className="profile">
                <h2 className="profile__title">Привет {customer?.firstName}</h2>
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
                                                    ? `${defaultShippingAddress[0]
                                                          ?.postalCode} ${getCountry(
                                                          defaultShippingAddress[0]
                                                              ?.country
                                                      )}, ${defaultShippingAddress[0]
                                                          ?.region}, ${defaultShippingAddress[0]
                                                          ?.city}, ${defaultShippingAddress[0]
                                                          ?.streetName}`
                                                    : ''}
                                                {!addressTypeView &&
                                                defaultBillingAddress &&
                                                defaultBillingAddress.length
                                                    ? `${defaultBillingAddress[0]
                                                          ?.postalCode} ${getCountry(
                                                          defaultBillingAddress[0]
                                                              ?.country
                                                      )}, ${defaultBillingAddress[0]
                                                          ?.region}, ${defaultBillingAddress[0]
                                                          ?.city}, ${defaultBillingAddress[0]
                                                          ?.streetName}`
                                                    : ''}
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
                                            setAddAddressFormView={
                                                setAddAddressFormView
                                            }
                                            setIsEdit={setIsEdit}
                                            setChangeAddressIndex={
                                                setChangeAddressIndex
                                            }
                                        />
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
                                defaultAddresses={
                                    addressTypeView
                                        ? defaultShippingAddress
                                        : defaultBillingAddress
                                }
                                setDefaultAddresses={
                                    addressTypeView
                                        ? setDefaultShippingAddresses
                                        : setDefaultBillingAddresses
                                }
                                isEdit={isEdit}
                                setIsEdit={setIsEdit}
                                currentSelectedAddress={
                                    addressTypeView
                                        ? currentSelectedShippingAddress
                                        : currentSelectedBillingAddress
                                }
                                changeAddressIndex={changeAddressIndex}
                                getTypeAddress={
                                    addressTypeView
                                        ? getShippingAddresses
                                        : getBillingAddresses
                                }
                            />
                        )}
                    </div>

                    <PersonalDataView
                        userId={userId}
                        version={version}
                        setVersion={setVersion}
                        name={name}
                        setName={setName}
                        surname={surname}
                        setSurname={setSurname}
                        birthDayValue={birthDayValue}
                        setBirthDayValue={setBirthDayValue}
                        birthMonthValue={birthMonthValue}
                        setBirthMonthValue={setBirthMonthValue}
                        birthYearValue={birthYearValue}
                        setBirthYearValue={setBirthYearValue}
                    />
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
                                <button
                                    type="button"
                                    className={
                                        changeAuthData
                                            ? 'btn_action profile__button'
                                            : 'btn_action profile__button  btn_un-action'
                                    }
                                    onClick={(): void =>
                                        setChangeAuthData(true)
                                    }
                                >
                                    конфиденциальные данные
                                </button>
                                <button
                                    type="button"
                                    className={
                                        changeAuthData
                                            ? 'btn_action profile__button  btn_un-action'
                                            : 'btn_action profile__button '
                                    }
                                    onClick={(): void =>
                                        setChangeAuthData(false)
                                    }
                                >
                                    изменить
                                </button>
                            </div>
                            {changeAuthData ? (
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
                                                value={email}
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
                                                    customer?.password ||
                                                    'loading'
                                                }
                                                type="password"
                                                id="password"
                                                disabled
                                            />
                                        </label>
                                    </div>
                                </div>
                            ) : (
                                <EditAuthorizationDataView
                                    userId={userId}
                                    email={email}
                                    setEmail={setEmail}
                                    version={version}
                                    setVersion={setVersion}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ProfilePage;
