import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Slider from "@mui/material/Slider";
import CurrentWeatherPanel from "../current-weather-panel/CurrentWeatherPanel";

export default function WeatherWidget2() {
  return (
    <Paper>
      <CurrentWeatherPanel />
      <Box
        sx={{
          p: 3,
          borderTop: 1,
          borderColor: "grey.500",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Slider
          aria-label="Temperature"
          defaultValue={30}
          // getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          step={10}
          marks
          min={10}
          max={100}
        />
      </Box>
    </Paper>
  );
}
