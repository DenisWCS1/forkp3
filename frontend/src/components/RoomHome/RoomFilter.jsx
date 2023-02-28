import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Configfile from "@config/Configfile";
import ReactDatePicker, {
  registerLocale,
  setDefaultLocale,
} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fr from "date-fns/locale/fr";
import Loupe from "../../assets/logos/loupe.png";

registerLocale("fr", fr);
setDefaultLocale("fr");

function RoomFilter({ setStarted, setEnded, setLocationid, started, ended }) {
  const [allLocation, setAllLocation] = useState([]);

  const handleChange = (e) => {
    setStarted(started);
    setEnded(ended);
    setLocationid(e.target.value);
  };

  useEffect(() => {
    fetch(`${Configfile.apiUrl}/location`)
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        setAllLocation(jsonData);
      });
  }, []);

  return (
    <div className="flex flex-col rounded-lg bg-dark-100 border-b sm:flex-row">
      <div className="flex flex-col ml-5 w-64 h-20 text-white">
        <p> Début :</p>
        <ReactDatePicker
          className="bg-blueDuck-100 text-white px-4 py-2 rounded-lg"
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
          selected={ended}
          onChange={(end) => setEnded(end)}
          showTimeSelect
          timeIntervals={15}
          dateFormat="dd-MM-yyyy HH:mm:ss"
        />
      </div>
      <div className="loupe flex flex-row ml-44 justify-center text-white px-6 py-2">
        <img
          className=" text-white text-lg sm:w-full h-16 object-cover object-center block"
          src={Loupe}
          alt="loupe"
        />
        <p className="mr-10 mt-3 w-55 sm:px-6 py-2 ">Localisation:</p>

        <select
          name="loc"
          id="loc"
          onChange={handleChange}
          className="Localisation bg-blueDuck-100 text-white mr-20 max-h-[40px] mt-3.5 px-6 py-2 rounded-lg sm:ml-10px-10-py-2-mr-20"
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
