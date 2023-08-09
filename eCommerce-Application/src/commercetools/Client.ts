import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import { ctpClient } from './BuildClient';

const { VITE_CTP_PROJECT_KEY } = import.meta.env;

// Create apiRoot from the imported ClientBuilder and include your Project key
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: VITE_CTP_PROJECT_KEY,
});

// Example call to return Project information
// This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getProject = () => {
    return apiRoot.get().execute();
};

// Retrieve Project information and output the result to the log
// getProject().then(console.log).catch(console.error);
