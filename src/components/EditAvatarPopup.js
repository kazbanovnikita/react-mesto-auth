import React, {  useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";



function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  

  const inputRef = useRef(0);

  useEffect(() => {
      if(isOpen){
    inputRef.current.value = '';
  }}, [isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          required
          id="avatar-input"
          name="avatar"
          className="popup__input"
          type="url"
          placeholder="Ссылка на аватар"
          ref={inputRef}
        />
        <span
          className="popup__input-error-massage"
          id="avatar-input-error"
        ></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
