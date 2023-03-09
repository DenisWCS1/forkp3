import React from "react";
import Alban from "@assets/avatar/albanj.jpg";
import David from "@assets/avatar/davidln.jpg";
import Denis from "@assets/avatar/denisper.png";
import Marion from "@assets/avatar/marione.jpg";

function Team() {
  return (
    <>
      <h1 className="shadow-2xl text-justify font-semibold bg-dark-100 text-white text-3xl m-8 p-8">
        Les développeurs de l'application :{" "}
      </h1>

      <div className="flex flex-wrap justify-between">
        <div className="m-4 max-w-sm bg-gray-800 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition duration-1000 hover:scale-95 hover:translate-y-0.5">
          <img className="rounded-t-lg" src={Alban} alt="Alban" />
          <div className="text-justify font-semibold bg-dark-100 text-blueDuck-100 text-1xl m-10 p-10">
            <h3 className="text-center text-2x1 font-bold">Alban J. : </h3>
            "Dev Full Stack, le polyvalent de l'équipe"
          </div>
        </div>
        <div className="m-4 max-w-sm bg-gray-800 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition duration-1000 hover:scale-95 hover:translate-y-0.5">
          <img className="rounded-t-lg" src={David} alt="David" />
          <div className="text-justify font-semibold bg-dark-100 text-blueDuck-100 text-1xl m-10 p-10">
            <h3 className="text-center text-2x1 font-bold">David LN. : </h3>
            "Dev Full Stack, organisé, le trello n'a plus de secret pour lui"
          </div>
        </div>
        <div className="m-4 max-w-sm bg-gray-800 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition duration-1000 hover:scale-95 hover:translate-y-0.5">
          <img className="rounded-t-lg" src={Denis} alt="Denis" />
          <div className="text-justify font-semibold bg-dark-100 text-blueDuck-100 text-1xl m-10 p-10">
            <h3 className="text-center text-2x1 font-bold">Denis P. : </h3>
            "Dev Full Stack, possède toute la vision globale du projet"
          </div>
        </div>
        <div className="m-4 max-w-sm bg-gray-800 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition duration-1000 hover:scale-95 hover:translate-y-0.5">
          <img className="rounded-t-lg" src={Marion} alt="Marion" />

          <div className="text-justify font-semibold bg-dark-100 text-blueDuck-100 text-1xl m-10 p-10">
            <h3 className="text-center text-2x1 font-bold">Marion E. : </h3>
            "Dev Full Stack, designer avec FIGMA a été un point essentiel lors
            de la conception du projet"
          </div>
        </div>
      </div>
      <div className="h-28" />
    </>
  );
}

export default Team;
