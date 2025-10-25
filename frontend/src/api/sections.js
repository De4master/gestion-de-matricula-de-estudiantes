import api from "./client";

export const listSections = async () => (await api.get("/sections/")).data;
