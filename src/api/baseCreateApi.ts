import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
  retry,
} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://swapi.dev/api',
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  try {
    return await baseQuery(args, api, extraOptions);
  } catch (error) {
    throw error;
  }
};

const baseCreateApi = createApi({
  reducerPath: 'api',
  baseQuery: retry(baseQueryWithReauth, { maxRetries: 0 }),
  endpoints: () => ({}),
});

export default baseCreateApi;
