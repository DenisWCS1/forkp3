import { useState } from "react";
import { NavLink } from "react-router-dom";
import logoSncf from "@assets/logos/logoSncf.png";
import GdSallesTransparent from "@assets/logos/GdSallesTransparent.png";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="mx-auto mb-4 pr-6 flex items-center justify-between border-b border-whiteSimple-100 py-3 bg-dark-100 w-full">
      <div className="w-[8rem] rounded-full xl:w-[12rem]">
        <NavLink to="/">
          <img src={logoSncf} alt="logoSncf" />
        </NavLink>
      </div>
      <div className="w-[12rem] rounded-full xl:w-[16rem]">
        <NavLink to="/">
          <img src={GdSallesTransparent} alt="GdSallesTransparent" />
        </NavLink>
      </div>
      <nav>
        <section className="MOBILE-MENU flex flex-end">
          <div
            role="presentation"
            className="HAMBURGER-ICON space-y-2"
            onMouseDown={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-8 lg:w-[4rem] lg:h-[0.250rem] animate-pulse bg-blueDuck-100" />
            <span className="block h-0.5 w-8 lg:w-[4rem] lg:h-[0.250rem] animate-pulse bg-blueDuck-100" />
            <span className="block h-0.5 w-8 lg:w-[4rem] lg:h-[0.250rem] animate-pulse bg-blueDuck-100" />
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div
              role="presentation"
              className="absolute top-0 right-0 px-6 py-6"
              onMouseDown={() => setIsNavOpen(false)}
            >
              <svg
                className="h-8 w-8 lg:w-[4rem] lg:h-[4rem] text-blueDuck-100"
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
                role="presentation"
                className="border-b  text-blueDuck-100 my-8 "
                onMouseDown={() => setIsNavOpen(false)}
              >
                <NavLink to="/">Accueil</NavLink>
              </li>
              <li
                role="presentation"
                className="border-b text-blueDuck-100
             my-8 "
                onMouseDown={() => setIsNavOpen(false)}
              >
                <NavLink to="/MesReservations">Mes Réservations</NavLink>
              </li>
              <li
                role="presentation"
                className="border-b  text-blueDuck-100 my-8 "
                onMouseDown={() => setIsNavOpen(false)}
              >
                <NavLink to="login">Se Connecter / S'inscrire</NavLink>
              </li>

              <li
                role="presentation"
                className="border-b  text-blueDuck-100 my-8 "
                onMouseDown={() => setIsNavOpen(false)}
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
