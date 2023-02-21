import { Routes, Route } from "react-router-dom";
import { useState, useMemo } from "react";
import Header from "@components/Header/Header";
import RoomsFiltered from "@components/RoomHome/RoomsFiltered";
import Myreservations from "@components/MyReservations/MyReservations";
// import Modal from "@components/Modals/Modal";
// import ModalBtns from "@components/Modals/ModalBtns";
import ErrorPage from "@components/error/Error";
import Footer from "@components/Footer/Footer";
import SharedContext from "./contexts/Sharedcontext";
import "./App.css";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showModalBtns, setShowModalBtns] = useState(false);

  const contextValues = useMemo(
    () => ({
      showModal,
      setShowModal,
      showModalBtns,
      setShowModalBtns,
    }),
    [showModal, showModalBtns]
  );

  return (
    <div>
      <Header />
      <div className="flex flex-col h-screen">
        <SharedContext.Provider value={contextValues}>
          <Routes>
            <Route exact path="/" element={<RoomsFiltered />} />
            <Route exact path="/MesReservations" element={<Myreservations />} />
            <Route path="/erreur" element={<ErrorPage />} />
          </Routes>
        </SharedContext.Provider>

        <div>
          <Footer />

          {/* Modales exemples 

      <button type="button" onClick={() => setShowModal(true)}>
        Je suis le bouton modal
        <Home />
      </button>
      <button type="button" onClick={() => setShowModalBtns(true)}>
        Je suis le bouton modal Bouton
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
      /> */}

        </div>

      </div>
    </div>
  );
}

export default App;
