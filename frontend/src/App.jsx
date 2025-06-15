import { useEffect, useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

function App() {
  const [isLoggedIn, setIsLoggedin] = useState(false);

  //checking if user is logged in
  useEffect(() => {
    if (sessionStorage.getItem("id")) {
      setIsLoggedin(true);
    }
  }, []);

  const handleLogin = (id) => {
    sessionStorage.setItem("id", id);
    setIsLoggedin(true);
  };

  const handleLogout = () => {
    setIsLoggedin(false);
  };

  return (
    <div className="w-full">
      {isLoggedIn ? (
        <Dashboard logout={handleLogout} />
      ) : (
        <Login logIn={handleLogin} />
      )}
    </div>
  );
}

export default App;
