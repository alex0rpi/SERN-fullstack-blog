import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth-context';

const Navbar = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  const onLogoutHandler = () => {
    setAuthState({ username: '', id: 0, status: false });
    localStorage.removeItem('accessToken');
  };
  return (
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
        <h3>{authState.username}</h3>
        {authState.loggedIn && (
          <div onClick={onLogoutHandler}>
            <Link to="/login">LOGOUT</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
