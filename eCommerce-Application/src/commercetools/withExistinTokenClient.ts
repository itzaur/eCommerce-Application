import {
    ClientBuilder,
    ExistingTokenMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const { VITE_CTP_PROJECT_KEY } = import.meta.env;

const authorization: string = localStorage.getItem('token') || '';
const options: ExistingTokenMiddlewareOptions = {
    force: true,
};

const existingTokenClient = new ClientBuilder()
    .withExistingTokenFlow(authorization, options)
    .build();

export const apiRootExistingToken = createApiBuilderFromCtpClient(
    existingTokenClient
).withProjectKey({
    projectKey: VITE_CTP_PROJECT_KEY,
});
