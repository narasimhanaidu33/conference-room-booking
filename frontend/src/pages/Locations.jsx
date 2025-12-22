import { useEffect, useState } from "react";
import { roomApi } from "../api";
import { Link } from "react-router-dom";

export default function Locations() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    roomApi.get("/locations").then(res => setLocations(res.data));
  }, []);

  return (
    <div>
      <a className="link" href="/my-bookings">
      View My Bookings →
      </a>

      <h2>Available Locations</h2>

      {locations.map(l => (
        <div className="card" key={l._id}>
          <h3>{l.name}</h3>
          <p>City: {l.city}</p>

          <Link className="link" to={`/rooms/${l._id}`}>
            View available rooms →
          </Link>
        </div>
      ))}
    </div>

  );
}
