import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import { useContext } from "react";
import { ColorModeContext } from "../color-mode/color-mode";
import { UnitContext, Units, units } from "../weather-data/unit";

export default function ConfigPanel() {
  const { colorMode, toggleColorMode } = useContext(ColorModeContext);
  const { unit, setUnit } = useContext(UnitContext);

  function handleUnitChange(event: SelectChangeEvent) {
    setUnit(event.target.value as Units);
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
          {units.map((unit) => (
            <MenuItem key={unit} value={unit}>
              {unit}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControlLabel
        labelPlacement="start"
        control={
          <Switch checked={colorMode === "dark"} onChange={toggleColorMode} />
        }
        label="Dark mode"
      />
    </Paper>
  );
}
