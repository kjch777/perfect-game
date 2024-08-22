import React, { useEffect, useState } from "react";
import "../css/weather.css";

const API_KEY = "583741b92892b5bbd4e5416e788651f6";

const fetchWeather = async (city, cityId) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.cod === 200) {
      return {
        name: data.name,
        temperature: Math.round(data.main.temp - 273.15) + "℃",
        sky: data.weather[0].main,
        icon: data.weather[0].icon,
      };
    } else {
      throw new Error(`위치를 찾을 수 없습니다. 에러 코드: ${data.cod}`);
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};
const Weather = () => {
  const [weekWeather, setWeekWeather] = useState({});
  const cities = ["Seoul", "Incheon", "Gwangju", "Changwon", "Daegu", "Busan"];
  const [cityWeather, setCityWeather] = useState({});

  useEffect(() => {
    const loadWeatherData = async () => {
      const weekData = await fetchWeekWeather();
      setWeekWeather(weekData);

      const cityWeatherPromises = cities.map((city) =>
        fetchWeather(city, city)
      );
      const cityWeatherData = await Promise.all(cityWeatherPromises);
      setCityWeather(
        cities.reduce((acc, city, index) => {
          acc[city] = cityWeatherData[index];
          return acc;
        }, {})
      );
    };

    loadWeatherData();
  }, []);

  const fetchWeekWeather = async () => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Seoul&appid=${API_KEY}&units=metric`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const forecast = data.list;
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const weatherByDay = {};

      forecast.forEach((day) => {
        const date = new Date(day.dt * 1000);
        const dayOfWeek = daysOfWeek[date.getDay()];
        if (!weatherByDay[dayOfWeek]) {
          weatherByDay[dayOfWeek] = {
            maxTemp: -Infinity,
            minTemp: Infinity,
            sky: "",
            icon: day.weather[0].icon,
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
      console.error("날씨 정보를 불러오는 중 오류가 발생했습니다.", error);
      return {};
    }
  };

  const WeatherCard = ({ dayOfWeek, maxTemp, minTemp, sky, icon }) => (
    <div className="weather-card">
      <h2>{dayOfWeek}</h2>
      <img
        src={`http://openweathermap.org/img/wn/${icon}.png`}
        alt={sky}
        className="weather-icon"
      />
      <p>최고 기온: {maxTemp.toFixed(1)}°C</p>
      <p>최저 기온: {minTemp.toFixed(1)}°C</p>
      <p>날씨 상태: {sky}</p>
    </div>
  );

  return (
    <div>
      <div className="container">
        <div className="localweather-bar">
          <h3>지역별 날씨 예보</h3>
        </div>

        <div className="localWeather">
          <div className="weaterInfo">
            {cities.slice(0, 3).map(
              (city) =>
                cityWeather[city] && (
                  <div key={city} className="resultWeather">
                    <div className="city">{cityWeather[city].name}</div>
                    <div className="temperature">
                      {cityWeather[city].temperature}
                    </div>
                    <div className="sky">{cityWeather[city].sky}</div>
                  </div>
                )
            )}
          </div>
          <div className="koreaMap">
          <img
              src={`${process.env.PUBLIC_URL}/images/koreaMapFlag.png`}
              alt="Korea Map"
            />
          </div>
          <div className="weaterInfo">
            {cities.slice(3).map(
              (city) =>
                cityWeather[city] && (
                  <div key={city} className="resultWeather">
                    <div className="city">{cityWeather[city].name}</div>
                    <div className="temperature">
                      {cityWeather[city].temperature}
                    </div>
                    <div className="sky">{cityWeather[city].sky}</div>
                  </div>
                )
            )}
          </div>
        </div>
        <div className="weekweather-bar">
          <h3>주간 날씨 예보</h3>
        </div>
        <div className="weekWeather">
          <div id="weather-container">
            {Object.entries(weekWeather).map(
              ([dayOfWeek, { maxTemp, minTemp, sky, icon }]) => (
                <WeatherCard
                  key={dayOfWeek}
                  dayOfWeek={dayOfWeek}
                  maxTemp={maxTemp}
                  minTemp={minTemp}
                  sky={sky}
                  icon={icon}
                />
              )
            )}
          </div>
        </div>
        <h3 id="weatherRuleName">▶  기상 상황으로 인한 경기취소 결정  ◀</h3>
        <div className="weatheRule">
          <p>
            1. 경기 취소가 결정되면 KBO 홈페이지와 어플리케이션에서 가장 빠르게
            확인하실 수 있습니다.
            <br />
            - 경기 취소 시 홈페이지 메인 화면의 대진표에서 해당 경기 아래에
            표기됩니다.
            <br />
            - 경기운영위원 배정 정보는 제공되지 않습니다.
            <br />
            <br />
            2. 경기개시 예정 시간을 기준으로 강풍, 폭염, 안개, 미세먼지, 황사
            등의 기상 특보(경보 이상)가 발령되어 있을 경우 전반적인 상황을
            종합적으로 고려해 경기취소 여부를 결정합니다.
            <br />
            - 경기개시 전: 해당 경기운영위원이 지역 기상청(기상대)으로 확인 후
            결정
            <br />
            - 경기개시 후: 해당 심판원이 지역 기상청(기상대)으로 확인 후 결정
            <br />
            <br />
            3. 아래는 기상 특보 발령 기준입니다. 참고하시기 바랍니다.
            <br />
            ① 강풍 가. 주의보: 풍속 14m/s 이상, 순간 풍속 20m/s 이상이 예상될 때
            <br />
            나. 경보: 풍속 21m/s 이상 또는 순간 풍속 26m/s 이상이 예상될 때
            <br />
            ② 폭염 가. 주의보: 일 최고 기온이 섭씨 33도 이상인 상태가 2일 이상
            지속될 것으로 예상 될 때<br />
            나. 경보: 일 최고 기온이 섭씨 35도 이상인 상태가 2일 이상 지속될
            것으로 예상될 때<br />
            ③ 미세먼지 가. 주의보: PM2.5((초)미세먼지) 75μg/m³이상 또는
            PM10(미세먼지) 150μg/m³이상이 2시간 이상 지속인 때<br />
            나. 경보: PM2.5((초)미세먼지) 150μg/m³이상 또는 PM10(미세먼지)
            300μg/m³이상이 2시간 이상 지속인 때<br />
            다. 단, 경기개시 전에 미세먼지(초미세먼지 포함) 경보가 발령되었거나
            경보 발령 기준 농도를 초과한 경우
            <br />
            취소여부를 결정하고 경기개시 후에 미세먼지 경보가 발령되었을 경우
            경기 취소여부를 결정한다.
            <br />
            (경기 중 경보발령시 해당 이닝 종료 후 취소여부 결정).
            <br />
            ④ 황사 가. 주의보: 미세먼지 경보로 대체
            <br />
            나. 경보: 황사로 인해 1시간 평균 미세먼지 농도 800㎍/㎥ 이상이 2시간
            이상 지속될 것으로 예상될 때<br />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Weather;
