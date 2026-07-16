import React, { useState } from "react";
import "./LoginPage.css";

function LoginPage({ onLogin }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setError("");

  try {
    const response = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("hotel_admin_logged", "true");
      onLogin();
    } else {
      setError(data.message);
    }
  } catch (err) {
    console.error(err);
    setError("Unable to connect to backend");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-wrapper">
      <div className="login-card">

        <div className="login-header">
          <h2>🏨 Grand Stay Hotel</h2>
          <p>Hotel Management System</p>
        </div>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="login-btn" type="submit">
            {loading ? "Logging..." : "Login"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default LoginPage;