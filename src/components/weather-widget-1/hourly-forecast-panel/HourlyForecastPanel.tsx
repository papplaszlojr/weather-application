import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { HourlyForecast } from "../../../api/weather-data/weather-data";
import HourlyForecastItem from "./HourlyForecastItem";

export default function HourlyForecastPanel({
  hourlyForecast,
  loading,
}: Props) {
  return (
    <Box
      padding={3}
      sx={{
        borderLeft: { xs: 0, md: 1 },
        borderTop: { xs: 1, md: 0 },
        borderColor: { xs: "grey.200", md: "grey.200" },
      }}
      height={293}
    >
      <Typography variant="h6">12 hour forecast</Typography>
      <Fade in={!loading}>
        <Grid container item xs={12} marginTop={2} rowGap={4}>
          {hourlyForecast &&
            hourlyForecast?.map((forecastItem) => (
              <Grid item xs={2} key={forecastItem.timestamp}>
                <HourlyForecastItem forecastItem={forecastItem} />
              </Grid>
            ))}
        </Grid>
      </Fade>
    </Box>
  );
}

type Props = {
  hourlyForecast: HourlyForecast[] | undefined;
  loading: boolean;
};
