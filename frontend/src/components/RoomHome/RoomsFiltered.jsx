import PropTypes from "prop-types";
import React, { useState, useEffect, useContext, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import RoomFilter from "@components/RoomHome/RoomFilter";
import SharedContext from "@assets/Context/sharedContext";

const baseUrl = import.meta.env.VITE_BACKEND_URL;
function RoomsFiltered({
  started,
  setStarted,
  ended,
  setEnded,
  locationid,
  setLocationid,
  setOnConfirm,
  setshowMessage,
  setShowModal,
  setShowModalBtns,
}) {
  const navigate = useNavigate();
  const { user, token, setIsLoading } = useContext(SharedContext);
  const [rooms, setRooms] = useState(null);
  const [resaSalle, setResaSalle] = useState({});
  const [noRoom, setNoRoom] = useState("hidden");
  const validateRef = useRef(null);
  const [allLocation, setAllLocation] = useState([]);
  const [roomValue, setRoomValue] = useState(0);
  /** ***************************
   * filter rooms
   * query in url filtered?start="datetime",end="datetime",location="number"
   * return room.id, room.capacity, room.name, room.url_picture, location.city_name
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
        if (Object.keys(jsonData).length === 0) {
          setNoRoom("");
        } else {
          setNoRoom("hidden");
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        navigate("/erreur");
      });
  }, [navigate, started, ended, locationid]);

  const confirmeidroom = (value) => {
    return () => {
      navigate(`/RoomDetails/${value.id}`);
    };
  };

  // Function get location in filter list (props to RoomFilter.jsx)
  const getLocation = () => {
    fetch(`${baseUrl}/location`)
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        setAllLocation(jsonData);
      });
  };

  // Create object with reservation informations, send to bdd for reserve room.
  useEffect(() => {
    setResaSalle({
      fk_room: roomValue,
      fk_user: user ? user.id : "",
      start_datetime: moment(started, "DD-MM-YYYYTHH:mm:ss.SSSZ").format(
        "YYYY-MM-DDTHH:mm:ss.SSSZ"
      ),
      end_datetime: moment(ended, "DD-MM-YYYYTHH:mm:ss.SSSZ").format(
        "YYYY-MM-DDTHH:mm:ss.SSSZ"
      ),
    });
  }, [roomValue, user, started, ended]);

  // reset filters
  const reset = () => {
    setStarted(new Date());
    setEnded(new Date());
    setLocationid(1);
    setAllLocation([]);
    getLocation();
  };

  // Function navigate to different page
  const confirmNavigate = (value) => {
    return () => {
      if (value === 1) {
        setShowModalBtns(false);
        navigate("/mesreservations");
        reset();
      } else if (value === 2) {
        setShowModalBtns(false);
        navigate("/login");
      } else if (value === 3) navigate("/register");
    };
  };

  /** ****************************************************
  Fetch return POST reservation in reservation table
  user.id int
  room.id int
  start_datetime timestamp
  end_datetime timestamp  
  ****************************************************** */
  const handleResa = (params) => {
    setResaSalle({ ...resaSalle, fk_room: params });
    fetch(`${baseUrl}/reservation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...resaSalle, fk_room: params }),
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
          "Impossible d'ajouter votre réservation, veuillez contacter la police des réservations  ?"
        );
        setShowModal(true);
      });
  };

  // Here use effect it's trick to store function to prevent execute at render
  const securexecute = (params) => {
    return () => {
      handleResa(params);
      setShowModalBtns(false);
    };
  };

  /* 
  Check if user is authenticated and idroomValue contain a id
  Check if start date not before end date and notegal
  Launch some modales
*/
  const validate = (start, end, idroomValue) => {
    if (
      user !== undefined &&
      user !== null &&
      idroomValue !== undefined &&
      idroomValue !== null
    ) {
      if (
        moment(start, "YYYY-MM-DDTHH:mm:ss.SSSZ").format(
          "DD-MM-YYYY HH:mm:ss"
        ) >=
          moment(end, "YYYY-MM-DDTHH:mm:ss.SSSZ").format(
            "DD-MM-YYYY HH:mm:ss"
          ) ||
        moment(start, "YYYY-MM-DDTHH:mm:ss.SSSZ").format(
          "DD-MM-YYYY HH:mm:ss"
        ) ===
          moment(end, "YYYY-MM-DDTHH:mm:ss.SSSZ").format("DD-MM-YYYY HH:mm:ss")
      ) {
        setshowMessage(`Veuillez vérifier vos dates de réservation svp ! `);
        setShowModal(true);
      } else {
        setShowModalBtns(true);
        setshowMessage(` Voulez-vous vraiment réserver la salle ${
          rooms.find((room) => room.id === idroomValue).name
        }
        du \n${moment(start, "YYYY-MM-DDTHH:mm:ss.SSSZ").format(
          "DD/MM/YYYY à HH:mm:ss"
        )} \n 
        au \n${moment(end, "YYYY-MM-DDTHH:mm:ss.SSSZ").format(
          "DD/MM/YYYY à HH:mm:ss"
        )}\n  ?`);
        setOnConfirm(() => securexecute(idroomValue));
      }
    } else {
      setshowMessage(
        "Vous devez être connecté(e) pour réserver une salle, souhaitez-vous vous rendre sur le formulaire de connexion  ?"
      );
      setOnConfirm(() => confirmNavigate(2));
      setShowModalBtns(true);
    }
  };
  // Here use effect it's trick to store function to prevent execute at render
  useEffect(() => {
    validateRef.current = validate;
  });

  // Use to start stored function when click on reservation button
  const handleClickRoom = (e, id) => {
    e.preventDefault();
    setRoomValue(id);
    validateRef.current(started, ended, id);
  };

  return (
    <>
      <RoomFilter
        setStarted={setStarted}
        setEnded={setEnded}
        setLocationid={setLocationid}
        started={started}
        ended={ended}
        locationid={locationid}
        setAllLocation={setAllLocation}
        allLocation={allLocation}
        getLocation={getLocation}
      />

      <div className="flex flex-wrap -mx-1 lg:-mx-4 mt-10 ">
        {rooms && rooms.error ? (
          <div className="flex flex-row item-center justify-center sm:mt-28 mx-auto">
            <div className={`text-2xl text-center `}>
              Attention la date de fin est avant la date de début
            </div>
          </div>
        ) : (
          Array.isArray(rooms) &&
          rooms.map((value) => {
            return (
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
                    <span className="text-lg">
                      <a
                        title="back to home"
                        className="no-underline hover:underline text-dark-100"
                        href="/"
                      >
                        {value.name}
                      </a>
                    </span>
                    <p title="capacity" className="text-dark-100 text-sm" />
                    {value.capacity} Places
                  </header>

                  <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                    <a
                      title="back to home"
                      className="flex items-center no-underline hover:underline text-dark-100"
                      href="/"
                    >
                      <FontAwesomeIcon icon={faLocationDot} />
                      <p className="ml-2 text-sm">{value.city_name}</p>
                    </a>
                    <a
                      title="back to home"
                      className="no-underline text-dark-100 hover:text-red-dark"
                      href="/"
                    >
                      <span className="text-white font-normal">
                        <button
                          aria-keyshortcuts="r"
                          title="reserve room"
                          type="button"
                          className="bg-blueDuck-100  px-4 py-2 rounded-lg "
                          onClick={(e) => handleClickRoom(e, value.id)}
                        >
                          Réserver
                        </button>
                      </span>
                    </a>
                  </footer>
                </article>
              </div>
            );
          })
        )}
      </div>

      <div className="h-28" />
      <div
        className={`flex flex-row item-center justify-center sm:mt-28${noRoom}`}
      >
        <div className={`text-2xl text-center ${noRoom}`}>
          Aucune sélection ne correspond à votre demande, merci de modifier vos
          critères de recherche.
        </div>
      </div>
    </>
  );
}

RoomsFiltered.propTypes = {
  ended: PropTypes.instanceOf(Date).isRequired,
  locationid: PropTypes.node.isRequired,
  setEnded: PropTypes.func.isRequired,
  setLocationid: PropTypes.func.isRequired,
  setOnConfirm: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
  setShowModalBtns: PropTypes.func.isRequired,
  setStarted: PropTypes.func.isRequired,
  setshowMessage: PropTypes.func.isRequired,
  started: PropTypes.instanceOf(Date).isRequired,
};

export default RoomsFiltered;
