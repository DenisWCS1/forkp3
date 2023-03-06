import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "@components/Header/Header";
import Login from "@components/Login/Login";
import Register from "@components/Register/Register";
import RoomsFiltered from "@components/RoomHome/RoomsFiltered";
import Myreservations from "@components/MyReservations/MyReservations";
import ErrorPage from "@components/error/Error";
import Footer from "@components/Footer/Footer";
import Modal from "@components/Modals/Modal";
import Charter from "@components/Charter/Charter";
import ModalBtns from "@components/Modals/ModalBtns";
import RoomDetails from "@components/RoomDetails/RoomDetails";
import UserProfile from "@components/UserProfile/UserProfile";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showMessage, setshowMessage] = useState("");
  const [showModalBtns, setShowModalBtns] = useState(false);
  const [onConfirm, setOnConfirm] = useState();
  // const [isLogged, setIsLogged] = useState(false);
  return (
    <div className="">
      <Header />

      <div className="flex flex-col">
        <Routes>
          <Route exact path="/" element={<RoomsFiltered />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/RoomDetails" element={<RoomDetails />} />
          <Route exact path="/charter" element={<Charter />} />
          <Route
            exact
            path="/profile"
            element={
              <UserProfile
                isVisible={showModalBtns}
                setShowModalBtns={setShowModalBtns}
                setShowModal={setShowModal}
                setshowMessage={setshowMessage}
                setOnConfirm={setOnConfirm}
              />
            }
          />
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
        <div className="fixed bottom-0 w-full">
          <Footer />
        </div>
        <Modal
          isVisible={showModal}
          onClose={() => setShowModal(false)}
          message={showMessage}
        />
        <ModalBtns
          isVisible={showModalBtns}
          onClose={() => setShowModalBtns(false)}
          message={showMessage}
          onConfirm={onConfirm}
        />
      </div>
    </div>
  );
}

export default App;
