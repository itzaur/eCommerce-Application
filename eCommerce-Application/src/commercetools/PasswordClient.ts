import {
    TokenCache,
    ClientBuilder,
    HttpMiddlewareOptions,
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

type PasswordAuthMiddlewareOptions = {
    host: string;
    projectKey: string;
    credentials: {
        clientId: string;
        clientSecret: string;
        user: {
            username: string;
            password: string;
        };
    };
    scopes?: string[];
    tokenCache?: TokenCache;
    oauthUri?: string;
};

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
