import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";
import { DialogContent } from "@material-ui/core";
import { DialogTitle } from "@material-ui/core";
import "./dialog.css";
import {
  deleteAvaliationService,
  deleteService,
  editService,
} from "../../services/servicesFunctions/services";
import axios from "axios";
import { getRegisteredServices } from "../../services/servicesFunctions/services";
import { useSelector } from "react-redux";

export default function FormDialog(props) {
  const token = useSelector(({rootReducer: {login: { token },},}) => token);

  const [editValues, setEditValues] = useState({
    id: props.id,
    name: props.name,
    profession: props.profession,
    city: props.city,
    city2: props.city2,
    phoneNumber: props.phoneNumber,
    description: props.description,
  });
  
  var httpAgent = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  httpAgent.defaults.withCredentials = true;

  const handleChangeValues = (value) => {
    setEditValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };
  
  const handleClose = () => {
    props.setOpen(false);
  };

  const validation = () => {
    var message = "";
    if (editValues.name == "") {
      message += "Informe um nome!\n";
    }
    if (editValues.profession == "") {
      message += "Informe uma profissão!\n";
    }
    if (editValues.city == "") {
      message += "Informe uma cidade!\n";
    }
    if (editValues.phoneNumber == "") {
      message += "Informe um número de telefone!\n";
    }
    if (message != "") {
      window.alert(message);
      return false;
    }
    return true;
  };

  const handleEditService = async () => {
    if (validation(editValues)) {
      const id = props.id;
      const name = editValues.name;
      const profession = editValues.profession;
      const city = editValues.city;
      const city2 = editValues.city2;
      const phoneNumber = editValues.phoneNumber;
      const description = editValues.description;
      const result = await editService(
        id,
        name,
        profession,
        city,
        city2,
        phoneNumber,
        description
      );
      
      window.alert("Salvo com sucesso!");
      handleClose();
      if (result != null) {
        listingCard();
      }
    }
  };

  const listingCard = async () => {
    const resultServices = await getRegisteredServices(token);
    props.setListCard(resultServices);
  };

  const handleDeleteService = async () => {
    const avaliationResult = await deleteAvaliationService(editValues.id);
    const serviceResult = await deleteService(editValues.id);
    if (avaliationResult != undefined && serviceResult != undefined) {
      window.alert("Serviço excluído com sucesso!");
      handleClose();
      listingCard();
    }
  };

  return (
    <div className="dialog">
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className="dialog--effect"
      >
        <DialogTitle id="form-dialog">Editar Serviço</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Nome"
            defaultValue={props.name}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="profession"
            name="profession"
            label="profissão"
            defaultValue={props.profession}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="city"
            name="city"
            label="Cidade de atuação"
            defaultValue={props.city}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="city2"
            name="city2"
            label="Cidade de atuação (SECUNDÁRIA)"
            defaultValue={props.city2}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="phoneNumber"
            name="phoneNumber"
            label="Número de telefone"
            defaultValue={props.phoneNumber}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            name="description"
            label="Descrição"
            defaultValue={props.description}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button color="primary" onClick={() => handleDeleteService()}>
            Excluir
          </Button>
          <Button color="primary" onClick={() => handleEditService()}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
