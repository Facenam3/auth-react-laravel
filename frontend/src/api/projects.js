import api from "./axios";

export const getProjects = (page = 1) => {
    return api.get(`/project/show-all?page=${page}`);
}

export const store = async (data) => {
    return api.get(`/project/store`, data);
}

export const updateProject = async (id, data) => {
    return api.get(`/project/update/${id}`, {id, data});
}

export const showProject = async (id) => {
    return api.get(`/project/show/${id}`);
}

export const deleteProject = (id) => {
    return api.get(`/project/delete/${id}`);
}

export const getByStatus = (status) => {
    return api.get(`/project/status/${status}`);
}

