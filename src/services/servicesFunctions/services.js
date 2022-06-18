import Axios from "axios";

var httpAgent = Axios.create({
    baseURL: process.env.REACT_APP_API_URL ,
});
httpAgent.defaults.withCredentials = true;

export async function editService(id, name, profession, city, city2, numberTel, description) {
    const result =
    await httpAgent.put("/editService", {
        id,
        name,
        profession,
        city,
        city2,
        numberTel,
        description,
    }); return result;
}

export async function deleteService(id) {
    const result =
    await httpAgent.delete(`/deleteService/${id}`);
}

export async function deleteAvaliationService(id) {
    const result = 
    await httpAgent.delete(`/deleteAvaliation/${id}`);
}