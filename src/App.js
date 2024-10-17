import { useMemo } from "react";
import "./App.css";

function App() {
  const Routes = useMemo(() => require("./root/AppRoutes").default, []);
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
