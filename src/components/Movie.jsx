import React from "react";
import { Link } from "react-router-dom";

const Movie = ({ data, title, selected, enterSingleMovie }) => {
  return (
    <div>
      <h1>{title}</h1>
      <div className="movie-list">
        {data?.map((movie) => {
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
