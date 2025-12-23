import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { bookingApi, roomApi, withAuth } from "../api";

export default function Rooms() {
  const { locationId } = useParams();
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch rooms for selected location
  useEffect(() => {
    roomApi
      .get(`/rooms?locationId=${locationId}`)
      .then(res => setRooms(res.data))
      .catch(() => setError("Failed to load rooms."));
  }, [locationId]);

  // Book room handler
  const bookRoom = async (roomId) => {
    setError("");
    setLoading(true);

    try {
      const res = await bookingApi.post(
        "/bookings",
        { roomId, date },
        withAuth()
      );

      await new Promise(resolve => setTimeout(resolve, 50));
      navigate("/result", { state: res.data });


    } catch (err) {
      console.error("BOOKING ERROR:", err);

      if (
        err.response?.status === 400 &&
        err.response.data?.error === "Room already booked for this date"
      ) {
        setError("This room is already booked for the selected date.");
      } else {
        setError("Booking failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Available Rooms</h2>
      <p>Select a date and choose a room to book.</p>

      {/* Date selection */}
      <div className="card">
        <label>
          <strong>Select booking date</strong>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </label>
      </div>

      {/* Error message */}
      {error && <p className="error">{error}</p>}

      {/* Rooms list */}
      {rooms.length === 0 && (
        <p>No rooms available for this location.</p>
      )}

      {rooms.map(room => (
        <div className="card" key={room._id}>
          <p><strong>Capacity:</strong> {room.capacity}</p>
          <p><strong>Base Price:</strong> £{room.basePrice}</p>

          <button
            disabled={!date || loading}
            onClick={() => bookRoom(room._id)}
          >
            {loading ? "Booking..." : "Book this room"}
          </button>
        </div>
      ))}
    </div>
  );
}
