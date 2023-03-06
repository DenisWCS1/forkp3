import React, { useState, useEffect } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
// penser à logout
function UserProfile({
  setShowModalBtns,
  setOnConfirm,
  setshowMessage,
  setShowModal,
}) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: null,
    firstname: "",
    lastname: "",
    email: "",
    created_at: "",
    updated_at: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/user/7")
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, []);

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
  const handleDelete = () => {
    fetch(`http://localhost:5000/user/${user.id}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          setShowModalBtns(false);
          setShowModal(true);
          setshowMessage("votre profil à bien été supprimé ?");
          navigate("/");
        } else {
          throw new Error("Impossible de supprimer votre profil");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEdit = () => {
    fetch(`http://localhost:5000/user/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          setShowModalBtns(true);
          setOnConfirm(() => confirmReturn());
          setshowMessage(
            `Votre profil à bien été modifié.
             Voulez vous retourner à l'acceuil  ?`
          );
        } else {
          throw new Error("Une erreur s'est produite");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const confirmDelete = () => {
    return () => {
      handleDelete();
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
            htmlFor="createat"
            className="block text-gray-700 font-bold mb-2"
          >
            Créer le
          </label>
          <input
            type="createat"
            id="createat"
            name="createat"
            className="  rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
            readOnly
            value={moment(user.created_at, "YYYY-MM-DDTHH:mm:ss.SSSZ").format(
              "DD/MM/YYYY à HH:mm:ss"
            )}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="updateat"
            className="block text-gray-700 font-bold mb-2"
          >
            Mise à jour le
          </label>
          <input
            type="updateat"
            id="updateat"
            name="updateat"
            className=" appearance-none  rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
            readOnly
            value={moment(user.updated_at, "YYYY-MM-DDTHH:mm:ss.SSSZ").format(
              "DD/MM/YYYY à HH:mm:ss"
            )}
          />
        </div>
        <div className="flex justify-between">
          <div className="px-2">
            <button
              type="button"
              className="bg-blueDuck-100 hover:bg-blueSimple-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => handleEdit()}
            >
              Mettre à jour
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
              onClick={() => {
                navigate("/");
              }}
              className="bg-blueDuck-100 hover:bg-blueSimple-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
        <div className="flex justify-between" />
      </form>
    </div>
  );
}
UserProfile.propTypes = {
  setShowModalBtns: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
  setshowMessage: PropTypes.func.isRequired,
  setOnConfirm: PropTypes.func.isRequired,
};
export default UserProfile;
