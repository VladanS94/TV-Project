import { useEffect, useState } from "react";
import "./App.css";
import LogInPage from "./pages/LogIn/LogInPage";
import HomePage from "./pages/Home/HomePage";
import SignUp from "./pages/SignUp/SignUp";
import { useLocalStorage } from "react-use";

function App() {
  const [currentModal, setCurrentModal] = useState("login");
  const [token] = useLocalStorage("token", null);

  useEffect(() => {
    if (token) {
      setCurrentModal("home");
    }
  }, [token]);

  return (
    <div className="App">
      {currentModal === "home" ? (
        <HomePage setCurrentModal={setCurrentModal} />
      ) : (
        <LogInPage setCurrentModal={setCurrentModal} />
      )}

      {currentModal === "sign-up" && (
        <SignUp setCurrentModal={setCurrentModal} />
      )}
    </div>
  );
}

export default App;
