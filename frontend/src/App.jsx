import { Routes, Route } from "react-router-dom";
import Header from "@components/Header/Header";
import RoomsFiltered from "@components/RoomHome/RoomsFiltered";
import Modal from "@components/Modals.jsx/Modal";
import ModalBtns from "@components/Modals.jsx/ModalBtns";
import ErrorPage from "@components/error/Error";
import "./App.css";

import Footer from "@components/Footer/Footer";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<RoomsFiltered />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
      <Footer />
      {/* Modales exemples */}
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
