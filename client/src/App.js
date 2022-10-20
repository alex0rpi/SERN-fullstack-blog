import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AuthContext from './context/auth-context';
import {
  Home,
  CreatePost,
  Profile,
  Post,
  Login,
  Registration,
  PageNotFound,
} from './pages/index';
import { useState, useEffect, useCallback } from 'react';

function App() {
  const [authState, setAuthState] = useState({
    username: '',
    id: 0,
    loggedIn: false,
  });

  const fetchStateHandler = useCallback(async () => {
    const response = await fetch('/api/auth/auth', {
      headers: { accessToken: localStorage.getItem('accessToken') },
    });
    const json = await response.json();
    if (json.error) {
      setAuthState({ ...authState, loggedIn: false });
    } else {
      setAuthState({ username: json.username, id: json.id, loggedIn: true });
    }
  }, []);

  useEffect(() => {
    fetchStateHandler();
  }, [fetchStateHandler]);

  const onLogoutHandler = () => {
    setAuthState({ username: '', id: 0, status: false });
    localStorage.removeItem('accessToken');
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <BrowserRouter>
          <div className="navbar">
            <div className="links">
              {authState.loggedIn ? (
                <>
                  <Link to="/createpost">Create A Post</Link>
                  <Link to="/">Home Page</Link>
                </>
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </>
              )}
            </div>
            <div className="loggedInContainer">
              <h3>
                {authState.username}
              </h3>
              {authState.loggedIn && (
                <button onClick={onLogoutHandler}>LOGOUT</button>
              )}
            </div>
          </div>
          <Routes>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/profile/:userId" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
