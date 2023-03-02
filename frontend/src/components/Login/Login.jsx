import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${baseUrl}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputValue),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Mot de passe ou email incorrect");
        }
        return response.json();
      })
      .then(() => {
        alert(`Bienvenue, Candice Doe.`);
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen ">
        {/* <div className="hidden sm:block" /> */}

        <div className=" flex flex-col items-center text-center w-3/4 max-w-[450px]">
          <form
            onSubmit={handleSubmit}
            className="shadow-2xl w-full justify-center mb-auto  bg-greySimple-100 p-8 px-8"
          >
            <h2 className="text-4xl text-blueDuck-100 font-bold text-center">
              Connexion
            </h2>

            <div className="flex flex-col text-dark-100 py-2">
              <label htmlFor="Adresse Email">Adresse Email</label>

              <input
                className="rounded-lg bg-whiteSimple-100 mt-2 p-2"
                type="text"
                name="email"
                value={inputValue.email}
                onChange={handleChange}
                placeholder="Adresse Email"
              />
            </div>
            <div className="flex flex-col text-dark-100 py-2">
              <label htmlFor="Mot de passe">Mot de passe</label>
              <input
                className="rounded-lg bg-whiteSimple-100 mt-2 p-2"
                type="password"
                name="password"
                value={inputValue.password}
                onChange={handleChange}
                placeholder="Mot de passe"
              />
            </div>
            <h2 className="text-red-500 font-semibold animate-bounce">
              {error && <div>{error}</div>}
            </h2>
            <NavLink className="flex justify-between text-gray-400 py-2">
              Mot de passe oublié ?
            </NavLink>

            <button
              type="submit"
              className="w-full my-5 py-2 bg-teal-500 shadow-lg text-white font-semibold rounded-lg"
            >
              Se Connecter
            </button>

            <h2 className=" text-4xl  text-blueDuck-100 font-bold text-center">
              Inscription
            </h2>
            <p className="flex items-center mt-4">Pas encore inscrit ? </p>
            <br />
            <div className="flex justify-between">
              <NavLink className="flex items-center">Inscrivez vous</NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Login.propTypes = {
//   setToken: PropTypes.func,
// };
export default Login;