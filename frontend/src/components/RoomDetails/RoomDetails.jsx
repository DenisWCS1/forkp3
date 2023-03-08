import PropTypes from "prop-types";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import MapContainer2 from "@components/GoogleMap/GoogleMap";
import SharedContext from "@assets/Context/sharedContext";
import moment from "moment";

function RoomDetails({
  started,
  ended,
  setOnConfirm,
  setshowMessage,
  setShowModal,
  setShowModalBtns,
  roomvalue,
}) {
  const navigate = useNavigate();
  const [detailState, setDetailState] = useState([]);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [adress, setAdress] = useState();
  const [name, setName] = useState();
  const { setIsLoading, user, token, baseUrl } = useContext(SharedContext);
  const [resaSalle, setResaSalle] = useState({});
  useEffect(() => {
    setResaSalle({
      fk_room: roomvalue.id,
      fk_user: user ? user.id : "",
      start_datetime: moment(started, "YYYY-MM-DDTHH:mm:ss.SSSZ").format(
        "YYYY-MM-DDTHH:mm:ss.SSSZ"
      ),
      end_datetime: moment(ended, "YYYY-MM-DDTHH:mm:ss.SSSZ").format(
        "YYYY-MM-DDTHH:mm:ss.SSSZ"
      ),
    });
  }, []);

  const confirmNavigate = (value) => {
    return () => {
      if (value === 1) {
        setShowModalBtns(false);
        navigate("/mesreservations");
      } else if (value === 2) navigate("/login");
      else if (value === 3) navigate("/register");
    };
  };
  const handleReservation = () => {
    fetch(`${baseUrl}/reservation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(resaSalle),
    })
      .then((response) => {
        if (response.ok) {
          setshowMessage("Voulez-vous consulter votre réservation ?");
          setOnConfirm(() => confirmNavigate(1));
          setShowModalBtns(true);
        } else {
          setshowMessage(
            "Impossible d'ajouter votre réservation, veuillez contacter la police des réservations ?"
          );
          setShowModal(true);
        }
      })
      .catch(() => {
        setshowMessage(
          "Impossible d'ajouter votre réservation, veuillez contacter la police des réservations ?"
        );
        setShowModal(true);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    function fetchData() {
      fetch(`${baseUrl}/room_material/${roomvalue.id}`)
        .then((response) => {
          return response.json();
        })
        .then((jsonData) => {
          setDetailState(jsonData);
          setLatitude(jsonData[0].lat, 10);
          setLongitude(jsonData[0].lng, 10);
          setAdress(jsonData[0].adress);
          setName(jsonData[0].name);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          navigate("/erreur");
        });
    }
    fetchData();
  }, []);
  const secureexecute = () => {
    return () => {
      handleReservation();
      setShowModalBtns(false);
    };
  };
  const validation = () => {
    if (user) {
      if (started >= ended) {
        setshowMessage(
          "Attention il y a une erreur dans vos dates de réservations !"
        );
        setShowModal(true);
      } else {
        setShowModalBtns(true);
        setshowMessage(` Voulez-vous vraiment réserver la salle ${
          roomvalue.name
        } 
        du \n${moment(started, "YYYY-MM-DDTHH:mm:ss.SSSZ").format(
          "DD/MM/YYYY à HH:mm:ss"
        )} \n 
        au \n${moment(ended, "YYYY-MM-DDTHH:mm:ss.SSSZ").format(
          "DD/MM/YYYY à HH:mm:ss"
        )}\n  ?`);
        setOnConfirm(() => secureexecute());
      }
    } else {
      setshowMessage(
        "Vous devez être connecté pour réserver une salle, souhaitez-vous vous rendre sur le formulaire de connexion  ?"
      );
      setOnConfirm(() => confirmNavigate(1));
      setShowModalBtns(true);
    }
  };
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
            <div className=" flex-wrap mb-2 sm:flex sm:justify-between  bg-blueDuck-100 h-[4.5rem] border-b-[2px]  items-center font-normal text-whiteSimple-100 ">
              <div className="flex items-baseline">
                <h3 className="ml-5 mr-5 sm:text-[1.7rem] ">{elem.name}</h3>
                <div>
                  <h3 className="sm:text-[1.2rem]">{elem.adress}</h3>
                </div>
              </div>
              <div className="mr-5 sm:text-[1.7rem] ml-80">
                Places : {elem.capacity}
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-wrap justify-around bg-dark-100 mt-5 mb-14">
              <div className="">
                <MapContainer2
                  latitude={latitude}
                  longitude={longitude}
                  adress={adress}
                  name={name}
                />
              </div>

              <div className="text-whiteSimple-100 sm:text-2xl">
                <h3 className="mb-10 sm:mb-5">Équipements de la salle :</h3>
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
                  onClick={() => {
                    return validation();
                  }}
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

RoomDetails.propTypes = {
  roomvalue: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  setOnConfirm: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
  setShowModalBtns: PropTypes.func.isRequired,
  setshowMessage: PropTypes.func.isRequired,
  started: PropTypes.instanceOf(Date).isRequired,
  ended: PropTypes.instanceOf(Date).isRequired,
};

export default RoomDetails;
