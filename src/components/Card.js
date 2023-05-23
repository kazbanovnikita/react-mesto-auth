import React, { useContext } from "react";
import CurrentUserContex from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContex);

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some((card) => card._id === currentUser._id);
  const cardLikeButtonClassName = `card__like-button ${
    isLiked && "card__like-button_active"
  }`;

  return (
      <li className="card">
        <img
          className="card__image"
          src={card.link}
          alt={card.name}
          onClick={handleCardClick}
        />
        {isOwn && (
          <button
            className="card__trash-button"
            type="button"
            onClick={handleDeleteClick}
          ></button>
        )}
        <div className="card__description">
          <h2 className="card__title">{card.name}</h2>
          <div className="card__like-container">
            <button
              className={cardLikeButtonClassName}
              onClick={handleLikeClick}
              type="button"
            ></button>
            <p className="card__like-counter">{card.likes.length}</p>
          </div>
        </div>
      </li>
  );
}

export default Card;
