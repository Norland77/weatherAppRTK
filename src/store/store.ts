import {combineReducers, configureStore} from "@reduxjs/toolkit";
import weatherSlice from "./reducers/weatherSlice";
import mainApi from "../services/mainApi";
const rootReducer = combineReducers({
    weatherSlice,
    [mainApi.reducerPath]: mainApi.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false
        }).concat(mainApi.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']