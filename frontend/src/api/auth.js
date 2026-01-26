import api from "./axios";
import csrf from "./csrf";

export const getUsers = () => {
    return api.get('/users/all');
}

export const login = async (data) => {
   return api.post("/login", data);
};

export const register = async (data) => {
    await csrf();
    return api.post("/register", data);
};

export const logout = async () => {
    return api.post("/logout");
};

export const getUser = () => {
    return api.get("/user");
}