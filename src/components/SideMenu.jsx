import React from "react";
import userIcon from "../assets/user.png";
import cards from "../assets/cards.png";
import movie from "../assets/movie.png";
import music from "../assets/music.png";
import sport from "../assets/sport.png";
import headset from "../assets/headset.png";
import games from "../assets/games.png";
import search from "../assets/search.png";
import favorite from "../assets/favorite.png";

const SideMenu = ({ activeMenuItem }) => {
  const userItem = [{ id: 0, label: "Startseite", icon: userIcon }];
  const menuItems = [
    { id: 1, label: "Startseite", icon: cards },
    { id: 2, label: "Filme", icon: movie },
    { id: 3, label: "Musik", icon: music },
    { id: 4, label: "Sport", icon: sport },
    { id: 5, label: "Hörbücher", icon: headset },
    { id: 6, label: "Games", icon: games },
  ];

  const secondaryItems = [
    { id: 7, label: "Suchen", icon: search },
    { id: 8, label: "Favoriten", icon: favorite },
  ];

  return (
    <div className="side-menu">
      <h1 className="side-menu-title">CliQ</h1>
      <div className="side-menu-user">
        {userItem.map((item) => (
          <li
            key={item.id}
            style={{
              outline: activeMenuItem === item.id ? "3px solid blue" : "none",
            }}
          >
            <img width={25} height={25} src={item.icon} alt="user icon" />
            <p>Konto</p>
          </li>
        ))}
      </div>
      <div className="side-menu-list">
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.id}
              style={{
                outline: activeMenuItem === item.id ? "3px solid blue" : "none",
              }}
            >
              <img
                width={25}
                height={25}
                src={item.icon}
                alt={`${item.label}`}
              />
              <p>{item.label}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="search-favorite">
        <ul>
          {secondaryItems.map((item) => (
            <li
              key={item.id}
              style={{
                outline: activeMenuItem === item.id ? "3px solid blue" : "none",
              }}
            >
              <img
                width={25}
                height={25}
                src={item.icon}
                alt={`${item.label}`}
              />
              <p>{item.label}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="side-menu-down">
        <p>kids</p>
        <p className="side-menu-down-p">Kids</p>
      </div>
    </div>
  );
};

export default SideMenu;
