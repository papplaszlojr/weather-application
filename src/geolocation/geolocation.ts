import { useEffect, useState } from "react";

interface GeolocationCoordinates {
  latitude: number;
  longitude: number;
}

interface GeolocationPosition {
  coords: GeolocationCoordinates;
}

export default function useGeolocation() {
  const [coords, setCoords] = useState<GeolocationCoordinates | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(function getGeoloacation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function onSuccess(position: GeolocationPosition) {
          setCoords(position.coords);
          setLoading(false);
        },
        function onError() {
          setLoading(false);
        },
      );
    } else {
      setLoading(false);
    }
  }, []);

  return { coords, coordsLoading: loading };
}
