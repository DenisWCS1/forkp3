import Modal from "@components/Modals.jsx/Modal";
import ModalBtns from "@components/Modals.jsx/ModalBtns";
import { useState } from "react";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showModalBtns, setShowModalBtns] = useState(false);

  return (
    <div>
      <button type="button" onClick={() => setShowModal(true)}>
        Je suis le bouton modal
        {/* bouton pour tester la logique Modal */}
      </button>
      <button type="button" onClick={() => setShowModalBtns(true)}>
        Je suis le bouton modal Bouton
        {/* bouton pour tester la logique Modal */}
      </button>
      <Modal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        message="Votre réservation a bien été prise en compte, un email de confirmation vient de vous être envoyé"
      />
      <ModalBtns
        isVisible={showModalBtns}
        onClose={() => setShowModalBtns(false)}
        message="Etes-vous sûr(e) de vouloir supprimer cette réservation ?"
      />
    </div>
  );
}

export default App;
