import {
    TokenCache,
    ClientBuilder,
    HttpMiddlewareOptions,
    PasswordAuthMiddlewareOptions,
    TokenStore,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

const {
    VITE_CTP_CLIENT_ID,
    VITE_CTP_CLIENT_SECRET,
    VITE_CTP_PROJECT_KEY,
    VITE_CTP_AUTH_URL,
    VITE_CTP_API_URL,
} = import.meta.env;

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

export function constructClientPasswordFlow(
    email: string,
    password: string
): ByProjectKeyRequestBuilder {
    const options: PasswordAuthMiddlewareOptions = {
        host: VITE_CTP_AUTH_URL,
        projectKey: VITE_CTP_PROJECT_KEY,
        credentials: {
            clientId: VITE_CTP_CLIENT_ID,
            clientSecret: VITE_CTP_CLIENT_SECRET,
            user: {
                username: email,
                password,
            },
        },
        scopes: [`manage_project:${VITE_CTP_PROJECT_KEY}`],
        tokenCache: tokenInstance,
    };
    const httpMiddlewareOptions: HttpMiddlewareOptions = {
        host: VITE_CTP_API_URL,
        fetch,
    };

    const client = new ClientBuilder()
        .withPasswordFlow(options)
        .withHttpMiddleware(httpMiddlewareOptions)
        .build();
    const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
        projectKey: VITE_CTP_PROJECT_KEY,
    });
    return apiRoot;
}
