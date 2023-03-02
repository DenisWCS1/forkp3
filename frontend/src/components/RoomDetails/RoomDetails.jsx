import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import MapContainer2 from "@components/GoogleMap/GoogleMap";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

function RoomDetails() {
  const navigate = useNavigate();

  const [detailState, setDetailState] = useState([]);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [adress, setAdress] = useState();
  const [name, setName] = useState();

  useEffect(() => {
    async function fetchData() {
      await fetch(`${baseUrl}/room_material/2`)
        .then((response) => {
          return response.json();
        })
        .then((jsonData) => {
          setDetailState(jsonData);
          setLatitude(jsonData[0].lat);
          setLongitude(jsonData[0].long);
          setAdress(jsonData[0].adress);
          setName(jsonData[0].name);
        })
        .catch(() => {
          navigate("/erreur");
        });
    }
    fetchData();
  }, []);

  return (
    <div className="bg-dark-100 border-y-2">
      {detailState.map((elem) => (
        <div key={elem} className=" justify-evenly">
          <NavLink to="/">
            <div className="absolute right-6 text-[4rem] text-blueDuck-100 Ouline-black">
              X
            </div>
          </NavLink>
          <div>
            <div>
              <img
                className="h-[18rem] w-full object-cover"
                src={`${baseUrl}${elem.url_picture}`}
                alt={elem.name}
              />
            </div>
            <div className=" flex-wrap sm:flex sm:justify-between  bg-blueDuck-100 h-[4.5rem] mb-2 border-b-[2px]  items-center font-normal text-whiteSimple-100 ">
              <div className="flex items-baseline">
                <h3 className="ml-5 mr-5 sm:text-[1.7rem] ">{elem.name}</h3>
                <div>
                  <h3 className="sm:text-[1.2rem]">{elem.adress}</h3>
                </div>
              </div>
              <div className="ml-5 mr-5 sm:text-[1.7rem]">
                Places : {elem.capacity}
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-wrap justify-around bg-dark-100 mt-5 mb-5">
              <div className="">
                <MapContainer2
                  latitude={latitude}
                  longitude={longitude}
                  adress={adress}
                  name={name}
                />
              </div>

              <div className="text-whiteSimple-100 sm:text-2xl">
                <h3 className="sm:mb-5">Équipements de la salle</h3>
                <ul className="text-whiteSimple-100 ">
                  {elem.material.map((value) => (
                    <li key={value}>-{value}</li>
                  ))}
                </ul>
              </div>
              <div className="animate-pulse flex-col flex justify-end mb-7 mt-7">
                <button
                  type="button"
                  className="bg-blueDuck-100 t px-4 py-2 rounded-lg text-blue-100 sm:text-2xl"
                >
                  Réserver
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RoomDetails;
