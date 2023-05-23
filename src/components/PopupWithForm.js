import React from "react";
function PopupWithForm({
  name,
  title,
  children,
  isOpen,
  onClose,
  buttonText,
  onSubmit,
}) {
  const popupClass = `popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`;

  return (
    <div className={popupClass}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <h3 className="popup__title">{title}</h3>
        <form
          className={`popup__input-list popup__input-list_type_${name}`}
          method="post"
          name={name}
          autoComplete="off"
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button className="popup__save-buttom" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
