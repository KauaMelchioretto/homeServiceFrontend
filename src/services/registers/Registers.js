import Axios from "axios";

var httpAgent = Axios.create({
  baseURL: process.env.REACT_APP_API_URL ,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});
httpAgent.defaults.withCredentials = true;

export async function getUserName(userToken) {
  var userToken = await (await httpAgent.get("/getcookie")).data.token;
  if(userToken != undefined) {
    var username =
    await httpAgent.post("/getUserName", {
      userToken,
    });
    return username.data;
    
  } return undefined;
}

  export async function registerAvaliation(idService, userToken, comment, avaliation) {
        await httpAgent.post("/registrarAvaliacao", {
        idService,
        userToken,
        comment,
        avaliation,
      });
    }

   export async function registerService(userToken, name, profession, city, city2,numberTel, description) {
        await httpAgent.post("/registrosDeServicos", {
          userToken,
          name,
          profession,
          city,
          city2,
          numberTel,
          description,
        });
      }

    export async function verifyUserEmail(email) {
      const verify =
      await httpAgent.post("/getEmailUsuario", {
        email,
      });
        if (verify.data.length === 0) {
           return true;
        }
         else
           return false;
    }

    export async function registerUser(userName, email, password) {
      await httpAgent.post("/registroUsuario", {
        userName,
        email,
        password,
      }); window.alert("Cadastrado com sucesso!");
    }

   