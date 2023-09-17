import {
    Cart,
    MyCartAddLineItemAction,
    MyCartChangeLineItemQuantityAction,
    MyCartRemoveLineItemAction,
} from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { constructClientAnonimousFlow } from './AnonimousClient';
import { constructClientRefresh } from './withRefreshTokenClient';
import { apirootPassword } from './withPasswordClient';
import { tokenInstance } from './apiConstants';
import { UpdateCartParams } from '../types';
import { serverErrorMessage } from '../utils/constants';
import { loginCustomer } from './loginCustomer';

async function getCorrectApiRoot(): Promise<ByProjectKeyRequestBuilder> {
    const user = JSON.parse(localStorage.getItem('user') as string);
    if (apirootPassword && user) {
        // console.log('готовый пароль');
        return apirootPassword;
    }
    if (user && user.email && user.password) {
        // console.log('входим по паролю');
        return loginCustomer(user.email, user.password)
            .then((apiroot) => {
                if (apiroot) return apiroot;
                return constructClientAnonimousFlow();
            })
            .catch(() => {
                return constructClientAnonimousFlow();
            });
    }
    // console.log('анон');
    return constructClientAnonimousFlow();
}
let apiRootForRequest: ByProjectKeyRequestBuilder = await getCorrectApiRoot();

async function createNewCart(): Promise<Cart> {
    try {
        const result = await apiRootForRequest
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
        if (!localStorage.getItem('refreshToken'))
            localStorage.setItem(
                'refreshToken',
                tokenInstance.get().refreshToken || ''
            );
        return result.body;
    } catch {
        throw new Error(serverErrorMessage);
    }
}

export async function addNewProductInCartOrUpdateQuantity(
    props: UpdateCartParams
): Promise<Cart | null | void> {
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
        if (mode !== 'remove' && activeCart.body.lineItems.length) {
            localStorage.setItem('activeCart', JSON.stringify(activeCart.body));
        } else {
            localStorage.removeItem('activeCart');
        }

        return activeCart.body;
    } catch (e) {
        if (
            e instanceof Error &&
            e.message.startsWith('URI not found: /odyssey4165/me/carts/') &&
            firstFunctionCall
        ) {
            // console.log('пытаемся рефреш');
            apiRootForRequest = constructClientRefresh();
            localStorage.setItem('token', tokenInstance.get().token);

            return addNewProductInCartOrUpdateQuantity({
                cartData,
                mode,
                cardId,
                quantity,
                firstFunctionCall: false,
            });
        }
        if (
            e instanceof Error &&
            e.message ===
                ('Missing required option (refreshToken)' ||
                    'The refresh token was not found. It may have expired.') &&
            firstFunctionCall
        ) {
            return addNewProductInCartOrUpdateQuantity({
                cartData: null,
                mode,
                cardId,
                quantity,
                firstFunctionCall: false,
            });
        }
        if (e instanceof Error && e.message === 'Failed to fetch') {
            throw new Error(serverErrorMessage);
        }
        return null;
    }
}

export async function getActiveCart(
    firstFunctionCall: boolean
): Promise<Cart | null> {
    try {
        if (!localStorage.getItem('activeCart'))
            apiRootForRequest = await getCorrectApiRoot();
        const activeCart = await apiRootForRequest
            .me()
            .activeCart()
            .get()
            .execute();
        localStorage.setItem('activeCart', JSON.stringify(activeCart.body));
        return activeCart.body;
    } catch (e) {
        // console.log((e as Error).message);
        if (
            e instanceof Error &&
            e.message === 'URI not found: /odyssey4165/me/active-cart' &&
            firstFunctionCall
        ) {
            // console.log('пытаемся рефреш');
            if (localStorage.getItem('refreshToken')) {
                apiRootForRequest = constructClientRefresh();
                localStorage.setItem('token', tokenInstance.get().token);
                return getActiveCart(false);
            }
            return null;
        }
        if (
            e instanceof Error &&
            e.message ===
                ('Missing required option (refreshToken)' ||
                    'The refresh token was not found. It may have expired.')
        ) {
            return null;
        }
        if (e instanceof Error && e.message === 'Failed to fetch') {
            throw new Error(serverErrorMessage);
        }
        // console.log('null');
        localStorage.removeItem('activeCart');
        return null;
    }
}

export async function applyDiscount(
    cartData: Cart,
    promocode: string
): Promise<Cart | undefined> {
    try {
        const cartWithPromocode = await apiRootForRequest
            .me()
            .carts()
            .withId({ ID: cartData.id })
            .post({
                body: {
                    version: cartData.version,
                    actions: [{ action: 'addDiscountCode', code: promocode }],
                },
            })
            .execute();
        localStorage.setItem(
            'activeCart',
            JSON.stringify(cartWithPromocode.body)
        );
        return cartWithPromocode.body;
    } catch (e) {
        const error = e as Error;
        if (
            error.message === `The discount code '${promocode}' was not found.`
        ) {
            throw new Error('Промокод не найден:(');
        } else {
            throw new Error('Сервер в космосе, не обещал вернуться:(');
        }
    }
}
