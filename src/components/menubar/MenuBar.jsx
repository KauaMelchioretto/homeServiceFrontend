import { React } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../../hooks/auth";
import axios from "axios";
import "./MenuBar.css";

var httpAgent = axios.create({
  baseURL: process.env.REACT_APP_API_URL ,
});

httpAgent.defaults.withCredentials = true;

export default function MenuBar() {
  const navigate = useNavigate();
  var token = useSelector(
    ({
      rootReducer: {
        login: { token },
      },
    }) => token
  );
  const auth = useAuth();
  var cookieToken;

  const onLogout = async () => {
    var res = httpAgent.get("/clearcookie");
    auth.logout(token);
    navigate("/inicio");
  };

  const loginSession = async() => {
    if (auth.user == null) {
      cookieToken = await httpAgent.get("/getcookie");
      const data = JSON.stringify(cookieToken.data.token);
      if (cookieToken.data.token != undefined) {
        token = data.replace(/[{}"]/g, "");
        auth.login(token);
      }
    }
  };

  const withoutAuthentication = (
    <ul>
      {loginSession()}
      <li>
        <button onClick={() => navigate("/inicio")} id="menu--items">
          Home
        </button>
      </li>
      <li>
        <button onClick={() => navigate("/login")} id="menu--items">
          Login
        </button>
      </li>
    </ul>
  );

  const withAuthentication = (
    <ul>
       {loginSession()}
      <li>
        <button onClick={() => navigate("/inicio")} id="menu--items">
          Home
        </button>
      </li>
      <li>
        <button
          onClick={() => navigate("/registrosDeServicos")}
          id="menu--items"
        >
          Cadastre seu serviço
        </button>
      </li>
      <li>
        <button onClick={() => onLogout()} id="menu--items">
          Sair
        </button>
      </li>
    </ul>
  );
  return (
    <nav id="menu--nav">
      {token ? withAuthentication : withoutAuthentication}
    </nav>
  );
}
