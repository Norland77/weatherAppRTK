import CurrentInfo from "../../Components/CurrentInfo/CurrentInfo";
import HourlyInfo from "../../Components/HourlyInfo/HourlyInfo";
import TenDaysInfo from "../../Components/TenDaysInfo/TenDaysInfo";
import OtherInfo from "../../Components/OtherInfo/OtherInfo";
import styles from './home.module.scss'
import bg_rain from '../../img/bg/rain.jpg'
import bg_clouds from '../../img/bg/cloudsd.jpg'
import bg_clear from '../../img/bg/clear.jpg'
import bg_thunderstorm from '../../img/bg/thunderstorm.jpg'
import bg_fog from '../../img/bg/fog.jpg'
import bg_smoke from '../../img/bg/smoke.jpg'
import bg_snow from '../../img/bg/snow.jpeg'
import {useEffect, useState} from "react";
import axios from "axios";
import {weatherApi} from "../../services/weatherServices";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {setWeather} from '../../store/reducers/weatherSlice';
const Home = () => {

    const [cord, setCord] = useState({})
    const [isGetCord, setIsGetCord] = useState(false);
    const dispatch = useAppDispatch();
    const { weather } = useAppSelector(state => state.weatherSlice)
    const [cityName, setCityName] = useState("");
    const {data: currentWeather, isLoading, error, isFetching, currentData} = weatherApi.useFetchCurrentWeatherQuery(cord, {
        skip: !isGetCord
    })
    const {data: defaultWeather} = weatherApi.useFetchDefaultWeatherQuery(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCord(position.coords)
                setIsGetCord(!isGetCord)
            },
            (error) => {
                console.error('Error getting geolocation:', error);

            });
    }, []);

    useEffect(() => {
        if (currentWeather) {
            dispatch(setWeather(currentWeather))
        } else if (defaultWeather) {
            dispatch(setWeather(defaultWeather));
        }
    }, [currentWeather, defaultWeather]);


    useEffect(() => {

        const findCityName = async () => {
            try {
                let response: any;
                if (weather) {
                    response = await axios.get(
                        `http://api.geonames.org/findNearbyPlaceNameJSON?lat=${weather.lat}&lng=${weather.lon}&username=norland`
                    );
                } else {
                    response = await axios.get(
                        `http://api.geonames.org/findNearbyPlaceNameJSON?lat=${defaultWeather?.lat}&lng=${defaultWeather?.lon}&username=norland`
                    );
                }
                const data = response.data;
                if (data.geonames && data.geonames.length > 0) {
                    setCityName(data.geonames[0].name +", "+ data.geonames[0].countryName);
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (weather || defaultWeather) {
            findCityName();
        }
    }, [defaultWeather, weather]);

    let bg = bg_clouds
    switch (weather?.current.weather[0].main) {
        case "Clouds":
            bg = bg_clouds;
            break;
        case "Clear":
            bg = bg_clear;
            break;
        case "Fog":
            bg = bg_fog;
            break;
        case "Smoke":
            bg = bg_smoke;
            break;
        case "Rain":
        case "Drizzle":
            bg = bg_rain;
            break;
        case "Thunderstorm":
            bg = bg_thunderstorm;
            break;
        case "Snow":
            bg = bg_snow;
            break;
    }

    return (
        <div>
            {
                weather.lat &&
                <div className={styles.home} style={{backgroundImage: `url(${bg})`}}>
                    <CurrentInfo
                        weather={weather.current}
                        cityName={cityName}/>
                    <div className={styles.home__rightside}>
                        <HourlyInfo
                            lat={weather.lat}
                            lon={weather.lon}
                            weather={weather.hourly}/>
                        <TenDaysInfo
                            lat={weather.lat}
                            lon={weather.lon}
                            weather={weather.daily}/>
                        <OtherInfo
                            weather={weather}/>
                    </div>
                </div>
            }
        </div>

    );
};

export default Home;