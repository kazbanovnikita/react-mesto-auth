import React, { useState} from "react";
import AuthForm from "./AuthForm";

function Register({onRegister, values, setValues}) {
 


  function handleChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  function handleSubmit(event) {
    event.preventDefault();
    onRegister(values);
    setValues({email: '', password: ''})
  }





 



  return (
    <div className="auth">
      <AuthForm
        name={"register"}
        title={"Регистрация"}
        buttonText={"Зарегистрироваться"}
        onSubmit={handleSubmit}
        reg
      >
        <input
          className="auth__input auth__input_value_email"
          id="email__input"
          type="email"
          name="email"
          placeholder="Email"
          minLength="2"
          maxLength="30"
          required
          autoComplete="off"
          onChange={handleChange}
          value={values.email ?? ''}
        />
        <span className="popup__input-error-message" id="email__input-error"></span>
        <input
          className="auth__input auth__input_value_password"
          id="password__input"
          type="password"
          name="password"
          placeholder="Пароль"
          minLength="4"
          maxLength="40"
          autoComplete="off"
          onChange={handleChange}
          value={values.password ?? ''}
        />
        <span className="popup__input-error-message" id="email__input-error"></span>
      </AuthForm>
    </div>
  );
}

export default Register;
