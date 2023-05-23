import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [values, setValues] = useState({});

  function handleChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  useEffect(()=>{
      if(isOpen){
          setValues({})
      }
  },[isOpen])

  

  function handleSubmit(event) {
    event.preventDefault();
    setValues({...values, [event.target.name]: event.target.value})
    onAddPlace(values);

  }

  return (
    <PopupWithForm
      name="avatar"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          required
          id="place-input"
          name="name"
          className="popup__input"
          type="text"
          placeholder="Название"
          minLength="2"
          maxLength="40"
          value={values.name ?? ""}
          onChange={handleChange}
        />
        <span
          id="place-input-error"
          className="popup__input-error-massage"
        ></span>
      </label>
      <label className="popup__field">
        <input
          required
          id="url-input"
          name="link"
          className="popup__input"
          type="url"
          placeholder="Ссылка на картинку"
          value={values.link ?? ""}
          onChange={handleChange}
        />
        <span
          id="url-input-error"
          className="popup__input-error-massage"
        ></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
