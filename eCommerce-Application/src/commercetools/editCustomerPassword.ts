import { apiRoot } from './Client';
// import { getCustomer } from './getCustomer';
// import { ICustomer } from '../types';

export async function editCustomerPassword(
    ID: string,
    password: string,
    passwordRepeat: string,
    version: number,
    setVersion: CallableFunction
): Promise<void> {
    try {
        const response = await apiRoot
            .customers()
            .password()
            .post({
                body: {
                    id: ID,
                    version,
                    currentPassword: password,
                    newPassword: passwordRepeat,
                },
            })
            .execute();

        setVersion(response.body.version);
    } catch (err) {
        // console.log(err);
    }
    return undefined;
}
