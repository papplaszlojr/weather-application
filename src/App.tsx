import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import React from "react";
import ConfigPanel from "./config-panel/ConfigPanel";
import PageTitle from "./page-title/PageTitle";
import WeatherWidget1 from "./weather-widget-1/WeatherWidget1";
import WeatherWidget2 from "./weather-widget-2/WeatherWidget2";

function App() {
  return (
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
        <Grid item xs={4}>
          <WeatherWidget2 />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
