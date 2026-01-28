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

export const update = async (id, data) => {
    return api.post("/users/update", {id, data});
};

export const deleteUser = async (id) => {
    return api.delete("/users/delete", id);
};

export const getUser = () => {
    return api.get("/user");
}