import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import Login from "@components/Login/Login";
import Register from "@components/Register/Register";
import UserProfile from "@components/UserProfile/UserProfile";
import Myreservations from "@components/MyReservations/MyReservations";
import RoomDetails from "@components/RoomDetails/RoomDetails";
import RoomsFiltered from "@components/RoomHome/RoomsFiltered";
import ErrorPage from "@components/error/Error";
import ModalBtns from "@components/Modals/ModalBtns";
import Modal from "@components/Modals/Modal";
import Charter from "@components/Charter/Charter";
import Team from "@components/Team/Team";
import Loader from "@components/Loader/Loader";
import SharedContext from "@assets/Context/sharedContext";
import Layout from "@components/Layout/Layout";

function App() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const [showModal, setShowModal] = useState(false);
  const [showMessage, setshowMessage] = useState("");
  const [showModalBtns, setShowModalBtns] = useState(false);
  const [onConfirm, setOnConfirm] = useState();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [started, setStarted] = useState(new Date());
  const [ended, setEnded] = useState(new Date());
  const [locationid, setLocationid] = useState(1);
  const [roomvalue, setRoomvalue] = useState({});

  const contextValues = useMemo(
    () => ({
      token,
      setToken,
      user,
      setUser,
      baseUrl,
      isLoading,
      setIsLoading,
    }),
    [token, user, baseUrl, isLoading]
  );
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);

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
    <SharedContext.Provider value={contextValues}>
      <div>
        <Layout>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <RoomsFiltered
                  started={started}
                  ended={ended}
                  setStarted={setStarted}
                  setEnded={setEnded}
                  locationid={locationid}
                  setLocationid={setLocationid}
                  setRoomvalue={setRoomvalue}
                  setShowModalBtns={setShowModalBtns}
                  setShowModal={setShowModal}
                  setshowMessage={setshowMessage}
                  setOnConfirm={setOnConfirm}
                  onConfirm={onConfirm}
                  roomvalue={roomvalue}
                />
              }
            />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route
              exact
              path="/RoomDetails"
              element={
                <RoomDetails
                  started={started}
                  ended={ended}
                  setShowModalBtns={setShowModalBtns}
                  setShowModal={setShowModal}
                  setshowMessage={setshowMessage}
                  setOnConfirm={setOnConfirm}
                  onConfirm={onConfirm}
                  roomvalue={roomvalue}
                />
              }
            />
            <Route exact path="/charter" element={<Charter />} />
            <Route exact path="/Team" element={<Team />} />
            <Route
              exact
              path="/profile"
              element={
                user ? (
                  <UserProfile
                    isVisible={showModalBtns}
                    setShowModalBtns={setShowModalBtns}
                    setShowModal={setShowModal}
                    setshowMessage={setshowMessage}
                    setOnConfirm={setOnConfirm}
                    onConfirm={onConfirm}
                  />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              exact
              path="/mesreservations"
              element={
                user ? (
                  <Myreservations
                    isVisible={showModal}
                    setShowModalBtns={setShowModalBtns}
                    setshowMessage={setshowMessage}
                    setOnConfirm={setOnConfirm}
                    setShowModal={setShowModal}
                  />
                ) : (
                  <Login />
                )
              }
            />
            <Route path="/erreur" element={<ErrorPage />} />
          </Routes>

          {isLoading && <Loader />}
        </Layout>
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
    </SharedContext.Provider>
  );
}

export default App;
