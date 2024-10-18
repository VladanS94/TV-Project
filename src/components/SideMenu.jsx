import React, { useEffect } from "react";
import { useUserContext } from "../context";
import { useNavigate } from "react-router-dom";
import userIcon from "../assets/user.png";
import cards from "../assets/cards.png";
import movie from "../assets/movie.png";
import music from "../assets/music.png";
import sport from "../assets/sport.png";
import headset from "../assets/headset.png";
import games from "../assets/games.png";
import search from "../assets/search.png";
import favorite from "../assets/favorite.png";
import { paths } from "../root/AppRoutes";

const SideMenu = ({ focus, onChangeFouces }) => {
  const { toggleMenu, selectedItem, setSelectedItem, activeMenu } =
    useUserContext();
  const navigate = useNavigate();

  const allItems = [
    { id: 0, label: "Konto", icon: userIcon },
    { id: 1, label: "Startseite", icon: cards },
    { id: 2, label: "Filme", icon: movie },
    { id: 3, label: "Musik", icon: music },
    { id: 4, label: "Sport", icon: sport },
    { id: 5, label: "Hörbücher", icon: headset },
    { id: 6, label: "Games", icon: games },
    { id: 7, label: "Suchen", icon: search },
    { id: 8, label: "Favoriten", icon: favorite },
    { id: 9, label: "Logout", icon: "" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate(paths.login);
  };

  useEffect(() => {
    if (focus === "sidemenu") {
      const handleKeyDown = (e) => {
        if (e.key === "ArrowDown") {
          setSelectedItem((prev) =>
            prev < allItems.length - 1 ? prev + 1 : prev
          );
        } else if (e.key === "ArrowUp") {
          setSelectedItem((prev) => (prev > 0 ? prev - 1 : prev));
        } else if (e.key === "ArrowRight") {
          if (selectedItem !== 9) {
            onChangeFouces("movies");
            setSelectedItem(-1);
            toggleMenu();
          }
        } else if (e.key === "Enter") {
          if (selectedItem === 9) {
            handleLogout();
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [
    allItems.length,
    setSelectedItem,
    onChangeFouces,
    focus,
    toggleMenu,
    selectedItem,
  ]);

  return (
    <div className={activeMenu}>
      <h1 className="side-menu-title">CliQ</h1>
      <ul className="side-menu-list">
        {allItems.map((item, index) => (
          <li
            key={item.id}
            className={`side-menu-item ${
              selectedItem === index ? "active" : ""
            }`}
            style={{
              border: selectedItem === index ? "5px solid yellow" : "none",
              padding: "10px",
              margin: "5px 0",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              width={25}
              height={25}
              src={item.icon}
              alt={`${item.label} icon`}
            />
            <p className="sidemenu-paragraf">{item.label}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;
