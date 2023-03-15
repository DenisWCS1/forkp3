import PropTypes from "prop-types";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
}) {
  const navigate = useNavigate();
  const { id } = useParams();
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const [detailState, setDetailState] = useState([]);
  const { setIsLoading, user, token } = useContext(SharedContext);
  const [resaSalle, setResaSalle] = useState({});
  useEffect(() => {
    setResaSalle({
      fk_room: id,
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
  /** ****************************************************
Fetch return POST reservation in reservation table
user.id int
room.id int
start_datetime timestamp
end_datetime timestamp
************************************************ */
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
/*******************************************************
Fetch return GET room_material in room_material table
name varchar
capacity int
address varchar
materials varchar
lat decimal
lng decimal
url_picture varchar
************************************************ */
  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetch(`${baseUrl}/room_material/${id}`)
        .then((response) => {
          return response.json();
        })
        .then((jsonData) => {
          setDetailState(jsonData);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          navigate("/gdsalles/erreur");
        });
    }
  }, [id]);
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
          detailState.name
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
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
        <div className="my-1 flex flex-row items-start justify-center">
          <div className="w-4/6 h-8/9">
            <img
              className="h-auto max-w-full rounded-3xl drop-shadow-2xl"
              src={`${baseUrl}${detailState.url_picture}`}
              alt={detailState.name}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 text-center items-center">
              <div className="mb-2 md:mb-0">
                <p className="text-3xl md:text-4xl tracking-tight leading-none font-extrabold text-blueDuck-100">
                  {detailState.name}
                </p>
              </div>
              <div className="text-base md:text-xl tracking-tight leading-none text-blueDuck-100 whitespace-nowrap">
                {detailState.capacity} Places
                <h3 className="tracking-tight font-light text-gray-500 text-2xl md:text-3xl">
                  <p className="text-base md:text-lg lg:text-xl text-gray-500 mt-2 text-center break-words">
                    {detailState.address}.
                  </p>

                </div>
                <div className="text-base md:text-xl tracking-tight leading-none text-blueDuck-100 whitespace-nowrap">
                  {elem.capacity} Places
                  <span className="tracking-tight font-light text-gray-500 text-2xl md:text-3xl">
                    <p className="text-base md:text-lg lg:text-xl text-gray-500 mt-2 text-center break-words">
                      {elem.address}.
                    </p>
                  </span>
              </div>
              <ul className="text-xs grid grid-cols-1 md:grid-cols-2 gap-4 font-bold items-center text-gray-600">
                {detailState.material &&
                  detailState.material.map((value) => (
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
          {detailState.lat && (
            <MapContainer2
              latitude={detailState.lat}
              longitude={detailState.lng}
              address={detailState.address}
              name={detailState.name}
              style={{ width: "100%", height: "100%" }}
            />
          )}
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
      <div className="h-28" />
    </div>
  );
}

RoomDetails.propTypes = {
  setOnConfirm: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
  setShowModalBtns: PropTypes.func.isRequired,
  setshowMessage: PropTypes.func.isRequired,
  started: PropTypes.instanceOf(Date).isRequired,
  ended: PropTypes.instanceOf(Date).isRequired,
};

export default RoomDetails;
