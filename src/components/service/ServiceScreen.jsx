import React, { useEffect, useState } from "react";
import "./ServiceScreen.css";
import { Rating } from "primereact/rating";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import CardService from "../cards/CardService";
import MenuBar from "../menubar/MenuBar";
import CardAvaliation from "../cards/CardAvaliation";
import { registerAvaliation } from "../../services/registers/Registers";
import { useSelector } from "react-redux";
import axios from "axios";
import { useAuth } from "../../hooks/auth";
import { useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function ServiceScreen() {
  const [value, setValue] = useState(0);
  const [stars, setStars] = useState(5);
  const [avaliations, setAvaliations] = useState({});
  const [listAvaliations, setListAvaliations] = useState();
  const auth = useAuth();
  const location = useLocation();
  const data = location.state.data;

  var token = useSelector(
    ({
      rootReducer: {
        login: { token },
      },
    }) => token
  );

  const changeAvaliations = (value) => {
    setAvaliations((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const validation = () => {
    var message = "";
    if (value == 0) message = "Informe alguma estrela de nível de avaliação!\n";
    if (message != "") {
      window.alert(message);
      return false;
    }
    return true;
  };

  var httpAgent = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  httpAgent.defaults.withCredentials = true;

  const handleClickAvaliation = async () => {
    if (token != undefined && auth.user != null) {
      if (validation(value)) {
        const userToken = token;
        const serviceId = data.id;
        const comment = avaliations.comment;
        const avaliation = value;
        userToken != undefined
          ? await registerAvaliation(serviceId, userToken, comment, avaliation)
          : window.alert("Faça login para registrar uma avaliação!");
        clearAvaliations();
        window.alert("Avaliado com sucesso!");
        updateAvaliationsComments();
      }
    } else window.alert("Faça login para registrar uma avaliação!");
  };

  const clearAvaliations = () => {
    setAvaliations({
      comment: "",
    });

    setValue(0);
    setStars(5);
  };

  useEffect(() => {
    updateAvaliationsComments();
  }, []);

  const updateAvaliationsComments = async () => {
    httpAgent
      .post("/getAvaliations", {
        serviceId: data.id,
      })
      .then((response) => {
        setListAvaliations(response.data);
      });
  };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <MenuBar />
      <header className="header--container">
        <h1 className="title">Home Service</h1>
        <h1>Detalhes do serviço</h1>
      </header>

      {
        <CardService
          key={data.id}
          id={data.id}
          name={data.name}
          profession={data.profession}
          city={data.city}
          city2={data.city2}
          phoneNumber={data.phoneNumber}
          description={data.description}
        ></CardService>
      }

      <Container
        component="main"
        maxWidth="sm"
        sx={{
          backgroundColor: "white",
          boxShadow: "2px 2px 12px rgba(0,0,0,0.2)",
          borderRadius: "5px",
        }}
      >
        <Box
          sx={{
            marginTop: 6,
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h1>Home Service</h1>
          <h2>Registre aqui sua avaliação!</h2>

          <div>
            <Rating
              value={value}
              cancel={false}
              onChange={(e) => setValue(e.value)}
              stars={stars}
            />
          </div>

          <Box
            sx={{
              marginTop: 2,
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <TextField
              multiline
              label="Comentário"
              placeholder="Digite seu comentário"
              name="comment"
              rows="5"
              cols="20"
              wrap="hard"
              className="input--field--avaliation"
              onChange={changeAvaliations}
              value={avaliations.comment}
            />

            <Button
              type="button"
              fullwidth
              variant="contained"
              sx={{ mt: 3, mb: 3 }}
              onClick={() => handleClickAvaliation()}
            >
              Registrar Avaliação
            </Button>
          </Box>

          {typeof listAvaliations !== "undefined" &&
            listAvaliations.map((values) => {
              return (
                <Box
                  sx={{
                    marginTop: 2,
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <CardAvaliation
                    key={values.id}
                    idavaliation={values.id}
                    listCard={listAvaliations}
                    setListAvaliations={setListAvaliations}
                    username={values.username}
                    comment={values.comment}
                    avaliation={values.avaliation}
                  ></CardAvaliation>
                </Box>
              );
            })}

        </Box>
      </Container>
    </ThemeProvider>
  );
}
