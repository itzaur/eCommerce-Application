import {
    TokenCache,
    TokenStore,
    HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

const { VITE_CTP_API_URL } = import.meta.env;

class TokenCacheClass implements TokenCache {
    private token: TokenStore;

    constructor() {
        this.token = {
            token: '',
            expirationTime: 0,
            refreshToken: '',
        };
    }

    public get(): TokenStore {
        return this.token;
    }

    public set(cache: TokenStore): void {
        this.token = cache;
    }
}

export const tokenInstance = new TokenCacheClass();

export const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: VITE_CTP_API_URL,
    fetch,
};
