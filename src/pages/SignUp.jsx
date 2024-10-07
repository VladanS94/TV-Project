import React, { useState } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../root/AppRoutes";

const SignUp = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user.email && user.password) {
      const users = JSON.parse(localStorage.getItem("User")) || [];

      const newUser = {
        id: users.length + 1,
        email: user.email,
        password: user.password,
      };

      users.push(newUser);

      localStorage.setItem("User", JSON.stringify(users));

      alert("Sign up successful! User stored in local storage.");

      setUser({
        email: "",
        password: "",
      });
    } else {
      alert("Please fill out both fields.");
    }
    navigate(paths.login);
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <p>
          You allready have Acc? Click here:{" "}
          <Link to={paths.login}>Log in</Link>
        </p>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
