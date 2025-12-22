import { useLocation, Link } from "react-router-dom";

export default function BookingResult() {
  const { state } = useLocation();

  if (!state) {
    return <p>No booking data.</p>;
  }

  return (
    <div className="card">
  <h2>Booking Confirmed ✅</h2>

  <p><strong>Booking ID:</strong> {state.bookingId}</p>
  <p><strong>Final Price:</strong> £{state.finalPrice}</p>
  <p><strong>Weather Temperature:</strong> {state.temperature} °C</p>

  <p className="success">
    Your room has been successfully booked.
  </p>

  <a className="link" href="/locations">
    Book another room →
  </a>
</div>

  );
}
