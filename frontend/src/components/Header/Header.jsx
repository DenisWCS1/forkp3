import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import logoSncf from "@assets/logos/logoSncf.png";
import GdSallesTransparent from "@assets/logos/GdSallesTransparent.png";
import {
  faPen,
  faBook,
  faUserAstronaut,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SharedContext from "@assets/Context/sharedContext";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { user, setUser, setToken } = useContext(SharedContext);
  const handleDisconnect = () => {
    localStorage.removeItem("token");
    setToken();
    setUser();
  };
  return (
    <div className="h-14 mx-auto mb-4 pr-6 flex items-center justify-between py-3 bg-dark-100">
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
            {user ? `${user.firstname} ${user.lastname}` : "Invité"}
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

          <div
            className={isNavOpen ? "showMenuNav" : "hideMenuNav"}
            onMouseLeave={() => setIsNavOpen(false)}
          >
            <div
              className="absolute top-0 right-0 px-6 py-6"
              role="presentation"
            />
            <ul className="flex flex-col items-center justify-between min-h-[250px] sm:flex">
              {user ? (
                <button
                  onClick={() => setIsNavOpen(false)}
                  type="button"
                  className="font-semibold text-turquoise-100 my-8 pb-6"
                >
                  <NavLink to="#" onClick={handleDisconnect}>
                    Se Déconnecter
                  </NavLink>
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setIsNavOpen(false)}
                    type="button"
                    className="font-semibold text-turquoise-100 my-8 pb-6"
                  >
                    <NavLink to="/register">
                      <FontAwesomeIcon icon={faPen} className="pr-1" />
                      S'inscrire
                    </NavLink>
                  </button>

                  <span className="block opacity-40 h-0.5 w-[200px]  rounded bg-turquoise-100" />
                  <button
                    onClick={() => setIsNavOpen(false)}
                    type="button"
                    className="font-semibold text-turquoise-100 my-8 pb-6"
                  >
                    <NavLink to="/login">Se connecter</NavLink>
                  </button>
                </>
              )}
              <span className="block opacity-40 h-0.5 w-[200px]  rounded bg-turquoise-100" />{" "}
              <button
                onClick={() => setIsNavOpen(false)}
                type="button"
                className="font-semibold text-turquoise-100 my-8 pb-6"
              >
                <NavLink to="/mesreservations">
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
                <NavLink to="/profile">Mon profil</NavLink>
              </button>
            </ul>
          </div>
        </section>
      </nav>
    </div>
  );
}
