import { useEffect, useState } from "react";
import { bookingApi, withAuth } from "../api";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    bookingApi
      .get("/bookings/my", withAuth())
      .then(res => setBookings(res.data));
  }, []);

  return (
    <div>
      <h2>My Bookings</h2>

      {bookings.length === 0 && (
        <p>No bookings found.</p>
      )}

      {bookings.map(b => (
        <div className="card" key={b._id}>
          <p><strong>Booking ID:</strong> {b._id}</p>
          <p><strong>Room ID:</strong> {b.roomId}</p>
          <p><strong>Location:</strong> {b.locationName}</p>
          <p><strong>Date:</strong> {b.date}</p>
          <p><strong>Final Price:</strong> £{b.finalPrice}</p>
          <p><strong>Temperature:</strong> {b.temperature} °C</p>
        </div>
      ))}
    </div>
  );
}
