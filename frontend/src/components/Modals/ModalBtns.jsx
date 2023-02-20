import PropTypes from "prop-types";
import React from "react";

function ModalBtns({ isVisible, onClose, message }) {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <div
      id="wrapper"
      onMouseDown={handleClose}
      role="presentation"
      className="fixed inset-0 bg-greySimple-100 bg-opacity-25 backdrop-blur-sm flex justify-center items-center h-screen"
    >
      <div className="w-[600px] flex flex-col bg-dark-100 rounded-2xl m-3">
        <button
          type="button"
          onClick={() => onClose()}
          className="text-turquoise-100 place-self-end mr-[2rem] mt-3 hover:text-greySimple-100 text-3xl"
        >
          X
        </button>
        <div className=" text-turquoise-100 text-center font-medium mb-2 p-3 mx-5">
          {message}
        </div>
        <div className="text-turquoise-100 mb-8 flex justify-center">
          <button
            type="button"
            className=" transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 hover:text-greySimple-100 duration-150 mr-12"
          >
            Oui
          </button>
          <button
            type="button"
            className="transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 hover:text-greySimple-100 duration-150"
          >
            Non
          </button>
        </div>
      </div>
    </div>
  );
}

ModalBtns.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalBtns;
