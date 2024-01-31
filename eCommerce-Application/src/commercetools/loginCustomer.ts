import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { MyCustomerSignin } from '@commercetools/platform-sdk';
import { constructClientPasswordFlow } from './withPasswordClient';
import { tokenInstance } from './apiConstants';
import { apiRoot } from './Client';
import {
    serverErrorMessage,
    errorPassword,
    errorEmailNotExist,
} from '../utils/constants';
import { changeApiRootToPassword } from './updateCart';

export async function loginCustomer(
    email: string,
    password: string
): Promise<ByProjectKeyRequestBuilder | undefined> {
    try {
        tokenInstance.set({
            token: '',
            expirationTime: 0,
            refreshToken: '',
        });
        const apirootPassword = constructClientPasswordFlow(email, password);

        const body: MyCustomerSignin = {
            email,
            password,
            activeCartSignInMode: 'MergeWithExistingCustomerCart',
            updateProductData: true,
        };

        const response = await apirootPassword
            .me()
            .login()
            .post({ body })
            .execute();
        localStorage.setItem('token', tokenInstance.get().token);
        localStorage.setItem(
            'refreshToken',
            tokenInstance.get().refreshToken || ''
        );
        localStorage.setItem('user', JSON.stringify(response.body.customer));
        localStorage.setItem(
            'version',
            JSON.stringify(response.body.customer.version)
        );
        changeApiRootToPassword();

        return apirootPassword;
    } catch {
        try {
            const checkEmailExistResponse = await apiRoot
                .customers()
                .get({ queryArgs: { where: `email="${email}"` } })
                .execute();
            if (checkEmailExistResponse.body.count === 0) {
                throw new Error(errorEmailNotExist, {
                    cause: 'emailError',
                });
            } else if (checkEmailExistResponse.body.count === 1) {
                throw new Error(errorPassword, {
                    cause: 'passwordError',
                });
            }
        } catch (e) {
            const error = e as Error;
            if (error.cause === 'passwordError' || error.cause === 'emailError')
                throw error;
            else {
                throw new Error(serverErrorMessage, {
                    cause: 'emailError',
                });
            }
        }
    }
    return undefined;
}
