import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup({ isOpen, onClose, onCofirm }) {
  function handleSubmit(event) {
    event.preventDefault();
    onCofirm();
  }

  return (
    <PopupWithForm
      title={"Вы уверены?"}
      buttonText={"Да"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default ConfirmationPopup;
