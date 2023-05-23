import React from "react";

function ImagePopup({ card, isOpen, onClose }) {
  const popupClass = `popup popup_type_image ${isOpen ? "popup_opened" : ""}`;
  return (
    <div className={popupClass}>
      <figure className="popup__container popup__container_type_image">
        <button
          className="popup__close-button popup__close-button_type_image"
          type="button"
          onClick={onClose}
        ></button>
        <img className="popup__image" src={card.link} alt={card.name} />
        <figcaption className="popup__figcaption">{card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;