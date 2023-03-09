import PropTypes from "prop-types";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
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
    <div className="w-7/8 mx-auto h-auto">
      {detailState.map((elem) => (
        <div
          key={elem}
          className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2"
        >
          <div className="my-1 flex flex-row items-start justify-center">
            <div className="w-4/6 h-8/9">
              <img
                className="h-auto max-w-full rounded-3xl drop-shadow-2xl"
                src={`${baseUrl}${elem.url_picture}`}
                alt={elem.name}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 text-center items-center">
                <div className="mb-2 md:mb-0">
                  <p className="text-3xl md:text-4xl tracking-tight leading-none font-extrabold text-blueDuck-100">
                    {elem.name}
                  </p>
                </div>
                <div className="text-base md:text-xl tracking-tight leading-none text-blueDuck-100 whitespace-nowrap">
                  {elem.capacity} Places
                  <h3 className="tracking-tight font-light text-gray-500 text-2xl md:text-3xl">
                    <p className="text-base md:text-lg lg:text-xl text-gray-500 mt-2 text-center break-words">
                      {elem.adress}.
                    </p>
                  </h3>
                </div>
                <ul className="text-xs grid grid-cols-1 md:grid-cols-2 gap-4 font-bold items-center text-gray-600">
                  {elem.material.map((value) => (
                    <li key={value} className="m-1">
                      <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white hover:bg-gray-100 transition-colors duration-300 h-full p-4">
                        {value}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-top w-full overflow-auto touch-auto">
            <MapContainer2
              latitude={latitude}
              longitude={longitude}
              adress={adress}
              name={name}
              style={{ width: "100%", height: "100%" }}
            />
            <div className="text-right flex flex-col">
              <button
                type="button"
                className="my-4 bg-blueDuck-100  hover:bg-blueSimple-100 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  return validation();
                }}
              >
                Réserver
              </button>
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
