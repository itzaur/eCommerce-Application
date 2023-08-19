import { constructClientPasswordFlow } from './PasswordClient';
import { apiRoot } from './Client';

export async function loginCustomer(
    email: string,
    password: string
): Promise<void> {
    try {
        const response = await constructClientPasswordFlow(email, password)
            .me()
            .login()
            .post({ body: { email, password } })
            .execute();
        localStorage.setItem('user', JSON.stringify(response.body.customer));
    } catch {
        try {
            const checkEmailExistResponse = await apiRoot
                .customers()
                .get({ queryArgs: { where: `email="${email}"` } })
                .execute();
            if (checkEmailExistResponse.body.count === 0) {
                throw new Error('Данный e-mail не найден в системе', {
                    cause: 'emailError',
                });
            } else if (checkEmailExistResponse.body.count === 1) {
                throw new Error('Вы ввели неверный пароль', {
                    cause: 'passwordError',
                });
            }
        } catch (e) {
            const error = e as Error;
            if (error.cause === 'passwordError' || error.cause === 'emailError')
                throw error;
            else {
                throw new Error('Сервер улетел в космос, попробуйте позже', {
                    cause: 'emailError',
                });
            }
        }
    }
    return undefined;
}
