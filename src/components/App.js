import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate} from "react-router-dom";
import "../pages/index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import ProtectedRoute from "./ProtectedRoute";

import { api } from "../utils/api";
import * as auth from "../utils/auth";
import CurrentUserContex from "../contexts/CurrentUserContext";

import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isConfirmationPopup, setIsConfirmationPopup] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if(loggedIn){
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, card]) => {
        setCurrentUser(user);
        setCards(card);
      })
      .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((item) => (item._id === card._id ? newCard : item))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete() {
    api
      .deleteCard(selectedCard._id)
      .then(() => {
        closeAllPopups();
        setTimeout(() => {
          setCards(cards.filter((item) => item._id !== selectedCard._id));
        }, 500);
      })
      .catch((err) => console.log(err));
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddCardPopupClick() {
    setIsAddCardPopupOpen(true);
  }

  function handleAvatarPopupClick() {
    setIsAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsAvatarPopupOpen(false);
    setIsConfirmationPopup(false);
    setIsInfoTooltipPopupOpen(false);
  }

  function handleUpdateUser(value) {
    api
      .updateUserInfo(value)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(value) {
    api
      .setUserAvatar(value)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(value) {
    api
      .addNewCard(value)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleDeleteClick() {
    setIsConfirmationPopup(true);
  }

  function handleDelete(card) {
    handleDeleteClick();
    setSelectedCard(card);
  }

  function handleInfoTooltipClick() {
    setIsInfoTooltipPopupOpen(true);
  }

  const [registrationUserInfo, setRegistrationUserInfo] = useState({
    email: "",
    password: "",
  });

  function handleRegistration(data) {
    return auth
      .register(data)
      .then(() => {
        setRegistrationSuccess(true);
        handleInfoTooltipClick();
        navigate("/sign-in", {replace: true});
        setRegistrationUserInfo({email: '', password: ''})
       console.log(registrationUserInfo)
      })
      .catch((err) => {
        setRegistrationSuccess(false);
        handleInfoTooltipClick(true);
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleLogin(data) {
    return auth
      .login(data)
      .then((data) => {
        console.log(data);
        localStorage.setItem("jwt", data.token);
        setLoggedIn(true);
        handleTokenCheck();
        navigate("/");
      })
      .catch((err) => {
        setRegistrationSuccess(false);
        handleInfoTooltipClick(true);
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleTokenCheck() {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.data.email);
          }
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setUserEmail("");
    navigate("/sign-in");
    setRegistrationUserInfo({email: '', password: ''})
  }

  useEffect(()=>{
    handleTokenCheck()
  },[])

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);



  return (
    <CurrentUserContex.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          userEmail={userEmail}
          onSignOut={handleSignOut}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                loggedIn={loggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddCardPopupClick}
                onEditAvatar={handleAvatarPopupClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleDelete}
                cards={cards}
              />
            }
          />

          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegistration} values={registrationUserInfo} setValues={setRegistrationUserInfo}/>}
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddCardPopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        <ConfirmationPopup
          isOpen={isConfirmationPopup}
          onClose={closeAllPopups}
          onCofirm={handleCardDelete}
        />
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isSuccess={registrationSuccess}
        />
      </div>
    </CurrentUserContex.Provider>
  );
}

export default App;
