import {
    ClientResponse,
    CustomerSignInResult,
} from '@commercetools/platform-sdk';
import { constructClientPasswordFlow } from './PasswordClient';
import { apiRoot } from './Client';

export async function loginCustomer(
    email: string,
    password: string
): Promise<ClientResponse<CustomerSignInResult> | undefined> {
    try {
        const response = await constructClientPasswordFlow(email, password)
            .me()
            .login()
            .post({ body: { email, password } })
            .execute();
        return response;
    } catch {
        const checkEmailExistResponse = await apiRoot
            .customers()
            .get({ queryArgs: { where: `email="${email}"` } })
            .execute();
        if (!checkEmailExistResponse.body.count) {
            throw new Error('Данный e-mail не найден в системе', {
                cause: 'emailError',
            });
        } else if (checkEmailExistResponse.body.count === 1) {
            throw new Error('Вы ввели неверный пароль', {
                cause: 'passwordError',
            });
        }
    }
    return undefined;
}
