import React, { useState, useEffect } from "react";
import "./RegisterServiceScreen.css";
import MenuBar from "../menubar/MenuBar";
import { registerService } from "../../services/registers/Registers";
import { getRegisteredServices } from "../../services/servicesFunctions/services";
import { useSelector } from "react-redux";
import FormDialog from "../dialog/dialog";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function RegisterServiceScreen() {
  const token = useSelector(
    ({
      rootReducer: {
        login: { token },
      },
    }) => token
  );

  const defaultTheme = createTheme();

  const [listServices, setListServices] = useState([]);
  const [showServices, setShowServices] = useState(false);
  const [values, setValues] = useState({
    name: "",
    profession: "",
    profession: "",
    city: "",
    city2: "",
    phoneNumber: "",
    description: "",
  });
  const [open, setOpen] = useState(false);

  const handleClickCard = () => {
    setOpen(true);
  };

  const changeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleClickRegisterService = async () => {
    if (validation(values)) {
      const name = values.name;
      const profession = values.profession;
      const city = values.city;
      const city2 = values.city2;
      const phoneNumber = values.phoneNumber;
      const description = values.description;

      await registerService(
        token,
        name,
        profession,
        city,
        city2,
        phoneNumber,
        description
      );
      clearInputs();
      updateRegisteredServices();
      window.alert("Serviço cadastrado com sucesso!");
    }
  };

  const validation = () => {
    var message = "";
    if (values.name == "") {
      message += "Informe um nome!\n";
    }
    if (values.profession == "") {
      message += "Informe uma profissão!\n";
    }
    if (values.city == "") {
      message += "Informe uma cidade!\n";
    }
    if (values.phoneNumber == "") {
      message += "Informe um número de telefone!\n";
    }
    if (message != "") {
      window.alert(message);
      return false;
    }
    return true;
  };

  const clearInputs = () => {
    setValues({
      name: "",
      profession: "",
      city: "",
      city2: "",
      phoneNumber: "",
      description: "",
    });
  };

  useEffect(async () => {
    updateRegisteredServices();
  }, []);

  async function updateRegisteredServices() {
    const result = await getRegisteredServices(token);
    setListServices(result);
    setShowServices(true);
  }

  return (
    <div>
      <MenuBar />
      <header className="header--container">
        <h1 className="title">Home Service</h1>
        <h2>Cadastre seus serviços aqui!</h2>
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
                label="Nome"
                autoComplete="nome"
                autoFocus
                id="name"
                name="name"
                placeholder="Digite seu nome"
                onChange={changeValues}
                value={values.name}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required="Text"
                fullWidth
                label="Profissão"
                autoComplete="profession"
                id="profession"
                name="profession"
                placeholder="Digite sua profissão"
                onChange={changeValues}
                value={values.profession}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required="Text"
                fullWidth
                label="Cidade de atuação (principal)"
                autoComplete="city"
                id="city"
                name="city"
                placeholder="Principal"
                onChange={changeValues}
                value={values.city}
              />
              <TextField
                variant="outlined"
                margin="normal"
                label="Cidade de atuação (opcional)"
                autoComplete="city2"
                fullWidth
                id="city2"
                name="city2"
                placeholder="Secundaria (opcional)"
                onChange={changeValues}
                value={values.city2}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                autoComplete="phoneNumber"
                required="Text"
                label="Número de telefone"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Digite o número de telefone"
                onChange={changeValues}
                value={values.phoneNumber}
                className="input--field"
              />
              <TextField
                label="Descrição"
                margin="normal"
                multiline
                fullWidth
                rows="8"
                name="description"
                onChange={changeValues}
                value={values.description}
                className="input--field"
              />

              <Grid container gap={2}>
                <Grid item sm>
                  <Button
                    fullWidth
                    variant="contained"
                    type="reset"
                    sx={{ mt: 3, mb: 3 }}
                    onClick={() => clearInputs()}
                  >
                    Descartar
                  </Button>
                </Grid>
                <Grid item sm>
                  <Button
                    fullWidth
                    variant="contained"
                    type="button"
                    onClick={() => handleClickRegisterService()}
                    sx={{ mt: 3, mb: 3 }}
                  >
                    Cadastrar
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>

      <div className="services--title">
        <h1>Seus serviços cadastrados</h1>
      </div>

      <div className="table-div">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Profissão</th>
              <th>Cidade</th>
              <th>Cidade (Secudária)</th>
              <th>Número de telefone</th>
              <th>Descrição</th>
            </tr>
          </thead>
          {typeof listServices !== "undefined" &&
            listServices.map((values) => {
              return (
                <>
                  <FormDialog
                    open={open}
                    setOpen={setOpen}
                    className="dialog"
                    id={values.id}
                    name={values.name}
                    profession={values.profession}
                    city={values.city}
                    city2={values.city2}
                    phoneNumber={values.phone_number}
                    description={values.description}
                    listCard={values.listCard}
                    setListServices={setListServices}
                  />
                  <tbody>
                    <tr onClick={() => handleClickCard()}>
                      <td>{values.name}</td>
                      <td>{values.profession}</td>
                      <td>{values.city}</td>
                      <td>{values.city2}</td>
                      <td>{values.phone_number}</td>
                      <td>{values.description}</td>
                    </tr>
                  </tbody>
                </>
              );
            })}
        </table>
      </div>
    </div>
  );
}
