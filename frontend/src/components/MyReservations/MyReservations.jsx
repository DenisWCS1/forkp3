import { useState, useEffect, useContext } from "react";
import SharedContext from "@assets/Context/sharedContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import moment from "moment";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

function Myreservations({
  setShowModalBtns,
  setOnConfirm,
  setshowMessage,
  setShowModal,
}) {
  const [myresas, setMyresas] = useState([]);
  const navigate = useNavigate();
  const { user, token, setIsLoading } = useContext(SharedContext);
  const [updateResa, setUpdateResa] = useState(0);

  /** ***********************************************
Fetch return GET
reservation.id
reservation.start_datetime AS start
reservation.end_datetime AS end
location.city_name AS localisation, 
room.name AS nom,       
************************************************ */
  useEffect(() => {
    setIsLoading(true);
    function fetchData() {
      fetch(`${baseUrl}/reservations/${user.id}`, {
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
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          navigate("/erreur");
        });
    }
    fetchData();
  }, [user, updateResa]);

  /** ****************************************************
 Fetch return delete reservation in reservation table     
***************************************************** */
  const handleDelete = (id) => {
    fetch(`${baseUrl}/reservation/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setShowModalBtns(false);
          setshowMessage("Votre réservation a bien été supprimée");
          setShowModal(true);
          setUpdateResa(!updateResa);
        } else {
          throw new Error("Impossible de supprimer votre réservation");
        }
      })

      .catch((error) => {
        console.error(error);
      });
  };
  // Function protect auto execute delete at component render
  const confirmDelete = (id) => {
    return () => {
      handleDelete(id);
    };
  };
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
              Localisation
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
                    setOnConfirm(() => confirmDelete(myresa.id));
                    setShowModalBtns(true);
                    setshowMessage(` Voulez-vous vraiment supprimer votre réservation du \n${moment(
                      myresa.start,
                      "YYYY-MM-DDTHH:mm:ss.SSSZ"
                    ).format("DD/MM/YYYY à HH:mm:ss")} \n au \n${moment(
                      myresa.end,
                      "YYYY-MM-DDTHH:mm:ss.SSSZ"
                    ).format("DD/MM/YYYY à HH:mm:ss")}\n pour la salle  ${
                      myresa.nom
                    } ?
                    `);
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
  setShowModalBtns: PropTypes.func.isRequired,
  setshowMessage: PropTypes.func.isRequired,
  setOnConfirm: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
};
export default Myreservations;
