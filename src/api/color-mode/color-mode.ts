import { createTheme } from "@mui/material";
import { createContext, useMemo, useState } from "react";
import {
  getLocalstorageItem,
  initLocalstorageItem,
  lsKeys,
  setLocalstorageItem,
} from "../localstorage/localstorage";

type ColorModes = "light" | "dark";

export function saveColorMode(value: ColorModes) {
  setLocalstorageItem(lsKeys.colorMode, value);
}

export function getColorMode(): ColorModes {
  const colorMode = getLocalstorageItem(lsKeys.colorMode);

  return colorMode === "dark" ? "dark" : "light";
}

export function initColorMode() {
  initLocalstorageItem(lsKeys.colorMode, "light");
}

export const ColorModeContext = createContext({
  colorMode: "light",
  toggleColorMode() {},
});

export function useColorModeContext() {
  const [colorMode, setColorMode] = useState(getColorMode());

  return useMemo(
    function getColorModeContext() {
      return {
        colorMode,
        toggleColorMode() {
          setColorMode(function getNextMode(prevMode) {
            const nextMode = prevMode === "light" ? "dark" : "light";

            saveColorMode(nextMode);

            return nextMode;
          });
        },
        theme: createTheme({
          palette: {
            mode: colorMode,
          },
        }),
      };
    },
    [colorMode],
  );
}
