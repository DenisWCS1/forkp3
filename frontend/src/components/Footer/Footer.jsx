import React from "react";
import { Link } from "react-router-dom";
import Teams from "../../assets/footer/Teams.svg";
import Orfea from "../../assets/footer/Orfea.png";
import Sncfconnect from "../../assets/footer/Sncfconnect.png";
import Charter from "../../assets/logos/charter.png";
import Team from "../../assets/logos/team.png";

function Footer() {
  return (
    <footer className="h-24 fixed bottom-0 w-full">
      <div className="bg-dark-100 mt-4">
        <div className="flex flex-row justify-around pt-1">
          <a
            href="https://www.sncf-connect.com/"
            target="_blank"
            rel="noreferrer"
          >
            <img className="w-20 h-10" src={Sncfconnect} alt="sncfconnect" />
          </a>
          <a
            href="https://www.microsoft.com/fr-fr/microsoft-teams/log-in"
            target="_blank"
            rel="noreferrer"
          >
            <img className="w-8 h-8" src={Teams} alt="teams" />
          </a>
          <a href="https://www.orfea.fr/fr" target="_blank" rel="noreferrer">
            <img className="w-16 h-8" src={Orfea} alt="orfea" />
          </a>
        </div>
        <div className="flex flex-row text-white text-sm justify-center items-center pb-1">
          <div className="">
            <Link to="/Team">
              <img className="max-h-8" src={Team} alt="charter" />
            </Link>
          </div>
          <div className="copyright px-2">
            <p>&copy; Copyright by GDSalles API</p>
          </div>
          <div className="">
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
