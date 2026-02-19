import api from "./axios";

export const getStatuses = async () => {
    return api.get('/status/show-all');
}