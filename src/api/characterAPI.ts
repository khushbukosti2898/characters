import { Species } from 'src/interfaces/species/species';
import { setCharacters } from '../redux/slices/charactersSlice';
import baseCreateApi from './baseCreateApi';
import { Film } from 'src/interfaces/film/film';

const setPeopleAsyncHandler = async ({ dispatch, queryFulfilled }: any) => {
  try {
    const res = await queryFulfilled;
    if (res) {
      dispatch(setCharacters(res.data));
    }
  } catch (error) {
    console.error(error);
  }
};

export const characterAPi = baseCreateApi.injectEndpoints({
  endpoints: builder => ({
    getPeople: builder.query({
      query: (args: { [key: string]: number | string }) => {
        // Construct the query string dynamically based on the keys present in args
        const queryParams = Object.entries(args)
          .filter(([_, value]) => value !== undefined && value !== null)
          .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
          .join('&');

        return {
          url: `people/?${queryParams}`,
          method: 'GET',
        };
      },
      keepUnusedDataFor: 0,
      onQueryStarted(queryArgs, { dispatch, queryFulfilled }) {
        setPeopleAsyncHandler({ dispatch, queryFulfilled });
      },
    }),
    getHomeworld: builder.query({
      query: (args: { id: string }) => ({
        url: `planets/${args.id}`,
        method: 'GET',
      }),
    }),
    getSpecies: builder.query({
      query: () => `species/`,
      transformResponse: (response: { results: Species[] }) => {
        return response.results;
      },
    }),
    getFilms: builder.query({
      query: () => `films/`,
      transformResponse: (response: { results: Film[] }) => {
        return response.results;
      },
    }),
  }),
});

export const {
  useLazyGetPeopleQuery,
  useLazyGetHomeworldQuery,
  useGetSpeciesQuery,
  useGetFilmsQuery,
} = characterAPi;
