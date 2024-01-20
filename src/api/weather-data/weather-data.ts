import { useEffect, useMemo, useState } from "react";
import { Coordinates } from "../geolocation/geolocation";

const OWM_URL = "https://api.openweathermap.org/data/2.5/onecall";
const APP_ID = process.env.REACT_APP_OWM_API_KEY;

export function useWeather(
  coordinates: Coordinates | undefined,
  excludeHourly: boolean,
  excludeDaily: boolean,
) {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>({});
  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecast[]>([]);
  const [dailyForecast, setDailyForecast] = useState<DailyForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  const url = useMemo(
    function assembleUrl() {
      if (APP_ID && coordinates) {
        return `${OWM_URL}?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely${excludeHourly ? ",hourly" : ""}${excludeDaily ? ",daily" : ""},alerts&appid=${APP_ID}`;
      }
    },
    [coordinates, excludeHourly, excludeDaily],
  );

  useEffect(
    function getWeather() {
      if (url) {
        setLoading(true);

        fetch(url)
          .then(function getJson(response) {
            return response.json();
          })
          .then(function processWeatherData(weatherData: WeatherData) {
            setCurrentWeather({
              timestamp: weatherData.current.dt * 1000,
              temp: weatherData.current.temp,
              humidity: weatherData.current.humidity,
              windSpeed: weatherData.current.wind_speed,
              description: weatherData.current.weather[0].description,
              icon: weatherData.current.weather[0].icon,
            });

            if (!excludeHourly) {
              const hours = weatherData.hourly.slice(1, 13);

              setHourlyForecast(
                hours.map((hour) => ({
                  timestamp: hour.dt * 1000,
                  temp: hour.temp,
                  description: hour.weather[0].description,
                  icon: hour.weather[0].icon,
                })),
              );
            }

            if (!excludeDaily) {
              const days = weatherData.daily.slice(1, 7);

              setDailyForecast(
                days.map((day) => ({
                  timestamp: day.dt * 1000,
                  tempMin: day.temp.min,
                  tempMax: day.temp.max,
                  description: day.weather[0].description,
                  icon: day.weather[0].icon,
                })),
              );
            }

            setError(undefined);
            setLoading(false);
          })
          .catch(function handleError() {
            setCurrentWeather({});
            setHourlyForecast([]);
            setDailyForecast([]);
            setError("Error fetching weather data");
            setLoading(false);
          });
      }
    },
    [url, excludeHourly, excludeDaily],
  );

  return { currentWeather, hourlyForecast, dailyForecast, loading, error };
}

export function useCurrentWeather(coordinates: Coordinates | undefined) {
  return useWeather(coordinates, true, true);
}

type Current = {
  dt: number;
  temp: number;
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

type CurrentWeather =
  | {
      timestamp: number;
      temp: number;
      humidity: number;
      windSpeed: number;
      description: string;
      icon: string;
    }
  | {};

type HourlyForecast =
  | {
      timestamp: number;
      temp: number;
      description: string;
      icon: string;
    }
  | {};

type DailyForecast =
  | {
      timestamp: number;
      tempMin: number;
      tempMax: number;
      description: string;
      icon: string;
    }
  | {};
