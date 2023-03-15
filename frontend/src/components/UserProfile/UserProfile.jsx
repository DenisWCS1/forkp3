import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import SharedContext from "@assets/Context/sharedContext";

function UserProfileView({
  setShowModalBtns,
  setOnConfirm,
  setshowMessage,
  setShowModal,
}) {
  const [returnHome, setReturnHome] = useState(false);
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const { user, token, setUser, setToken } = useContext(SharedContext);
  const navigate = useNavigate();
  /** ******************************************* 
  Fetch return POST reservation in reservation table
  first_name varchar
  last_name varchar
  email varchar
  /******************************************** */
  useEffect(() => {
    if (token) {
      fetch(`${baseUrl}/me`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((userData) => setUser(userData))
        .catch((err) => {
          console.warn(err);
          setToken();
          localStorage.removeItem("token");
        });
    }
  }, [returnHome]);
  /** ****************************************** */
  /** * Function update username field when type */
  /** ****************************************** */
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const confirmReturn = () => {
    return () => {
      setShowModalBtns(false);
      navigate("/");
    };
  };
  /** ******************************************* 
  Fetch return DELETE room_material in room_material table
  name varchar
  capacity int
  address varchar
  materials varchar
  lat decimal
  lng decimal
  url_picture varchar
   ****************************************** */
  const handleDelete = () => {
    fetch(`${baseUrl}/user/${user.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setShowModalBtns(false);
          localStorage.removeItem("token");
          setToken();
          setUser();
          setshowMessage("votre profil à bien été supprimé");
          setShowModal(true);
          navigate("/");
        } else {
          throw new Error(
            setShowModalBtns(false) &&
              setshowMessage("Impossible de supprimer votre profil") &&
              setShowModal(true)
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleResaDelete = () => {
    fetch(`${baseUrl}/resa/${user.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            setShowModalBtns(false) &&
              setshowMessage(
                "Impossible de supprimer les réservations liées à votre profil"
              ) &&
              setShowModal(true)
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  /** ******************************************* 
  Fetch return PUT user in user table
  first_name varchar
  last_name varchar
  email varchar
  /******************************************** */
  const handleEdit = () => {
    fetch(`${baseUrl}/user/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          setShowModalBtns(true);

          setOnConfirm(() => confirmReturn());
          setshowMessage(
            `Votre profil à bien été modifié. Voulez-vous retourner à l'acceuil ?`
          );
        } else {
          throw new Error("Une erreur s'est produite");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const backToHome = () => {
    setReturnHome(true);
    setTimeout(() => {
      navigate("/");
    }, 200);
  };
  /** ****************************************** */
  /** * Function use to doesn't execute function */
  /** ********* at component render     ********* */
  /** ****************************************** */
  const confirmDelete = () => {
    return () => {
      handleDelete();
      handleResaDelete();
    };
  };

  const confirmBacktohome = () => {
    return () => {
      backToHome();
    };
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-5">Mon profil</h1>
      <form>
        <div className="mb-4">
          <label
            htmlFor="firstname"
            className="block text-gray-700 font-bold mb-2"
          >
            Prénom
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={user.firstname}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-gray-700 font-bold mb-2"
          >
            Nom
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={user.lastname}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={user.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="created_at"
            className="block text-gray-700 font-bold mb-2"
          >
            Créé le
          </label>
          <input
            type="datetime"
            id="created_at"
            name="created_at"
            className="  rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
            readOnly
            value={moment(user.created_at, "YYYY-MM-DDTHH:mm:ss.SSSZ").format(
              "DD/MM/YYYY HH:mm:ss"
            )}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="updated_at"
            className="block text-gray-700 font-bold mb-2"
          >
            Mise à jour le
          </label>
          <input
            type="datetime"
            id="updated_at"
            name="updated_at"
            className=" appearance-none  rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
            readOnly
            value={moment(user.updated_at, "YYYY-MM-DDTHH:mm:ss.SSSZ").format(
              "DD/MM/YYYY  HH:mm:ss"
            )}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-center my-1 md:justify-end">
          <div className="px-2">
            <button
              type="button"
              className="bg-blueDuck-100 hover:bg-blueSimple-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => handleEdit()}
            >
              Modifier
            </button>
          </div>
          <div className="px-2">
            <button
              type="button"
              className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => {
                return (
                  setShowModalBtns(true),
                  setshowMessage(
                    "Voulez-vous vraiment supprimer votre profil ?"
                  ),
                  setOnConfirm(() => confirmDelete())
                );
              }}
            >
              Supprimer
            </button>
          </div>
          <div className="px-2">
            <button
              type="button"
              onClick={confirmBacktohome()}
              className="bg-blueDuck-100 hover:bg-blueSimple-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Accueil
            </button>
          </div>
        </div>
        <div className="flex justify-between" />
      </form>
    </div>
  );
}
UserProfileView.propTypes = {
  setShowModalBtns: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
  setshowMessage: PropTypes.func.isRequired,
  setOnConfirm: PropTypes.func.isRequired,
};
export default UserProfileView;
