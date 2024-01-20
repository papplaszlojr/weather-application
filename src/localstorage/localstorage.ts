import { initColorMode } from "../color-mode/color-mode";
import { initUnit } from "../weather-data/unit";

export const lsKeys = {
  unit: "unit",
  colorMode: "colorMode",
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
  initColorMode();
  initUnit();
}
