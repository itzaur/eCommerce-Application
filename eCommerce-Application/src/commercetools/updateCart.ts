import { Cart } from '@commercetools/platform-sdk';
import { apiRootAnonimous } from './AnonimousClient';
import { constructClientRefresh } from './withRefreshTokenClient';
import { tokenInstance } from './apiConstants';

let apiRootForRequest = apiRootAnonimous;

async function createNewCart(): Promise<Cart> {
    try {
        const result = await apiRootAnonimous
            .me()
            .carts()
            .post({
                body: {
                    currency: 'USD',
                    country: 'RU',
                },
            })
            .execute();
        localStorage.setItem(
            'token',
            JSON.stringify(tokenInstance.get().token)
        );
        localStorage.setItem(
            'refreshToken',
            JSON.stringify(tokenInstance.get().refreshToken)
        );
        return result.body;
    } catch {
        throw new Error('Мяу');
    }
}

export async function addNewProductInCart(
    cardId: string,
    cartData: Cart | null
): Promise<Cart> {
    try {
        const cartForRequest = cartData || (await createNewCart());
        await apiRootForRequest
            .me()
            .carts()
            .withId({ ID: cartForRequest.id })
            .post({
                body: {
                    version: cartForRequest.version,
                    actions: [
                        {
                            action: 'addLineItem',
                            productId: cardId,
                            quantity: 1,
                        },
                    ],
                },
            })
            .execute();
        const activeCart = await apiRootForRequest
            .me()
            .activeCart()
            .get()
            .execute();
        localStorage.setItem('activeCart', JSON.stringify(activeCart.body));
        return activeCart.body;
    } catch (e) {
        if (
            e instanceof Error &&
            e.message.startsWith('URI not found: /odyssey4165/me/carts/')
        ) {
            apiRootForRequest = constructClientRefresh();
            localStorage.setItem(
                'token',
                JSON.stringify(tokenInstance.get().token)
            );
            return addNewProductInCart(cardId, cartData);
        }
        throw new Error('Мяу');
    }
}
