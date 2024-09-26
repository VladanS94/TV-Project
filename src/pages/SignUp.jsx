import React, { useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import { paths } from "../root/AppRoutes";

const SignUp = () => {
  // Use one state object to handle both email and password
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value, // Dynamically update the field based on input name
    }));
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (user.email && user.password) {
      // Fetch existing users from localStorage or create a new array if none exist
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // Create a new user object
      const newUser = {
        id: users.length + 1,
        email: user.email,
        password: user.password,
      };

      // Add the new user to the array
      users.push(newUser);

      // Save the updated users array back to localStorage
      localStorage.setItem("users", JSON.stringify(users));

      alert("Sign up successful! User stored in local storage.");

      // Optionally clear the form after submission
      setUser({
        email: "",
        password: "",
      });
    } else {
      alert("Please fill out both fields.");
    }
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
