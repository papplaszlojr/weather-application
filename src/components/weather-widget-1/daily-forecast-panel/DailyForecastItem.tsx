import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { DailyForecast } from "../../../api/weather-data/weather-data";

export default function DailyForecastItem({ forecastItem }: Props) {
  return (
    <Box textAlign="center">
      <Typography variant="subtitle2">
        {dayjs(forecastItem.timestamp).format("ddd")}
      </Typography>
      <Tooltip title={forecastItem.description}>
        <img
          width={45}
          height={45}
          src={`https://openweathermap.org/img/wn/${forecastItem.icon}@2x.png`}
          alt={forecastItem.description}
        ></img>
      </Tooltip>
      <Typography variant="body2">{forecastItem.tempMax}</Typography>
      <Typography variant="body2">{forecastItem.tempMin}</Typography>
    </Box>
  );
}

type Props = {
  forecastItem: DailyForecast;
};
