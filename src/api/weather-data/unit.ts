import { createContext, useMemo, useState } from "react";
import {
  getLocalstorageItem,
  initLocalstorageItem,
  lsKeys,
  setLocalstorageItem,
} from "../localstorage/localstorage";

export type Units = "metric" | "imperial";

export const units = ["metric", "imperial"];

export function saveUnit(value: Units) {
  setLocalstorageItem(lsKeys.unit, value);
}

export function getUnit(): Units {
  const unit = getLocalstorageItem(lsKeys.unit);

  return unit === "imperial" ? "imperial" : "metric";
}

export function initUnit() {
  initLocalstorageItem(lsKeys.unit, "metric");
}

export const UnitContext = createContext<{
  unit: Units;
  setUnit: (nextUnit: Units) => void;
}>({
  unit: "metric",
  setUnit() {},
});

export function useUnitContext() {
  const [unit, setUnit] = useState<Units>(getUnit());

  return useMemo(
    function getUnitContext() {
      return {
        unit,
        setUnit(nextUnit: Units) {
          saveUnit(nextUnit);
          setUnit(nextUnit);
        },
      };
    },
    [unit],
  );
}

export function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}

export function formatTemp(value: number, unit: Units) {
  return `${Math.round(value)}°${unit === "metric" ? "C" : "F"}`;
}

export function formatSpeed(value: number, unit: Units) {
  return `${Math.round(value)} ${unit === "metric" ? "m/s" : "mph"}`;
}
