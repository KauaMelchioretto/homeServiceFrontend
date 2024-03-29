import axios from "axios";

var httpAgent = axios.create({
    baseURL: process.env.REACT_APP_API_URL ,
});
httpAgent.defaults.withCredentials = true;

export async function editService(id, name, profession, city, city2, phoneNumber, description) {
    const result =
    await httpAgent.put("/editService", {
        id,
        name,
        profession,
        city,
        city2,
        phoneNumber,
        description,
    }); return result;
}

export async function deleteService(id) {
    const result =
    await httpAgent.post("/deleteService", {
        id,
    }); return result;
}

export async function deleteAvaliationService(id) {
    const result = 
    await httpAgent.post("/deleteAvaliation", {
        id,
    }); return result;
}

export async function getRegisteredServices(userToken) {
    const result = 
    await httpAgent.post(`/getCards`, {
        userToken
    }); return result.data;
}