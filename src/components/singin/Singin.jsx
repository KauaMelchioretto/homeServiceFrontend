import React, { useState } from "react";
import MenuBar from "../menubar/MenuBar";
import { login } from "../../services/login";
import "../registers/Forms.css";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function Singin({ callback }) {
  const [values, setValues] = useState({});

  const handleClickLogin = async () => {
    const email = values.email;
    const password = values.password;
    const token = await login(email, password);
    localStorage.setItem("token", token);
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

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <MenuBar />
      <header className="header--container">
        <h1>Home Serivce</h1>
      </header>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              label="E-mail"
              autoComplete="email"
              autoFocus
              type="text"
              id="email"
              name="email"
              placeholder="Insira seu e-mail"
              required="Text"
              onChange={changeValues}
              onKeyDown={handleKeyDown}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              autoComplete="current-password"
              label="Senha"
              type="password"
              id="password"
              name="password"
              placeholder="Insira sua senha"
              onChange={changeValues}
              onKeyDown={handleKeyDown}
              className="input--field"
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => handleClickLogin()}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueci minha senha
                </Link>
              </Grid>
              <Grid item>
                <Link href="/registroUsuario" variant="body2">
                 {"Registrar-se"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
