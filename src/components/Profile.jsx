import React, { useEffect, useState } from "react";
import api from "../config";

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
        setProfile(response.data);
      } catch (error) {
        console.error("Failed to fetch holdings:", error);
      }
    };

    fetchProfile();
    fetchHoldings();
  }, []);

  if (!profile) return <p>Loading profile & holdings...</p>;

  return (
    <div>
      <h1>Profile</h1>
      <pre>{JSON.stringify(profile, null, 2)}</pre>

      <h1>Holdings</h1>
      <pre>{JSON.stringify(holdings, null, 2)}</pre>
    </div>
  );
};

export default Profile;
