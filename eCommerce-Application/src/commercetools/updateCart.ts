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

const { VITE_CTP_PROJECT_KEY } = import.meta.env;

function setLocalStorage(allTokens: boolean): void {
    if (tokenInstance.get().token)
        localStorage.setItem('token', tokenInstance.get().token);
    if (
        tokenInstance.get().refreshToken &&
        (allTokens || !localStorage.getItem('refreshToken'))
    )
        localStorage.setItem(
            'refreshToken',
            tokenInstance.get().refreshToken || ''
        );
}

async function getCorrectApiRoot(): Promise<ByProjectKeyRequestBuilder> {
    const user = localStorage.getItem('user');
    const refreshToken = localStorage.getItem('refreshToken');
    let result;

    if (user && apirootPassword) {
        result = apirootPassword;
        setLocalStorage(true);
    } else if (refreshToken) {
        try {
            result = constructClientRefresh();
            setLocalStorage(false);
        } catch {
            result = constructClientAnonimousFlow();
            setLocalStorage(true);
        }
    } else {
        result = constructClientAnonimousFlow();
        setLocalStorage(true);
    }

    return result;
}

let apiRootForRequest = await getCorrectApiRoot();

export async function changeApiRootToPassword(): Promise<void> {
    if (apirootPassword) apiRootForRequest = apirootPassword;
}

async function createNewCart(): Promise<Cart | undefined> {
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
        setLocalStorage(false);
        return result.body;
    } catch (e) {
        if (e instanceof Error) throw new Error(e.message);
    }
    return undefined;
}

export async function addNewProductInCartOrUpdateQuantity(
    props: UpdateCartParams
): Promise<Cart | undefined> {
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
        if (cartForRequest)
            await apiRootForRequest
                .me()
                .carts()
                .withId({ ID: cartForRequest.id })
                .post({
                    body: {
                        version: cartForRequest.version,
                        actions: Array.isArray(actions)
                            ? [...actions]
                            : [actions],
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
            e.message.startsWith(
                `URI not found: /${VITE_CTP_PROJECT_KEY}/me/carts/`
            ) &&
            firstFunctionCall
        ) {
            apiRootForRequest = constructClientRefresh();
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
            (e.message === 'Missing required option (refreshToken)' ||
                e.message ===
                    'The refresh token was not found. It may have expired.') &&
            firstFunctionCall
        ) {
            localStorage.removeItem('user');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('token');
            localStorage.removeItem('activeCart');
            apiRootForRequest = await getCorrectApiRoot();

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
    }
    return undefined;
}

export async function getActiveCart(
    firstFunctionCall: boolean
): Promise<Cart | null> {
    try {
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
            e.message ===
                `URI not found: /${VITE_CTP_PROJECT_KEY}/me/active-cart` &&
            firstFunctionCall
        ) {
            if (localStorage.getItem('refreshToken')) {
                apiRootForRequest = constructClientRefresh();
                return getActiveCart(false);
            }
            return null;
        }
        if (
            e instanceof Error &&
            (e.message === 'Missing required option (refreshToken)' ||
                e.message ===
                    'The refresh token was not found. It may have expired.') &&
            firstFunctionCall
        ) {
            localStorage.removeItem('user');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('token');
            localStorage.removeItem('activeCart');
            apiRootForRequest = await getCorrectApiRoot();
            return null;
        }
        if (e instanceof Error && e.message === 'Failed to fetch') {
            throw new Error(serverErrorMessage);
        }

        localStorage.removeItem('activeCart');
        return null;
    }
}

export async function applyDiscount(
    cartData: Cart,
    promocode: string
): Promise<Cart> {
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
