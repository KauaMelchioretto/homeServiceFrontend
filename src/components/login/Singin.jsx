import React, { useState } from "react";
import MenuBar from "../menubar/index.jsx";
import { NavLink } from "react-router-dom";
import { login } from "../../services/login";
import { Button } from "primereact/button";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-blue/theme.css";

export default function Singin({ callback }) {
  const [values, setValues] = useState({});

  const handleClickLogin = async () => {
    const email = values.email;
    const password = values.password;
    const token = await login(email, password);
    callback(token);
  };

  const changeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      handleClickLogin();
    }
  };

  return (
    <div className="container">
      <MenuBar />
      <header className="header--container">
        <h1>Home Serivce</h1>
      </header>
      <section className="userForm--section">
        <form>
          <h2>Login</h2>
          <label htmlFor="email">E-mail</label>
          <div>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Insira seu e-mail"
              required="Text"
              onChange={changeValues}
              onKeyDown={handleKeyDown}
              className="input--field"
            />
          </div>
          <div>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Insira sua senha"
              onChange={changeValues}
              onKeyDown={handleKeyDown}
              className="input--field"
            />
          </div>
          <div className="login--buttons">
            <Button
              onClick={() => handleClickLogin()}
              label="Login"
              className="p-button-raised p-button-rounded"
            />
            <div className="elements">
              <div>
              <NavLink to="/loginTest">New Login screen</NavLink>
                <NavLink to="/">Esqueci a senha</NavLink>
              </div>
              <div>
                <NavLink to="/registroUsuario">Registrar-se</NavLink>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
