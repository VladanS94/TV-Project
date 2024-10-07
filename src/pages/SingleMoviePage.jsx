import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import play from "../assets/play.svg";
import favorite from "../assets/favorite.svg";

const apiKey = process.env.REACT_APP_API_KEY;

const SingleMoviePage = () => {
  const [data, setData] = useState([]);
  const [focused, setFocused] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const playButtonRef = useRef(null);
  const favoriteButtonRef = useRef(null);
  const infoSectionRef = useRef(null);
  const discoverSectionRef = useRef(null);

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
        navigate("/");
      }
    },
    [navigate]
  );

  const handleKeyNavigation = useCallback((e) => {
    if (e.key === "ArrowRight") {
      if (document.activeElement === playButtonRef.current) {
        favoriteButtonRef.current.focus();
      }
    } else if (e.key === "ArrowLeft") {
      if (document.activeElement === favoriteButtonRef.current) {
        playButtonRef.current.focus();
      }
    } else if (e.key === "ArrowDown") {
      if (document.activeElement === playButtonRef.current) {
        infoSectionRef.current.focus();
      } else if (document.activeElement === favoriteButtonRef.current) {
        infoSectionRef.current.focus();
      } else if (document.activeElement === infoSectionRef.current) {
        discoverSectionRef.current.focus();
      }
    } else if (e.key === "ArrowUp") {
      if (document.activeElement === discoverSectionRef.current) {
        infoSectionRef.current.focus();
      } else if (document.activeElement === infoSectionRef.current) {
        playButtonRef.current.focus();
      }
    }
  }, []);

  const handleInfoFocus = () => setFocused(true);
  const handleInfoBlur = () => setFocused(false);

  useEffect(() => {
    fetchApiID();
    window.addEventListener("keydown", backSpace);
    window.addEventListener("keydown", handleKeyNavigation);

    playButtonRef.current.focus();

    return () => {
      window.removeEventListener("keydown", backSpace);
      window.removeEventListener("keydown", handleKeyNavigation);
    };
  }, [fetchApiID, backSpace, handleKeyNavigation]);

  return (
    <div className="single-movie">
      <div className={`movie-bg ${focused ? "shrink" : ""}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
          alt={data.title}
        />
        <div className="play-section">
          <p>{data?.release_date?.slice(0, 4)}</p>
          <h1>{data.title}</h1>
          <div className="play-btn">
            <button ref={playButtonRef}>
              <img className="play" src={play} alt="..." /> Jetzt reinhoren
            </button>
            <button ref={favoriteButtonRef} className="favorite">
              <img src={favorite} alt="..." />
            </button>
          </div>
        </div>
      </div>

      <div>
        <div
          ref={infoSectionRef}
          className={`informations ${focused ? "focused" : ""}`}
          tabIndex="0"
          onFocus={handleInfoFocus}
          onBlur={handleInfoBlur}
        >
          <h1>Informationen:</h1>
          <p>{data.overview}</p>
        </div>
        <div
          ref={discoverSectionRef}
          className={`mehr ${focused ? "focused" : ""}`}
          onFocus={handleInfoFocus}
          onBlur={handleInfoBlur}
          tabIndex="0"
        >
          <h1>Mehr entdecken:</h1>
          <p>{data.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleMoviePage;
