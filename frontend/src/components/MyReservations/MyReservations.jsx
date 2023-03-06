import { useState, useEffect, useContext } from "react";
import SharedContext from "@assets/Context/sharedContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import moment from "moment";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

function Myreservations({ setShowModal, setshowMessage }) {
  const [myresas, setMyresas] = useState([]);
  const navigate = useNavigate();
  const { user, token } = useContext(SharedContext);
  useEffect(() => {
    async function fetchData() {
      await fetch(`${baseUrl}/myReservations/${user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((jsonData) => {
          setMyresas(jsonData);
        })
        .catch(() => {
          navigate("/erreur");
        });
    }

    fetchData();
  }, [user]);
  return (
    <>
      <div className="text-center text-2xl font-bold mb-5">
        Mes réservations
      </div>
      <table className="min-w-full border-collapse block md:table flex-1 ">
        <thead className="block md:table-header-group bg-gray-200 border-b">
          <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
            <th className=" p-2 text-dark-100 font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Salle
            </th>
            <th className=" p-2 text-dark-100 font-bold md:border md:border-grey-500 text-left block md:table-cell">
              localisation
            </th>
            <th className=" p-2 text-dark-100 font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Début
            </th>
            <th className=" p-2 text-dark-100 font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Fin
            </th>
            <th className=" p-2 text-dark-100 font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {myresas.map((myresa) => (
            <tr
              className=" border border-grey-500 md:border-none block md:table-row transition duration-300 ease-in-out hover:bg-gray-100"
              key={myresa.id}
            >
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden text-sm  text-gray-900">
                  Salle
                </span>
                {myresa.nom}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden text-sm text-gray-900 font-light">
                  Localisation
                </span>
                {myresa.localisation}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden text-gray-900 font-light">
                  Début
                </span>
                {moment(myresa.start, "YYYY-MM-DDTHH:mm:ss.SSSZ").format(
                  "DD/MM/YYYY à HH:mm:ss"
                )}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden text-gray-900 font-light">
                  Fin
                </span>
                {moment(myresa.end, "YYYY-MM-DDTHH:mm:ss.SSSZ").format(
                  "DD/MM/YYYY à HH:mm:ss"
                )}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-center block md:table-cell">
                <span className="inline-block w-1/3 md:hidden text-gray-900 font-light">
                  Actions
                </span>
                <button
                  type="button"
                  onClick={() => {
                    return (
                      setShowModal(true),
                      setshowMessage("Disponible dans la V3")
                    );
                  }}
                  className="text-blue-400 text-lg font-bold  mr-1 "
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(true);
                  }}
                  className="text-red-400 text-lg font-bold  ml-1 "
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
Myreservations.propTypes = {
  setShowModal: PropTypes.func.isRequired,
  setshowMessage: PropTypes.func.isRequired,
};
export default Myreservations;
