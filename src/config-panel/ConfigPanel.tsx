import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import { useState } from "react";
import {
  getLocalstorageItem,
  lsKeys,
  setLocalstorageItem,
} from "../local-storage/localstorage";
import { weatherDataUnits } from "../weather-data/weather-data";

export default function ConfigPanel() {
  const [unit, setUnit] = useState(getLocalstorageItem(lsKeys.unit));
  const [darkMode, setDarkMode] = useState(
    getLocalstorageItem(lsKeys.darkMode) === "true",
  );

  function handleUnitChange(event: SelectChangeEvent) {
    const { value } = event.target;

    setUnit(value);
    setLocalstorageItem(lsKeys.unit, value);
  }

  function handleDarkModeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { checked } = event.target;

    setDarkMode(checked);
    setLocalstorageItem(lsKeys.darkMode, checked.toString());
  }

  return (
    <Paper sx={{ p: 3, display: "flex", justifyContent: "space-between" }}>
      <FormControl>
        <InputLabel id="unit-select-label">Unit</InputLabel>
        <Select
          labelId="unit-select-label"
          id="unit-select"
          value={unit ?? undefined}
          label="Unit"
          onChange={handleUnitChange}
        >
          {Object.values(weatherDataUnits).map((unit) => (
            <MenuItem key={unit} value={unit}>
              {unit}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControlLabel
        labelPlacement="start"
        control={<Switch checked={darkMode} onChange={handleDarkModeChange} />}
        label="Dark mode"
      />
    </Paper>
  );
}
