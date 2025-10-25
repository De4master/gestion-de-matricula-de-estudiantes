import api from "./client";

export async function login(username, password) {
  const { data } = await api.post("/auth/token/", { username, password });
  localStorage.setItem("access", data.access);
  localStorage.setItem("refresh", data.refresh);
  return data;
}

export function logout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
}

export function isAuthenticated() {
  return !!localStorage.getItem("access");
}
