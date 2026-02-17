import api from "./axios";

export const getCategories = async () => {
    return api.get("/category/show-all");
}