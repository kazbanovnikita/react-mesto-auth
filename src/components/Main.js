import React, { useContext } from "react";
import Card from "./Card";
import CurrentUserContex from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = useContext(CurrentUserContex);

  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <button className="profile__button-avatar" onClick={onEditAvatar}>
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="profile__avatar"
            />
          </button>
          <div className="profile__user-information">
            <div className="profile__title-container">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                type="button"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="cards">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              card={card}
              onCardClick={onCardClick}
              key={card._id}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
