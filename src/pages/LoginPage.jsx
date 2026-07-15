import React, { useState } from "react";
import "./LoginPage.css";

function LoginPage({ onLogin }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const USERNAME = "admin123";
    const PASSWORD = "admin";

    if (
      credentials.username.trim() === USERNAME &&
      credentials.password === PASSWORD
    ) {
      setError("");

      localStorage.setItem("isLoggedIn", "true");

      onLogin();
    } else {
      setError("❌ Invalid Username or Password");
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
            <label>Username</label>

            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              value={credentials.username}
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
            Login
          </button>

        </form>

        <div className="login-footer">
          <p>
            Demo Login
            <br />
            Username : <b>sanidhya123</b>
            <br />
            Password : <b>sanidhya</b>
          </p>
        </div>

      </div>
    </div>
  );
}

export default LoginPage;