import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "@components/Header/Header";
import Login from "@components/Login/Login";
import RoomsFiltered from "@components/RoomHome/RoomsFiltered";
import Myreservations from "@components/MyReservations/MyReservations";
import ErrorPage from "@components/error/Error";
import Footer from "@components/Footer/Footer";
import Modal from "@components/Modals/Modal";

// import ModalBtns from "@components/Modals/ModalBtns";
import "./App.css";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showMessage, setshowMessage] = useState("");
  // const [showModalBtns, setShowModalBtns] = useState(false);
  return (
    <div className="">
      <Header />
      <div className="flex flex-col h-screen">
        <Routes>
          <Route exact path="/" element={<RoomsFiltered />} />
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/mesreservations"
            element={
              <Myreservations
                isVisible={showModal}
                setShowModal={setShowModal}
                setshowMessage={setshowMessage}
              />
            }
          />
          <Route path="/erreur" element={<ErrorPage />} />
          {/* remplacer par une étoile ici */}
        </Routes>
        <Footer />
        <Modal
          isVisible={showModal}
          onClose={() => setShowModal(false)}
          message={showMessage}
        />
        {/*
        <ModalBtns
          isVisible={showModalBtns}
          onClose={() => setShowModalBtns(false)}
          message="Etes-vous sûr(e) de vouloir supprimer cette réservation ?"
        /> */}
      </div>
    </div>
  );
}

export default App;
