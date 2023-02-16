import { Routes, Route } from "react-router-dom";
import RoomsFiltered from "@components/RoomHome/RoomsFiltered";
import ErrorPage from "@components/error/Error";

function App() {
  return (
    <div>
      {/* Add <header /> here */}
      <Routes>
        <Route exact path="/" element={<RoomsFiltered />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
      {/* Add <footer /> here */}
    </div>
  );
}

export default App;
