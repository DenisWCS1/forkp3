import { Link } from "react-router-dom";
import error from "@assets/error/404.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

function Error() {
  return (
    <div className="min-w-full border-collapse block md:table flex-1 ">
      <div className="relative flex flex-col items-center w-full gap-8 px-8 md:px-18 xl:px-40 ">
        <h1 className="text-8xl md:text-[150px] w-full select-none text-center font-black  text-gray-400 dark:text-[#373A40]  ">
          4XX
        </h1>
        <img to="/error" src={error} alt="4XX" />
        <p className=" font-bold capitalize text-center text mb-0 xl:text-3xl ">
          VOUS AVEZ DÉCOUVERT UN PASSAGE SECRET
        </p>
        <p className=" font-medium break-words text-dull text-center xl:text-2xl sm:text-3xl">
          Malheureusement, ce n'est qu'une page 4XX. Vous avez peut-être mal
          tapé le adresse, ou la page a été déplacée vers une autre URL.
          Malheureusement vous ne pouvez pas avoir plus d'indication sur le type
          d'erreur.
        </p>
        <div className="flex flex-col w-full  md:md:gap-32 xl:px-16 text-center mt-6">
          <Link
            to="/"
            className="bg-transparent hover:bg-blueDuck-100 text-blueDuck-100 font-bold hover:text-white py-4 px-4 border-2 mb-2 border-blueDuck-100 hover:border-transparent rounded"
          >
            <span>
              <FontAwesomeIcon icon={faHouse} />
            </span>
            <span className="ml-2"> RETOURNER À L'ACCEUIL</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Error;
