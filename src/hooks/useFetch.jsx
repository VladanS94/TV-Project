import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const apiKey = process.env.REACT_APP_API_KEY;

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const urlWithPage = url + `?api_key=${apiKey}&page=${page}?&with_genres=14`;

  const handlePageAdd = () => setPage((prev) => prev + 1);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(urlWithPage);
      setData((prev) => [...prev, ...data?.results]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [urlWithPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    error,
    loading,
    handlePageAdd,
  };
};

export default useFetch;
