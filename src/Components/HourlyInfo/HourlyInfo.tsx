import styles from './hourly-info.module.scss'
import Title from "../../UI/Title/Title";
import clock from '../../img/icon/clock.svg'
import {useState} from "react";
import {weatherApi} from "../../services/weatherServices";
import TimeForecastCard from "../TimeForecastCard/TimeForecastCard";

interface PropsType {
    weather: any
    lat: string
    lon: string
}

const HourlyInfo = ({weather, lon, lat} : PropsType) => {

    return (
        <div className={styles.hourly}>
            <Title imgUrl={clock} title={"HOURLY FORECAST"} />
            <div className={styles.hourly__body}>
                {weather.map((day: any) => (
                    <TimeForecastCard key={day.dt} day={day} lon={lon} lat={lat}/>
                ))}
            </div>
        </div>
    );
};

export default HourlyInfo;