import PropTypes from "prop-types";
import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";

import moment from "moment";
import RoomFilter from "@components/RoomHome/RoomFilter";
import SharedContext from "@assets/Context/sharedContext";

function RoomsFiltered({
  started,
  setStarted,
  ended,
  setEnded,
  locationid,
  setLocationid,
  setRoomvalue,
  roomvalue,
  setOnConfirm,
  setshowMessage,
  setShowModal,
  setShowModalBtns,
}) {
  const navigate = useNavigate();

  const { user, baseUrl, token, setIsLoading } = useContext(SharedContext);
  const [rooms, setRooms] = useState([]);
  const [resaSalle, setResaSalle] = useState({});
  /** ***************************
   * filter rooms
   ****************************** */
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
        setIsLoading(false);
        navigate("/erreur");
      });
  }, [navigate, started, ended, locationid]);

  const confirmeidroom = (value) => {
    return () => {
      setRoomvalue(value);
      navigate("/RoomDetails");
    };
  };
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
  }, [roomvalue, user, started, ended]);
  const confirmNavigate = (value) => {
    return () => {
      if (value === 1) {
        setShowModalBtns(false);
        navigate("/mesreservations");
      } else if (value === 2) navigate("/login");
      else if (value === 3) navigate("/register");
    };
  };

  const handleResa = () => {
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

  const securexecute = () => {
    return () => {
      handleResa();
      setShowModalBtns(false);
    };
  };

  const validate = () => {
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
        setOnConfirm(() => securexecute());
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
                        className="bg-greySimple-100 bg-opacity-50 dark-100 py-2 px-4"
                        type="button"
                        onClick={confirmeidroom(value)}
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
                        onClick={(e) => {
                          e.preventDefault();
                          setRoomvalue(value);
                          validate();
                        }}
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
      </div>
      <div className="h-28" />
    </div>
  );
}

RoomsFiltered.propTypes = {
  ended: PropTypes.instanceOf().isRequired,
  locationid: PropTypes.node.isRequired,
  roomvalue: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  setEnded: PropTypes.func.isRequired,
  setLocationid: PropTypes.func.isRequired,
  setOnConfirm: PropTypes.func.isRequired,
  setRoomvalue: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
  setShowModalBtns: PropTypes.func.isRequired,
  setStarted: PropTypes.func.isRequired,
  setshowMessage: PropTypes.func.isRequired,
  started: PropTypes.instanceOf().isRequired,
};

export default RoomsFiltered;
