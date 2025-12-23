import axios from "axios";

// Generic API (optional)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "",
});

// Auth service
export const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API,
});

// Room service
export const roomApi = axios.create({
  baseURL: import.meta.env.VITE_ROOM_API,
});

// Booking service
export const bookingApi = axios.create({
  baseURL: import.meta.env.VITE_BOOKING_API,
});

// JWT helper
export const withAuth = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default api;
