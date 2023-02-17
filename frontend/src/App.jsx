import { Routes, Route } from "react-router-dom";
import Header from "@components/Header/Header";
import RoomsFiltered from "@components/RoomHome/RoomsFiltered";
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
    </div>
  );
}

export default App;
