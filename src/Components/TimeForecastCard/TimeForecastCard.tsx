import React, {useEffect} from 'react';
import styles from "../HourlyInfo/hourly-info.module.scss";
import {weatherApi} from "../../services/weatherServices";
import {useAppDispatch} from "../../hooks/redux";
import { setTimeWeather } from "../../store/reducers/weatherSlice";
import {convertUnixTimeToHuman} from "../../helpers/ConvertUnixTime";

interface PropsType {
    day: any,
    lat: string,
    lon: string,
}

const TimeForecastCard = ({day, lon, lat}: PropsType) => {
    const dispatch = useAppDispatch();
    const [fetchTimeWeather, {data: weather}] = weatherApi.useFetchTimeWeatherMutation();
    useEffect(() => {
        if (weather) {
            dispatch(setTimeWeather(weather))
        }
    }, [weather]);

    return (
        <div onClick={() => fetchTimeWeather({lon: lon, lat: lat, time: day.dt})} key={day.dt} className={styles.hourly__card}>
            <span>{convertUnixTimeToHuman(day.dt)}</span>
            <span>{day.temp}&#176;</span>
            <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt=""/>
        </div>
    );
};

export default TimeForecastCard;