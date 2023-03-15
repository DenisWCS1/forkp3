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
  const getLocation = () => {
    fetch(`${baseUrl}/location`)
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        setAllLocation(jsonData);
      });
  };

  const reset = () => {
    setStarted(new Date());
    setEnded(new Date());
    setLocationid(1);
    setAllLocation([]);
    getLocation();
  };

  /** ****************************************************
Fetch return GET reservation in reservation table
city_name varchar
created_at timestamp
updated_at timestamp
****************************************************** */
  useEffect(() => {
    getLocation();
  }, [locationid]);

  return (
    <div className=" flex flex-wrap rounded-lg bg-dark-100 border-b justify-around lg:justify-center pt-[1.1rem]">
      <div className="flex flex-col text-white w-[200] md:mb-6 mb-2 sm:mb-none">
        <div>
          <p> Début :</p>
        </div>
        <ReactDatePicker
          className="bg-blueDuck-100 text-white rounded-lg h-8 text-center lg:mr-6"
          id="start"
          selected={started}
          onChange={(str) => setStarted(str)}
          showTimeSelect
          timeIntervals={15}
          dateFormat="dd-MM-yyyy HH:mm:ss"
        />
      </div>
      <div className="flex flex-col text-white w-[200]">
        <div>
          <p>Fin :</p>
        </div>
        <ReactDatePicker
          className="bg-blueDuck-100 text-white rounded-lg  h-8 text-center lg:mr-6"
          id="end"
          selected={ended}
          onChange={(end) => setEnded(end)}
          showTimeSelect
          timeIntervals={15}
          dateFormat="dd-MM-yyyy HH:mm:ss"
        />
      </div>
      <div className="mt-6">
        <select
          name="loc"
          selected={allLocation}
          onChange={handleChange}
          id="loc"
          className="Localisation bg-blueDuck-100 text-white rounded-lg min-w-[183px] h-8 py-[0.3rem] lg:mr-6"
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
      <div className="flex flex-col min-w-[182px] mt-6">
        <button
          type="button"
          className="button bg-blueDuck-100 text-white rounded-lg h-8 mb-4"
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
