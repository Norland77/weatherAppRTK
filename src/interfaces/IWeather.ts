export interface IWeather {
    data?: any
    current: {
        weather: {
            main: string
        }[]
    },
    hourly: object,
    daily: object,
    lat: string,
    lon: string,
}