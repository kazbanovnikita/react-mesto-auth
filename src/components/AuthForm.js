import React from "react";
import { Link } from "react-router-dom";

function AuthForm({name, title, buttonText, children, onSubmit, reg }){
 return(
     <div className='auth__container'>
         <h2 className='auth__title'>{title}</h2>
         <form className={`auth__form auth__form_${name}`}
         name={name}
         onSubmit={onSubmit}>
            {children}
            <button className="auth__button-submit"
            type='submit'
            name='submit'>
                {buttonText}
            </button>
         </form>
         {reg && (
         <Link to='/sign-in' className="auth__login">Уже зарегистрированы? Войти</Link>
         )}
     </div>
 )
}

export default AuthForm