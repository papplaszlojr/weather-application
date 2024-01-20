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

export const UnitContext = createContext({
  unit: "metric",
  setUnit(nextUnit: Units) {},
});

export function useUnitContext() {
  const [unit, setUnit] = useState(getUnit());

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
