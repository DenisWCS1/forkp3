import React from "react";
import "./style.css";
import Twitter from "../../assets/footer/Twitter.svg";
import Yammer from "../../assets/footer/Yammer.svg";
import Teams from "../../assets/footer/Teams.svg";
import Orfea from "../../assets/footer/Orfea.png";
import Sncfconnect from "../../assets/footer/Sncfconnect.png";

function Footer() {
  return (
    <footer>
      <div className="bg-dark-100 flex justify-between">
        <div className="footerSocial">
          <div className="flex justify-center">
            <a
              href="https://twitter.com/SNCFNumerique"
              target="_blank"
              rel="noreferrer"
            >
              <img src={Twitter} alt="twitter" />
            </a>
            <a
              href="https://numerique.sncf.com/store/applications/yammer/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={Yammer} alt="yammer" />
            </a>

            <a
              href="https://www.microsoft.com/fr-fr/microsoft-teams/log-in"
              target="_blank"
              rel="noreferrer"
            >
              <img src={Teams} alt="teams" />
            </a>
          </div>
        </div>
        <div className="separatorFooter">
          <div className="flex flex-row">
            <a
              href="https://www.sncf-connect.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={Sncfconnect} alt="sncfconnect" />
            </a>
            <a href="https://www.orfea.fr/fr" target="_blank" rel="noreferrer">
              <img src={Orfea} alt="orfea" />
            </a>
          </div>
        </div>
        <div className="flex flex-row text-sm">
          <div className="copyright">
            <p>Contact &copy; Copyright by GDSalles API</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
