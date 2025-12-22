import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Locations from "./pages/Locations";
import Rooms from "./pages/Rooms";
import BookingResult from "./pages/BookingResult";
import MyBookings from "./pages/MyBookings";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/rooms/:locationId" element={<Rooms />} />
        <Route path="/result" element={<BookingResult />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </Layout>
  );
}
