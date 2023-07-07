import axios from "axios";

var httpAgent = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

httpAgent.defaults.withCredentials = true;

export async function getUserName(userToken) {
  if (userToken != undefined) {
    var username = await httpAgent.post("/getUserName", {
      userToken,
    });
    return username.data;
  } else {
    return undefined;
  }
}

export async function registerAvaliation(
  serviceId,
  userToken,
  comment,
  avaliation
) {
  await httpAgent.post("/registrarAvaliacao", {
    serviceId,
    userToken,
    comment,
    avaliation,
  });
}

export async function registerService(
  userToken,
  name,
  profession,
  city,
  city2,
  phoneNumber,
  description
) {
  await httpAgent.post("/registrosDeServicos", {
    userToken,
    name,
    profession,
    city,
    city2,
    phoneNumber,
    description,
  });
}

export async function verifyUserEmail(email) {
  const verify = await httpAgent.post("/getEmailUsuario", {
    email,
  });
  if (verify.data.length === 0) return true;
  else return false;
}

export async function registerUser(userName, email, password) {
  await httpAgent.post("/registroUsuario", {
    userName,
    email,
    password,
  });
  window.alert("Cadastrado com sucesso!");
}