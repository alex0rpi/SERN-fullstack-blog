import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Registration from './pages/Registration';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="navbar">
          <Link to="/createpost">Create A Post</Link>
          <Link to="/">Home Page</Link>
          {!sessionStorage.getItem('accessToken') && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
          {/* Esta es la peor manera. Cualquiera puede introducir en console javascript para crear un accessToken cualquiera. */}
          {/* Otro punto, LOCAL STORAGE VS SESSION STORAGE
          Sessionstorage --> I login, then I open a new tab and  I loose it! nothing is persisted.
          Localstorage --> The info stored there survives windows and tabs closing.*/}
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
