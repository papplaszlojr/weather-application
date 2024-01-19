import { weatherDataUnits } from "../weather-data/weather-data";

export const lsKeys = {
  unit: "unit",
  darkMode: "darkMode",
};

export function setLocalstorageItem(key: string, value: string) {
  window.localStorage?.setItem?.(key, value);
}

export function getLocalstorageItem(key: string) {
  return window.localStorage?.getItem?.(key);
}

export function initLocalstorageItem(key: string, value: string) {
  if (!getLocalstorageItem(key)) {
    setLocalstorageItem(key, value);
  }
}

export function initLocalstorage() {
  initLocalstorageItem(lsKeys.unit, weatherDataUnits.standard);
  initLocalstorageItem(lsKeys.darkMode, "false");
}
