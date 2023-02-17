import { Routes, Route } from "react-router-dom";
import { useState} from "react";
import Home from "@pages/Home";
import Header from "@components/Header/Header";
import RoomsFiltered from "@components/RoomHome/RoomsFiltered";
import Modal from "@components/Modals.jsx/Modal";
import ModalBtns from "@components/Modals.jsx/ModalBtns";
import ErrorPage from "@components/error/Error";
import Footer from "@components/Footer/Footer";
import "./App.css";

const [showModal, setShowModal] = useState(false);
const [showModalBtns, setShowModalBtns] = useState(false);
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
        <Home />
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
