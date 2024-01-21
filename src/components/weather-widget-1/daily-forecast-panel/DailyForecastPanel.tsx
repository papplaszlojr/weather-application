import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { DailyForecast } from "../../../api/weather-data/weather-data";
import DailyForecastItem from "./DailyForecastItem";

export default function DailyForecastPanel({ dailyForecast, loading }: Props) {
  return (
    <Box padding={3} height={202}>
      <Typography variant="h6">The next 6 days</Typography>
      <Fade in={!loading}>
        <Grid container item xs={12} marginTop={2}>
          {dailyForecast &&
            dailyForecast?.map((forecastItem) => (
              <Grid item xs={2} key={forecastItem.timestamp}>
                <DailyForecastItem forecastItem={forecastItem} />
              </Grid>
            ))}
        </Grid>
      </Fade>
    </Box>
  );
}

type Props = {
  dailyForecast: DailyForecast[] | undefined;
  loading: boolean;
};
