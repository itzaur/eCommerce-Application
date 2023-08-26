import { Customer } from '@commercetools/platform-sdk';

import { useEffect, useState } from 'react';
import userPhoto from '../../assets/images/user.png';
import banner from '../../assets/images/banner.png';
import favorite from '../../assets/images/favorite.png';
import { getCustomer } from '../../commercetools/getCustomer';
import { Country } from './Country';
import { getCountry } from './getCountry';
import { getDefaultShippingAddress } from './getDefaultShippingAddress';
import { getDefaultBillingAddress } from './getDefaultBillingAddress';

function ProfilePage(): JSX.Element {
    const user = localStorage.getItem('user') as string;
    const userId = JSON.parse(user).id;

    const [passwordView, setPasswordView] = useState('password');
    const [customer, setCustomer] = useState<Customer>();
    const [addressView, setAddressView] = useState(true);

    // const [toggle, setToggle] = useState(false);
    // const btnActiveClassName = addressView ? '' : ' btn_un-action';
    // const btnClasses = ['btn_action profile__button', btnActiveClassName];
    // const [shippingAddresses, setShippingAddresses] = useState<Address[]>([]);

    const changePasswordView = (): void => {
        setPasswordView(passwordView === 'password' ? 'text' : 'password');
    };

    useEffect(() => {
        getCustomer(userId).then((data) => {
            if (data) {
                setCustomer(data);
            }
        });
    }, [userId]);

    // console.log(addressView);

    // const id = customer?.addresses[0].id as string;
    // console.log(customer?.addresses[0].id);

    // Фильтрацию шиппинг адресов сделал так, но потребность в ней пока отпала.
    // const shippingAddresses = customer?.addresses.filter((item) => {
    //     const addressesId = item.id;
    //     if (addressesId) {
    //         return customer.shippingAddressIds?.includes(addressesId);
    //     }
    //     return undefined;
    // });
    // console.log(shippingAddresses);

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
                        <div className="profile__address-wrapper">
                            <div className="profile__address-header">
                                <button
                                    type="button"
                                    className={
                                        addressView
                                            ? 'btn_action profile__button'
                                            : 'btn_action profile__button btn_un-action'
                                    }
                                    onClick={(): void => setAddressView(true)}
                                >
                                    доставить по адресу
                                </button>
                                <button
                                    type="button"
                                    className={
                                        addressView
                                            ? 'btn_action profile__button btn_un-action'
                                            : 'btn_action profile__button'
                                    }
                                    onClick={(): void => setAddressView(false)}
                                >
                                    выставить счет
                                </button>
                            </div>
                            <div className="profile__address-content">
                                <div className="profile__info-line">
                                    <div className="profile__info-title">
                                        Адрес по умолчанию:
                                    </div>
                                    <div className="profile__info-name">
                                        <span>
                                            {addressView
                                                ? getDefaultShippingAddress(
                                                      customer
                                                  )
                                                : getDefaultBillingAddress(
                                                      customer
                                                  )}
                                        </span>
                                    </div>
                                </div>

                                <div className="profile__address-select">
                                    {/* <select className="profile__address-select-option">
                                        {customer?.addresses.map((address) => (
                                            <Country
                                                address={address}
                                                key={address.id}
                                            />
                                        ))}
                                    </select> */}

                                    {/* <div className="dropdown">
                                        <button
                                            type="button"
                                            className={
                                                toggle
                                                    ? 'select'
                                                    : 'select select-clicked'
                                            }
                                            onClick={(): void =>
                                                setToggle((prev) => !prev)
                                            }
                                        >
                                            <span className="selected">
                                                Figma
                                            </span>
                                            <div
                                                className={
                                                    toggle
                                                        ? 'caret'
                                                        : 'caret caret-rotate'
                                                }
                                            />
                                        </button>
                                        <ul
                                            className={
                                                toggle
                                                    ? 'menu'
                                                    : 'menu menu-open'
                                            }
                                        >
                                            {customer?.addresses.map(
                                                (address) => (
                                                    <Country
                                                        address={address}
                                                        toggle={toggle}
                                                        key={address.id}
                                                    />
                                                )
                                            )}
                                        </ul>
                                    </div> */}

                                    <Country customer={customer} />
                                </div>

                                <div className="profile__address-action">
                                    <span className="btn_action profile__button profile__button_small">
                                        добавить новый адрес
                                    </span>
                                    <span className="btn_action btn_un-action profile__button profile__button_small">
                                        удалить
                                    </span>
                                </div>
                            </div>
                        </div>
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
                                    {getCountry(customer?.addresses[0].country)}
                                </span>
                            </div>
                        </div>
                        <div className="profile__info-line">
                            <div className="profile__info-title">регион:</div>
                            <div className="profile__info-name">
                                <span>{customer?.addresses[0].region}</span>
                            </div>
                        </div>
                        <div className="profile__info-line">
                            <div className="profile__info-title">город:</div>
                            <div className="profile__info-name">
                                <span>{customer?.addresses[0].city}</span>
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
