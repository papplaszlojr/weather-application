import Grid from "@mui/material/Grid";
import DailyForecastItem from "./DailyForecastItem";

const items = [1, 2, 3, 4, 5, 6];

export default function DailyForecastPanel() {
  return (
    <Grid container item xs={12} rowSpacing={0} columnSpacing={0}>
      {items.map((i) => (
        <Grid xs={2} key={i}>
          <DailyForecastItem />
        </Grid>
      ))}
    </Grid>
  );
}
