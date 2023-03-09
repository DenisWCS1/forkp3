import PropTypes from "prop-types";
import React, { useState } from "react";
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

  const [mapContainerStyle] = useState({
    width: "100%",
    height: "600px",
  });

  const [infoWindowVisible, setInfoWindowVisible] = useState(true);
  const toggleInfoWindow = () => {
    setInfoWindowVisible(!infoWindowVisible);
  };
  const center = {
    lat: Number(latitude),
    lng: Number(longitude),
  };

  return (
    <div>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={14}
          onClick={() => setInfoWindowVisible(false)}
        >
          <MarkerF
            position={center}
            opacity={1}
            onMouseUp={() => setInfoWindowVisible(!infoWindowVisible)}
          >
            <InfoWindow position={center} onCloseClick={toggleInfoWindow}>
              <div className="text-[15px]">
                <div>{name}</div>
                <div>{adress}</div>
                <div>
                  <button
                    type="button"
                    className="bg-blueDuck-100 hover:bg-blueSimple-100 text-white font-bold py-2 px-4 mt-2 rounded text-center"
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
                      )
                    }
                  >
                    Naviguer
                  </button>
                </div>
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
  latitude: PropTypes.string.isRequired,
  longitude: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default MapContainer2;
