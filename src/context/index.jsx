import React, { useContext, useState } from "react";

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState("notActiveMenu");
  const [selectedItem, setSelectedItem] = useState(0);
  const [focus, setFocus] = useState("sidemenu");

  const toggleMenu = () => {
    setActiveMenu((prevState) =>
      prevState === "activeMenu" ? "notActiveMenu" : "activeMenu"
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
