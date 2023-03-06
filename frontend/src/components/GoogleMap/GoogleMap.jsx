import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  InfoWindow,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";

const apiKeyEnv = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
const libraries = ["geometry", "drawing"];
function MapContainer2({ latitude, longitude, adress, name }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKeyEnv,
    libraries,
  });

  const [mapContainerStyle, setMapContainerStyle] = useState({
    width: "100%",
    height: "100%",
    borderRadius: 8,
  });

  const [infoWindowVisible, setInfoWindowVisible] = useState(true);

  const center = {
    lat: Number(latitude),
    lng: Number(longitude),
  };
  const marker = {
    lat: Number(latitude),
    lng: Number(longitude),
  };
  useEffect(() => {
    function updateSize() {
      setMapContainerStyle({
        width: window.innerWidth / 2,
        height: window.innerHeight / 3,
        borderRadius: 8,
      });
    }

    window.addEventListener("resize", updateSize);

    updateSize(); // Appel initial pour définir la taille de la carte
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={14}
        >
          <MarkerF
            position={center}
            opacity={1}
            onMouseUp={() => setInfoWindowVisible(!infoWindowVisible)}
          >
            <InfoWindow
              position={marker}
              onCloseClick={() => setInfoWindowVisible(false)}
              visible={infoWindowVisible}
            >
              <div className="text-[15px]">
                <div>{name}</div>
                <div>{adress}</div>
              </div>
            </InfoWindow>
          </MarkerF>
        </GoogleMap>
      )}
    </div>
  );
}

MapContainer2.propTypes = {
  adress: PropTypes.string.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default MapContainer2;
