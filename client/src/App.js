import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthContext from './context/auth-context';
import { Home, CreatePost, Profile, Post, Login, Registration, PageNotFound, ChangePassword } from './pages/index';
import Navbar from './components/Navbar';
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

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/changepassword" element={<ChangePassword />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
