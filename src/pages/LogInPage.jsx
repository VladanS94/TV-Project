import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LogInPage.css";
import api from "../hooks/mockAPI";

const LogInPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const emailButtonRef = useRef(null);
  const passwordButtonRef = useRef(null);
  const loginButtonRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/login", user);

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("token", response.data.token);
      // localStorage.setItem("User", JSON.stringify(response.data.user));

      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid email or password.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }

    setUser({
      email: "",
      password: "",
    });
  };

  const handleKeyNavigation = useCallback((e) => {
    if (e.key === "ArrowDown") {
      if (document.activeElement === emailButtonRef.current) {
        passwordButtonRef.current.focus();
      } else if (document.activeElement === passwordButtonRef.current) {
        loginButtonRef.current.focus();
      }
    } else if (e.key === "ArrowUp") {
      if (document.activeElement === loginButtonRef.current) {
        passwordButtonRef.current.focus();
      } else if (document.activeElement === passwordButtonRef.current) {
        emailButtonRef.current.focus();
      }
    }
  }, []);

  useEffect(() => {
    emailButtonRef.current.focus();
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated) {
      navigate("/");
    }

    window.addEventListener("keydown", handleKeyNavigation);

    return () => {
      window.removeEventListener("keydown", handleKeyNavigation);
    };
  }, [handleKeyNavigation, navigate]);

  return (
    <div className="login-container">
      {loading ? (
        <p className="loading-message">Loading...</p>
      ) : (
        <div>
          <h2>Log In</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                value={user.email}
                onChange={handleInputChange}
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
                id="password"
                value={user.password}
                onChange={handleInputChange}
                ref={passwordButtonRef}
                placeholder="Enter your password"
                required
              />
            </div>
            {error && (
              <h3 className="error-message" style={{ color: "red" }}>
                {error}
              </h3>
            )}

            <button type="submit" ref={loginButtonRef}>
              Log In
            </button>
          </form>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      )}
    </div>
  );
};

export default LogInPage;
