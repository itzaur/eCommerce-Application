import {
    RefreshAuthMiddlewareOptions,
    ClientBuilder,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

import { httpMiddlewareOptions } from './apiConstants';

const {
    VITE_CTP_CLIENT_ID,
    VITE_CTP_CLIENT_SECRET,
    VITE_CTP_PROJECT_KEY,
    VITE_CTP_AUTH_URL,
} = import.meta.env;

export function constructClientRefresh(): ByProjectKeyRequestBuilder {
    const options: RefreshAuthMiddlewareOptions = {
        host: VITE_CTP_AUTH_URL,
        projectKey: VITE_CTP_PROJECT_KEY,
        credentials: {
            clientId: VITE_CTP_CLIENT_ID,
            clientSecret: VITE_CTP_CLIENT_SECRET,
        },
        refreshToken: localStorage.getItem('refreshToken')?.slice(1, -1) || '',
        fetch,
    };

    const refreshTokenClient = new ClientBuilder()
        .withRefreshTokenFlow(options)
        .withHttpMiddleware(httpMiddlewareOptions)
        .build();

    const apiRootRefreshToken = createApiBuilderFromCtpClient(
        refreshTokenClient
    ).withProjectKey({
        projectKey: VITE_CTP_PROJECT_KEY,
    });
    return apiRootRefreshToken;
}
