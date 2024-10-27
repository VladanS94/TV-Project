import axios from "axios";
import { useCallback, useState } from "react";

const apiKey = process.env.REACT_APP_API_KEY;

const usePost = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const usePost = useCallback(
    async (postData) => {
      setLoading(true);
      try {
        const response = await axios.post(`${url}?api_key=${apiKey}`, postData);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [url]
  );

  return {
    data,
    error,
    loading,
    usePost,
  };
};

export default usePost;
