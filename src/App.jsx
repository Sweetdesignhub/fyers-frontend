import React from 'react';

const App = () => {
  const handleLogin = () => {
    // Redirect to Fyers authorization endpoint
    window.location.href = `https://api-t1.fyers.in/api/v3/generate-authcode?client_id=710RYAUI5Z-100&redirect_uri=https://fyers-backend.onrender.com/&response_type=code&state=sample_state`;
  };

  return (
    <div>
      <h1>Welcome to My App</h1>
      <button onClick={handleLogin}>Login with Fyers</button>
    </div>
  );
};

export default App;
