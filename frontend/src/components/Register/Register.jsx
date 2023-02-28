import { useState } from "react";
// //import { useForm } from 'react-hook-form';

function Register() {
  // const [registerError, setRegisterError] = useState(null);

  const [inputRegisterValue, setIinputRegisterValue] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputRegisterValue),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Données saisies incorrectes");
        }
        return response.json();
      })

      .catch((err) => {
        console.error(err);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setIinputRegisterValue({
      ...inputRegisterValue,
      [name]: value,
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
            <p className="text-red-500 font-semibold animate-bounce" />
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
