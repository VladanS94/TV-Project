import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import play from "../assets/play.svg";
import favorite from "../assets/favorite.svg";

const apiKey = process.env.REACT_APP_API_KEY;

const SingleMoviePage = () => {
  const [data, setData] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchApiID = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching the movie data:", error);
    }
  }, [id]);

  const backSpace = useCallback(
    (e) => {
      if (e.key === "Backspace") {
        navigate(-1);
      }
    },
    [navigate]
  );

  useEffect(() => {
    fetchApiID();
    window.addEventListener("keydown", backSpace);
    return () => {
      window.removeEventListener("keydown", backSpace);
    };
  }, [fetchApiID, backSpace]);

  return (
    <div className="single-movie">
      <div className="movie-bg">
        <img
          src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
          alt={data.title}
        />
        <div className="play-section">
          <p>{data?.release_date?.slice(0, 4)}</p>
          <h1>{data.title}</h1>
          <div className="play-btn">
            <button>
              <img className="play" src={play} alt="..." /> Jetzt reinhoren
            </button>
            <button className="favorite">
              <img src={favorite} alt="..." />
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="informations">
          <h1>Informationen</h1>
          <p>{data.overview}</p>
        </div>
        <div className="mehr">
          <h1>Mehr entdecken</h1>
          <p>{data.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleMoviePage;
