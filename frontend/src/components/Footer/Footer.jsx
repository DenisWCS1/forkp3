import React from "react";
import { Link } from "react-router-dom";
import Teams from "../../assets/footer/Teams.svg";
import Orfea from "../../assets/footer/Orfea.png";
import Sncfconnect from "../../assets/footer/Sncfconnect.png";
import Charter from "../../assets/logos/charter.png";

function Footer() {
  return (
    <footer>
      <div className="bg-dark-100 mt-5">
        <div className="flex flex-row justify-around">
          <a
            href="https://www.sncf-connect.com/"
            target="_blank"
            rel="noreferrer"
          >
            <img className="w-34 h-12" src={Sncfconnect} alt="sncfconnect" />
          </a>
          <a
            href="https://www.microsoft.com/fr-fr/microsoft-teams/log-in"
            target="_blank"
            rel="noreferrer"
          >
            <img className="w-8 h-8" src={Teams} alt="teams" />
          </a>
          <a href="https://www.orfea.fr/fr" target="_blank" rel="noreferrer">
            <img className="w-34 h-8" src={Orfea} alt="orfea" />
          </a>
        </div>

        <div className="flex flex-row text-white text-sm justify-center">
          <div className="copyright">
            <p>&copy; Copyright by GDSalles API</p>
          </div>
          <div className="pb-5">
            <Link to="/Charter">
              <img className="max-h-6" src={Charter} alt="charter" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
