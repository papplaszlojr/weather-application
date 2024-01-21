import AirIcon from "@mui/icons-material/Air";
import CloudIcon from "@mui/icons-material/Cloud";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Fade from "@mui/material/Fade";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { CurrentWeather } from "../../api/weather-data/weather-data";

export default function CurrentWeatherPanel({
  locationName,
  currentWeather,
  loading,
  error,
}: Props) {
  return (
    <Box padding={3} height={260}>
      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <Box display="flex" alignItems="center">
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <LocationOnIcon />
            )}
            <Typography variant="h5" marginLeft={1}>
              {loading ? "Loading..." : locationName ?? ""}
            </Typography>
          </Box>
          <Fade in={!loading}>
            <Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h2">
                  {currentWeather?.temp ?? ""}
                </Typography>
                {currentWeather?.icon && (
                  <img
                    src={`https://openweathermap.org/img/wn/${currentWeather?.icon}@2x.png`}
                    alt={currentWeather?.description}
                  ></img>
                )}
              </Box>
              <Typography variant="subtitle1">
                {currentWeather?.description ?? ""}
              </Typography>
              <Box marginTop={3} display="flex">
                <Tooltip title="Clouds">
                  <Chip
                    icon={<CloudIcon />}
                    label={currentWeather?.clouds ?? ""}
                  />
                </Tooltip>
                <Tooltip title="Wind speed">
                  <Chip
                    icon={<AirIcon />}
                    label={currentWeather?.windSpeed ?? ""}
                    sx={{ marginLeft: 1 }}
                  />
                </Tooltip>
                <Tooltip title="Humidity">
                  <Chip
                    icon={<WaterDropIcon />}
                    label={currentWeather?.humidity ?? ""}
                    sx={{ marginLeft: 1 }}
                  />
                </Tooltip>
              </Box>
            </Box>
          </Fade>
        </>
      )}
    </Box>
  );
}

type Props = {
  locationName: string | undefined;
  currentWeather: CurrentWeather | undefined;
  loading: boolean;
  error: string | undefined;
};
