import React from 'react';
import { useState, useContext } from 'react';
import AuthContext from '../context/auth-context';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);

  const login = async (e) => {
    e.preventDefault();
    const data = { username, password };
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    // console.log(json); // NO HACER ESTO! ES INSEGURO
    setPassword('');
    setUsername('');
    if (!response.ok) {
      alert(json.error);
      return;
    } else {
      localStorage.setItem('accessToken', json.token);
      setAuthState({ username: json.username, id: json.id, loggedIn: true });
      navigate('/');
    }
  };
  return (
    <div className="loginContainer">
      <label>Username:</label>
      <input
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        type="text"
      />
      <label>Password:</label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
      />
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Login;
