import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { HourlyForecast } from "../../../api/weather-data/weather-data";

export default function HourlyForecastItem({ forecastItem }: Props) {
  return (
    <Box textAlign="center">
      <Typography variant="subtitle2">
        {dayjs(forecastItem.timestamp).format("HH:mm")}
      </Typography>
      <Tooltip title={forecastItem.description}>
        <img
          width={35}
          height={35}
          src={`https://openweathermap.org/img/wn/${forecastItem.icon}@2x.png`}
          alt={forecastItem.description}
        ></img>
      </Tooltip>
      <Typography variant="body2">{forecastItem.temp}</Typography>
    </Box>
  );
}

type Props = {
  forecastItem: HourlyForecast;
};
