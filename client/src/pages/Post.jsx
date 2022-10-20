import React from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../context/auth-context';
import { useEffect, useState, useContext } from 'react';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/posts/byId/${id}`);
      const json = await response.json();
      response.ok && setPost(json);
    };
    const fetchComments = async () => {
      const response = await fetch(`/api/comments/${id}`);
      const json = await response.json();
      response.ok && setComments(json);
    };
    fetchPost();
    fetchComments();
  }, [id]);
  // -----------------------------------------------
  const addComment = async (e) => {
    e.preventDefault();
    setNewComment(e.target.value);
    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accessToken: localStorage.getItem('accessToken'),
        // this way we communicate the accessToken to the backend server.
      },
      body: JSON.stringify({ commentBody: newComment, PostId: id }),
    });
    const json = await response.json();
    console.log(json);
    if (json.error) {
      alert(json.error.message); //jwt malformed
      return;
    }
    const newCommentToAdd = {
      commentBody: newComment,
      username: json.username,
      id: json.id,
    };
    // console.log(newCommentToAdd)
    setComments([...comments, newCommentToAdd]);
    setNewComment('');
  };
  // -----------------------------------------------
  const deletePost = async (commentId) => {
    await fetch(`/api/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        accessToken: localStorage.getItem('accessToken'),
        // this way we communicate the accessToken to the backend server.
      },
    });
    const newCommentList = comments.filter((comment) => comment.id !== commentId);
    setComments(newCommentList);
    alert('deleted');
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title">{post.title}</div>
          <div className="body">{post.postText}</div>
          <div className="footer">{post.username}</div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            type="text"
            placeholder="Comment here..."
            autoComplete="off"
          />
          <button onClick={addComment}>Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, index) => {
            return (
              <div className="comment" key={index}>
                <h3>{comment.commentBody}</h3>
                <label>Username: {comment.username}</label>
                {/* display delete button only if the comment author is the current user logged in */}
                {authState.username === comment.username && (
                  <button
                    className="deleteComment"
                    onClick={() => deletePost(comment.id)}
                  >
                    DELETE
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Post;
