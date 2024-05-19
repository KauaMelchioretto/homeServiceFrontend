import React, { useState } from "react";
import MenuBar from "../menubar/MenuBar";
import "./Forms.css";
import {
  registerUser,
  verifyUserEmail,
} from "../../services/registers/Registers";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function UserRegister() {
  const [values, setValues] = useState({});

  const changeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleClickRegisterUser = async () => {
    if (validation(values)) {
      const userName = values.userName;
      const email = values.email;
      const password = values.password;
      const verify = await verifyUserEmail(email);
      verify == false
        ? window.alert("Email já cadastrado!")
        : await registerUser(userName, email, password);
      clearInputs();
    }
  };

  const clearInputs = () => {
    setValues({
      userName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      handleClickRegisterUser();
    }
  };

  const validation = () => {
    var message = "";
    if (values.userName == "") {
      message += "Insira um nome de usuário!\n";
    }
    if (values.email == "") {
      message += "Insira um e-mail para cadastro!\n";
    }
    if (values.password == "") {
      message += "Insira uma senha para cadastro!\n";
    }
    if (values.passwordConfirmation != values.password) {
      message += "As senhas não correspondem!\n";
    }
    if (message != "") {
      window.alert(message);
      return false;
    }
    return true;
  };

  const defaultTheme = createTheme();

  return (
    <div>
      <MenuBar />
      <header className="header--container">
        <h1>Home Service</h1>
        <h2>Registre sua conta aqui!</h2>
      </header>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                variant="outlined"
                margin="normal"
                required="Text"
                fullWidth
                autoComplete="userName"
                autoFocus
                label="Nome"
                type="text"
                id="userName"
                name="userName"
                placeholder="Digite seu nome"
                onChange={changeValues}
                value={values.userName}
                onKeyDown={handleKeyDown}
              />
              <TextField
                fullWidth
                autoComplete="email"
                label="E-mail"
                margin="normal"
                variant="outlined"
                type="text"
                id="email"
                name="email"
                placeholder="Digite seu e-mail para cadastro"
                required="Text"
                onChange={changeValues}
                value={values.email}
                onKeyDown={handleKeyDown}
              />
              <TextField
                label="Senha"
                margin="normal"
                fullWidth
                required
                variant="outlined"
                type="password"
                id="password"
                name="password"
                placeholder="Digite sua senha para cadastro"
                onChange={changeValues}
                value={values.password}
                onKeyDown={handleKeyDown}
              />
              <TextField
                variant="outlined"
                label="Confirmação de senha"
                fullWidth
                margin="normal"
                type="password"
                id="passwordConfirmation"
                name="passwordConfirmation"
                placeholder="Cofirmação de senha"
                onChange={changeValues}
                value={values.passwordConfirmation}
                className="user-register-input"
                onKeyDown={handleKeyDown}
              />

              <Grid container gap={2}>
                <Grid item sm>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 3 }}
                    type="reset"
                    onClick={() => clearInputs()}
                  >
                    Descartar
                  </Button>
                </Grid>

                <Grid item sm>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 3 }}
                  type="button"
                  onClick={() => handleClickRegisterUser()}
                >
                  Cadastrar-se
                </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
