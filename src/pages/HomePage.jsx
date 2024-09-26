import React, { useCallback, useEffect, useState } from "react";
import SideMenu from "../components/SideMenu";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import Movie from "../components/Movie";

const HomePage = () => {
  const [isClosed, setIsClosed] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(0);
  const [inMenu, setInMenu] = useState(false);

  const navigate = useNavigate();

  const { data, horor, popular } = useFetch(
    "https://api.themoviedb.org/3/movie/top_rated"
  );

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
    <div className="home-page">
      <div
        onSubmit={() => setIsClosed(false)}
        style={{ width: isClosed ? "100px" : "250px" }}
        className="side-menu"
      >
        <SideMenu activeMenuItem={activeMenuItem} />
      </div>
      <div onClick={() => setIsClosed(true)} className="right-side">
        <Movie
          title="Top Rated"
          data={data}
          setIsClosed={setIsClosed}
          selected={selected}
          enterSingleMovie={enterSingleMovie}
        />
        <Movie
          title="Horor"
          data={horor}
          setIsClosed={setIsClosed}
          selected={selected}
          enterSingleMovie={enterSingleMovie}
        />
        <Movie
          title="Popular"
          data={popular}
          setIsClosed={setIsClosed}
          selected={selected}
          enterSingleMovie={enterSingleMovie}
        />
      </div>
    </div>
  );
};

export default HomePage;
