import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CurrentWeatherPanel from "../current-weather-panel/CurrentWeatherPanel";
import DailyForecastPanel from "./daily-forecast-panel/DailyForecastPanel";
import HourlyForecastPanel from "./hourly-forecast-panel/HourlyForecastPanel";

export default function WeatherWidget1() {
  return (
    <Paper>
      <Grid container item xs={12} rowSpacing={0} columnSpacing={0}>
        <Grid item xs={12} md={4}>
          <CurrentWeatherPanel />
        </Grid>
        <Grid container item xs={12} md={8}>
          <HourlyForecastPanel />
          <DailyForecastPanel />
        </Grid>
      </Grid>
    </Paper>
  );
}
