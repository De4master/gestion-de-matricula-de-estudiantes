import api from "./client";

export const listStudents = async () => (await api.get("/students/")).data;
export const createStudent = async (payload) => (await api.post("/students/", payload)).data;
