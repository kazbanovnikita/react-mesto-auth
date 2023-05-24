import React from "react";
import successImage from "../images/successImage.svg";
import unSuccessImage from "../images/deniedImage.svg";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <div className="popup__content">
          <h2 className="popup__title_type_content">
            {`${
              isSuccess
                ? "Вы успешно зарегистрировались!"
                : "Что-то пошло не так! Попробуйте ещё раз."
            }`}
          </h2>
          <img
            className="popup__image_type_content"
            src={`${isSuccess ? successImage : unSuccessImage}`}
            alt={`${
              isSuccess
                ? "Вы успешно зарегистрировались!"
                : "Что-то пошло не так! Попробуйте ещё раз."
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
