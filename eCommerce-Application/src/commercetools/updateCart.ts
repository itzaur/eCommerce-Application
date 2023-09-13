import {
    Cart,
    MyCartAddLineItemAction,
    MyCartChangeLineItemQuantityAction,
} from '@commercetools/platform-sdk';
import { apiRootAnonimous } from './AnonimousClient';
import { constructClientRefresh } from './withRefreshTokenClient';
import { tokenInstance } from './apiConstants';
import { UpdateCartMode } from '../types';

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
        localStorage.setItem('token', tokenInstance.get().token);
        localStorage.setItem(
            'refreshToken',
            tokenInstance.get().refreshToken || ''
        );
        return result.body;
    } catch {
        throw new Error('Мяу');
    }
}

export async function addNewProductInCartOrUpdateQuantity(
    cardId: string,
    cartData: Cart | null,
    mode: UpdateCartMode,
    quantity: number
): Promise<Cart> {
    const action: MyCartAddLineItemAction | MyCartChangeLineItemQuantityAction =
        mode === 'new'
            ? {
                  action: 'addLineItem',
                  productId: cardId,
                  quantity,
              }
            : {
                  action: 'changeLineItemQuantity',
                  lineItemId: cartData?.lineItems.find((el) => {
                      return el.productId === cardId;
                  })?.id,
                  quantity,
              };
    try {
        const cartForRequest = cartData || (await createNewCart());
        await apiRootForRequest
            .me()
            .carts()
            .withId({ ID: cartForRequest.id })
            .post({
                body: {
                    version: cartForRequest.version,
                    actions: [action],
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
            localStorage.setItem('token', tokenInstance.get().token);
            return addNewProductInCartOrUpdateQuantity(
                cardId,
                cartData,
                mode,
                quantity
            );
        }
        if (
            e instanceof Error &&
            e.message === 'Missing required option (refreshToken)'
        ) {
            addNewProductInCartOrUpdateQuantity(cardId, null, mode, quantity);
        }
        throw new Error('Мяу');
    }
}

export async function getActiveCart(): Promise<Cart | null> {
    try {
        return (await apiRootForRequest.me().activeCart().get().execute()).body;
    } catch (e) {
        if (
            e instanceof Error &&
            e.message === 'URI not found: /odyssey4165/me/active-cart'
        ) {
            apiRootForRequest = constructClientRefresh();
            localStorage.setItem('token', tokenInstance.get().token);
            return getActiveCart();
        }
        if (
            e instanceof Error &&
            e.message === 'Missing required option (refreshToken)'
        ) {
            return null;
        }
        throw new Error('Мяу');
    }
}
