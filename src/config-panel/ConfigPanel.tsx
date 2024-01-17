import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import { useState } from "react";

export default function ConfigPanel() {
  const [unit, setUnit] = useState("standard");
  const [darkMode, setDarkMode] = useState(false);

  function handleUnitChange(event: SelectChangeEvent) {
    setUnit(event.target.value);
  }

  function handleDarkModeChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDarkMode(event.target.checked);
  }

  return (
    <Paper sx={{ p: 3, display: "flex", justifyContent: "space-between" }}>
      <FormControl>
        <InputLabel id="unit-select-label">Unit</InputLabel>
        <Select
          labelId="unit-select-label"
          id="unit-select"
          value={unit}
          label="Unit"
          onChange={handleUnitChange}
        >
          <MenuItem value="standard">Standard</MenuItem>
          <MenuItem value="metric">Metric</MenuItem>
          <MenuItem value="imperial">Imperial</MenuItem>
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
