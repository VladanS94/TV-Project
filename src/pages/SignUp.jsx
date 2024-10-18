import React, { useCallback, useEffect, useRef, useState } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../root/AppRoutes";

const SignUp = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const emailButtonRef = useRef(null);
  const passwordButtonRef = useRef(null);
  const signupButtonRef = useRef(null);
  const logInButtonRef = useRef(null);

  const sendToLogInPage = useCallback(() => {
    navigate(paths.login);
  }, [navigate]);

  const handleKeyNavigation = useCallback((e) => {
    if (e.key === "ArrowDown") {
      if (document.activeElement === emailButtonRef.current) {
        passwordButtonRef.current.focus();
      } else if (document.activeElement === passwordButtonRef.current) {
        signupButtonRef.current.focus();
      } else if (document.activeElement === signupButtonRef.current) {
        logInButtonRef.current.focus();
      }
    } else if (e.key === "ArrowUp") {
      if (document.activeElement === signupButtonRef.current) {
        passwordButtonRef.current.focus();
      } else if (document.activeElement === passwordButtonRef.current) {
        emailButtonRef.current.focus();
      }
    }
  }, []);

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

  useEffect(() => {
    emailButtonRef.current.focus();
    window.addEventListener("keydown", handleKeyNavigation);

    return () => {
      window.removeEventListener("keydown", handleKeyNavigation);
    };
  }, [handleKeyNavigation]);

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
            ref={emailButtonRef}
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
            ref={passwordButtonRef}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" ref={signupButtonRef}>
          Sign Up
        </button>
        <p>
          You allready have Acc?
          <Link
            ref={logInButtonRef}
            to={paths.login}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendToLogInPage();
              }
            }}
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
