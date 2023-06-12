import axios from "axios";
import { allActions } from "../redux/actions";
import store from "../redux/store/index";

var httpAgent = axios.create({
  baseURL: process.env.REACT_APP_API_URL ,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

export async function login(email, password) {
    const data = await httpAgent.post("/login", {
      email,
      password,
    });
    if (data.data.token != undefined) 
     return data.data.token;

    else window.alert("Email ou senha incorretos!");
}

export async function logout({ token }) {
  try {
    store.dispatch(allActions.doResetLogin({ token }));
  } catch (error) {
    console.log("[Error] - logout", error);
    return false;
  }
  return true;
}