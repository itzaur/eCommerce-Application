import { Customer } from '@commercetools/platform-sdk';

export function getDefaultShippingAddress(
    customer: Customer | undefined
): string | undefined {
    const shippingAddresses = customer?.addresses.filter((item) => {
        const addressesId = item.id;
        if (addressesId) {
            return customer.defaultShippingAddressId?.includes(addressesId);
        }
        return undefined;
    });
    if (shippingAddresses)
        return `${shippingAddresses[0].postalCode}, ${shippingAddresses[0].country}, ${shippingAddresses[0].region}, ${shippingAddresses[0].city}, ${shippingAddresses[0].streetName}`;
    return undefined;
}
