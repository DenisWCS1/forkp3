import Header from "@components/Header/Header";
import Home from "@pages/Home";
import { Routes, Route } from "react-router-dom";
import Page1 from "@components/Header/Page1";
import "./App.css";

function App() {
  return (
    <div className="">
      <Header />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Page1" element={<Page1 />} />
        <Route path="/Page1" element={<Page1 />} />
        <Route path="/*" element={<Page1 />} />
      </Routes>
    </div>
  );
}

export default App;
