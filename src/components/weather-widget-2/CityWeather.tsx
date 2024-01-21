import { Box } from "@mui/material";
import Fade from "@mui/material/Fade";
import { useLocationCoordinates } from "../../api/geolocation/geolocation";
import { useCurrentWeather } from "../../api/weather-data/weather-data";
import CurrentWeatherPanel from "../current-weather-panel/CurrentWeatherPanel";

export default function CityWeather({ locationName, show }: Props) {
  const location = useLocationCoordinates(locationName);
  const weather = useCurrentWeather(location.coordinates);

  return (
    <Fade in={show}>
      <Box display={show ? undefined : "none"}>
        <CurrentWeatherPanel
          locationName={locationName}
          currentWeather={weather.currentWeather}
          loading={location.loading || weather.loading}
          error={location.error || weather.error}
        />
      </Box>
    </Fade>
  );
}

type Props = {
  locationName: string;
  show: boolean;
};
