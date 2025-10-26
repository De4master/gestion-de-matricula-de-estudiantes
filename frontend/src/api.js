import axios from "axios";

// Lee la URL del backend desde variable de entorno o usa default.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const api = axios.create({ baseURL: API_URL });

// token JWT en cada request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ---------- Auth ----------
export async function apiLogin(username, password) {
  const { data } = await api.post("/auth/token/", { username, password });
  // SimpleJWT: { access, refresh }
  localStorage.setItem("token", data.access);
  localStorage.setItem("refresh", data.refresh);
  return data;
}

// ---------- Students ----------
export const studentsList = async () => (await api.get("/students/")).data;
export const studentsCreate = async (payload) => (await api.post("/students/", payload)).data;
export const studentsDelete = async (id) => (await api.delete(`/students/${id}/`)).data;

// ---------- Sections ----------
export const sectionsList = async () => (await api.get("/sections/")).data;
export const sectionsCreate = async (payload) => (await api.post("/sections/", payload)).data;
export const sectionsDelete = async (id) => (await api.delete(`/sections/${id}/`)).data;
