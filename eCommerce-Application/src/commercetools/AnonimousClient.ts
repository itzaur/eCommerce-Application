import {
    ClientBuilder,
    AnonymousAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { httpMiddlewareOptions, tokenInstance } from './apiConstants';

const {
    VITE_CTP_CLIENT_ID,
    VITE_CTP_CLIENT_SECRET,
    VITE_CTP_PROJECT_KEY,
    VITE_CTP_AUTH_URL,
} = import.meta.env;

export function constructClientAnonimousFlow(): ByProjectKeyRequestBuilder {
    const options: AnonymousAuthMiddlewareOptions = {
        host: VITE_CTP_AUTH_URL,
        projectKey: VITE_CTP_PROJECT_KEY,
        credentials: {
            clientId: VITE_CTP_CLIENT_ID,
            clientSecret: VITE_CTP_CLIENT_SECRET,
        },

        scopes: [`manage_project:${VITE_CTP_PROJECT_KEY}`],
        fetch,
        tokenCache: tokenInstance,
    };

    const client = new ClientBuilder()
        .withAnonymousSessionFlow(options)
        .withHttpMiddleware(httpMiddlewareOptions)
        .build();
    const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
        projectKey: VITE_CTP_PROJECT_KEY,
    });

    return apiRoot;
}
