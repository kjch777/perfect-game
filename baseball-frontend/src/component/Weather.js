import React, { useEffect, useState } from 'react';
import './css/weather.css';

const API_KEY = 'api키';

const fetchWeather = async (city, cityId) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === 200) {
            return {
                name: data.name,
                temperature: Math.round(data.main.temp - 273.15) + "℃",
                sky: data.weather[0].main
            };
        } else {
            throw new Error(`위치를 찾을 수 없습니다. 에러 코드: ${data.cod}`);
        }
    } catch (err) {
        console.error(err);
        return null;
    }
};

const fetchWeekWeather = async () => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Seoul&appid=${API_KEY}&units=metric`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const forecast = data.list;
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const weatherByDay = {};

        forecast.forEach(day => {
            const date = new Date(day.dt * 1000);
            const dayOfWeek = daysOfWeek[date.getDay()];
            if (!weatherByDay[dayOfWeek]) {
                weatherByDay[dayOfWeek] = {
                    maxTemp: -Infinity,
                    minTemp: Infinity,
                    sky: ''
                };
            }
            if (day.main.temp_max > weatherByDay[dayOfWeek].maxTemp) {
                weatherByDay[dayOfWeek].maxTemp = day.main.temp_max;
            }
            if (day.main.temp_min < weatherByDay[dayOfWeek].minTemp) {
                weatherByDay[dayOfWeek].minTemp = day.main.temp_min;
            }
            if (day.weather[0].main) {
                weatherByDay[dayOfWeek].sky = day.weather[0].main;
            }
        });

        return weatherByDay;
    } catch (error) {
        console.error('날씨 정보를 불러오는 중 오류가 발생했습니다.', error);
        return {};
    }
};

const WeatherCard = ({ dayOfWeek, maxTemp, minTemp, sky }) => (
    <div className="weather-card">
        <h2>{dayOfWeek}</h2>
        <p>최고 기온: {maxTemp.toFixed(1)}°C</p>
        <p>최저 기온: {minTemp.toFixed(1)}°C</p>
        <p>날씨 상태: {sky}</p>
    </div>
);

const Weather = () => {
    const [weekWeather, setWeekWeather] = useState({});
    const cities = ['Seoul', 'Incheon', 'Busan', 'Gwangju', 'Daegu', 'Changwon'];
    const [cityWeather, setCityWeather] = useState({});

    useEffect(() => {
        const loadWeatherData = async () => {
            const weekData = await fetchWeekWeather();
            setWeekWeather(weekData);

            const cityWeatherPromises = cities.map(city => fetchWeather(city, city));
            const cityWeatherData = await Promise.all(cityWeatherPromises);
            setCityWeather(cities.reduce((acc, city, index) => {
                acc[city] = cityWeatherData[index];
                return acc;
            }, {}));
        };

        loadWeatherData();
    }, []);

    return (
        <div>
            <div className="container">
                <div className="localweather-bar">
                    <h1>지역별 날씨 예보</h1>
                </div>

                <div className="localWeather">
                    <div className="weaterInfo">
                        {cities.map(city => (
                            cityWeather[city] && (
                                <div key={city} className="resultWeather">
                                    <div className="city">{cityWeather[city].name}</div>
                                    <div className="temperature">{cityWeather[city].temperature}</div>
                                    <div className="sky">{cityWeather[city].sky}</div>
                                </div>
                            )
                        ))}
                    </div>
                    <div className="koreaMap">
                        <img src='./image/koreaMap-gray.png' />
                    </div>
                </div>
                <div className="weekweather-bar">
                    <h1>주간 날씨 예보</h1>
                </div>
                <div className="weekWeather">
                    <div id="weather-container">
                        {Object.entries(weekWeather).map(([dayOfWeek, { maxTemp, minTemp, sky }]) => (
                            <WeatherCard
                                key={dayOfWeek}
                                dayOfWeek={dayOfWeek}
                                maxTemp={maxTemp}
                                minTemp={minTemp}
                                sky={sky}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weather;
