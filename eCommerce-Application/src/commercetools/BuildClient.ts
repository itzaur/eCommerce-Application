// import fetch from 'node-fetch';
import {
    ClientBuilder,

    // Import middlewares
    type AuthMiddlewareOptions, // Required for auth
    type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';

const {
    VITE_CTP_CLIENT_ID,
    VITE_CTP_CLIENT_SECRET,
    VITE_CTP_PROJECT_KEY,
    VITE_CTP_API_URL,
    VITE_CTP_AUTH_URL,
    VITE_CTP_SCOPES,
} = import.meta.env;

const projectKey = VITE_CTP_PROJECT_KEY;
const scopes = [VITE_CTP_SCOPES];

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: VITE_CTP_AUTH_URL,
    projectKey,
    credentials: {
        clientId: VITE_CTP_CLIENT_ID,
        clientSecret: VITE_CTP_CLIENT_SECRET,
    },
    scopes,
    fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: VITE_CTP_API_URL,
    fetch,
};

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
    .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware() // Include middleware for logging
    .build();
