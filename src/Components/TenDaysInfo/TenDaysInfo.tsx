import styles from './ten-days-info.module.scss'
import Title from "../../UI/Title/Title";
import calendar from '../../img/icon/calendar.svg'
import DayForecastCard from "../DayForecastCard/DayForecastCard";

interface PropsType {
    weather: any
    lat: string
    lon: string
}

const TenDaysInfo = ({ weather, lon, lat}: PropsType) => {

    return (
        <div className={styles.tandays}>
            <Title imgUrl={calendar} title={"WEEKLY FORECAST"} />
            <div className={styles.tandays__body}>
                {weather.map((day: any) => (
                    <DayForecastCard key={day.dt} day={day} lat={lat} lon={lon} />
                ))}
            </div>
        </div>
    );
};

export default TenDaysInfo;