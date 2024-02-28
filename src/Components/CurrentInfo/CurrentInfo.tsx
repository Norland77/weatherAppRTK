import Title from "../../UI/Title/Title";
import styles from './current-info.module.scss'
import temperature from '../../img/icon/temperature.svg'
import precip from '../../img/icon/precip.svg'
import visibility from '../../img/icon/eye.svg'
import humidity from '../../img/icon/humidity.svg'
import {useEffect, useState} from "react";

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete";
import {weatherApi} from "../../services/weatherServices";
import {setWeather} from "../../store/reducers/weatherSlice";
import {useAppDispatch} from "../../hooks/redux";


interface PropsType {
    weather: any
    cityName: string
}

const CurrentInfo = ({weather, cityName}: PropsType) => {
    const dispatch = useAppDispatch();
    const [fetchWeather, {data: currentWeather}] = weatherApi.useFetchSearchedCityWeatherMutation();
    const [address, setAddress] = useState("");

    const handleSelect = async (value: any) => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAddress(value);
        fetchWeather({
            latitude: latLng.lat,
            longitude: latLng.lng
        })
        setAddress('')
    };

    useEffect(() => {
        if (currentWeather) {
            dispatch(setWeather(currentWeather));
        }
    }, [currentWeather]);

    const selectDescWeather = (temp: number, type: string) => {
        let desc = '';

        const isCold = temp < 15;
        const isNormal = temp >= 15 && temp <= 30;
        const isWarm = temp > 30;

        const isCloudy = type === 'Clouds';
        const isClear = type === 'Clear';
        const isFoggy = type === 'Fog';
        const isSmoky = type === 'Smoke';
        const isRainy = type === 'Rain' || type === 'Drizzle';
        const isThunderstorm = type === 'Thunderstorm';

        if (isNormal) {
            if (isCloudy) {
                desc = 'Expect a mostly cloudy day with normal temperatures. It might be a bit gloomy, so bring a light jacket just in case.';
            } else if (isClear) {
                desc = 'Normal temps, clear skies. Perfect day for fun in the sun! Don\'t forget your shades and sunscreen!';
            } else if (isFoggy) {
                desc = 'Today, anticipate foggy conditions with normal temperatures. Don`t forget your umbrella and raincoat before heading out into the mist!';
            } else if (isSmoky) {
                desc = 'Today, brace for smoky conditions with normal temperatures. Ensure to take necessary precautions and consider limiting outdoor activities due to poor air quality caused by smoke.';
            } else if (isRainy) {
                desc = 'Today expect a rainy day with normal temperatures. Make sure to grab your umbrella and raincoat before heading out.';
            } else if (isThunderstorm) {
                desc = 'Today, brace yourself for a thunderstorm with normal temperatures. Ensure to grab your umbrella and raincoat before venturing out to stay safe and dry amidst the thunderous downpour.';
            }
        } else if (isCold) {
            if (isCloudy) {
                desc = 'Today, anticipate cloudy skies and chilly temperatures. While it may not rain, the overcast conditions call for bundling up. Don\'t forget your jacket and scarf before stepping out to stay cozy in the cool air.';
            } else if (isClear) {
                desc = 'Today promises clear skies. Don\'t be fooled by the sunshine – grab your coat before heading out to stay warm in the chilly air.';
            } else if (isFoggy) {
                desc = 'Today, expect thick fog blanketing the area, accompanied by cold temperatures. Despite the lack of visibility, the chill in the air remains, so don\'t forget to bundle up before venturing out into the misty conditions.';
            } else if (isSmoky) {
                desc = 'Today, expect smoky conditions lingering in the air, coupled with cold temperatures. Despite the haze, the chilly air persists, so remember to layer up before stepping outside to stay cozy amidst the smoky atmosphere.';
            } else if (isRainy) {
                desc = 'Today, prepare for rain showers accompanied by cold temperatures. Despite the clear skies, chilly air lingers, so ensure to grab your coat before stepping out to stay warm and dry amidst the rainy weather.';
            } else if (isThunderstorm) {
                desc = 'Today, brace yourself for a thunderstorm with cold temperatures. Ensure to grab your umbrella and raincoat before venturing out to stay safe and dry amidst the thunderous downpour.';
            }
        } else if (isWarm) {
            if (isCloudy) {
                desc = 'Embrace a pleasant day with partly cloudy skies and warm temperatures. While clouds may drift by, the warmth persists, making it ideal for outdoor pursuits. Remember to apply sunscreen to protect your skin while enjoying the comfortable weather!';
            } else if (isClear) {
                desc = 'Enjoy a sunny day with clear skies and warm temperatures. It\'s perfect weather for outdoor activities, but don\'t forget your sunscreen!';
            } else if (isFoggy) {
                desc = 'Step into a tranquil day enveloped in fog with pleasantly warm temperatures. Though the fog may obscure the skies, the warmth remains, creating a serene atmosphere for outdoor adventures. Don\'t forget your sunscreen to stay protected while relishing the cozy ambiance!';
            } else if (isSmoky) {
                desc = 'Be aware of smoky conditions due to wildfires, with warm temperatures. Limit outdoor activities and stay indoors if the air quality is poor.';
            } else if (isRainy) {
                desc = 'Embrace a refreshing day with gentle rain showers and balmy temperatures. While the rain falls, the warmth persists, creating a soothing environment for outdoor pursuits. Don\'t forget your umbrella and waterproof gear to stay comfortable while enjoying the pleasant weather!';
            } else if (isThunderstorm) {
                desc = 'Today, prepare for a stormy day ahead with temperatures climbing to a maximum of 25°C. Don\'t forget your umbrella and stay indoors if possible.';
            }
        } else {
            desc = 'Look out the window and see what the weather is like around you';
        }
        return desc;
    }


    const description = selectDescWeather(weather.temp, weather.weather[0].main);

    const visibilityStr = weather.visibility < 1000 ? `${weather.visibility} meters` : `${weather.visibility / 1000} km`

    return (
        <div className={styles.current}>
            <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input {...getInputProps({ placeholder: "Type address" })} />

                        <div className={styles.input}>
                            {loading ? <div>...loading</div> : null}

                            {suggestions.map(suggestion => {
                                const style = {
                                    backgroundColor: suggestion.active ? "#41b6e6" : "#34333D",
                                    color: "#fff",
                                    cursor: "pointer"
                                };

                                return (
                                    <div {...getSuggestionItemProps(suggestion, { style })}>
                                        {suggestion.description}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
            <div className={styles.current__body}>
                <div className={styles.current__main}>
                    <span className={styles.current__main_city}>{cityName}</span>
                    <span className={styles.current__main_temp}>{weather.temp}&#176;</span>
                    <span className={styles.current__main_title}>{weather.weather[0].description}</span>
                    <p className={styles.current__main_desc}>{description}</p>
                </div>
                <div className={styles.current__details}>
                    <div>
                        <Title imgUrl={temperature} title={"FEELS LIKE"} />
                        <span className={styles.current__details_big}>{weather.feels_like}&#176;</span>
                        <p>Humidity is making it feel warmer</p>
                    </div>
                    <div>
                        <Title imgUrl={precip} title={"PRESSURE"} />
                        <span className={styles.current__details_big}>{weather.pressure} hPa</span>
                    </div>
                    <div>
                        <Title imgUrl={visibility} title={"VISIBILITY"} />
                        <span className={styles.current__details_big}>{visibilityStr}</span>
                    </div>
                    <div>
                        <Title imgUrl={humidity} title={"HUMIDITY"} />
                        <span className={styles.current__details_big}>{weather.humidity}%</span>
                        <p>The dew point is {weather.dew_point}&#176; right now</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentInfo;