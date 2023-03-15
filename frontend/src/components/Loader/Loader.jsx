import React from "react";

function Loader() {
  return (
    <div className="flex flex-col justify-around items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <img className="animate" src="loading.gif" alt="loading" />
      <p className="text-center font-bold">Chargement ...</p>
    </div>
  );
}

export default Loader;
