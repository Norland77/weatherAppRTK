import {IWeather} from "../interfaces/IWeather";
import mainApi from "./mainApi";

const enchancedApi = mainApi.enhanceEndpoints({
    addTagTypes: ['Weather'],
})

const API_KEY = 'e5fe8415eb761f14ef15068536eadc6c';

export const weatherApi = enchancedApi.injectEndpoints({
    endpoints: (build) => ({
        fetchCurrentWeather: build.query<IWeather, object>({
            query: (position: any) => ({
                url: `/2.5/onecall?lat=${position.latitude}&lon=${position.longitude}&units=metric&appid=${API_KEY}`
            }),
            providesTags: ['Weather']
        }),
        fetchDefaultWeather: build.query<IWeather, null>({
            query: () => ({
                url: `/2.5/onecall?lat=50.4501&lon=30.5234&units=metric&appid=${API_KEY}`
            }),
            providesTags: ['Weather']
        }),
        fetchTimeWeather: build.mutation<IWeather, object>({
            query: (info: any) => ({
                url: `/3.0/onecall/timemachine?lat=${info.lat}&lon=${info.lon}&dt=${info.time}&units=metric&appid=${API_KEY}`
            }),
            invalidatesTags: ['Weather']
        }),
        fetchSearchedCityWeather: build.mutation<IWeather, object>({
            query: (position: any) => ({
                url: `/2.5/onecall?lat=${position.latitude}&lon=${position.longitude}&units=metric&appid=${API_KEY}`
            }),
            invalidatesTags: ['Weather']
        }),
    })
})