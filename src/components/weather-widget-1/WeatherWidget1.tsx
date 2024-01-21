import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
  useGeolocationCoordinates,
  useLocationName,
} from "../../api/geolocation/geolocation";
import {
  useCachedWeather,
  useWeather,
} from "../../api/weather-data/weather-data";
import CurrentWeatherPanel from "../current-weather-panel/CurrentWeatherPanel";
import DailyForecastPanel from "./daily-forecast-panel/DailyForecastPanel";
import HourlyForecastPanel from "./hourly-forecast-panel/HourlyForecastPanel";

export default function WeatherWidget1() {
  const geolocation = useGeolocationCoordinates();
  const location = useLocationName(geolocation.coordinates);
  const cachedWeather = useCachedWeather();
  const weather = useWeather(
    geolocation.coordinates,
    !!cachedWeather.hourlyForecast,
    !!cachedWeather.dailyForecast,
  );
  const loading = geolocation.loading || location.loading || weather.loading;

  return (
    <Paper>
      <Grid container item xs={12}>
        <Grid container item xs={12}>
          <Grid item xs={12} sm={6} md={4}>
            <CurrentWeatherPanel
              locationName={location.name}
              currentWeather={weather.currentWeather}
              loading={loading}
              error={geolocation.error || location.error || weather.error}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <HourlyForecastPanel
              hourlyForecast={
                cachedWeather.hourlyForecast || weather.hourlyForecast
              }
              loading={loading}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ borderTop: 1, borderColor: "grey.200" }}>
          <DailyForecastPanel
            dailyForecast={cachedWeather.dailyForecast || weather.dailyForecast}
            loading={loading}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
