import { Customer } from '@commercetools/platform-sdk';
import { apiRoot } from './Client';
// import { ICustomer } from '../types';

export async function getCustomer(ID: string): Promise<Customer | undefined> {
    try {
        const result = await apiRoot.customers().withId({ ID }).get().execute();
        return result.body;
    } catch (err) {
        // console.log(err);
    }
    return undefined;
}
