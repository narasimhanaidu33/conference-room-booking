import { useState } from "react";
import { authApi } from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const res = await authApi.post("/login", { email, password });
    localStorage.setItem("token", res.data.token);
    navigate("/locations");
  };

  return (
    <div className="form-card">
  <h2>Devops</h2>

  <input
    placeholder="Email"
    onChange={e => setEmail(e.target.value)}
  />

  <input
    type="password"
    placeholder="Password"
    onChange={e => setPassword(e.target.value)}
  />

  <button onClick={login}>Login</button>

  <p style={{ textAlign: "center", marginTop: "12px" }}>
    <a className="link" href="/register">Create an account</a>
  </p>
</div>
  );
}
