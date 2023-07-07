import React, { useState, useEffect } from "react";
import "./RegisterServiceScreen.css";
import CardRegister from "../cards/CardRegister";
import MenuBar from "../menubar/MenuBar";
import { registerService } from "../../services/registers/Registers";
import { getRegisteredServices } from "../../services/servicesFunctions/services";
import { useSelector } from "react-redux";

export default function RegisterServiceScreen() {
  const token = useSelector(
    ({
      rootReducer: {
        login: { token },
      },
    }) => token
  );
  
  const [listServices, setListServices] = useState();
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
  };

  return (
    <div>
      <MenuBar />
      <header className="header--container">
        <h1 className="title">Home Service</h1>
        <h2>Cadastre seus serviços aqui!</h2>
      </header>
      <section className="custom--section">
        <form>
          <div className="box-register">
            <label>Nome</label>
            <input
              id="name"
              name="name"
              placeholder="Digite seu nome"
              required="Text"
              onChange={changeValues}
              value={values.name}
              className="input--field"
            />
          </div>
          <div className="box-register">
            <label>Profissão</label>
            <input
              id="profession"
              name="profession"
              placeholder="Digite sua profissão"
              required="Text"
              onChange={changeValues}
              value={values.profession}
              className="input--field"
            />
          </div>
          <div className="box-register">
            <label>Cidade de atuação</label>
            <input
              id="city"
              name="city"
              placeholder="Principal"
              required="Text"
              onChange={changeValues}
              value={values.city}
              className="input--field"
            />
          </div>
          <div className="box-register">
            <label>Cidade de atuação (opcional)</label>
            <input
              id="city2"
              name="city2"
              placeholder="Secundaria (opcional)"
              required="Text"
              onChange={changeValues}
              value={values.city2}
              className="input--field"
            />
          </div>
          <div className="box-register">
            <label>Número de telefone</label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Digite o número de telefone"
              required="Text"
              onChange={changeValues}
              value={values.phoneNumber}
              className="input--field"
            />
          </div>
          <div className="box-register">
            <label>Descrição</label>
            <textarea
              rows="8"
              name="description"
              required="text"
              onChange={changeValues}
              value={values.description}
              className="input--field"
            />
          </div>

          <div className="buttons">
            <button
              type="button"
              className="action--buttons"
              onClick={() => handleClickRegisterService()}
            >
              Cadastrar
            </button>
            <button
              className="action--buttons"
              type="reset"
              onClick={() => clearInputs()}
            >
              Descartar
            </button>
          </div>
        </form>
      </section>

      <div className="services--title">
        <h1>Seus serviços cadastrados</h1>
      </div>

      <div className="service--card">
        {typeof listServices !== "undefined" &&
          listServices.map((values) => {
            return (
              <CardRegister
                key={values.id}
                listCard={listServices}
                setListCard={setListServices}
                id={values.id}
                name={values.name}
                profession={values.profession}
                city={values.city}
                city2={values.city2}
                phoneNumber={values.phone_number}
                description={values.description}
              ></CardRegister>
            );
          })}
      </div>
    </div>
  );
}
