import {
    Cart,
    MyCartAddLineItemAction,
    MyCartChangeLineItemQuantityAction,
    MyCartRemoveLineItemAction,
} from '@commercetools/platform-sdk';
import { apiRootAnonimous } from './AnonimousClient';
import { constructClientRefresh } from './withRefreshTokenClient';
import { tokenInstance } from './apiConstants';
import { UpdateCartParams } from '../types';

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
    props: UpdateCartParams
): Promise<Cart> {
    const { cartData, mode, cardId, quantity, firstFunctionCall } = props;

    let tempActions:
        | MyCartAddLineItemAction
        | MyCartChangeLineItemQuantityAction
        | MyCartRemoveLineItemAction[] = [];
    switch (mode) {
        case 'new':
            tempActions = {
                action: 'addLineItem',
                productId: cardId,
                quantity,
            };
            break;
        case 'update':
            tempActions = {
                action: 'changeLineItemQuantity',
                lineItemId: cartData?.lineItems.find((el) => {
                    return el.productId === cardId;
                })?.id,
                quantity,
            };
            break;
        case 'remove':
            if (cartData)
                tempActions = cartData.lineItems.map((el) => {
                    return {
                        action: 'removeLineItem',
                        lineItemId: el.id,
                    };
                });
            localStorage.removeItem('activeCart');
            break;
        default: //
    }
    const actions = tempActions;

    try {
        const cartForRequest = cartData || (await createNewCart());
        await apiRootForRequest
            .me()
            .carts()
            .withId({ ID: cartForRequest.id })
            .post({
                body: {
                    version: cartForRequest.version,
                    actions: Array.isArray(actions) ? [...actions] : [actions],
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
            e.message.startsWith('URI not found: /odyssey4165/me/carts/') &&
            firstFunctionCall
        ) {
            apiRootForRequest = constructClientRefresh();
            localStorage.setItem('token', tokenInstance.get().token);

            addNewProductInCartOrUpdateQuantity({
                cartData,
                mode,
                cardId,
                quantity,
                firstFunctionCall: false,
            });
        }
        if (
            e instanceof Error &&
            e.message === 'Missing required option (refreshToken)' &&
            firstFunctionCall
        ) {
            addNewProductInCartOrUpdateQuantity({
                cartData: null,
                mode,
                cardId,
                quantity,
                firstFunctionCall: false,
            });
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
