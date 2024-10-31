import { useState } from "react";
import { axiosInstance } from "../axios/config";
import { useLocalStorage } from "react-use";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [token, setToken] = useLocalStorage("token", null);

  const logIn = async (url, payload) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post(url, payload);
      setData(response.data);
      setToken(response.data.token);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Invalid email or password.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { logIn, data, loading, error };
};

export default useAuth;
