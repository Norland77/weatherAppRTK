import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const mainApi = createApi({
    reducerPath: 'mainApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `https://api.openweathermap.org/data`
    }),
    endpoints: () => ({}),
})

export default mainApi;