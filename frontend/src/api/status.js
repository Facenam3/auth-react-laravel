import api from "./axios";

export const getStatuses = async () => {
    return api.get('/status/show-all');
}

export const getProjectStatuses = async () => {
    return api.get("/status/project-statuses");
}