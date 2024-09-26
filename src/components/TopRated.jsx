import React, { useCallback, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";

const TopRated = () => {
  const [isClosed, setIsClosed] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(0);
  const [inMenu, setInMenu] = useState(false);

  // const { name } = useActiveContext();

  const navigate = useNavigate();

  const { data } = useFetch(`https://api.themoviedb.org/3/movie/top_rated`);

  const [active, setActive] = useState(0);
  const selected = data?.[active] ?? null;

  const enterSingleMovie = useCallback(
    (e) => {
      if (e.keyCode === 13 && selected) {
        navigate(`/movie/${selected.id}`);
      }
    },
    [selected, navigate]
  );

  useEffect(() => {
    const allItems = Array.from(document.querySelector(".movie-list").children);
    const selectedDiv = allItems[active];
    if (selectedDiv)
      selectedDiv.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });

    const moveItem = (e) => {
      if (!inMenu) {
        if (e.key === "ArrowRight" && active < data.length - 1) {
          setActive((prev) => prev + 1);
        }
        if (e.key === "ArrowLeft") {
          if (active > 0) {
            setActive((prev) => prev - 1);
          } else {
            setInMenu(true);
          }
        }
        if (e.key === "Enter") {
          enterSingleMovie(e);
        }
      } else {
        if (e.key === "ArrowDown") {
          setActiveMenuItem((prev) => prev + 1);
        }
        if (e.key === "ArrowUp" && activeMenuItem > 0) {
          setActiveMenuItem((prev) => prev - 1);
        }
        if (e.key === "ArrowRight") {
          setInMenu(false);
        }
      }
    };
    window.addEventListener("keydown", moveItem);
    return () => window.removeEventListener("keydown", moveItem);
  }, [
    active,
    data.length,
    inMenu,
    activeMenuItem,
    selected,
    navigate,
    enterSingleMovie,
  ]);

  return (
    <div>
      <h1>Top Rated</h1>
      <div className="movie-list">
        {data.map((movie, index) => {
          const isActive = movie?.id === selected?.id;
          return (
            <div
              onSubmit={enterSingleMovie}
              style={{
                outline: isActive ? "5px solid green" : undefined,
              }}
              key={movie.id}
            >
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopRated;
