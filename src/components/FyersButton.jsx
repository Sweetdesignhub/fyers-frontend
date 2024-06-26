import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../config";

const App = () => {
  const [authCodeURL, setAuthCodeURL] = useState("");
  const [accessToken, setAccessToken] = useState("");

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
      {accessToken && <p>Access Token: {accessToken}</p>}
    </div>
  );
};

export default App;
