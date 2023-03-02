import { useState } from "react";
import { NavLink } from "react-router-dom";
import logoSncf from "@assets/logos/logoSncf.png";
import GdSallesTransparent from "@assets/logos/GdSallesTransparent.png";
import {
  faPen,
  faBook,
  faUserAstronaut,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="mx-auto mb-4 pr-6 flex items-center justify-between  py-3 max-h-16 bg-dark-100">
      <div className=" flex items-center justify-between lg:justify-evenly">
        <NavLink className="w-[6rem] rounded-full lg:w-[8rem]" to="/">
          <img src={logoSncf} alt="logoSncf" />
        </NavLink>
        <NavLink className="w-[7rem] rounded-full lg:w-[11rem]" to="/">
          <img src={GdSallesTransparent} alt="GdSallesTransparent" />
        </NavLink>
      </div>

      <nav>
        {/* Mobile-Menu */}
        <section className="flex flex-end ">
          <div className="UserConnected pr-8  font-semibold text-turquoise-100">
            "Candice DOE"
            {/* {isLogged ? user.firsrtname && user.lastname : null} */}
          </div>
          <div
            className="HAMBURGER-ICON space-y-2"
            onMouseDown={() => setIsNavOpen((prev) => !prev)}
            role="presentation"
          >
            <span className="block h-1 w-8 lg:w-[3rem] rounded lg:h-1.5 animate-pulse bg-turquoise-100" />
            <span className="block h-1 w-8 lg:w-[3rem] rounded lg:h-1.5 animate-pulse bg-turquoise-100" />
            <span className="block h-1 w-8 lg:w-[3rem] rounded lg:h-1.5 animate-pulse bg-turquoise-100" />
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div
              className="absolute top-0 right-0 px-6 py-6"
              role="presentation"
            />
            <ul className="flex flex-col items-center justify-between min-h-[250px] sm:flex">
              <button
                onClick={() => setIsNavOpen(false)}
                type="button"
                className="font-semibold text-turquoise-100 my-8 pb-6"
              >
                <FontAwesomeIcon icon={faPen} className="pr-2" />
                {/* {isLogged ? (
                  <NavLink to="/">Se Déconnecter</NavLink>
                ) : (
                  <NavLink to="/register">S'inscrire</NavLink>
                )} */}
                <NavLink to="/login">Se connecter</NavLink>
                <br />
                <NavLink to="/register">S'inscrire</NavLink>
              </button>
              <span className="block opacity-40 h-0.5 w-[200px]  rounded bg-turquoise-100" />

              <button
                onClick={() => setIsNavOpen(false)}
                type="button"
                className="font-semibold text-turquoise-100 my-8 pb-6"
              >
                <NavLink to="/MesReservations">
                  <FontAwesomeIcon icon={faBook} className="pr-2" />
                  Mes réservations
                </NavLink>
              </button>
              <span className="block opacity-40 h-0.5 w-[200px]  rounded bg-turquoise-100" />

              <button
                onClick={() => setIsNavOpen(false)}
                type="button"
                className="font-semibold text-turquoise-100 my-8 pb-6"
              >
                <FontAwesomeIcon icon={faUserAstronaut} className="pr-2" />
                <NavLink to="/Home">Mon profil</NavLink>
              </button>
            </ul>
          </div>
        </section>
      </nav>
    </div>
  );
}
