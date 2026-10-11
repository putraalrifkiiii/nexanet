import axios from "axios";

const BASE_URL = import.meta.env.VITE_REACT_API_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiClient;

export const isAxiosError = axios.isAxiosError;
