import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo_sncf from "@assets/logos/logo_sncf.png";
import Gd_Salles_transparent from "@assets/logos/Gd_Salles_transparent.png";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div
      className=" mx-auto mb-4 pr-6 flex items-center justify-between border-b border-whiteSimple-100
     py-3 bg-dark-100
    "
    >
      <div className="w-[8rem] rounded-full">
        <NavLink to="/">
          <img src={logo_sncf} alt="logo_sncf" />
        </NavLink>
      </div>
      <div className="w-[12rem] rounded-full">
        <NavLink to="/">
          <img src={Gd_Salles_transparent} alt="Gd_Salles_transparent" />
        </NavLink>
      </div>
      <nav>
        <section className="MOBILE-MENU flex flex-end">
          <div
            className="HAMBURGER-ICON space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-8 animate-pulse bg-blueDuck-100" />
            <span className="block h-0.5 w-8 animate-pulse bg-blueDuck-100" />
            <span className="block h-0.5 w-8 animate-pulse bg-blueDuck-100" />
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div
              className="absolute top-0 right-0 px-6 py-6"
              onClick={() => setIsNavOpen(false)}
            >
              <svg
                className="h-8 w-8 text-blueDuck-100"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul className="flex flex-col items-center justify-between min-h-[250px] sm:flex">
              <li
                className="border-b  text-blueDuck-100 my-8 "
                onClick={() => setIsNavOpen(false)}
              >
                <NavLink to="/Home">Se Connecter / S'inscrire</NavLink>
              </li>
              <li
                className="border-b text-blueDuck-100
             my-8 "
                onClick={() => setIsNavOpen(false)}
              >
                <NavLink to="/">Mes Réservations</NavLink>
              </li>
              <li
                className="border-b  text-blueDuck-100 my-8 "
                onClick={() => setIsNavOpen(false)}
              >
                <NavLink to="/">Mon profil</NavLink>
              </li>
            </ul>
          </div>
        </section>
      </nav>
    </div>
  );
}
