import React, { useEffect, useState } from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import useFetch from "../../hooks/useFetch";
import Movie from "../../components/Movie/Movie";
import { useUserContext } from "../../context/index";
import "./HomePage.css";

const HomePage = ({ setCurrentModal }) => {
  const [activeMenuItem] = useState(0);
  const [row, setRow] = useState(0);

  const { toggleMenu, focus, setFocus } = useUserContext();

  const { data: topRatedMovies } = useFetch(
    "https://api.themoviedb.org/3/movie/top_rated",
    1
  );
  const { data: horrorMovies } = useFetch(
    "https://api.themoviedb.org/3/discover/movie",
    1
  );
  const { data: popularMovies } = useFetch(
    "https://api.themoviedb.org/3/movie/popular",
    1
  );

  useEffect(() => {
    if (focus === "movies") {
      setRow(0);
    }
  }, [focus]);

  return (
    <div className="home-page">
      <SideMenu
        activeMenuItem={activeMenuItem}
        setCurrentModal={setCurrentModal}
      />

      <div className="right-side">
        <Movie
          title="Top Rated"
          data={topRatedMovies}
          column={0}
          row={row}
          isActiveRow={row === 0}
          setRow={setRow}
        />
        <Movie
          title="Horror"
          data={horrorMovies}
          column={1}
          row={row}
          isActiveRow={row === 1}
          setRow={setRow}
        />
        <Movie
          title="Popular"
          data={popularMovies}
          column={2}
          row={row}
          isActiveRow={row === 2}
          setRow={setRow}
        />
      </div>
    </div>
  );
};

export default HomePage;
