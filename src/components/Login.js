import React, { useState } from "react";
import AuthForm from "./AuthForm";

function Login({ onLogin }) {
  const [loginUserInfo, setLoginUserInfo] = useState({
    email: "",
    password: "",
  });



  function handleChange(event) {
    setLoginUserInfo((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onLogin({
      email: loginUserInfo.email,
      password: loginUserInfo.password,
    });
  }

  return (
    <div className="auth">
      <AuthForm
        name={"login"}
        title={"Вход"}
        buttonText={"Войти"}
        onSubmit={handleSubmit}
      >
        <input
          className="auth__input auth__input_value_email"
          id="email__input"
          type="email"
          name="email"
          placeholder="Email"
          minLength="2"
          maxLength="40"
          required
          autoComplete="off"
          onChange={handleChange}
          value={loginUserInfo.email ?? ""}
        />
        <span
          className="popup__input-error-message"
          id="email__input-error"
        ></span>
        <input
          className="auth__input auth__input_value_password"
          id="password__input"
          type="password"
          name="password"
          placeholder="Пароль"
          minLength="4"
          maxLength="40"
          autoComplete="off"
          required
          onChange={handleChange}
          value={loginUserInfo.password ?? ""}
        />
        <span
          className="popup__input-error-message"
          id="email__input-error"
        ></span>
      </AuthForm>
    </div>
  );
}

export default Login;
