import axios from "axios";

const apiNoPrefix = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
    headers: {Accept: "application/json"}
});

const csrf = () => apiNoPrefix.get("/sanctum/csrf-cookie");

export default csrf;