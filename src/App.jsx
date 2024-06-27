// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
// import api from "./config";
// import Profile from "./components/Profile";

// const App = () => {
//   const [authCodeURL, setAuthCodeURL] = useState("");
//   const [accessToken, setAccessToken] = useState("");
//   const navigate = useNavigate();

//   const handleFyersAuth = async () => {
//     try {
//       const response = await api.get("/fyers");
//       const { authCodeURL } = response.data;
//       window.location.href = authCodeURL;
//     } catch (error) {
//       console.error("Failed to retrieve Fyers auth URL:", error);
//     }
//   };

//   const generateAccessToken = async (uri) => {
//     try {
//       const response = await api.post("/generateAccessToken", { uri });
//       const { accessToken } = response.data;
//       setAccessToken(accessToken);
//       console.log("Access Token:", accessToken);
//       navigate("/profile");
//     } catch (error) {
//       console.error("Failed to generate access token:", error);
//     }
//   };

//   useEffect(() => {
//     const query = new URLSearchParams(window.location.search);
//     const authCode = query.get("auth_code");
//     if (authCode) {
//       const uri = window.location.href;
//       generateAccessToken(uri);
//     }
//   }, []);

//   return (
//     <div>
//       <button onClick={handleFyersAuth}>Authenticate with Fyers</button>
//     </div>
//   );
// };

// const MainApp = () => (
//   <Router>
//     <Routes>
//       <Route path="/" element={<App />} />
//       <Route path="/profile" element={<Profile />} />
//     </Routes>
//   </Router>
// );

// export default MainApp;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import api from "../config";
import Profile from "./Profile";

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

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [holdings, setHoldings] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/fetchProfile");
        setProfile(response.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    const fetchHoldings = async () => {
      try {
        const response = await api.get("/fetchHoldings");
        setHoldings(response.data);
      } catch (error) {
        console.error("Failed to fetch holdings:", error);
      }
    };

    fetchProfile();
    fetchHoldings();

    // WebSocket connection
    const socket = new WebSocket("ws://localhost:8080");

    socket.onmessage = (event) => {
      console.log("Received holdings update:", event.data);
      setHoldings(JSON.parse(event.data));
    };

    return () => {
      socket.close();
    };
  }, []);

  if (!profile || !holdings) return <p>Loading...</p>;

  return (
    <div>
      <h1>Profile</h1>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
      <h1>Holdings</h1>
      <pre>{JSON.stringify(holdings, null, 2)}</pre>
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
