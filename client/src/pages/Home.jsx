import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/auth-context';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const Home = () => {
  const { authState } = useContext(AuthContext);
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authState.loggedIn) {
      navigate('/login');
      return;
    }
    //we cannot make the effect function async.
    // fetch logic lives in this function which will be async.
    const fetchData = async () => {
      const response = await fetch('/api/posts', {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      });
      const json = await response.json(); //json() method is also async!!
      // console.log(json.listOfLikes);
      if (response.ok) {
        setListOfPosts(json.listOfPosts);
        setLikedPosts(json.listOfLikes.map((like) => like.PostId));
      }
    };
    fetchData();
  }, []);

  const likePost = async (postId) => {
    const response = await fetch('/api/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accessToken: localStorage.getItem('accessToken'),
      },
      body: JSON.stringify({ PostId: postId }),
    });
    const json = await response.json();
    setListOfPosts(
      // update an object(likes array) inside of the post array
      listOfPosts.map((post) => {
        if (post.id === postId) {
          if (json.liked) {
            return { ...post, Likes: [...post.Likes, 0] };
          } else {
            const likesArray = post.Likes;
            likesArray.pop();
            return { ...post, Likes: likesArray };
          }
        } else {
          return post;
        }
      })
    );
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter((likedPostId) => likedPostId !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
  };

  return (
    <div>
      {listOfPosts &&
        listOfPosts.map((postItem, index) => {
          return (
            <div className="post" key={index}>
              <div className="title">{postItem.title}</div>
              <div className="body" onClick={() => navigate(`/post/${postItem.id}`)}>
                {postItem.postText}
              </div>
              <div className="footer">
                <div className="username">{postItem.username}</div>
                <div className="buttons">
                  {likedPosts.includes(postItem.id) ? (
                    <ThumbUpAltIcon onClick={() => likePost(postItem.id)} />
                  ) : (
                    <ThumbUpOffAltIcon onClick={() => likePost(postItem.id)} />
                  )}
                  <label>{postItem.Likes.length}</label>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Home;
