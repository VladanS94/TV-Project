import React, { useContext, useState } from "react";
import "../components/SideMenu/SideMenu.css";

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState("not-active-menu");
  const [selectedItem, setSelectedItem] = useState(0);
  const [focus, setFocus] = useState("sidemenu");

  const toggleMenu = () => {
    setActiveMenu((prevState) =>
      prevState === "active-menu" ? "not-active-menu" : "active-menu"
    );
  };

  return (
    <UserContext.Provider
      value={{
        activeMenu,
        toggleMenu,
        selectedItem,
        setSelectedItem,
        focus,
        setFocus,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
