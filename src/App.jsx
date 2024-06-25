import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [accessToken, setAccessToken] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.get('/auth/callback', {
        params: {
          code: new URLSearchParams(window.location.search).get('code'),
        },
      });

      setAccessToken(response.data.accessToken);
    } catch (error) {
      console.error('Error fetching access token:', error);
    }
  };

  return (
    <div>
      <h1>Welcome to My App</h1>
      {!accessToken ? (
        <button onClick={handleLogin}>Login with Fyers</button>
      ) : (
        <div>
          <p>Access Token: {accessToken}</p>
          {/* Display additional data fetched with the access token */}
        </div>
      )}
    </div>
  );
};

export default App;
