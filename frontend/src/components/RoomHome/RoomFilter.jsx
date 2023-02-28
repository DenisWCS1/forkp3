import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import ReactDatePicker, {
  registerLocale,
  setDefaultLocale,
} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fr from "date-fns/locale/fr";
import Loupe from "../../assets/logos/loupe.png";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

registerLocale("fr", fr);
setDefaultLocale("fr");

function RoomFilter({ started, ended, setStarted, setEnded, setLocationid }) {
  const [allLocation, setAllLocation] = useState([]);

  const handleChange = (e) => {
    setStarted(started);
    setEnded(ended);
    setLocationid(e.target.value);
  };

  const reset = () => {
    setStarted(0);
    setEnded(0);
    setLocationid();
  };

  useEffect(() => {
    fetch(`${baseUrl}/location`)
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        setAllLocation(jsonData);
      });
  }, []);

  return (
    <div className="grid justify-items-center rounded-lg bg-dark-100 border-b sm:flex flex-row">
      <div className="flex flex-col ml-5 w-64 h-20 text-white">
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
      <div className="text-white ml-5 w-64 mb-5">
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
      <div className="grid grid-cols-6 gap-4">
        <img
          className="col-start-1 col-end-6 text-white text-lg w-12 sm:w-20 h-16 object-cover object-center block"
          src={Loupe}
          alt="loupe"
        />
      </div>
      <div className="flex flex-col px-4 py-2 text-white sm:mt-4">
        <p className="">Localisation:</p>
      </div>

      <select
        name="loc"
        onChange={handleChange}
        id="loc"
        className="Localisation bg-blueDuck-100 text-white text-center flex flex-col w-60 h-10 rounded-lg sm:mt-5 px-0 py-2"
      >
        {allLocation.map((location) => (
          <option key={location.id} className="text-white" value={location.id}>
            {location.city_name}
          </option>
        ))}
      </select>
      <div className="flex flex-col px-2 py-5 w-64 h-20">
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
  ended: PropTypes.func.isRequired,
  setEnded: PropTypes.func.isRequired,
  setLocationid: PropTypes.func.isRequired,
  setStarted: PropTypes.func.isRequired,
  started: PropTypes.func.isRequired,
};
export default RoomFilter;
