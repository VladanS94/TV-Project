import React, { useEffect, useRef, useState } from "react";
import { useUserContext } from "../../context";
import { allItems } from "./side-menu-list";
import { useLocalStorage } from "react-use";

const SideMenu = ({ focus, setFocus, setCurrentModal }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsRef = useRef([]);

  const { toggleMenu, selectedItem, setSelectedItem, activeMenu } =
    useUserContext();
  const [token, setToken, removeToken] = useLocalStorage("token");

  const handleLogout = () => {
    removeToken();
    setCurrentModal("login");
  };

  useEffect(() => {
    itemsRef.current[currentIndex]?.focus();
    if (focus === "sidemenu") {
      const handleKeyDown = (e) => {
        if (e.key === "ArrowDown") {
          setCurrentIndex((prevIndex) =>
            prevIndex < allItems.length - 1 ? prevIndex + 1 : prevIndex
          );
        } else if (e.key === "ArrowUp") {
          setCurrentIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : prevIndex
          );
        } else if (e.key === "ArrowRight") {
          setFocus("movies");
          toggleMenu();
        } else if (e.key === "Enter") {
          if (currentIndex === allItems.length - 1) {
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
    setSelectedItem,
    currentIndex,
    setFocus,
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
            tabIndex={-1}
            ref={(el) => (itemsRef.current[index] = el)}
            className={focus === "movies" ? "no-focus-visible" : ""}
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
