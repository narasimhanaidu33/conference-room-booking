import axios from "axios";

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API,
});

export const roomApi = axios.create({
  baseURL: import.meta.env.VITE_ROOM_API,
});

export const bookingApi = axios.create({
  baseURL: import.meta.env.VITE_BOOKING_API,
});

export const withAuth = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

