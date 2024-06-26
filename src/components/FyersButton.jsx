import React, { useState } from "react";
import axios from "axios";
import api from "../config";

const App = () => {
  const [authCodeURL, setAuthCodeURL] = useState("");

  const handleFyersAuth = async () => {
    try {
      const response = await api.get("/fyers");
      const { authCodeURL } = response.data;
      window.location.href = authCodeURL;
    } catch (error) {
      console.error("Failed to retrieve Fyers auth URL:", error);
    }
  };

  const handleaccessToken = async () => {
    try {
      const response = await api.get("/generateAccessToken");
      console.log(response);
    } catch (error) {
      console.error("Failed to retrieve Fyers auth URL:", error);
    }
  };

  return (
    <div>
      <button onClick={handleFyersAuth}>Authenticate with Fyers</button>
      <button onClick={handleaccessToken}>generate access token</button>
    </div>
  );
};

export default App;
