import { useState } from 'react';

export const Welcome = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    if (password === process.env.REACT_APP_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Wrong password');
    }
  };

  return isAuthenticated ? (
    <h1>Welcome!</h1>
  ) : (
    <div>
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Enter password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
