import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LogInPage.css";
import { useUserContext } from "../context";

const LogInPage = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const users = useUserContext();
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      console.log(user);
      setUser(user);
      alert("Login successful! Redirecting to homepage...");
      navigate("/");
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="login-container">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={users.email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={users.password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>
      <Link to="/forgot-password">Forgot Password?</Link>
    </div>
  );
};

export default LogInPage;
