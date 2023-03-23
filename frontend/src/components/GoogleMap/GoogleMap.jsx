import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  GoogleMap,
  InfoBoxF,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";

const apiKeyEnv = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
function MapContainer2({ latitude, longitude, address, name }) {
  const [infoboxVisibility, setInfoboxVisibility] = useState(true);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKeyEnv,
  });

  const [mapContainerStyle] = useState({
    width: "100%",
    height: "600px",
  });

  const center = {
    lat: Number(latitude),
    lng: Number(longitude),
  };
  const options = {
    closeBoxURL: "", // Hide cross to close infobox
    /* 
     By enabling event bubbling with this method, map events can be captured by parent DOM elements
    the event will not be propagated to the map's parent DOM elements, meaning any event attached to those elements will not be fired.
    */
    enableEventPropagation: true,
    position: center,
    pixelOffset: { width: center.lat - 200, height: center.lng - 180 },
  };

  const showInfoboxvisible = () => {
    setInfoboxVisibility(!infoboxVisibility);
  };
  return (
    <div>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={14}
          onClick={showInfoboxvisible}
        >
          <MarkerF
            position={center}
            opacity={1}
            zIndex={1000}
            onClick={showInfoboxvisible}
          >
            {infoboxVisibility && (
              <InfoBoxF
                options={options}
                onClick={showInfoboxvisible}
                onCloseClick={() => setInfoboxVisibility(!infoboxVisibility)}
              >
                <div className="bg-white px-3 py-4  border border-neutral-600 border-solid rounded-xl text-[18px] text-left flex flex-col flex-wrap">
                  <div className="font-bold"> {name} </div>
                  <div> {address}</div>
                  <div className="text-right">
                    <button
                      type="button"
                      className="bg-blueDuck-100 hover:bg-blueSimple-100 text-white font-bold py-2 px-4 mt-2 rounded text-center $"
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
              </InfoBoxF>
            )}
          </MarkerF>
        </GoogleMap>
      )}
    </div>
  );
}

MapContainer2.propTypes = {
  address: PropTypes.string.isRequired,
  latitude: PropTypes.string.isRequired,
  longitude: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default MapContainer2;
