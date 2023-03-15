import PropTypes from "prop-types";
import React from "react";

function Modal({ isVisible, onClose, message }) {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <div
      id="wrapper"
      onMouseDown={handleClose}
      role="presentation"
      className="fixed inset-0 bg-greySimple-100 bg-opacity-25 backdrop-blur-sm flex w-full h-full justify-center items-center body-font font-AvenirNormal"
    >
      <div className="w-[600px] flex flex-col bg-dark-100 rounded-2xl m-3">
        <button
          type="button"
          onClick={() => onClose()}
          className="text-turquoise-100 place-self-end mr-[2rem] mt-3 hover:text-greySimple-100 text-3xl"
        >
          X
        </button>
        <div className=" text-turquoise-100 text-center font-medium mb-8 p-3 mx-5">
          {message}
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
