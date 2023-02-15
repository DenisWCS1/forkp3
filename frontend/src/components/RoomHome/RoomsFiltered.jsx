import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function RoomsFiltered() {
  /*
  const [start, setStart] = React.useState("");
  const [end, setEnd] = React.useState("");
  const [locationid, setLocationid] = React.useState();
  */
  const navigate = useNavigate();
  const start = "";
  const end = "";
  const locationid = "";
  const [rooms, setRooms] = React.useState([]);
  const baseUrl = "../../src/assets/rooms/";

  React.useEffect(() => {
    async function fetchData() {
      await fetch(
        `http://localhost:5000/filtered?start=${start}&end=${end}&location=${locationid}`
      )
        .then((response) => {
          return response.json();
        })
        .then((jsonData) => {
          setRooms(jsonData);
        })
        .catch(() => {
          navigate("/error");
        });
    }
    // setIsLoading(true);
    fetchData();
    /* setIsLoading(false);   */
  }, [navigate, start, end, locationid]);

  return (
    <div className="container my-12 mx-auto px-4 md:px-12">
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        {rooms.map((value) => (
          <div
            className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4  transform transition duration-1000 hover:scale-95 hover:translate-y-0.5"
            key={value.id}
          >
            <article className="overflow-hidden rounded-lg shadow-lg">
              <div className="w-full h-fit group">
                <div className="relative overflow-hidden">
                  <img
                    className="h-auto w-full object-cover"
                    src={`${baseUrl}${value.url_picture}`}
                    alt={value.name}
                  />
                  <div className="absolute h-full w-full bg-dark-100/40 flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      className="bg-greySimple-100 bg-opacity-50 text-whiteSimple-100 py-2 px-4 "
                      type="button"
                    >
                      Plus de détails
                    </button>
                  </div>
                </div>
              </div>
              <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                <h1 className="text-lg">
                  <a
                    className="no-underline hover:underline text-dark-100"
                    href="/"
                  >
                    {value.name}
                  </a>
                </h1>
                <p className="text-dark-100 text-sm" />
                {value.capacity} Places
              </header>

              <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                <a
                  className="flex items-center no-underline hover:underline text-dark-100"
                  href="/"
                >
                  <FontAwesomeIcon icon={faLocationDot} />
                  <p className="ml-2 text-sm">{value.city_name}</p>
                </a>
                <a
                  className="no-underline text-dark-100 hover:text-red-dark"
                  href="/"
                >
                  <span className="text-white font-normal">
                    <button
                      type="button"
                      className="bg-blueDuck-100  px-4 py-2 rounded-lg "
                    >
                      Réserver
                    </button>
                  </span>
                  <i className="fa fa-heart" />
                </a>
              </footer>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomsFiltered;
