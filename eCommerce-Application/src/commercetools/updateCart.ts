import { Cart } from '@commercetools/platform-sdk';
import { apiRoot } from './AnonimousClient';

let cartId: Cart | null = null;
let cartVersion = 1;

async function createNewCart(): Promise<Cart> {
    try {
        const result = await apiRoot
            .me()
            .carts()
            .post({
                body: {
                    currency: 'USD',
                    country: 'RU',
                },
            })
            .execute();
        cartVersion = result.body.version;
        return result.body;
    } catch {
        throw new Error('Мяу');
    }
}

export async function updateCart(cardId: string): Promise<void> {
    try {
        if (!cartId) cartId = await createNewCart();
        await apiRoot
            .me()
            .carts()
            .withId({ ID: cartId.id })
            .post({
                body: {
                    version: cartVersion,
                    actions: [
                        {
                            action: 'addLineItem',
                            productId: cardId,
                            quantity: 1,
                        },
                    ],
                },
            })
            .execute()
            .then((data) => {
                cartVersion = data.body.version;
                const activeCart = apiRoot.me().activeCart().get().execute();
                return activeCart;
            });
    } catch {
        throw new Error('Мяу');
    }
}
