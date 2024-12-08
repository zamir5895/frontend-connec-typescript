import React, { useEffect, useState, useRef } from 'react';

interface MapWithSearchProps {
  setLatitude: (lat: number) => void;
  setLongitude: (lng: number) => void;
}

const loadScript = (url: string, callback: () => void): void => {
  const existingScript = document.querySelector(`script[src="${url}"]`) as HTMLScriptElement;
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.defer = true;
    script.onload = callback;
    document.body.appendChild(script);
  } else {
    callback();
  }
};

declare global {
  interface Window {
    initMap: () => void;
    google: any;
  }
}

const MapWithSearch: React.FC<MapWithSearchProps> = ({ setLatitude, setLongitude }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    window.initMap = initMap;
    const googleMapsApiUrl = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`;

    loadScript(googleMapsApiUrl, initMap);
  }, []);

  const initMap = (): void => {
    if (!window.google) {
      console.error('Google Maps JavaScript API not loaded');
      return;
    }

    const initialLatLng = { lat: -34.397, lng: 150.644 };
    const mapInstance = new window.google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: initialLatLng,
      zoom: 8,
    });
    setMap(mapInstance);

    const autocomplete = new window.google.maps.places.Autocomplete(searchInputRef.current!);
    autocomplete.bindTo('bounds', mapInstance);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
        console.error("No details available for input: '" + place.name + "'");
        return;
      }

      const location = place.geometry.location;
      placeMarker(location, mapInstance);
    });

    // Añade un listener de clic en el mapa
    mapInstance.addListener('click', (e: google.maps.MapMouseEvent) => {
      const clickedLocation = e.latLng;
      if (clickedLocation) {
        placeMarker(clickedLocation, mapInstance);
      }
    });
  };

  const placeMarker = (location: google.maps.LatLng, mapInstance: google.maps.Map) => {
    // Elimina el marcador anterior si existe
    if (marker) {
      marker.setMap(null);
    }

    // Crea un nuevo marcador en la ubicación seleccionada
    const newMarker = new window.google.maps.Marker({
      position: location,
      map: mapInstance,
    });
    setMarker(newMarker);

    // Centra y ajusta el zoom del mapa en el nuevo marcador
    mapInstance.setCenter(location);
    mapInstance.setZoom(15);

    // Actualiza la latitud y longitud en el componente padre
    setLatitude(location.lat());
    setLongitude(location.lng());
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md mt-6">
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Buscar dirección"
        className="mb-4 p-2 border rounded w-full"
      />
      <div id="map" className="w-full h-96 mb-4 rounded-lg shadow-lg"></div>
    </div>
  );
};

export default MapWithSearch;
