import { useContext, useState, useEffect } from "react";
import Modal from "@components/Modals/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import Configfile from "@config/Configfile";

import moment from "moment";
import SharedContext from "../../contexts/Sharedcontext";

function Myreservations() {
  const { showModal, setShowModal } = useContext(SharedContext);
  // Temporaly waiting for login feature  const [userid, setUserid] = useState();
  const [myresas, setMyresas] = useState([]);
  const navigate = useNavigate();
  const userid = 7; // Temporaly waiting for login feature
  useEffect(() => {
    async function fetchData() {
      await fetch(`${Configfile.apiUrl}/myReservations/${userid}`)
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
    // setIsLoading(true);
    fetchData();
    /* setIsLoading(false);   */
  }, [userid]);
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
                    setShowModal(true);
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
      <Modal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        message="Disponible dans la V2 ?"
      />
    </>
  );
}

export default Myreservations;
