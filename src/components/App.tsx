import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider } from "@mui/material";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import {
  ColorModeContext,
  useColorModeContext,
} from "../api/color-mode/color-mode";
import { UnitContext, useUnitContext } from "../api/weather-data/unit";
import ConfigPanel from "./config-panel/ConfigPanel";
import PageTitle from "./page-title/PageTitle";
import WeatherWidget1 from "./weather-widget-1/WeatherWidget1";
import WeatherWidget2 from "./weather-widget-2/WeatherWidget2";

function App() {
  const { theme, ...colorModeContext } = useColorModeContext();
  const unitContext = useUnitContext();

  return (
    <UnitContext.Provider value={unitContext}>
      <ColorModeContext.Provider value={colorModeContext}>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <Container maxWidth="md">
              <Grid container item xs={12} rowSpacing={5} columnSpacing={0}>
                <Grid item xs={12}>
                  <PageTitle />
                </Grid>
                <Grid item xs={12}>
                  <ConfigPanel />
                </Grid>
                <Grid item xs={12}>
                  <WeatherWidget1 />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <WeatherWidget2 />
                </Grid>
              </Grid>
            </Container>
          </CssBaseline>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </UnitContext.Provider>
  );
}

export default App;
