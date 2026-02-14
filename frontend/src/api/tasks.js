import api from "./axios";

export const getTasks = (search, page) => {
    return api.get("/task/show-all", {params: {search, page}});
} 

export const getOpenTasks = (search, page) => {
    return api.get("/task/open-tasks", {params: {search, page}});
}

export const assignTask = (taskId) => {
    return api.post(`/task/${taskId}/assign`, {taskId});
}

export const store = async (data) => {
    return api.post("/task/store", data);
}

export const showTask = async (id) => {
    return api.get(`/task/show/${id}`);
}

export const updateTask = async (id, data) => {
    return api.post(`/task/update/${id}`, {id, data});
}

export const deleteTask = async (id) => {
    return api.post(`/task/delete/${id}`);
}

export const getByStatus = (status) => {
    return api.post(`/task/status/${status}`);
}