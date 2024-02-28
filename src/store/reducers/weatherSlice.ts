import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IWeather} from "../../interfaces/IWeather";

interface WeatherState {
    weather: IWeather;
    isLoading: boolean;
    error: string;
}

const initialState: WeatherState = {
    weather: {
        current: {
            weather: [
                {
                    main: ''
                }
            ]
        },
        daily: {},
        hourly: {},
        lon: '',
        lat: '',
    },
    isLoading: false,
    error: ''
}

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setWeather: (state, action: PayloadAction<IWeather>) => {
            state.weather = action.payload
        },
        setTimeWeather: (state, action: PayloadAction<IWeather>) => {
            state.weather.current = action.payload.data[0]
        }
    }
})

export const { setWeather, setTimeWeather } = weatherSlice.actions;
export default weatherSlice.reducer;