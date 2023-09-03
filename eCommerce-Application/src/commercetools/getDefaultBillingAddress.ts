// import { Customer } from '@commercetools/platform-sdk';

// export function getDefaultBillingAddress(
//     customer: Customer | undefined
// ): string | undefined {
//     const billingAddresses = customer?.addresses.filter((item) => {
//         const addressesId = item.id;
//         if (addressesId) {
//             return customer.defaultBillingAddressId?.includes(addressesId);
//         }
//         return undefined;
//     });
//     if (billingAddresses?.length)
//         return `${billingAddresses[0].postalCode}, ${billingAddresses[0].country}, ${billingAddresses[0].region}, ${billingAddresses[0].city}, ${billingAddresses[0].streetName}`;
//     return undefined;
// }
