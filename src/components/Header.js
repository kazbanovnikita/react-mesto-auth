import React from "react";
import logo from "../images/logo.svg";
import { Routes, Route, useLocation, Link } from "react-router-dom";

function Header({userEmail, onSignOut, loggedIn}) {
  const location = useLocation();
    
  const link = location.pathname === "/sign-in" ? "Регистрация" : "Войти";
  const buttonText = loggedIn ? "Выйти" : link;

  return (
    <header className="header">
      <div className="header__container">
      <img className="header__logo" src={logo} alt="логотип-место-россия" />
      <Routes>
        <Route path="/" element={
          <div>
            <nav className="header__navigation">
              <p className="header__email">{userEmail}</p>
              <button className="header__button-exit"
              onClick={onSignOut}>
                {buttonText}
              </button>
            </nav>
          </div>
        }/>
        <Route path="/sign-in"
          element={
            <Link to="/sign-up" className="header__button-link">Регистрация</Link>
          }/>
        <Route path="/sign-up"
        element={
        <Link to="/sign-in" className="header__button-link">Войти</Link>}/>  
      </Routes>
      </div>
    </header>
  );
}

export default Header;