import { useEffect, useMemo, useState } from "react";

const GEO_DIRECT_URL = "http://api.openweathermap.org/geo/1.0/direct";
const GEO_REVERSE_URL = "http://api.openweathermap.org/geo/1.0/reverse";
const APP_ID = process.env.REACT_APP_OWM_API_KEY;

export const cities = [
  "Birmingham",
  "Chicago",
  "Reykjavík",
  "Amsterdam",
  "Sydney",
  "Medellín",
];

export function useGeolocationCoordinates() {
  const [coordinates, setCoordinates] = useState<Coordinates | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  useEffect(function getGeolocation() {
    if (navigator.geolocation) {
      setLoading(true);

      navigator.geolocation.getCurrentPosition(
        function onSuccess(position: GeolocationPosition) {
          setCoordinates({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          setError(undefined);
          setLoading(false);
        },
        function onError(error) {
          setCoordinates(undefined);
          setError(error.message);
          setLoading(false);
        },
      );
    } else {
      setCoordinates(undefined);
      setError("Geolocation is not supported");
      setLoading(false);
    }
  }, []);

  return { coordinates, loading, error };
}

export function useLocationCoordinates(locationName: string | undefined) {
  const [coordinates, setCoordinates] = useState<Coordinates | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  const url = useMemo(
    function assembleUrl() {
      if (APP_ID && locationName) {
        return `${GEO_DIRECT_URL}?q=${locationName}&limit=1&appid=${APP_ID}`;
      }
    },
    [locationName],
  );

  useEffect(
    function getLocation() {
      if (url) {
        setLoading(true);

        fetch(url)
          .then(function getJson(response) {
            return response.json();
          })
          .then(function processLocationData(locationData: LocationData[]) {
            const { lat, lon } = locationData[0];

            setCoordinates({ lat, lon });
            setError(undefined);
            setLoading(false);
          })
          .catch(function handleError() {
            setCoordinates(undefined);
            setError("Error fetching location coordinates");
            setLoading(false);
          });
      }
    },
    [url],
  );

  return { coordinates, loading, error };
}

export function useLocationName(coords: Coordinates | undefined) {
  const [name, setName] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  const url = useMemo(
    function assembleUrl() {
      if (APP_ID && coords) {
        return `${GEO_REVERSE_URL}?lat=${coords.lat}&lon=${coords.lon}&limit=1&appid=${APP_ID}`;
      }
    },
    [coords],
  );

  useEffect(
    function getLocation() {
      if (url) {
        setLoading(true);

        fetch(url)
          .then(function getJson(response) {
            return response.json();
          })
          .then(function processLocationData(locationData: LocationData[]) {
            setName(locationData[0].name);
            setError(undefined);
            setLoading(false);
          })
          .catch(function handleError() {
            setName(undefined);
            setError("Error fetching location name");
            setLoading(false);
          });
      }
    },
    [url],
  );

  return { name, loading, error };
}

type GeolocationPosition = {
  coords: {
    latitude: number;
    longitude: number;
  };
};

export interface Coordinates {
  lat: number;
  lon: number;
}

interface LocationData extends Coordinates {
  name: string;
}
