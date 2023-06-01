import { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/auth-context';
import { useParams, useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [username, setUsername] = useState('');
  const [userPosts, setUserPosts] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const result = await fetch(`/api/auth/basicInfo/${userId}`);
      const data = await result.json();
      setUsername(data.basicInfo.username);
    };
    const fetchUserPosts = async () => {
      const result = await fetch(`/api/posts/byUserId/${userId}`);
      const data = await result.json();
      setUserPosts(data.userPostsList);
    };
    fetchUserInfo();
    fetchUserPosts();
  }, [userId]);

  return (
    //   Show all the posts made by this current user.
    <div className="profilePageContainer">
      <div className="basicInfo">
        <h1>Username: {username}</h1>
        {authState.username === username && (
          <button onClick={() => navigate('/changepassword')}>Change Password</button>
        )}
      </div>
      <div className="listOfPosts">
        {userPosts ? (
          userPosts.map((postItem, index) => (
            <div className="post" key={index}>
              <div className="title">{postItem.title}</div>
              <div className="body" onClick={() => navigate(`/post/${postItem.id}`)}>
                {postItem.postText}
              </div>
              <div className="footer">
                <div className="username" onClick={() => navigate(`/profile/${postItem.UserId}`)}>
                  {postItem.username}
                  <label> {postItem.Likes.length} Likes</label>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h2>No posts to show</h2>
        )}
      </div>
    </div>
  );
};

export default Profile;
