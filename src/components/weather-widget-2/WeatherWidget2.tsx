import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Slider from "@mui/material/Slider";
import { useEffect, useState } from "react";
import { cities } from "../../api/geolocation/geolocation";
import CityWeather from "./CityWeather";

const maxSlideInterval = 10000;

export default function WeatherWidget2() {
  const [slideInterval, setSlideInterval] = useState(2000);
  const [showIndex, setShowIndex] = useState(0);

  useEffect(
    function startInterval() {
      const interval = setInterval(function updateIndex() {
        setShowIndex(function getNextIndex(prevIndex) {
          return prevIndex === cities.length - 1 ? 0 : prevIndex + 1;
        });
      }, maxSlideInterval - slideInterval);

      return function cleanupInterval() {
        clearInterval(interval);
      };
    },
    [slideInterval],
  );

  function handleSliderChange(event: Event, value: number | number[]) {
    setSlideInterval(value as number);
  }

  function getSliderLabel(value: number) {
    return `${(maxSlideInterval - value) / 1000} sec`;
  }

  return (
    <Paper sx={{ mb: 5 }}>
      {cities.map((locationName, index) => (
        <CityWeather
          key={locationName}
          locationName={locationName}
          show={index === showIndex}
        />
      ))}
      <Box
        sx={{
          p: 3,
          borderTop: 1,
          borderColor: "grey.200",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Slider
          value={slideInterval}
          onChange={handleSliderChange}
          valueLabelFormat={getSliderLabel}
          valueLabelDisplay="auto"
          min={0}
          max={8000}
          step={1000}
          marks
        />
      </Box>
    </Paper>
  );
}
