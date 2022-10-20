import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Registration from './pages/Registration';
import AuthContext from './context/auth-context';
import { useState, useEffect, useCallback } from 'react';

function App() {
  const [authState, setAuthState] = useState({
    username: '',
    id: 0,
    loggedIn: false,
  });

  const fetchStateHandler = useCallback(async () => {
    // localStorage.getItem('accessToken') && setIsLoggedIn(true);
    // * OJO!, HAY QUE EVITAR FALSOS 'accessToken'. Lo verificamos en el backend.
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
            <Link to="/createpost">Create A Post</Link>
            <Link to="/">Home Page</Link>
            {!authState.loggedIn ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            ) : (
              <button onClick={onLogoutHandler}>LOGOUT</button>
            )}
            {/* Esta es la peor manera. Cualquiera puede introducir en console javascript para crear un accessToken cualquiera. */}
            {/* Otro punto, LOCAL STORAGE VS SESSION STORAGE
          Sessionstorage --> I login, then I open a new tab and  I loose it! nothing is persisted.
          Localstorage --> The info stored there survives windows and tabs closing.*/}
            <h4> {authState.username}</h4>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
