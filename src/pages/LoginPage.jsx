import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Singin from "../components/login/Singin";
import { useAuth } from "../hooks/auth.js";
import "../components/login/Login.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();

  function onLogin(token) {
    auth.login(token, () =>
      navigate(location.state?.from?.pathname || "/inicio", { replace: true })
    );
  }

  useEffect(() => {
    if (auth.user)
      navigate(location.state?.from?.pathname || "/inicio", { replace: true });
  }, []);

  return (
    <div>
      <Singin callback={onLogin} />
    </div>
  );
}
