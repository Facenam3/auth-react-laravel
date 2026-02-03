import api from "./axios";

export const getUsers = (page = 1) => {
    return api.get(`/users/all?page=${page}`);
}

export const login = async (data) => {
   return api.post("/login", data);
};

export const register = async (data) => {
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