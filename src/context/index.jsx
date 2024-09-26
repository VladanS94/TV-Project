import React, { useContext } from "react";

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const users = JSON.parse(localStorage.getItem("users"));

  if(!users){
    
  }

  return <UserContext.Provider value={users}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  return useContext(UserContext);
};
