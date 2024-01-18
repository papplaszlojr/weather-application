import Grid from "@mui/material/Grid";
import HourlyForecastItem from "./HourlyForecastItem";

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function HourlyForecastPanel() {
  return (
    <Grid container item xs={12} rowSpacing={0} columnSpacing={0}>
      {items.map((i) => (
        <Grid item xs={1} key={i}>
          <HourlyForecastItem />
        </Grid>
      ))}
    </Grid>
  );
}
