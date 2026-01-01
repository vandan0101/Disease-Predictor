import React, { useState, useEffect } from "react";
import AuthPage from "./AuthPage";
import PredictPage from "./PredictPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <button style={logoutStyle} onClick={handleLogout}>
            Logout
          </button>
          <PredictPage />
        </>
      ) : (
        <AuthPage onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </>
  );
}

const logoutStyle = {
  position: "fixed",
  top: "15px",
  right: "20px",
  padding: "8px 14px",
  background: "#d32f2f",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  zIndex: 1000
};

export default App;
