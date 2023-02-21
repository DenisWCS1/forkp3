import { useState } from "react";
import { NavLink } from "react-router-dom";
import logoSncf from "@assets/logos/logoSncf.png";
import GdSallesTransparent from "@assets/logos/GdSallesTransparent.png";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="mx-auto mb-4 pr-6 flex items-center justify-between  py-3 max-h-16 bg-dark-100">
      <div className=" flex items-center justify-between lg:justify-evenly">
        <NavLink className="w-[6rem] rounded-full lg:w-[8rem]" to="/Home">
          <img src={logoSncf} alt="logoSncf" />
        </NavLink>
        <NavLink className="w-[7rem] rounded-full lg:w-[11rem]" to="/Home">
          <img src={GdSallesTransparent} alt="GdSallesTransparent" />
        </NavLink>
      </div>

      <nav>
        {/* Mobile-Menu */}
        <section className="flex flex-end">
          <div className="HAMBURGER-ICON space-y-2" onMouseDown={() => setIsNavOpen((prev) => !prev)} role="presentation">
            <span className="block h-1 w-8 lg:w-[3rem] rounded lg:h-1.5 animate-pulse bg-turquoise-100" />
            <span className="block h-1 w-8 lg:w-[3rem] rounded lg:h-1.5 animate-pulse bg-turquoise-100" />
            <span className="block h-1 w-8 lg:w-[3rem] rounded lg:h-1.5 animate-pulse bg-turquoise-100" />

          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div

              className="absolute top-0 right-0 px-6 py-6"
              onMouseDown={() => setIsNavOpen(false)}
              role="presentation"
            />
            <ul className="flex flex-col items-center justify-between min-h-[250px] sm:flex">
              <li
                className="border-b border-dotted border-opacity-20 font-semibold  text-turquoise-100 my-8 "
                onMouseDown={() => setIsNavOpen(false)}
                role="presentation"
              >
                <NavLink to="/Home">Se Connecter / S'inscrire</NavLink>
              </li>
              <li
                className="border-b border-dotted border-opacity-20 font-semibold text-turquoise-100
             my-8 "
                onMouseDown={() => setIsNavOpen(false)}
                role="presentation"
              >
                <NavLink to="/">Mes Réservations</NavLink>
              </li>
              <li
                className="border-b border-dotted border-opacity-20 font-semibold text-turquoise-100 my-8 "
                onMouseDown={() => setIsNavOpen(false)}
                role="presentation"
              >
                <NavLink to="/Home">Mon profil</NavLink>

              </li>
            </ul>
          </div>
        </section>
      </nav>
    </div>
  );
}
