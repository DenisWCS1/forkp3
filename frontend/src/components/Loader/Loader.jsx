import React from "react";
import Loading from "@assets/logos/loading.gif";

function Loader() {
  return (
    <div className="flex flex-col justify-around items-center py-8">
      <img className="animate" src={Loading} alt="loading" />
      <p className="text-center font-bold">Chargement ...</p>
    </div>
  );
}

export default Loader;
