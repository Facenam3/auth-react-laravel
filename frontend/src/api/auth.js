import api from "./axios";

export const csrf = () => api.get("/sanctum/csrf-cookie");

export const login = async (data) => {
    await csrf();
    return api.post("/login", data);
};

export const register = async (data) => {
    await csrf();
    return api.post("/register", data);
};

export const logout = async () => {
    return api.post("/logot");
};

export const getUser = () => {
    return api.get("/user");
}