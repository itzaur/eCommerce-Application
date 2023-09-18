import {
    ClientBuilder,
    PasswordAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { tokenInstance, httpMiddlewareOptions } from './apiConstants';

const {
    VITE_CTP_CLIENT_ID,
    VITE_CTP_CLIENT_SECRET,
    VITE_CTP_PROJECT_KEY,
    VITE_CTP_AUTH_URL,
} = import.meta.env;

// eslint-disable-next-line
export let apirootPassword: ByProjectKeyRequestBuilder | null = null;

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

    const client = new ClientBuilder()
        .withPasswordFlow(options)
        .withHttpMiddleware(httpMiddlewareOptions)
        .build();
    const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
        projectKey: VITE_CTP_PROJECT_KEY,
    });
    apirootPassword = apiRoot;
    return apiRoot;
}
