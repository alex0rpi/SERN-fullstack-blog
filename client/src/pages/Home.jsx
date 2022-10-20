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
      if (response.ok) {
        setListOfPosts(json);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {listOfPosts &&
        listOfPosts.map((postItem, index) => {
          return (
            <div
              className="post"
              key={index}
              onClick={() => navigate(`/post/${postItem.id}`)}
            >
              <div className="title">{postItem.title}</div>
              <div className="body">{postItem.postText}</div>
              <div className="footer">{postItem.username}</div>
            </div>
          );
        })}
    </div>
  );
};

export default Home;
