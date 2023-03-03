import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";

import moment from "moment";
import RoomFilter from "@components/RoomHome/RoomFilter";
import Loading from "@assets/logos/loading.gif";

// import Loader from "react-loader-spinner";

const baseUrl = import.meta.env.VITE_BACKEND_URL;
function RoomsFiltered() {
  const navigate = useNavigate();
  const [started, setStarted] = React.useState(new Date());
  const [ended, setEnded] = React.useState(new Date());
  const [locationid, setLocationid] = React.useState();

  const [rooms, setRooms] = React.useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `${baseUrl}/filtered?start=${moment(
        started,
        "YYYY-MM-DDTHH:mm:ss.SSSZ"
      ).format("DD-MM-YYYY HH:mm:ss")}&end=${moment(
        ended,
        "YYYY-MM-DDTHH:mm:ss.SSSZ"
      ).format("DD-MM-YYYY HH:mm:ss")}&location=${locationid}`
    )
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        setIsLoading(false);
        setRooms(jsonData);
      })
      .catch(() => {
        navigate("/erreur");
      });

    // setIsLoading(true);

    /* setIsLoading(false);   */
  }, [navigate, started, ended, locationid]);

  return (
    <div className="">
      <div className="">
        <RoomFilter
          setStarted={setStarted}
          setEnded={setEnded}
          setLocationid={setLocationid}
          started={started}
          ended={ended}
          locationid={locationid}
        />
        {isLoading ? (
          <div className="flex flex-col justify-around items-center py-8">
            <img className="animate" src={Loading} alt="loading" />
            <p className="text-center font-bold">Chargement ...</p>
          </div>
        ) : (
          <div className="flex flex-wrap -mx-1 lg:-mx-4 mt-10 ">
            {rooms.map((value) => (
              <div
                className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4  transform transition duration-1000 hover:scale-95 hover:translate-y-0.5"
                key={value.id}
              >
                <article className="overflow-hidden rounded-lg shadow-lg">
                  <div className="w-full h-fit group">
                    <div className="relative overflow-hidden">
                      <div>
                        <img
                          className="h-48 w-full object-cover"
                          src={`${baseUrl}${value.url_picture}`}
                          alt={value.name}
                        />
                      </div>
                      <div className="absolute h-full w-full bg-dark-100/40 flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <button
                          className="bg-greySimple-100 bg-opacity-50 text-whiteSimple-100 py-2 px-4 "
                          type="button"
                        >
                          Plus de détails
                        </button>
                      </div>
                    </div>
                  </div>

                  <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                    <h1 className="text-lg">
                      <a
                        className="no-underline hover:underline text-dark-100"
                        href="/"
                      >
                        {value.name}
                      </a>
                    </h1>
                    <p className="text-dark-100 text-sm" />
                    {value.capacity} Places
                  </header>

                  <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                    <a
                      className="flex items-center no-underline hover:underline text-dark-100"
                      href="/"
                    >
                      <FontAwesomeIcon icon={faLocationDot} />
                      <p className="ml-2 text-sm">{value.city_name}</p>
                    </a>
                    <a
                      className="no-underline text-dark-100 hover:text-red-dark"
                      href="/"
                    >
                      <span className="text-white font-normal">
                        <button
                          type="button"
                          className="bg-blueDuck-100  px-4 py-2 rounded-lg "
                        >
                          Réserver
                        </button>
                      </span>
                    </a>
                  </footer>
                </article>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RoomsFiltered;
