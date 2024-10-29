import React, { useRef, useEffect, useState } from "react";
import { useUserContext } from "../../context";
import SingleMoviePage from "../../pages/SingleMovie/SingleMoviePage";

const Movie = ({
  data,
  title,
  isActiveRow,
  setRow,
  row,
  setFocus,
  toggleMenu,
  focus,
}) => {
  const [col, setCol] = useState(-1);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieID, setMovieID] = useState(null);

  const movieRefs = useRef([]);
  const { setSelectedItem } = useUserContext();

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
    setMovieID(movie);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showModal) return;
      if (e.key === "ArrowDown") {
        row !== 2 && setRow(row + 1);
      } else if (e.key === "ArrowUp") {
        row !== 0 && setRow(row - 1);
      } else if (e.key === "ArrowRight") {
        col < data.length - 1 && setCol(col + 1);
      } else if (e.key === "ArrowLeft") {
        col !== -1 && setCol(col - 1);
        if (col === 0) {
          setFocus("sidemenu");
          toggleMenu();
        }
      } else if (e.key === "Enter") {
        openModal(data[col]);
      } else if (e.key === "Escape" && showModal) {
        closeModal();
      }
    };

    if (isActiveRow && focus === "movies") {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    col,
    row,
    isActiveRow,
    focus,
    toggleMenu,
    setRow,
    setFocus,
    data,
    showModal,
    setSelectedItem,
  ]);

  useEffect(() => {
    if (focus === "movies" && isActiveRow && movieRefs.current[col]) {
      movieRefs.current[col].scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [isActiveRow, col, row, focus]);

  return (
    <div>
      <h1>{title}</h1>
      <div className="movie-list">
        {data?.map((movie, index) => (
          <div
            key={movie.id}
            ref={(el) => (movieRefs.current[index] = el)}
            style={{
              border:
                isActiveRow && col === index ? "4px solid yellow" : "none",
              padding: "3px",
              margin: "5px 0",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
              alt={movie.title}
            />
          </div>
        ))}
      </div>
      {showModal && (
        <div className="modal">
          <SingleMoviePage
            movieData={selectedMovie}
            onClose={closeModal}
            movie={movieID}
            showModal={showModal}
            closeModal={closeModal}
          />
        </div>
      )}
    </div>
  );
};

export default Movie;
