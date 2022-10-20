import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [listOfPosts, setListOfPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    //we cannot make the effect function async.
    // fetch logic lives in this function which will be async.
    const fetchData = async () => {
      const response = await fetch('/api/posts');
      const json = await response.json(); //json() method is also async!!
      // json is now an array of objects
      response.ok && setListOfPosts(json);
      console.log(json);
      //[{id, username, etc. , Likes:[{like}, {like}]}, {another post}]
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
    // update an object inside of a list (array)
    setListOfPosts(
      listOfPosts.map((post) => {
        if (post.id === postId) {
          if (json.liked) {
            return { ...post, Likes: [...post.Likes, 0] };
          } 
          else {
            const likesArray = post.Likes;
            likesArray.pop()
            return { ...post, Likes: likesArray };
          }
        } else {
          return post;
        }
      })
    );
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
                {postItem.username}
                <button onClick={() => likePost(postItem.id)}> Like</button>
                <label>{postItem.Likes.length}</label>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Home;
