import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const apiKey = process.env.REACT_APP_API_KEY;

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [horor, setHoror] = useState([]);
  const [popular, setPopular] = useState([]);

  const urlWithPage = url + `?api_key=${apiKey}&page=${page}`;

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

  const fetchHororMovie = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=14`
      );
      setHoror(response.data.results);
    } catch (error) {
      console.error("Error fetching the movie data:", error);
    }
  }, []);

  const fetchPopularMovie = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=1`
      );
      setPopular(response.data.results);
    } catch (error) {
      console.error("Error fetching the movie data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
    fetchHororMovie();
    fetchPopularMovie();
  }, [fetchData, fetchHororMovie, fetchPopularMovie]);

  return {
    data,
    error,
    loading,
    handlePageAdd,
    horor,
    popular,
  };
};

export default useFetch;
