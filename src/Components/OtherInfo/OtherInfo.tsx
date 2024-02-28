import styles from './other-info.module.scss'
import Title from "../../UI/Title/Title";
import tempepature from '../../img/icon/temperature.svg'
import wind from '../../img/icon/wind.svg'
import ProgressBar from "../../UI/ProgressBar/ProgressBar";
import Compass from "../../UI/Compas/Compass";

interface PropsType {
    weather: any
}

const OtherInfo = ({weather}: PropsType) => {

    //console.log(weather)

    return (
        <div className={styles.other}>
            <div className={styles.uvindex}>
                <Title imgUrl={tempepature} title={"UV INDEX"} />
                <span>{weather.current.uvi}</span>
                <span>Moderate</span>
                <ProgressBar progress={`${weather.current.uvi * 10}`} />
            </div>
            <div className={styles.wind}>
                <div>
                    <Title imgUrl={wind} title={"WIND"} />
                    <span>{weather.current.wind_speed} MPH</span>
                </div>
                <div>
                    <Compass angle={weather.current.wind_deg} />
                </div>
            </div>
        </div>
    );
};

export default OtherInfo;