import api from "./axios";

export const getProjects = (page = 1) => {
    return api.get(`/project/show-all?page=${page}`);
}

export const updatProject = (id) => {
    return api.get(`/project/update/${id}`);
}

export const showProject = (id) => {
    return api.get(`/project/show/${id}`);
}

export const deleteProject = (id) => {
    return api.get(`/project/delete/${id}`);
}

export const getByStatus = (status) => {
    return api.get(`/project/status/${status}`);
}