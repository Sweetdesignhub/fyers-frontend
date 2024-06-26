import React, { useState } from "react";
import api from "../config";

const App = () => {
  const [authCodeURL, setAuthCodeURL] = useState("");

  const handleFyersAuth = async () => {
    try {
      const response = await api.get("/api/fyers");
      const { authCodeURL } = response.data;
      window.location.href = authCodeURL; // Redirect user to Fyers authentication URL
    } catch (error) {
      console.error("Failed to retrieve Fyers auth URL:", error);
    }
  };

  return (
    <div>
      <button onClick={handleFyersAuth}>Authenticate with Fyers</button>
    </div>
  );
};

export default App;
