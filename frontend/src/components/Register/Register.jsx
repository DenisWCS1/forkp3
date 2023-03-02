import { useState } from "react";

function Register() {
  // astuce pour éviter de toujours rentrer url http etc
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  //
  const [inputRegisterValue, setIinputRegisterValue] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setIinputRegisterValue({
      ...inputRegisterValue,
      [name]: value,
    });
  };
  // je déclare de cette façon car mes erreur sont renvoyés en tableau d'objet.
  const [errors, setErrors] = useState([]);
  const handleSubmit = (ev) => {
    ev.preventDefault();
    fetch(`${baseUrl}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputRegisterValue),
    })
      // ici je vérifie le type de la "réponse , si la réponse n'est pas un json, on envoi une error"
      .then((r) => {
        const contentType = r.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Oops, we haven't got JSON!");
        }
        // si tt va bien , la response est renvoyé en format json
        return r.json();
      })
      // si le statut de reponse n'est pas ok , je mets a jour mes erreurs en allant
      // chercher la reponse.tableau d'ojets des erreurs
      .then((r) => {
        if (!r.ok) {
          setErrors(r.validationErrors);
          // envoi d'un rejet de promesse car la requête http est incorrect (contenu etc)
          return Promise.reject(new Error("erroors http"));
        }
        // ici cela permet de déterminer qu'il n'y pas de connection internet
        return console.warn("error network");
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <div>
      <div className="flex justify-center items-center h-screen ">
        <div className=" flex flex-col items-center text-center w-3/4 max-w-[450px]">
          <form
            onSubmit={handleSubmit}
            className="shadow-2xl w-full justify-center mb-auto  bg-greySimple-100 p-8 px-8"
          >
            <h2 className="text-4xl text-blueDuck-100 font-bold text-center">
              Inscription
            </h2>
            <div className="flex flex-col text-dark-100 py-2">
              <label htmlFor="firstname">Prénom</label>
              <input
                className="rounded-lg bg-whiteSimple-100 mt-2 p-2"
                name="firstname"
                type="text"
                value={inputRegisterValue.firstname}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col text-dark-100 py-2">
              <label htmlFor="lastname">Nom</label>
              <input
                className="rounded-lg bg-whiteSimple-100 mt-2 p-2"
                name="lastname"
                type="text"
                value={inputRegisterValue.lastname}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col text-dark-100 py-2">
              <label htmlFor="email">Email</label>
              <input
                className="rounded-lg bg-whiteSimple-100 mt-2 p-2"
                name="email"
                type="email"
                value={inputRegisterValue.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col text-dark-100 py-2">
              <label htmlFor="password">Mot de passe</label>
              <input
                className="rounded-lg bg-whiteSimple-100 mt-2 p-2"
                name="password"
                type="password"
                value={inputRegisterValue.password}
                onChange={handleChange}
              />
            </div>
            <ul className="text-red-500 font-semibold">
              {errors.map((error) => (
                <li>{error.msg}</li>
              ))}
            </ul>

            <button
              className="w-full my-5 py-2 bg-teal-500 shadow-lg text-white font-semibold rounded-lg"
              type="submit"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;