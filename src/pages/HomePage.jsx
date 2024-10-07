import React, { useCallback, useEffect, useState } from "react";
import SideMenu from "../components/SideMenu";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import Movie from "../components/Movie";
import { useUserContext } from "../context";

const HomePage = () => {
  const [activeMenuItem, setActiveMenuItem] = useState(0);
  const [column, setColumn] = useState(0);
  const [row, setRow] = useState(-1);

  const { toggleMenu, focus, setFocus } = useUserContext();

  const navigate = useNavigate();

  const { data, horor, popular } = useFetch(
    "https://api.themoviedb.org/3/movie/top_rated"
  );

  const getSelectedMovie = () => {
    let selected = null;
    if (focus === "movies") {
      if (column === 0) selected = data?.[row] ?? null;
      else if (column === 1) selected = horor?.[row] ?? null;
      else if (column === 2) selected = popular?.[row] ?? null;
    }
    return selected;
  };

  const selected = getSelectedMovie();

  console.log(column, row, focus, selected);

  const enterSingleMovie = useCallback(
    (e) => {
      if (e.key === "Enter" && selected) {
        navigate(`/movie/${selected.id}`);
      }
    },
    [selected, navigate]
  );
  useEffect(() => {
    if (focus === "movies") {
      const handleKeyDown = (e) => {
        if (e.key === "ArrowDown") {
          column !== 2 && setColumn(column + 1);
        } else if (e.key === "ArrowUp") {
          column !== 0 && setColumn(column - 1);
        } else if (e.key === "ArrowRight") {
          row < 19 && setRow(row + 1);
        } else if (e.key === "ArrowLeft") {
          row !== -1 && setRow(row - 1);
          if (row === 0) {
            setFocus("sidemenu");
            toggleMenu();
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [column, focus, row, toggleMenu, setFocus]);

  useEffect(() => {
    window.addEventListener("keydown", enterSingleMovie);

    return () => {
      window.removeEventListener("keydown", enterSingleMovie);
    };
  }, [enterSingleMovie]);

  useEffect(() => {
    if (focus === "movies") {
      setRow(0);
    }
  }, [focus]);

  return (
    <div className="home-page">
      <SideMenu
        focus={focus}
        onChangeFouces={setFocus}
        activeMenuItem={activeMenuItem}
      />

      <div className="right-side">
        <Movie
          title="Top Rated"
          data={data}
          selected={selected}
          enterSingleMovie={enterSingleMovie}
          selectedColumn={column}
          column={0}
          row={row}
        />
        <Movie
          title="Horor"
          data={horor}
          selected={selected}
          enterSingleMovie={enterSingleMovie}
          selectedColumn={column}
          column={1}
          row={row}
        />
        <Movie
          title="Popular"
          data={popular}
          selected={selected}
          enterSingleMovie={enterSingleMovie}
          selectedColumn={column}
          column={2}
          row={row}
        />
      </div>
    </div>
  );
};

export default HomePage;
