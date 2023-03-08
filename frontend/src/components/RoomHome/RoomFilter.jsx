import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import ReactDatePicker, {
  registerLocale,
  setDefaultLocale,
} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fr from "date-fns/locale/fr";

const baseUrl = import.meta.env.VITE_BACKEND_URL;
registerLocale("fr", fr);
setDefaultLocale("fr");

function RoomFilter({
  started,
  ended,
  setStarted,
  setEnded,
  setLocationid,
  locationid,
}) {
  const [allLocation, setAllLocation] = useState([]);

  const handleChange = (e) => {
    setStarted(started);
    setEnded(ended);

    setLocationid(e.target.value);
  };

  const reset = () => {
    setStarted(new Date());
    setEnded(new Date());
    setLocationid(1);
  };
  useEffect(() => {
    fetch(`${baseUrl}/location`)
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        setAllLocation(jsonData);
      });
  }, [locationid]);

  return (
    <div className="flex flex-wrap rounded-lg bg-dark-100 border-b px-4 py-2 sm:flex flex-row justify-center ">
      <div className="flex flex-col text-white ml-5 w-64 mb-5">
        <p> Début :</p>
        <ReactDatePicker
          className="bg-blueDuck-100 text-white px-4 py-2 rounded-lg"
          id="start"
          selected={started}
          onChange={(str) => setStarted(str)}
          showTimeSelect
          timeIntervals={15}
          dateFormat="dd-MM-yyyy HH:mm:ss"
        />
      </div>
      <div className="flex flex-col text-white ml-5 w-64 mb-5">
        <p> Fin :</p>
        <ReactDatePicker
          className="bg-blueDuck-100 text-white px-4 py-2 rounded-lg"
          id="end"
          selected={ended}
          onChange={(end) => setEnded(end)}
          showTimeSelect
          timeIntervals={15}
          dateFormat="dd-MM-yyyy HH:mm:ss"
        />
      </div>
      <div className="flex justify-center px-2 py-5 w-60 h-20">
        <select
          name="loc"
          selected={allLocation}
          onChange={handleChange}
          id="loc"
          className="Localisation bg-blueDuck-100 text-white text-center flex flex-col w-72 h-11 rounded-lg sm:px-5 p-2"
        >
          {allLocation.map((location) => (
            <option
              key={location.id}
              className="text-white"
              value={location.id}
            >
              {location.city_name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col px-2 py-5 w-60 h-20 sm: mt-1">
        <button
          type="button"
          className="button bg-blueDuck-100 text-white rounded-lg sm:px-2 py-2"
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
RoomFilter.propTypes = {
  started: PropTypes.instanceOf(Date).isRequired,
  ended: PropTypes.instanceOf(Date).isRequired,
  setEnded: PropTypes.func.isRequired,
  setLocationid: PropTypes.func.isRequired,
  setStarted: PropTypes.func.isRequired,
  locationid: PropTypes.node.isRequired,
};
export default RoomFilter;
