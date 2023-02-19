import { useContext } from "react";
import Modal from "@components/Modals/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import SharedContext from "../../contexts/Sharedcontext";

const salles = [
  {
    id: 1,
    localisation: "Nantes",
    nom: "Acheneau",
    debut: "10/07/2023 9:00",
    fin: "10/07/2023 12:00",
  },
  {
    id: 2,
    localisation: "Angers",
    nom: "La Fayette",
    debut: "20/07/2023 14:00",
    fin: "20/07/2023 16:30",
  },
  {
    id: 3,
    localisation: "Nantes",
    nom: "Loire",
    debut: "30/09/2023 11:00",
    fin: "30/09/2023 17:30",
  },
  {
    id: 4,
    localisation: "Le Mans",
    nom: "Gare",
    debut: "30/09/2023 11:00",
    fin: "30/09/2023 17:30",
  },
  {
    id: 5,
    localisation: "Le Mans",
    nom: "Gare",
    debut: "30/09/2023 11:00",
    fin: "30/09/2023 17:30",
  },
  {
    id: 6,
    localisation: "Le Mans",
    nom: "Gare",
    debut: "30/09/2023 11:00",
    fin: "30/09/2023 17:30",
  },
  // More people...
];

function Myreservations() {
  const { showModal, setShowModal } = useContext(SharedContext);

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
          {salles.map((salle) => (
            <tr
              className=" border border-grey-500 md:border-none block md:table-row transition duration-300 ease-in-out hover:bg-gray-100"
              key={salle.id}
            >
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden text-sm  text-gray-900">
                  Salle
                </span>
                {salle.nom}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden text-sm text-gray-900 font-light">
                  Localisation
                </span>
                {salle.localisation}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden text-gray-900 font-light">
                  Début
                </span>
                {salle.debut}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden text-gray-900 font-light">
                  Fin
                </span>
                {salle.fin}
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
