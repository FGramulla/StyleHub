// LoginRegister.jsx

import React, { useState } from "react";
import "../style/LoginRegister.css";
import showPasswordIcon from "../assets/show-password.svg"; // Importa tu icono de ojo

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true); // Estado para controlar si está en modo login o registro
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña

  const toggleMode = () => {
    setIsLogin(!isLogin); // Cambia entre login y registro
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica para enviar los datos del formulario
    // Puedes usar useState para manejar los campos del formulario
    // y una función para enviar los datos a tu API o backend
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Cambia el estado para mostrar/ocultar contraseña
  };

  return (
    <div className="login-register-container">
      <div className={`form-container ${isLogin ? "" : "register"}`}>
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" required />
          </div>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
              />
              <img
                src={showPasswordIcon}
                alt="Show Password"
                className="password-icon"
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                />
                <img
                  src={showPasswordIcon}
                  alt="Show Password"
                  className="password-icon"
                  onClick={togglePasswordVisibility}
                />
              </div>
            </div>
          )}
          <button type="submit">{isLogin ? "Login" : "Register"}</button>
        </form>
        <p className="toggle-mode" onClick={toggleMode}>
          {isLogin
            ? "¿No tienes una cuenta? Regístrate aquí"
            : "¿Ya tienes una cuenta? Inicia sesión aquí"}
        </p>
      </div>
    </div>
  );
};

export default LoginRegister;



