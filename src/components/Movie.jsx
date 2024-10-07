import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Movie = ({ data, title, column, selectedColumn, row }) => {
  const movieRefs = useRef([]);

  useEffect(() => {
    if (selectedColumn === column && movieRefs.current[row]) {
      movieRefs.current[row].scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [selectedColumn, column, row]);

  return (
    <div>
      <h1>{title}</h1>
      <div className="movie-list">
        {data?.map((movie, index) => {
          return (
            <div
              key={movie.id}
              ref={(el) => (movieRefs.current[index] = el)}
              style={{
                border:
                  selectedColumn === column && row === index
                    ? "4px solid yellow"
                    : "none",
                padding: "3px",
                margin: "5px 0",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
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

export default Movie;
