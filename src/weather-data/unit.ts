import { createContext, useMemo, useState } from "react";
import {
  getLocalstorageItem,
  initLocalstorageItem,
  lsKeys,
  setLocalstorageItem,
} from "../local-storage/localstorage";

export type Units = "standard" | "metric" | "imperial";

export const units = ["standard", "metric", "imperial"];

export function saveUnit(value: Units) {
  setLocalstorageItem(lsKeys.unit, value);
}

export function getUnit(): Units {
  const unit = getLocalstorageItem(lsKeys.unit);

  return unit === "standard" || unit === "metric" || unit === "imperial"
    ? unit
    : "standard";
}

export function initUnit() {
  initLocalstorageItem(lsKeys.unit, "standard");
}

export const UnitContext = createContext({
  unit: "standard",
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
