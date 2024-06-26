// GenerateAccessTokenComponent.js
import React, { useState } from 'react';
import axios from 'axios';

const GenerateAccessTokenComponent = () => {
  const [accessToken, setAccessToken] = useState('');
  const [error, setError] = useState(null);

  const handleGenerateToken = async () => {
    try {
      const response = await axios.post('/generateAccessToken', {
        // Any payload data if required
      });
      setAccessToken(response.data.accessToken); // Assuming your API response includes accessToken
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Generate Access Token</h2>
      <button onClick={handleGenerateToken}>Generate Token</button>
      {accessToken && <p>Access Token: {accessToken}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default GenerateAccessTokenComponent;
