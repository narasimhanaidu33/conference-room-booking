import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost",
});

export const authApi = axios.create({
  baseURL: "http://localhost:5001/api/auth",
});

export const roomApi = axios.create({
  baseURL: "http://localhost:5003/api",
});

export const bookingApi = axios.create({
  baseURL: "http://localhost:5005/api",
});

export const withAuth = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
