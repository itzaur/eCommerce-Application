import { apiRoot } from './Client';

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
    } catch (e) {
        const error = e as Error;
        if (error.message === 'The given current password does not match.') {
            throw new Error('Tекущий пароль не верный', {
                cause: 'passwordError',
            });
        }
        if (error.message === 'Failed to fetch') {
            throw new Error('Ошибка сервера', {
                cause: 'ServerError',
            });
        }
    }
}
