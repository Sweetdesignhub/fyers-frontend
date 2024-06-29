import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import api from "./config";
import Profile from "./components/Profile";

const App = () => {
  const [authCodeURL, setAuthCodeURL] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const navigate = useNavigate();

  const handleFyersAuth = async () => {
    try {
      const response = await api.get("/fyers");
      const { authCodeURL } = response.data;
      window.location.href = authCodeURL;
    } catch (error) {
      console.error("Failed to retrieve Fyers auth URL:", error);
    }
  };

  const generateAccessToken = async (uri) => {
    try {
      const response = await api.post("/generateAccessToken", { uri });
      const { accessToken } = response.data;
      setAccessToken(accessToken);
      console.log("Access Token:", accessToken);
      navigate("/profile");
    } catch (error) {
      console.error("Failed to generate access token:", error);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const authCode = query.get("auth_code");
    if (authCode) {
      const uri = window.location.href;
      generateAccessToken(uri);
    }
  }, []);

  return (
    <div>
      <button onClick={handleFyersAuth}>Authenticate with Fyers</button>
    </div>
  );
};

const MainApp = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </Router>
);

export default MainApp;
