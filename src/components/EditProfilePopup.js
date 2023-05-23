import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContex from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContex);

  const [value, setValue] = useState({});

  useEffect(() => {
    isOpen &&
      setValue({
        name: currentUser.name,
        about: currentUser.about,
      });
  }, [currentUser, isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser(value);
  }

  function handleChange(event) {
    setValue({ ...value, [event.target.name]: event.target.value });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          required
          id="name-input"
          name="name"
          className="popup__input"
          type="text"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          value={value.name ?? ""}
          onChange={handleChange}
        />
        <span
          id="name-input-error"
          className="popup__input-error-massage"
        ></span>
      </label>
      <label className="popup__field">
        <input
          required
          id="about-input"
          name="about"
          className="popup__input"
          type="text"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          value={value.about ?? ""}
          onChange={handleChange}
        />
        <span
          id="about-input-error"
          className="popup__input-error-massage"
        ></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
