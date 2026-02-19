import api from "./axios";

export const getProjects = (search, page, status_id) => {
    return api.get("/project/projects", {params: {search, page, status_id}});
}

export const store = async (data) => {
    return api.post(`/project/store`, data);
}

export const updateProject = async (id, data) => {
    return api.post(`/project/update/${id}`, {id, data});
}

export const showProject = async (id) => {
    return api.get(`/project/show/${id}`);
}

export const deleteProject = (id) => {
    return api.post(`/project/delete/${id}`);
}

export const getByStatus = (status) => {
    return api.post(`/project/status/${status}`);
}

