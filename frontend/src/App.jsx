import "./App.css";
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
import ModalBtns from "@components/Modals/ModalBtns";
import RoomDetails from "@components/RoomDetails/RoomDetails";
import UserProfile from "@components/UserProfile/UserProfile";
import Team from "@components/Team/Team";
import Loader from "@components/Loader/Loader";
import SharedContext from "@assets/Context/sharedContext";

function App() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const [showModal, setShowModal] = useState(false);
  const [showMessage, setshowMessage] = useState("");
  const [showModalBtns, setShowModalBtns] = useState(false);
  const [onConfirm, setOnConfirm] = useState();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const contextValues = useMemo(
    () => ({
      token,
      setToken,
      user,
      setUser,
      baseUrl,
    }),
    [token, user, baseUrl]
  );

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);

  useEffect(() => {
    if (token) {
      // setIsLoading(true);
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
          // setIsLoading(false);
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
            <Route exact path="/RoomDetails" element={<RoomDetails />} />
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
          {isLoading ? <Loader /> : ""}
        </div>
      </SharedContext.Provider>
    </div>
  );
}

export default App;
