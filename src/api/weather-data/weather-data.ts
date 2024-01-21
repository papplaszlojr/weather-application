import { useContext, useEffect, useMemo, useState } from "react";
import { Coordinates } from "../geolocation/geolocation";
import {
  getLocalstorageItem,
  lsKeys,
  setLocalstorageItem,
} from "../localstorage/localstorage";
import { UnitContext, formatPercent, formatSpeed, formatTemp } from "./unit";

const OWM_URL = "https://api.openweathermap.org/data/2.5/onecall";
const APP_ID = process.env.REACT_APP_OWM_API_KEY;

export function useWeather(
  coordinates: Coordinates | undefined,
  excludeHourly: boolean,
  excludeDaily: boolean,
) {
  const [currentWeather, setCurrentWeather] = useState<
    CurrentWeather | undefined
  >();
  const [hourlyForecast, setHourlyForecast] = useState<
    HourlyForecast[] | undefined
  >();
  const [dailyForecast, setDailyForecast] = useState<
    DailyForecast[] | undefined
  >();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  const { unit } = useContext(UnitContext);

  const url = useMemo(
    function assembleUrl() {
      if (APP_ID && coordinates) {
        return `${OWM_URL}?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely${excludeHourly ? ",hourly" : ""}${excludeDaily ? ",daily" : ""},alerts&units=${unit}&appid=${APP_ID}`;
      }
    },
    [coordinates, unit, excludeHourly, excludeDaily],
  );

  useEffect(
    function getWeather() {
      if (url) {
        setLoading(true);

        fetch(url)
          .then(function getJson(response) {
            return response.json();
          })
          .then(function processWeatherData({
            current,
            hourly,
            daily,
          }: WeatherData) {
            setCurrentWeather({
              timestamp: current.dt * 1000,
              temp: formatTemp(current.temp, unit),
              clouds: formatPercent(current.clouds),
              humidity: formatPercent(current.humidity),
              windSpeed: formatSpeed(current.wind_speed, unit),
              description: current.weather[0].description,
              icon: current.weather[0].icon,
            });

            if (!excludeHourly) {
              const hours = hourly.slice(1, 13);
              const newHourlyForecast = hours.map((hour) => ({
                timestamp: hour.dt * 1000,
                temp: formatTemp(hour.temp, unit),
                description: hour.weather[0].description,
                icon: hour.weather[0].icon,
              }));

              setLocalstorageItem(
                lsKeys.hourlyForecast(unit),
                JSON.stringify(newHourlyForecast),
              );

              setHourlyForecast(newHourlyForecast);
            }

            if (!excludeDaily) {
              const days = daily.slice(1, 7);
              const newDailyForecast = days.map((day) => ({
                timestamp: day.dt * 1000,
                tempMin: formatTemp(day.temp.min, unit),
                tempMax: formatTemp(day.temp.max, unit),
                description: day.weather[0].description,
                icon: day.weather[0].icon,
              }));

              setLocalstorageItem(
                lsKeys.dailyForecast(unit),
                JSON.stringify(newDailyForecast),
              );

              setDailyForecast(newDailyForecast);
            }

            setError(undefined);
            setLoading(false);
          })
          .catch(function handleError() {
            setCurrentWeather(undefined);
            setHourlyForecast(undefined);
            setDailyForecast(undefined);
            setError("Error fetching weather data");
            setLoading(false);
          });
      }
    },
    [url, unit, excludeHourly, excludeDaily],
  );

  return { currentWeather, hourlyForecast, dailyForecast, loading, error };
}

export function useCurrentWeather(coordinates: Coordinates | undefined) {
  return useWeather(coordinates, true, true);
}

export function useCachedWeather() {
  const { unit } = useContext(UnitContext);

  const hourlyForecast = useMemo(() => {
    return getCachedWeather(lsKeys.hourlyForecast(unit));
  }, [unit]);

  const dailyForecast = useMemo(() => {
    return getCachedWeather(lsKeys.dailyForecast(unit));
  }, [unit]);

  return { hourlyForecast, dailyForecast };
}

function getCachedWeather(lsKey: string) {
  const cachedDataStr = getLocalstorageItem(lsKey);

  if (cachedDataStr) {
    const cachedData = JSON.parse(cachedDataStr);
    const startDate = cachedData?.[0]?.timestamp;

    if (startDate && startDate >= Date.now()) {
      return cachedData;
    }
  }
}

type Current = {
  dt: number;
  temp: number;
  clouds: number;
  humidity: number;
  wind_speed: number;
  weather: [
    {
      description: string;
      icon: string;
    },
  ];
};

type Day = {
  dt: number;
  temp: {
    min: number;
    max: number;
  };
  weather: [
    {
      description: string;
      icon: string;
    },
  ];
};

type Hour = {
  dt: number;
  temp: number;
  weather: [
    {
      description: string;
      icon: string;
    },
  ];
};

type WeatherData = {
  current: Current;
  hourly: Hour[];
  daily: Day[];
};

export type CurrentWeather = {
  timestamp: number;
  temp: string;
  clouds: string;
  humidity: string;
  windSpeed: string;
  description: string;
  icon: string;
};

export type HourlyForecast = {
  timestamp: number;
  temp: string;
  description: string;
  icon: string;
};

export type DailyForecast = {
  timestamp: number;
  tempMin: string;
  tempMax: string;
  description: string;
  icon: string;
};
