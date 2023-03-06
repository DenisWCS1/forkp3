import { Routes, Route } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import Header from "@components/Header/Header";
import Login from "@components/Login/Login";
import Register from "@components/Register/Register";
import RoomsFiltered from "@components/RoomHome/RoomsFiltered";
import Myreservations from "@components/MyReservations/MyReservations";
import ErrorPage from "@components/error/Error";
import Footer from "@components/Footer/Footer";
import Modal from "@components/Modals/Modal";
import Charter from "@components/Charter/Charter";

// import ModalBtns from "@components/Modals/ModalBtns";

import "./App.css";

import SharedContext from "@assets/Context/sharedContext";

import RoomDetails from "@components/RoomDetails/RoomDetails";

function App() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const [showModal, setShowModal] = useState(false);
  const [showMessage, setshowMessage] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState();

  const contextValues = useMemo(
    () => ({
      token,
      setToken,
      user,
      setUser,
      baseUrl,
      setShowModal,
      showMessage,
      setshowMessage,
    }),
    [token, user, baseUrl, showMessage, baseUrl]
  );

  useEffect(() => {
    if (token) {
      fetch(`${baseUrl}/me`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((userData) => setUser(userData))
        .catch((err) => {
          console.warn(err);
          setToken();
          localStorage.removeItem("token");
        });
    }
  }, [token]);
  return (
    <div className="">
      <SharedContext.Provider value={contextValues}>
        <Header />
        {/* isLogged={isLogged} setIsLogged={setIsLogged}  */}
        <div className="flex flex-col h-screen">
          <Routes>
            <Route exact path="/" element={<RoomsFiltered />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route
              exact
              path="/mesreservations"
              element={
                user ? (
                  <Myreservations
                    isVisible={showModal}
                    setShowModal={setShowModal}
                    setshowMessage={setshowMessage}
                  />
                ) : (
                  <Login />
                )
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
      </SharedContext.Provider>
    </div>
  );
}

export default App;
