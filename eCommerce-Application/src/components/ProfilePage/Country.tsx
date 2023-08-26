import { Customer } from '@commercetools/platform-sdk';
import { useState } from 'react';

// export function Country({
//     address,
// }: Record<'address', Address | undefined>): JSX.Element {
//     return (
//         <option value="">{`${address?.postalCode}, ${address?.country}, ${address?.region}, ${address?.city}, ${address?.streetName}`}</option>
//     );
// }
// const [toggle, setToggle] = useState(false);
// export function Country(props: {
//     address: Address | undefined;
//     toggle: boolean;
// }): JSX.Element {
//     const { address, toggle } = props;
//     return (
//         <button
//             type="button"
//             onClick={(): void => setToggle((prev) => !prev)}
//         >{`${address?.postalCode}, ${address?.country}, ${address?.region}, ${address?.city}, ${address?.streetName}`}</button>
//     );
// }

export function Country(props: {
    customer: Customer | undefined;
}): JSX.Element {
    const { customer } = props;
    const [toggle, setToggle] = useState(true);
    const [selectedValue, setSelectedValue] = useState({
        postalCode: '',
        country: '',
        region: '',
        city: '',
        streetName: '',
    });

    return (
        <div className="dropdown">
            <button
                type="button"
                className={toggle ? 'select' : 'select select-clicked'}
                // className="select"
                onClick={(): void => setToggle((prev) => !prev)}
            >
                <span className="selected">{`${selectedValue.postalCode}, ${selectedValue.country}, ${selectedValue.region}, ${selectedValue.city}, ${selectedValue.streetName}`}</span>
                <div className={toggle ? 'caret' : 'caret caret-rotate'} />
            </button>
            <ul className={toggle ? 'menu' : 'menu menu-open'}>
                {customer?.addresses.map((address) => (
                    <button
                        type="button"
                        key={address.id}
                        onClick={(): void => {
                            setToggle((prev) => !prev);
                            setSelectedValue(
                                {
                                    postalCode: `${address.postalCode}`,
                                    country: `${address.country}`,
                                    region: `${address.region}`,
                                    city: `${address.city}`,
                                    streetName: `${address.streetName}`,
                                }
                                // `${address?.postalCode}, ${address?.country}, ${address?.region}, ${address?.city}, ${address?.streetName}`,
                            );
                        }}
                    >
                        {`${address?.postalCode}, ${address?.country}, ${address?.region}, ${address?.city}, ${address?.streetName}`}
                    </button>
                ))}
            </ul>
        </div>
    );
}
