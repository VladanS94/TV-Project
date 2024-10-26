import React, { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import "./LogInPage.css";
import { useLocalStorage } from "react-use";
import { axiosInstance } from "../../axios/config";
import KeyboardModal from "../../components/Keyboard/KeyboardModal";
import Loader from "../../components/Loader/Loader";

const LogInPage = ({ setCurrentModal }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useLocalStorage("token", null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [focusedInput, setFocusedInput] = useState("");

  const emailButtonRef = useRef(null);
  const passwordButtonRef = useRef(null);
  const loginButtonRef = useRef(null);
  const signUpAccountRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axiosInstance.post("/", user);
      setToken(response.data.token);
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
    setCurrentModal("home");
  };

  const handleKeyNavigation = useCallback((e) => {
    if (e.key === "ArrowDown") {
      if (document.activeElement === emailButtonRef.current) {
        passwordButtonRef.current.focus();
      } else if (document.activeElement === passwordButtonRef.current) {
        loginButtonRef.current.focus();
      } else if (document.activeElement === loginButtonRef.current) {
        signUpAccountRef.current.focus();
      }
    } else if (e.key === "ArrowUp") {
      if (document.activeElement === signUpAccountRef.current) {
        loginButtonRef.current.focus();
      } else if (document.activeElement === loginButtonRef.current) {
        passwordButtonRef.current.focus();
      } else if (document.activeElement === passwordButtonRef.current) {
        emailButtonRef.current.focus();
      }
    }
  }, []);

  const handleShowKeyboard = (e) => {
    if (e.key === "Enter") {
      if (document.activeElement === emailButtonRef.current) {
        setFocusedInput("email");
      } else if (document.activeElement === passwordButtonRef.current) {
        setFocusedInput("password");
      }
      setKeyboardVisible(true);
    }
    if (e.key === "Escape") {
      setKeyboardVisible(false);
    }
  };

  useEffect(() => {
    emailButtonRef.current.focus();
    window.addEventListener("keydown", handleKeyNavigation);
    return () => {
      window.removeEventListener("keydown", handleKeyNavigation);
    };
  }, [handleKeyNavigation]);

  return (
    <div className="login">
      {loading ? (
        <Loader />
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
                onKeyDown={handleShowKeyboard}
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
                onKeyDown={handleShowKeyboard}
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
          <p>
            Don't have an account?
            <Link
              ref={signUpAccountRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setCurrentModal("sign-up");
                }
              }}
            >
              Sign Up
            </Link>
          </p>
          <Link>Forgot Password?</Link>
        </div>
      )}
      <KeyboardModal
        show={keyboardVisible}
        onClose={() => setKeyboardVisible(false)}
        inputType={focusedInput}
      />
    </div>
  );
};

export default LogInPage;
